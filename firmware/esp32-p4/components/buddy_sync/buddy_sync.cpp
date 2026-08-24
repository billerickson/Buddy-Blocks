#include "buddy_sync.h"

#include <algorithm>
#include <array>
#include <cctype>
#include <cstdio>
#include <cstring>
#include <ctime>
#include <memory>
#include <strings.h>
#include <vector>

#include "buddy_domain.h"
#include "cJSON.h"
#include "esp_crt_bundle.h"
#include "esp_http_client.h"
#include "esp_log.h"
#include "esp_random.h"
#include "esp_sntp.h"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/task.h"
#include "mbedtls/sha256.h"
#include "nvs.h"

namespace buddy::sync {

namespace {

constexpr char kTag[] = "buddy_sync";
constexpr char kNamespace[] = "buddy_device";
constexpr size_t kPairingResponseLimit = 16 * 1024;
constexpr TickType_t kPairPollTicks = pdMS_TO_TICKS(3000);
constexpr TickType_t kIdlePollTicks = pdMS_TO_TICKS(15000);
constexpr int64_t kPeriodicSyncMs = 15 * 60 * 1000;
constexpr time_t kMinimumTrustedUnixTime = 1704067200; // 2024-01-01T00:00:00Z

using Json = std::unique_ptr<cJSON, decltype(&cJSON_Delete)>;

std::string base64url(const uint8_t *bytes, size_t size)
{
    static constexpr char alphabet[] =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    std::string output;
    output.reserve((size * 4 + 2) / 3);
    uint32_t buffer = 0;
    int bits = 0;
    for (size_t index = 0; index < size; ++index) {
        buffer = (buffer << 8) | bytes[index];
        bits += 8;
        while (bits >= 6) {
            bits -= 6;
            output.push_back(alphabet[(buffer >> bits) & 0x3fU]);
        }
    }
    if (bits > 0) output.push_back(alphabet[(buffer << (6 - bits)) & 0x3fU]);
    return output;
}

std::string random_secret(size_t bytes)
{
    std::vector<uint8_t> entropy(bytes);
    esp_fill_random(entropy.data(), entropy.size());
    return base64url(entropy.data(), entropy.size());
}

std::string random_uuid()
{
    std::array<uint8_t, 16> bytes{};
    esp_fill_random(bytes.data(), bytes.size());
    bytes[6] = static_cast<uint8_t>((bytes[6] & 0x0fU) | 0x40U);
    bytes[8] = static_cast<uint8_t>((bytes[8] & 0x3fU) | 0x80U);
    char output[37];
    std::snprintf(output, sizeof(output),
                  "%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",
                  bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7],
                  bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14],
                  bytes[15]);
    return output;
}

std::string sha256_hex(const std::string &value)
{
    std::array<uint8_t, 32> digest{};
    if (mbedtls_sha256(reinterpret_cast<const unsigned char *>(value.data()), value.size(),
                       digest.data(), 0) != 0) {
        return {};
    }
    static constexpr char hex[] = "0123456789abcdef";
    std::string output(64, '0');
    for (size_t index = 0; index < digest.size(); ++index) {
        output[index * 2] = hex[digest[index] >> 4];
        output[index * 2 + 1] = hex[digest[index] & 0x0fU];
    }
    return output;
}

bool nvs_read_string(nvs_handle_t handle, const char *key, std::string &output,
                     size_t maximum = 512)
{
    size_t length = 0;
    if (nvs_get_str(handle, key, nullptr, &length) != ESP_OK || length == 0 || length > maximum + 1) {
        output.clear();
        return false;
    }
    std::vector<char> buffer(length);
    if (nvs_get_str(handle, key, buffer.data(), &length) != ESP_OK) return false;
    output.assign(buffer.data());
    return true;
}

bool json_string(cJSON *object, const char *key, std::string &output, size_t maximum = 512)
{
    cJSON *item = cJSON_GetObjectItemCaseSensitive(object, key);
    if (!cJSON_IsString(item) || item->valuestring == nullptr ||
        std::strlen(item->valuestring) > maximum) {
        return false;
    }
    output = item->valuestring;
    return true;
}

std::string json_error(const std::string &body)
{
    Json root(cJSON_ParseWithLength(body.data(), body.size()), cJSON_Delete);
    std::string error;
    return root && json_string(root.get(), "error", error, 80) ? error : std::string{};
}

std::string json_print(cJSON *value)
{
    char *printed = cJSON_PrintUnformatted(value);
    if (printed == nullptr) return {};
    std::string result(printed);
    cJSON_free(printed);
    return result;
}

bool valid_flash_snapshot(const std::string &body, uint32_t expected_revision)
{
    Json root(cJSON_ParseWithLength(body.data(), body.size()), cJSON_Delete);
    if (!root || !cJSON_IsObject(root.get())) return false;
    cJSON *schema = cJSON_GetObjectItemCaseSensitive(root.get(), "schemaVersion");
    cJSON *revision = cJSON_GetObjectItemCaseSensitive(root.get(), "revision");
    cJSON *sections = cJSON_GetObjectItemCaseSensitive(root.get(), "sections");
    if (!cJSON_IsNumber(schema) || schema->valueint != 1 || !cJSON_IsNumber(revision) ||
        revision->valuedouble < 0 || static_cast<uint32_t>(revision->valuedouble) != expected_revision ||
        !cJSON_IsArray(sections) || cJSON_GetArraySize(sections) > 50) {
        return false;
    }
    size_t total_cards = 0;
    cJSON *section = nullptr;
    cJSON_ArrayForEach(section, sections) {
        std::string ignored;
        cJSON *cards = cJSON_GetObjectItemCaseSensitive(section, "cards");
        if (!cJSON_IsObject(section) || !json_string(section, "id", ignored, 128) ||
            !json_string(section, "title", ignored, 100) || !cJSON_IsArray(cards) ||
            cJSON_GetArraySize(cards) > 100) {
            return false;
        }
        total_cards += static_cast<size_t>(cJSON_GetArraySize(cards));
        if (total_cards > 2500) return false;
        cJSON *card = nullptr;
        cJSON_ArrayForEach(card, cards) {
            if (!cJSON_IsObject(card) || !json_string(card, "id", ignored, 128) ||
                !json_string(card, "front", ignored, 500) ||
                !json_string(card, "back", ignored, 800)) {
                return false;
            }
            cJSON *clue = cJSON_GetObjectItemCaseSensitive(card, "clue");
            if (clue != nullptr && !cJSON_IsNull(clue) &&
                (!cJSON_IsString(clue) || clue->valuestring == nullptr ||
                 std::strlen(clue->valuestring) > 800)) {
                return false;
            }
        }
    }
    return true;
}

void start_sntp_if_needed()
{
    if (esp_sntp_enabled()) return;
    esp_sntp_setoperatingmode(SNTP_OPMODE_POLL);
    esp_sntp_setservername(0, "time.cloudflare.com");
    esp_sntp_init();
}

bool ensure_trustworthy_time()
{
    start_sntp_if_needed();
    for (int attempt = 0; attempt < 40; ++attempt) {
        if (std::time(nullptr) >= kMinimumTrustedUnixTime) return true;
        vTaskDelay(pdMS_TO_TICKS(250));
    }
    return false;
}

} // namespace

struct Service::Credentials {
    std::string device_id;
    std::string token;
    std::string poll_secret;
    std::string pairing_id;
    std::string pairing_code;
    std::string claim_url;
    std::string child_id;
    std::string child_name;
    std::string child_slug;
    std::string device_name;
    uint32_t flash_revision = 0;
    int64_t last_successful_sync_unix = 0;
    bool paired = false;
};

struct Service::HttpResponse {
    int status = 0;
    esp_err_t transport = ESP_FAIL;
    bool overflow = false;
    size_t maximum_body = 0;
    std::string body;
    std::string etag;
};

namespace {

esp_err_t http_event(esp_http_client_event_t *event)
{
    auto *response = static_cast<Service::HttpResponse *>(event->user_data);
    if (response == nullptr) return ESP_FAIL;
    if (event->event_id == HTTP_EVENT_ON_HEADER && event->header_key != nullptr &&
        event->header_value != nullptr && strcasecmp(event->header_key, "ETag") == 0) {
        response->etag = event->header_value;
    }
    if (event->event_id == HTTP_EVENT_ON_DATA && event->data != nullptr && event->data_len > 0) {
        const auto *bytes = static_cast<const char *>(event->data);
        const size_t incoming = static_cast<size_t>(event->data_len);
        if (incoming > response->maximum_body ||
            response->body.size() > response->maximum_body - incoming) {
            response->overflow = true;
            return ESP_ERR_NO_MEM;
        }
        response->body.append(bytes, incoming);
    }
    return ESP_OK;
}

} // namespace

Service::Service(storage::Store &store, Config config)
    : store_(store), config_(std::move(config)), credentials_(new Credentials())
{
}

esp_err_t Service::start()
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (started_) return ESP_OK;
    if (config_.base_url.empty() || config_.base_url.rfind("https://", 0) != 0 ||
        (config_.hardware_revision != "rev3" && config_.hardware_revision != "rev1_3")) {
        return ESP_ERR_INVALID_ARG;
    }
    commands_ = xQueueCreate(8, sizeof(Command));
    if (commands_ == nullptr) return ESP_ERR_NO_MEM;
    if (!load_credentials() || !ensure_device_identity(false)) return ESP_FAIL;
    snapshot_.paired = credentials_->paired;
    snapshot_.pairing_code = credentials_->pairing_code;
    snapshot_.claim_url = credentials_->claim_url;
    snapshot_.child_name = credentials_->child_name;
    snapshot_.child_slug = credentials_->child_slug;
    snapshot_.device_name = credentials_->device_name;
    snapshot_.content_revision = credentials_->flash_revision;
    snapshot_.last_successful_sync_unix = credentials_->last_successful_sync_unix;
    snapshot_.device_id_suffix =
        credentials_->device_id.size() > 6
            ? credentials_->device_id.substr(credentials_->device_id.size() - 6)
            : credentials_->device_id;
    snapshot_.state = credentials_->paired
                          ? State::kPairedOffline
                          : credentials_->pairing_id.empty() ? State::kUnpaired : State::kPairing;
    refresh_queue_count();
    started_ = true;
    if (xTaskCreate(task_entry, "buddy_sync", 16384, this, 5, nullptr) != pdPASS) {
        started_ = false;
        return ESP_ERR_NO_MEM;
    }
    return ESP_OK;
}

void Service::set_online(bool online)
{
    bool changed = false;
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        changed = snapshot_.online != online;
        snapshot_.online = online;
        if (!online && credentials_->paired && snapshot_.state != State::kPairingRequired) {
            publish(State::kPairedOffline);
        }
    }
    if (changed) (void)enqueue(Command::kNetworkChanged);
}

esp_err_t Service::request_pairing() { return enqueue(Command::kPair); }
esp_err_t Service::request_sync() { return enqueue(Command::kSync); }

Snapshot Service::snapshot() const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    return snapshot_;
}

esp_err_t Service::enqueue(Command command)
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!started_ || commands_ == nullptr) return ESP_ERR_INVALID_STATE;
    return xQueueSend(static_cast<QueueHandle_t>(commands_), &command, 0) == pdTRUE ? ESP_OK
                                                                                   : ESP_ERR_TIMEOUT;
}

void Service::task_entry(void *context)
{
    static_cast<Service *>(context)->task_loop();
}

void Service::task_loop()
{
    int64_t last_sync_ms = -kPeriodicSyncMs;
    while (true) {
        const Snapshot before = snapshot();
        Command command{};
        const TickType_t wait = before.state == State::kPairing && before.online
                                    ? kPairPollTicks
                                    : kIdlePollTicks;
        const bool received =
            xQueueReceive(static_cast<QueueHandle_t>(commands_), &command, wait) == pdTRUE;
        const Snapshot current = snapshot();
        if (received && command == Command::kPair) {
            if (!current.online) publish(State::kError, "Connect to Wi-Fi before pairing");
            else (void)create_pairing();
            continue;
        }
        if (!current.online) continue;
        if (!credentials_->pairing_id.empty() && !credentials_->paired) {
            (void)poll_pairing();
            continue;
        }
        const int64_t now_ms = static_cast<int64_t>(xTaskGetTickCount()) * portTICK_PERIOD_MS;
        if (credentials_->paired &&
            ((received && (command == Command::kSync || command == Command::kNetworkChanged)) ||
             now_ms - last_sync_ms >= kPeriodicSyncMs)) {
            if (synchronize()) last_sync_ms = now_ms;
        }
    }
}

bool Service::load_credentials()
{
    nvs_handle_t handle = 0;
    const esp_err_t open = nvs_open(kNamespace, NVS_READONLY, &handle);
    if (open == ESP_ERR_NVS_NOT_FOUND) return true;
    if (open != ESP_OK) return false;
    nvs_read_string(handle, "device_id", credentials_->device_id, 36);
    nvs_read_string(handle, "token", credentials_->token, 128);
    nvs_read_string(handle, "poll", credentials_->poll_secret, 64);
    nvs_read_string(handle, "pair_id", credentials_->pairing_id, 128);
    nvs_read_string(handle, "pair_code", credentials_->pairing_code, 8);
    nvs_read_string(handle, "claim_url", credentials_->claim_url, 512);
    nvs_read_string(handle, "child_id", credentials_->child_id, 128);
    nvs_read_string(handle, "child_name", credentials_->child_name, 80);
    nvs_read_string(handle, "child_slug", credentials_->child_slug, 100);
    nvs_read_string(handle, "device_name", credentials_->device_name, 80);
    uint8_t paired = 0;
    uint32_t revision = 0;
    (void)nvs_get_u8(handle, "paired", &paired);
    (void)nvs_get_u32(handle, "flash_rev", &revision);
    (void)nvs_get_i64(handle, "last_sync", &credentials_->last_successful_sync_unix);
    credentials_->paired = paired == 1;
    credentials_->flash_revision = revision;
    nvs_close(handle);
    return true;
}

bool Service::save_credentials()
{
    nvs_handle_t handle = 0;
    if (nvs_open(kNamespace, NVS_READWRITE, &handle) != ESP_OK ||
        nvs_erase_all(handle) != ESP_OK) {
        if (handle != 0) nvs_close(handle);
        return false;
    }
    esp_err_t result = nvs_set_str(handle, "device_id", credentials_->device_id.c_str());
    const auto write_string = [&](const char *key, const std::string &value) {
        if (result == ESP_OK && !value.empty()) result = nvs_set_str(handle, key, value.c_str());
    };
    write_string("token", credentials_->token);
    write_string("poll", credentials_->poll_secret);
    write_string("pair_id", credentials_->pairing_id);
    write_string("pair_code", credentials_->pairing_code);
    write_string("claim_url", credentials_->claim_url);
    write_string("child_id", credentials_->child_id);
    write_string("child_name", credentials_->child_name);
    write_string("child_slug", credentials_->child_slug);
    write_string("device_name", credentials_->device_name);
    if (result == ESP_OK) result = nvs_set_u8(handle, "paired", credentials_->paired ? 1 : 0);
    if (result == ESP_OK) result = nvs_set_u32(handle, "flash_rev", credentials_->flash_revision);
    if (result == ESP_OK && credentials_->last_successful_sync_unix > 0) {
        result = nvs_set_i64(handle, "last_sync", credentials_->last_successful_sync_unix);
    }
    if (result == ESP_OK) result = nvs_commit(handle);
    nvs_close(handle);
    return result == ESP_OK;
}

bool Service::ensure_device_identity(bool rotate_token)
{
    if (credentials_->device_id.empty()) credentials_->device_id = random_uuid();
    if (rotate_token || credentials_->token.empty()) {
        credentials_->token = "bbdev_v1_" + random_secret(32);
        credentials_->poll_secret = random_secret(32);
    }
    return save_credentials();
}

bool Service::create_pairing()
{
    if (!ensure_device_identity(true)) {
        publish(State::kError, "Could not save device identity");
        return false;
    }
    if (!ensure_trustworthy_time()) {
        publish(State::kRetrying, "Could not set the clock securely");
        return false;
    }
    Json body(cJSON_CreateObject(), cJSON_Delete);
    cJSON_AddStringToObject(body.get(), "deviceId", credentials_->device_id.c_str());
    cJSON_AddStringToObject(body.get(), "tokenHash", sha256_hex(credentials_->token).c_str());
    cJSON_AddStringToObject(body.get(), "pollSecretHash",
                           sha256_hex(credentials_->poll_secret).c_str());
    cJSON_AddStringToObject(body.get(), "hardwareModel",
                           "waveshare-esp32-p4-wifi6-touch-lcd-4.3");
    cJSON_AddStringToObject(body.get(), "hardwareRevision", config_.hardware_revision.c_str());
    cJSON_AddStringToObject(body.get(), "firmwareVersion", config_.firmware_version.c_str());
    cJSON_AddNumberToObject(body.get(), "apiVersion", 1);
    const HttpResponse response = request("/api/device/v1/pairings", "POST", json_print(body.get()),
                                          {}, {}, kPairingResponseLimit);
    if (response.transport != ESP_OK || response.status != 201) {
        publish(State::kRetrying, json_error(response.body).empty() ? "Pairing request failed"
                                                                    : json_error(response.body));
        return false;
    }
    Json root(cJSON_ParseWithLength(response.body.data(), response.body.size()), cJSON_Delete);
    if (!root || !json_string(root.get(), "pairingId", credentials_->pairing_id, 128) ||
        !json_string(root.get(), "code", credentials_->pairing_code, 8) ||
        !json_string(root.get(), "claimUrl", credentials_->claim_url, 512)) {
        publish(State::kError, "Pairing response was invalid");
        return false;
    }
    credentials_->paired = false;
    credentials_->child_id.clear();
    credentials_->child_name.clear();
    credentials_->child_slug.clear();
    credentials_->device_name.clear();
    if (!save_credentials()) {
        publish(State::kError, "Could not retain pairing request");
        return false;
    }
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.paired = false;
        snapshot_.pairing_code = credentials_->pairing_code;
        snapshot_.claim_url = credentials_->claim_url;
    }
    publish(State::kPairing);
    return true;
}

bool Service::poll_pairing()
{
    if (!ensure_trustworthy_time()) {
        publish(State::kRetrying, "Could not set the clock securely");
        return false;
    }
    const HttpResponse response =
        request("/api/device/v1/pairings/" + credentials_->pairing_id, "GET", {},
                "Pairing " + credentials_->poll_secret, {}, kPairingResponseLimit);
    if (response.transport != ESP_OK || response.status != 200) return false;
    Json root(cJSON_ParseWithLength(response.body.data(), response.body.size()), cJSON_Delete);
    std::string status;
    if (!root || !json_string(root.get(), "status", status, 16)) return false;
    if (status == "pending") return true;
    if (status != "claimed") {
        credentials_->pairing_id.clear();
        credentials_->pairing_code.clear();
        credentials_->claim_url.clear();
        credentials_->poll_secret.clear();
        (void)save_credentials();
        publish(State::kUnpaired, status == "expired" ? "Pairing code expired" : "Pairing cancelled");
        return false;
    }
    cJSON *child = cJSON_GetObjectItemCaseSensitive(root.get(), "child");
    cJSON *device = cJSON_GetObjectItemCaseSensitive(root.get(), "device");
    if (!cJSON_IsObject(child) || !json_string(child, "id", credentials_->child_id, 128) ||
        !json_string(child, "displayName", credentials_->child_name, 80) ||
        !json_string(child, "slug", credentials_->child_slug, 100) ||
        !cJSON_IsObject(device) ||
        !json_string(device, "name", credentials_->device_name, 80)) {
        publish(State::kError, "Pairing claim omitted the child profile");
        return false;
    }
    credentials_->paired = true;
    credentials_->pairing_id.clear();
    credentials_->pairing_code.clear();
    credentials_->claim_url.clear();
    credentials_->poll_secret.clear();
    if (!save_credentials()) return false;
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.paired = true;
        snapshot_.pairing_code.clear();
        snapshot_.claim_url.clear();
        snapshot_.child_name = credentials_->child_name;
        snapshot_.child_slug = credentials_->child_slug;
        snapshot_.device_name = credentials_->device_name;
    }
    publish(State::kSyncing);
    return synchronize();
}

bool Service::synchronize()
{
    if (!snapshot().online || !credentials_->paired) return false;
    publish(State::kSyncing);
    if (!ensure_trustworthy_time()) {
        publish(State::kRetrying, "Could not set the clock securely");
        return false;
    }
    if (!flush_outbox()) return false;
    uint32_t server_revision = credentials_->flash_revision;
    if (!pull_bootstrap(server_revision) || !pull_flash_cards(server_revision)) return false;
    const int64_t now_ms = static_cast<int64_t>(xTaskGetTickCount()) * portTICK_PERIOD_MS;
    if (now_ms - last_firmware_check_ms_ >= 24LL * 60 * 60 * 1000) {
        if (!pull_firmware_policy()) return false;
        last_firmware_check_ms_ = now_ms;
    }
    refresh_queue_count();
    credentials_->last_successful_sync_unix = static_cast<int64_t>(std::time(nullptr));
    if (!save_credentials()) {
        publish(State::kError, "Could not retain the last sync time");
        return false;
    }
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.last_successful_sync_unix = credentials_->last_successful_sync_unix;
    }
    publish(State::kReady);
    return true;
}

bool Service::flush_outbox()
{
    std::vector<std::string> events;
    if (store_.list_outbox(events) != storage::Result::kOk) {
        publish(State::kError, "Could not read the activity queue");
        return false;
    }
    for (const std::string &event_id : events) {
        storage::Record record{};
        if (store_.read("outbox/" + event_id + ".json", 1, record) != storage::Result::kOk) {
            (void)store_.quarantine(event_id);
            continue;
        }
        const std::string envelope(record.payload.begin(), record.payload.end());
        Json root(cJSON_ParseWithLength(envelope.data(), envelope.size()), cJSON_Delete);
        cJSON *type = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "eventType") : nullptr;
        cJSON *body = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "body") : nullptr;
        if (!cJSON_IsString(type) || type->valuestring == nullptr || !cJSON_IsObject(body)) {
            (void)store_.quarantine(event_id);
            continue;
        }
        const std::string path = std::strcmp(type->valuestring, "multiplication_session") == 0
                                     ? "/api/device/v1/multiplication/sessions"
                                     : std::strcmp(type->valuestring, "flash_card_session") == 0
                                           ? "/api/device/v1/flash-card-sessions"
                                           : std::string{};
        if (path.empty()) {
            (void)store_.quarantine(event_id);
            continue;
        }
        const HttpResponse response = request(path, "POST", json_print(body),
                                              "Bearer " + credentials_->token, {}, 512 * 1024);
        const std::string error = json_error(response.body);
        switch (domain::classify_http_result(response.status, error)) {
        case domain::RetryAction::kSuccess:
            (void)store_.acknowledge(event_id);
            break;
        case domain::RetryAction::kRepair:
            purge_child_state(error.empty() ? "Pairing is no longer authorized" : error);
            return false;
        case domain::RetryAction::kMandatoryUpdate:
            // Activity upload is intentionally first in the sync protocol. If
            // the server has raised its firmware floor, fetch the authenticated
            // exact-profile manifest now so the update screen has everything
            // it needs even though the queued event remains untouched.
            (void)pull_firmware_policy();
            publish(State::kMandatoryUpdate, "A firmware update is required");
            return false;
        case domain::RetryAction::kRetry:
            publish(State::kRetrying, error.empty() ? "Activity sync will retry" : error);
            return false;
        case domain::RetryAction::kQuarantine:
            (void)store_.quarantine(event_id);
            break;
        }
    }
    refresh_queue_count();
    return true;
}

bool Service::pull_bootstrap(uint32_t &server_revision)
{
    const HttpResponse response = request("/api/device/v1/bootstrap", "GET", {},
                                          "Bearer " + credentials_->token, {}, 512 * 1024);
    const std::string error = json_error(response.body);
    const auto action = domain::classify_http_result(response.status, error);
    if (action == domain::RetryAction::kRepair) {
        purge_child_state(error.empty() ? "Pairing is no longer authorized" : error);
        return false;
    }
    if (action != domain::RetryAction::kSuccess) {
        if (action == domain::RetryAction::kMandatoryUpdate) {
            (void)pull_firmware_policy();
        }
        publish(action == domain::RetryAction::kMandatoryUpdate ? State::kMandatoryUpdate
                                                                : State::kRetrying,
                error.empty() ? "Bootstrap sync failed" : error);
        return false;
    }
    Json root(cJSON_ParseWithLength(response.body.data(), response.body.size()), cJSON_Delete);
    cJSON *content = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "content") : nullptr;
    cJSON *revision = content ? cJSON_GetObjectItemCaseSensitive(content, "flashCardsRevision")
                              : nullptr;
    cJSON *child = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "child") : nullptr;
    cJSON *device = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "device") : nullptr;
    if (!root || !cJSON_IsNumber(revision) || revision->valuedouble < 0 || !cJSON_IsObject(child) ||
        !json_string(child, "displayName", credentials_->child_name, 80) ||
        !json_string(child, "slug", credentials_->child_slug, 100) ||
        !cJSON_IsObject(device) ||
        !json_string(device, "name", credentials_->device_name, 80)) {
        publish(State::kError, "Bootstrap response was invalid");
        return false;
    }
    server_revision = static_cast<uint32_t>(revision->valuedouble);
    const std::vector<uint8_t> payload(response.body.begin(), response.body.end());
    if (store_.write_atomic("content/bootstrap.json", 1, payload) != storage::Result::kOk) {
        publish(State::kError, "Could not retain mastery/bootstrap data");
        return false;
    }
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.child_name = credentials_->child_name;
        snapshot_.child_slug = credentials_->child_slug;
        snapshot_.device_name = credentials_->device_name;
    }
    return save_credentials();
}

bool Service::pull_flash_cards(uint32_t server_revision)
{
    if (server_revision == credentials_->flash_revision) return true;
    const std::string etag = credentials_->flash_revision == 0
                                 ? std::string{}
                                 : "\"flash-cards-r" + std::to_string(credentials_->flash_revision) + "\"";
    const HttpResponse response = request("/api/device/v1/flash-card-sections", "GET", {},
                                          "Bearer " + credentials_->token, etag);
    if (response.status == 304) return true;
    const std::string error = json_error(response.body);
    const auto action = domain::classify_http_result(response.status, error);
    if (action == domain::RetryAction::kRepair) {
        purge_child_state(error.empty() ? "Pairing is no longer authorized" : error);
        return false;
    }
    if (action != domain::RetryAction::kSuccess ||
        !valid_flash_snapshot(response.body, server_revision)) {
        publish(State::kRetrying, error.empty() ? "Flash-card sync failed validation" : error);
        return false;
    }
    const std::vector<uint8_t> payload(response.body.begin(), response.body.end());
    if (store_.write_atomic("content/flash-cards.json", 1, payload) != storage::Result::kOk) {
        publish(State::kError, "Could not retain flash-card content");
        return false;
    }
    credentials_->flash_revision = server_revision;
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.content_revision = server_revision;
    }
    return save_credentials();
}

bool Service::pull_firmware_policy()
{
    const HttpResponse response = request("/api/device/v1/firmware", "GET", {},
                                          "Bearer " + credentials_->token, {}, 32 * 1024);
    const std::string error = json_error(response.body);
    const auto action = domain::classify_http_result(response.status, error);
    if (action == domain::RetryAction::kRepair) {
        purge_child_state(error.empty() ? "Pairing is no longer authorized" : error);
        return false;
    }
    if (action != domain::RetryAction::kSuccess) {
        publish(action == domain::RetryAction::kMandatoryUpdate ? State::kMandatoryUpdate
                                                                : State::kRetrying,
                error.empty() ? "Firmware policy check failed" : error);
        return false;
    }
    Json root(cJSON_ParseWithLength(response.body.data(), response.body.size()), cJSON_Delete);
    std::string profile;
    std::string version;
    std::string minimum;
    cJSON *schema = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "schemaVersion") : nullptr;
    cJSON *update = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "updateAvailable") : nullptr;
    cJSON *mandatory = root ? cJSON_GetObjectItemCaseSensitive(root.get(), "mandatory") : nullptr;
    if (!root || !cJSON_IsNumber(schema) || schema->valueint != 1 ||
        !json_string(root.get(), "hardwareProfile", profile, 80) ||
        !json_string(root.get(), "version", version, 64) ||
        !json_string(root.get(), "minimumVersion", minimum, 64) || !cJSON_IsBool(update) ||
        !cJSON_IsBool(mandatory)) {
        publish(State::kError, "Firmware policy response was invalid");
        return false;
    }
    std::string url;
    std::string digest;
    std::string notes;
    size_t size = 0;
    if (cJSON_IsTrue(update)) {
        cJSON *size_item = cJSON_GetObjectItemCaseSensitive(root.get(), "size");
        if (!json_string(root.get(), "url", url, 1024) ||
            !json_string(root.get(), "sha256", digest, 64) || !cJSON_IsNumber(size_item) ||
            size_item->valuedouble <= 0 || size_item->valuedouble > 7 * 1024 * 1024) {
            publish(State::kError, "Firmware update manifest was incomplete");
            return false;
        }
        size = static_cast<size_t>(size_item->valuedouble);
        cJSON *notes_item = cJSON_GetObjectItemCaseSensitive(root.get(), "releaseNotes");
        if (cJSON_IsString(notes_item) && notes_item->valuestring != nullptr &&
            std::strlen(notes_item->valuestring) <= 1000) {
            notes = notes_item->valuestring;
        }
    }
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.firmware_update_available = cJSON_IsTrue(update);
        snapshot_.firmware_mandatory = cJSON_IsTrue(mandatory);
        snapshot_.firmware_hardware_profile = std::move(profile);
        snapshot_.firmware_version = std::move(version);
        snapshot_.firmware_minimum_version = std::move(minimum);
        snapshot_.firmware_url = std::move(url);
        snapshot_.firmware_sha256 = std::move(digest);
        snapshot_.firmware_release_notes = std::move(notes);
        snapshot_.firmware_size = size;
    }
    return true;
}

void Service::purge_child_state(const std::string &reason)
{
    for (const char *path : {"content/bootstrap.json", "content/flash-cards.json",
                             "content/mastery.json", "sessions/multiplication-active.json",
                             "sessions/flash-card-active.json"}) {
        (void)store_.remove(path);
    }
    std::vector<std::string> events;
    if (store_.list_outbox(events) == storage::Result::kOk) {
        for (const auto &event : events) (void)store_.acknowledge(event);
    }
    const std::string device_id = credentials_->device_id;
    *credentials_ = Credentials{};
    credentials_->device_id = device_id;
    (void)ensure_device_identity(true);
    {
        std::lock_guard<std::recursive_mutex> guard(mutex_);
        snapshot_.paired = false;
        snapshot_.pairing_code.clear();
        snapshot_.claim_url.clear();
        snapshot_.child_name.clear();
        snapshot_.child_slug.clear();
        snapshot_.device_name.clear();
        snapshot_.content_revision = 0;
        snapshot_.queued_events = 0;
    }
    publish(State::kPairingRequired, reason);
}

Service::HttpResponse Service::request(const std::string &path, const char *method,
                                       const std::string &body,
                                       const std::string &authorization,
                                       const std::string &etag, size_t maximum_body)
{
    HttpResponse response{};
    response.maximum_body = maximum_body;
    const std::string url = config_.base_url + path;
    esp_http_client_config_t client_config{};
    client_config.url = url.c_str();
    client_config.event_handler = http_event;
    client_config.user_data = &response;
    client_config.crt_bundle_attach = esp_crt_bundle_attach;
    client_config.timeout_ms = 10000;
    client_config.buffer_size = 4096;
    client_config.buffer_size_tx = 4096;
    client_config.keep_alive_enable = true;
    esp_http_client_handle_t client = esp_http_client_init(&client_config);
    if (client == nullptr) return response;
    if (std::strcmp(method, "POST") == 0) {
        (void)esp_http_client_set_method(client, HTTP_METHOD_POST);
        (void)esp_http_client_set_header(client, "Content-Type", "application/json");
        (void)esp_http_client_set_post_field(client, body.data(), static_cast<int>(body.size()));
    }
    (void)esp_http_client_set_header(client, "Accept", "application/json");
    (void)esp_http_client_set_header(client, "X-Buddy-Blocks-Device-ID",
                                     credentials_->device_id.c_str());
    (void)esp_http_client_set_header(client, "X-Buddy-Blocks-Firmware",
                                     config_.firmware_version.c_str());
    if (!authorization.empty()) {
        (void)esp_http_client_set_header(client, "Authorization", authorization.c_str());
    }
    if (!etag.empty()) (void)esp_http_client_set_header(client, "If-None-Match", etag.c_str());
    response.body.reserve(std::min<size_t>(maximum_body, 64 * 1024));
    response.transport = esp_http_client_perform(client);
    response.status = esp_http_client_get_status_code(client);
    if (response.overflow || response.body.size() > maximum_body) {
        response.body.clear();
        response.overflow = true;
        response.transport = ESP_ERR_NO_MEM;
    }
    esp_http_client_cleanup(client);
    return response;
}

void Service::publish(State state, const std::string &error)
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    snapshot_.state = state;
    snapshot_.last_error = error;
    ++snapshot_.revision;
}

void Service::refresh_queue_count()
{
    std::vector<std::string> events;
    const size_t count = store_.list_outbox(events) == storage::Result::kOk ? events.size() : 0;
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    snapshot_.queued_events = count;
    ++snapshot_.revision;
}

} // namespace buddy::sync
