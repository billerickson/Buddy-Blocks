#include "buddy_ota.h"

#include <algorithm>
#include <array>
#include <cctype>
#include <cstring>
#include <vector>

#include "esp_app_desc.h"
#include "esp_check.h"
#include "esp_crt_bundle.h"
#include "esp_http_client.h"
#include "esp_log.h"
#include "esp_ota_ops.h"
#include "esp_partition.h"
#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/task.h"
#include "mbedtls/sha256.h"

namespace buddy::ota {
namespace {

constexpr char kTag[] = "buddy_ota";
constexpr size_t kMaximumImageBytes = 7U * 1024U * 1024U;
constexpr size_t kReadBufferBytes = 8192;
constexpr int64_t kMaximumDownloadDurationUs = 15LL * 60 * 1000 * 1000;

bool valid_sha256(const std::string &value)
{
    return value.size() == 64 && std::all_of(value.begin(), value.end(), [](unsigned char item) {
               return std::isxdigit(item) != 0;
           });
}

std::string to_hex(const unsigned char *digest, size_t size)
{
    static constexpr char alphabet[] = "0123456789abcdef";
    std::string output(size * 2, '0');
    for (size_t index = 0; index < size; ++index) {
        output[index * 2] = alphabet[digest[index] >> 4];
        output[index * 2 + 1] = alphabet[digest[index] & 0x0fU];
    }
    return output;
}

bool same_digest(const std::string &left, const std::string &right)
{
    if (left.size() != right.size()) return false;
    unsigned char difference = 0;
    for (size_t index = 0; index < left.size(); ++index) {
        const auto left_byte = static_cast<unsigned char>(left[index]);
        const auto right_byte = static_cast<unsigned char>(right[index]);
        difference |= static_cast<unsigned char>(std::tolower(left_byte) ^
                                                 std::tolower(right_byte));
    }
    return difference == 0;
}

} // namespace

Service::Service(std::string hardware_profile) : hardware_profile_(std::move(hardware_profile)) {}

esp_err_t Service::start()
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (started_) return ESP_OK;
    commands_ = xQueueCreate(1, sizeof(uint8_t));
    if (commands_ == nullptr) return ESP_ERR_NO_MEM;
    started_ = xTaskCreate(task_entry, "buddy_ota", 12288, this, 5, nullptr) == pdPASS;
    return started_ ? ESP_OK : ESP_ERR_NO_MEM;
}

void Service::set_manifest(const Manifest &manifest)
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (manifest.hardware_profile != hardware_profile_) {
        snapshot_.manifest = {};
        publish(State::kError, "Firmware profile does not match this board");
        return;
    }
    snapshot_.manifest = manifest;
    publish(manifest.url.empty() ? State::kIdle : State::kAvailable);
}

void Service::set_install_blockers(bool timed_session, bool unsaved_session, bool stable_power)
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    timed_session_ = timed_session;
    unsaved_session_ = unsaved_session;
    stable_power_ = stable_power;
}

esp_err_t Service::request_install()
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    if (!started_ || commands_ == nullptr) return ESP_ERR_INVALID_STATE;
    if (timed_session_ || unsaved_session_ || !stable_power_) {
        publish(State::kBlocked, timed_session_ ? "Finish the timed session before updating"
                                                : unsaved_session_
                                                      ? "Save or sync the active session first"
                                                      : "Connect stable USB power before updating");
        return ESP_ERR_INVALID_STATE;
    }
    const uint8_t command = 1;
    return xQueueSend(static_cast<QueueHandle_t>(commands_), &command, 0) == pdTRUE
               ? ESP_OK
               : ESP_ERR_TIMEOUT;
}

esp_err_t Service::confirm_running_image_healthy(bool all_health_checks_passed)
{
    const esp_partition_t *running = esp_ota_get_running_partition();
    if (running == nullptr) return ESP_ERR_NOT_FOUND;
    esp_ota_img_states_t state{};
    const esp_err_t result = esp_ota_get_state_partition(running, &state);
    if (result == ESP_ERR_NOT_SUPPORTED || (result == ESP_OK && state != ESP_OTA_IMG_PENDING_VERIFY)) {
        return ESP_OK;
    }
    ESP_RETURN_ON_ERROR(result, kTag, "Could not read running OTA state");
    if (!all_health_checks_passed) {
        ESP_LOGE(kTag, "First-boot health checks failed; requesting automatic rollback");
        return esp_ota_mark_app_invalid_rollback_and_reboot();
    }
    return esp_ota_mark_app_valid_cancel_rollback();
}

Snapshot Service::snapshot() const
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    return snapshot_;
}

void Service::task_entry(void *context) { static_cast<Service *>(context)->task_loop(); }

void Service::task_loop()
{
    uint8_t command = 0;
    while (true) {
        if (xQueueReceive(static_cast<QueueHandle_t>(commands_), &command, portMAX_DELAY) == pdTRUE) {
            (void)install();
        }
    }
}

bool Service::install()
{
    const Snapshot before = snapshot();
    const Manifest manifest = before.manifest;
    const esp_partition_t *partition = esp_ota_get_next_update_partition(nullptr);
    if (manifest.hardware_profile != hardware_profile_ || manifest.url.rfind("https://", 0) != 0 ||
        !valid_sha256(manifest.sha256) || manifest.size == 0 ||
        manifest.size > kMaximumImageBytes || partition == nullptr || manifest.size > partition->size) {
        publish(State::kError, "Firmware manifest failed validation");
        return false;
    }

    esp_http_client_config_t config{};
    config.url = manifest.url.c_str();
    config.crt_bundle_attach = esp_crt_bundle_attach;
    config.timeout_ms = 15000;
    config.buffer_size = kReadBufferBytes;
    config.keep_alive_enable = true;
    esp_http_client_handle_t http = esp_http_client_init(&config);
    if (http == nullptr || esp_http_client_open(http, 0) != ESP_OK) {
        if (http != nullptr) esp_http_client_cleanup(http);
        publish(State::kError, "Could not open the verified firmware download");
        return false;
    }
    const int64_t content_length = esp_http_client_fetch_headers(http);
    const int status = esp_http_client_get_status_code(http);
    if (status != 200 || (content_length >= 0 &&
                          static_cast<size_t>(content_length) != manifest.size)) {
        esp_http_client_close(http);
        esp_http_client_cleanup(http);
        publish(State::kError, "Firmware server returned an unexpected image");
        return false;
    }

    esp_ota_handle_t ota_handle = 0;
    if (esp_ota_begin(partition, manifest.size, &ota_handle) != ESP_OK) {
        esp_http_client_close(http);
        esp_http_client_cleanup(http);
        publish(State::kError, "Could not prepare the inactive OTA slot");
        return false;
    }
    mbedtls_sha256_context sha{};
    mbedtls_sha256_init(&sha);
    mbedtls_sha256_starts(&sha, 0);
    std::vector<char> buffer(kReadBufferBytes);
    size_t total = 0;
    bool failed = false;
    bool timed_out = false;
    const int64_t download_started_us = esp_timer_get_time();
    publish(State::kDownloading);
    while (total < manifest.size) {
        if (esp_timer_get_time() - download_started_us > kMaximumDownloadDurationUs) {
            failed = true;
            timed_out = true;
            break;
        }
        const int read = esp_http_client_read(
            http, buffer.data(), static_cast<int>(std::min(buffer.size(), manifest.size - total)));
        if (read <= 0) {
            failed = true;
            break;
        }
        if (esp_ota_write(ota_handle, buffer.data(), static_cast<size_t>(read)) != ESP_OK) {
            failed = true;
            break;
        }
        mbedtls_sha256_update(&sha, reinterpret_cast<const unsigned char *>(buffer.data()),
                              static_cast<size_t>(read));
        total += static_cast<size_t>(read);
        publish(State::kDownloading, {}, total);
    }
    esp_http_client_close(http);
    esp_http_client_cleanup(http);
    std::array<unsigned char, 32> digest{};
    mbedtls_sha256_finish(&sha, digest.data());
    mbedtls_sha256_free(&sha);
    if (failed || total != manifest.size || !same_digest(to_hex(digest.data(), digest.size()),
                                                         manifest.sha256)) {
        (void)esp_ota_abort(ota_handle);
        publish(State::kError, timed_out ? "Firmware download exceeded 15 minutes"
                                         : "Firmware size or SHA-256 did not match");
        return false;
    }
    publish(State::kVerifying, {}, total);
    if (esp_ota_end(ota_handle) != ESP_OK || esp_ota_set_boot_partition(partition) != ESP_OK) {
        publish(State::kError, "Firmware signature or image validation failed");
        return false;
    }
    publish(State::kRebootReady, "Update verified; restart to use it", total);
    return true;
}

void Service::publish(State state, const std::string &message, size_t downloaded)
{
    std::lock_guard<std::recursive_mutex> guard(mutex_);
    snapshot_.state = state;
    snapshot_.message = message;
    snapshot_.downloaded = downloaded;
    ++snapshot_.revision;
}

} // namespace buddy::ota
