#include "buddy_connectivity.h"

#include <algorithm>
#include <array>
#include <atomic>
#include <cstdio>
#include <cstring>
#include <string>
#include <vector>

#include "esp_check.h"
#include "esp_event.h"
#include "esp_http_client.h"
#include "esp_hosted.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_random.h"
#include "esp_wifi.h"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/semphr.h"
#include "freertos/task.h"
#include "nvs.h"
#include "sdkconfig.h"

namespace {

constexpr char kTag[] = "buddy_wifi";
constexpr char kNamespace[] = "buddy_wifi";
constexpr size_t kMaximumSaved = BUDDY_CONNECTIVITY_MAX_NETWORKS;
constexpr size_t kMaximumScanned = BUDDY_CONNECTIVITY_MAX_SCAN_RESULTS;
constexpr std::array<const char *, kMaximumSaved> kSsidKeys{
    "ssid0", "ssid1", "ssid2", "ssid3", "ssid4"};
constexpr std::array<const char *, kMaximumSaved> kPasswordKeys{
    "pass0", "pass1", "pass2", "pass3", "pass4"};
constexpr std::array<const char *, kMaximumSaved> kSecurityKeys{
    "sec0", "sec1", "sec2", "sec3", "sec4"};

struct SavedNetwork {
    std::string ssid;
    std::string password;
    buddy_wifi_security_t security = BUDDY_WIFI_WPA2_PERSONAL;
};

enum class CommandType : uint8_t { kScan, kConnect, kForget, kDisconnect };

struct Command {
    CommandType type = CommandType::kScan;
    char ssid[33]{};
    char password[65]{};
    bool save = false;
    bool hidden = false;
    bool automatic = false;
};

SemaphoreHandle_t s_lock = nullptr;
QueueHandle_t s_commands = nullptr;
esp_netif_t *s_station = nullptr;
std::vector<SavedNetwork> s_saved;
std::vector<buddy_wifi_network_t> s_scan_results;
buddy_connectivity_snapshot_t s_snapshot{};
SavedNetwork s_pending{};
bool s_pending_save = false;
std::atomic<bool> s_persist_pending{false};
bool s_initialized = false;
bool s_last_attempt_automatic = false;
bool s_retry_scheduled = false;
size_t s_next_saved_index = 0;
unsigned s_retry_cycle = 0;
TickType_t s_retry_at = 0;
TickType_t s_connect_deadline = 0;
bool s_ignore_next_disconnect = false;
TaskHandle_t s_probe_task = nullptr;

constexpr char kConnectivityCheckUrl[] = "http://cp.cloudflare.com/generate_204";

class LockGuard {
  public:
    LockGuard() { xSemaphoreTake(s_lock, portMAX_DELAY); }
    ~LockGuard() { xSemaphoreGive(s_lock); }
};

template <size_t Size> void copy_text(char (&destination)[Size], const char *source)
{
    const size_t length = std::min(std::strlen(source), Size - 1);
    std::memcpy(destination, source, length);
    destination[length] = '\0';
}

buddy_wifi_security_t security_for(wifi_auth_mode_t auth)
{
    switch (auth) {
    case WIFI_AUTH_OPEN: return BUDDY_WIFI_OPEN;
    case WIFI_AUTH_WPA3_PSK:
    case WIFI_AUTH_WPA2_WPA3_PSK: return BUDDY_WIFI_WPA3_PERSONAL;
    case WIFI_AUTH_WEP: return BUDDY_WIFI_UNSUPPORTED;
    case WIFI_AUTH_WPA_PSK:
    case WIFI_AUTH_WPA2_PSK:
    case WIFI_AUTH_WPA_WPA2_PSK: return BUDDY_WIFI_WPA2_PERSONAL;
    default: return BUDDY_WIFI_UNSUPPORTED;
    }
}

wifi_auth_mode_t auth_for(buddy_wifi_security_t security, bool has_password)
{
    if (!has_password || security == BUDDY_WIFI_OPEN) {
        return WIFI_AUTH_OPEN;
    }
    return security == BUDDY_WIFI_WPA3_PERSONAL ? WIFI_AUTH_WPA2_WPA3_PSK
                                                : WIFI_AUTH_WPA2_PSK;
}

bool authentication_failure(uint8_t reason)
{
    switch (reason) {
    case WIFI_REASON_AUTH_EXPIRE:
    case WIFI_REASON_AUTH_FAIL:
    case WIFI_REASON_4WAY_HANDSHAKE_TIMEOUT:
    case WIFI_REASON_HANDSHAKE_TIMEOUT:
        return true;
    default:
        return false;
    }
}

void bump_revision_locked()
{
    ++s_snapshot.revision;
    s_snapshot.saved_network_count = s_saved.size();
    s_snapshot.scan_result_count = s_scan_results.size();
}

bool is_saved_locked(const char *ssid)
{
    return std::any_of(s_saved.begin(), s_saved.end(), [ssid](const SavedNetwork &network) {
        return network.ssid == ssid;
    });
}

esp_err_t load_saved_networks()
{
    nvs_handle_t handle = 0;
    esp_err_t result = nvs_open(kNamespace, NVS_READONLY, &handle);
    if (result == ESP_ERR_NVS_NOT_FOUND) {
        return ESP_OK;
    }
    ESP_RETURN_ON_ERROR(result, kTag, "Could not open saved Wi-Fi records");
    uint8_t count = 0;
    result = nvs_get_u8(handle, "count", &count);
    if (result == ESP_ERR_NVS_NOT_FOUND) {
        nvs_close(handle);
        return ESP_OK;
    }
    if (result != ESP_OK) {
        nvs_close(handle);
        return result;
    }
    count = static_cast<uint8_t>(std::min<size_t>(count, kMaximumSaved));
    std::vector<SavedNetwork> loaded;
    for (uint8_t index = 0; index < count; ++index) {
        std::array<char, 33> ssid{};
        std::array<char, 65> password{};
        size_t ssid_size = ssid.size();
        size_t password_size = password.size();
        uint8_t security = BUDDY_WIFI_WPA2_PERSONAL;
        if (nvs_get_str(handle, kSsidKeys[index], ssid.data(), &ssid_size) != ESP_OK ||
            nvs_get_str(handle, kPasswordKeys[index], password.data(), &password_size) != ESP_OK ||
            nvs_get_u8(handle, kSecurityKeys[index], &security) != ESP_OK || ssid[0] == '\0') {
            continue;
        }
        loaded.push_back({ssid.data(), password.data(),
                          static_cast<buddy_wifi_security_t>(std::min<uint8_t>(
                              security, BUDDY_WIFI_UNSUPPORTED))});
    }
    nvs_close(handle);
    {
        LockGuard guard;
        s_saved = std::move(loaded);
        bump_revision_locked();
    }
    return ESP_OK;
}

esp_err_t persist_saved_networks()
{
    std::vector<SavedNetwork> copy;
    {
        LockGuard guard;
        copy = s_saved;
    }
    nvs_handle_t handle = 0;
    ESP_RETURN_ON_ERROR(nvs_open(kNamespace, NVS_READWRITE, &handle), kTag,
                        "Could not open Wi-Fi records for writing");
    esp_err_t result = nvs_erase_all(handle);
    if (result == ESP_OK) {
        result = nvs_set_u8(handle, "count", static_cast<uint8_t>(copy.size()));
    }
    for (size_t index = 0; result == ESP_OK && index < copy.size(); ++index) {
        result = nvs_set_str(handle, kSsidKeys[index], copy[index].ssid.c_str());
        if (result == ESP_OK) {
            result = nvs_set_str(handle, kPasswordKeys[index], copy[index].password.c_str());
        }
        if (result == ESP_OK) {
            result = nvs_set_u8(handle, kSecurityKeys[index],
                                static_cast<uint8_t>(copy[index].security));
        }
    }
    if (result == ESP_OK) result = nvs_commit(handle);
    nvs_close(handle);
    return result;
}

void remember_pending_network()
{
    LockGuard guard;
    if (!s_pending_save || s_pending.ssid.empty()) {
        return;
    }
    s_saved.erase(std::remove_if(s_saved.begin(), s_saved.end(), [](const SavedNetwork &item) {
                      return item.ssid == s_pending.ssid;
                  }),
                  s_saved.end());
    s_saved.insert(s_saved.begin(), s_pending);
    if (s_saved.size() > kMaximumSaved) s_saved.resize(kMaximumSaved);
    s_pending_save = false;
    for (auto &network : s_scan_results) network.saved = is_saved_locked(network.ssid);
    bump_revision_locked();
}

void scan_completed()
{
    uint16_t count = 0;
    if (esp_wifi_scan_get_ap_num(&count) != ESP_OK) count = 0;
    count = static_cast<uint16_t>(std::min<size_t>(count, kMaximumScanned));
    std::array<wifi_ap_record_t, kMaximumScanned> records{};
    if (count > 0 && esp_wifi_scan_get_ap_records(&count, records.data()) != ESP_OK) count = 0;

    LockGuard guard;
    s_scan_results.clear();
    for (uint16_t index = 0; index < count; ++index) {
        const char *ssid = reinterpret_cast<const char *>(records[index].ssid);
        if (ssid[0] == '\0') continue;
        buddy_wifi_network_t network{};
        copy_text(network.ssid, ssid);
        network.rssi = records[index].rssi;
        network.channel = records[index].primary;
        network.security = security_for(records[index].authmode);
        network.saved = is_saved_locked(network.ssid);
        network.current = s_snapshot.state == BUDDY_CONNECTIVITY_CONNECTED &&
                          std::strcmp(network.ssid, s_snapshot.ssid) == 0;
        const auto duplicate = std::find_if(
            s_scan_results.begin(), s_scan_results.end(), [&network](const auto &existing) {
                return std::strcmp(existing.ssid, network.ssid) == 0;
            });
        if (duplicate == s_scan_results.end()) s_scan_results.push_back(network);
    }
    std::sort(s_scan_results.begin(), s_scan_results.end(), [](const auto &left, const auto &right) {
        if (left.current != right.current) return left.current;
        if (left.saved != right.saved) return left.saved;
        return left.rssi > right.rssi;
    });
    if (s_snapshot.state == BUDDY_CONNECTIVITY_SCANNING) {
        s_snapshot.state = s_snapshot.ipv4[0] == '\0' ? BUDDY_CONNECTIVITY_IDLE
                                                       : BUDDY_CONNECTIVITY_CONNECTED;
    }
    bump_revision_locked();
}

void event_handler(void *, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_SCAN_DONE) {
        scan_completed();
        return;
    }
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        const auto *disconnected = static_cast<wifi_event_sta_disconnected_t *>(event_data);
        LockGuard guard;
        if (s_ignore_next_disconnect) {
            s_ignore_next_disconnect = false;
            return;
        }
        s_snapshot.disconnect_reason = disconnected == nullptr ? 0 : disconnected->reason;
        s_snapshot.ipv4[0] = '\0';
        s_snapshot.rssi = 0;
        s_snapshot.state = authentication_failure(s_snapshot.disconnect_reason)
                               ? BUDDY_CONNECTIVITY_WRONG_PASSWORD
                               : BUDDY_CONNECTIVITY_FAILED;
        const bool more_saved = s_next_saved_index < s_saved.size();
        const uint32_t base_delay_ms = s_last_attempt_automatic && more_saved
                                           ? 1000U
                                           : s_last_attempt_automatic
                                                 ? std::min<uint32_t>(
                                                       300000U,
                                                       5000U << std::min(s_retry_cycle, 6U))
                                                 : 30000U;
        const uint32_t jitter_ms = base_delay_ms > 1000U ? esp_random() % 1000U : 0;
        if (!more_saved) {
            s_next_saved_index = 0;
            ++s_retry_cycle;
        }
        s_retry_at = xTaskGetTickCount() + pdMS_TO_TICKS(base_delay_ms + jitter_ms);
        s_retry_scheduled = !s_saved.empty();
        s_connect_deadline = 0;
        bump_revision_locked();
        return;
    }
    if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        const auto *got_ip = static_cast<ip_event_got_ip_t *>(event_data);
        wifi_ap_record_t access_point{};
        (void)esp_wifi_sta_get_ap_info(&access_point);
        {
            LockGuard guard;
            s_snapshot.state = BUDDY_CONNECTIVITY_CONNECTED;
            s_snapshot.disconnect_reason = 0;
            s_snapshot.rssi = access_point.rssi;
            if (got_ip != nullptr) {
                std::snprintf(s_snapshot.ipv4, sizeof(s_snapshot.ipv4), IPSTR,
                              IP2STR(&got_ip->ip_info.ip));
            }
            for (auto &network : s_scan_results) {
                network.current = std::strcmp(network.ssid, s_snapshot.ssid) == 0;
            }
            s_retry_cycle = 0;
            s_next_saved_index = 0;
            s_retry_scheduled = false;
            s_connect_deadline = 0;
            bump_revision_locked();
        }
        s_persist_pending.store(true);
        if (s_probe_task != nullptr) xTaskNotifyGive(s_probe_task);
    }
}

void execute_connect(const Command &command)
{
    wifi_config_t config{};
    std::memcpy(config.sta.ssid, command.ssid,
                std::min(std::strlen(command.ssid), sizeof(config.sta.ssid)));
    std::memcpy(config.sta.password, command.password,
                std::min(std::strlen(command.password), sizeof(config.sta.password)));
    config.sta.threshold.authmode = command.password[0] == '\0' ? WIFI_AUTH_OPEN
                                                                 : WIFI_AUTH_WPA2_PSK;
    config.sta.sae_pwe_h2e = WPA3_SAE_PWE_BOTH;
    config.sta.scan_method = command.hidden ? WIFI_FAST_SCAN : WIFI_ALL_CHANNEL_SCAN;
    {
        LockGuard guard;
        s_ignore_next_disconnect = s_snapshot.ipv4[0] != '\0';
        copy_text(s_snapshot.ssid, command.ssid);
        s_snapshot.ipv4[0] = '\0';
        s_snapshot.state = BUDDY_CONNECTIVITY_CONNECTING;
        s_snapshot.disconnect_reason = 0;
        const auto saved = std::find_if(s_saved.begin(), s_saved.end(), [&command](const auto &item) {
            return item.ssid == command.ssid;
        });
        const auto scanned = std::find_if(
            s_scan_results.begin(), s_scan_results.end(), [&command](const auto &item) {
                return std::strcmp(item.ssid, command.ssid) == 0;
            });
        if (command.automatic && saved != s_saved.end()) {
            s_next_saved_index = static_cast<size_t>(saved - s_saved.begin()) + 1;
        }
        const buddy_wifi_security_t security = saved != s_saved.end()
                                                    ? saved->security
                                                : scanned != s_scan_results.end()
                                                    ? scanned->security
                                                : command.password[0] == '\0'
                                                    ? BUDDY_WIFI_OPEN
                                                    : BUDDY_WIFI_WPA2_PERSONAL;
        config.sta.threshold.authmode = auth_for(security, command.password[0] != '\0');
        s_pending = {command.ssid, command.password, security};
        s_pending_save = command.save;
        s_last_attempt_automatic = command.automatic;
        s_connect_deadline = xTaskGetTickCount() +
                             pdMS_TO_TICKS(command.automatic ? 5000 : 15000);
        bump_revision_locked();
    }
    (void)esp_wifi_disconnect();
    if (esp_wifi_set_config(WIFI_IF_STA, &config) != ESP_OK || esp_wifi_connect() != ESP_OK) {
        LockGuard guard;
        s_snapshot.state = BUDDY_CONNECTIVITY_FAILED;
        s_connect_deadline = 0;
        s_retry_at = xTaskGetTickCount() + pdMS_TO_TICKS(5000);
        s_retry_scheduled = !s_saved.empty();
        bump_revision_locked();
    }
}

void execute_forget(const Command &command)
{
    bool disconnect_current = false;
    {
        LockGuard guard;
        const size_t before = s_saved.size();
        s_saved.erase(std::remove_if(s_saved.begin(), s_saved.end(), [&command](const auto &item) {
                          return item.ssid == command.ssid;
                      }),
                      s_saved.end());
        if (before == s_saved.size()) return;
        disconnect_current = std::strcmp(s_snapshot.ssid, command.ssid) == 0;
        for (auto &network : s_scan_results) network.saved = is_saved_locked(network.ssid);
        bump_revision_locked();
    }
    if (persist_saved_networks() != ESP_OK) ESP_LOGE(kTag, "Could not persist forgotten network");
    if (disconnect_current) (void)esp_wifi_disconnect();
}

void connectivity_task(void *)
{
    Command command{};
    while (true) {
        if (xQueueReceive(s_commands, &command, pdMS_TO_TICKS(250)) == pdTRUE) {
            switch (command.type) {
            case CommandType::kScan: {
                {
                    LockGuard guard;
                    s_snapshot.state = BUDDY_CONNECTIVITY_SCANNING;
                    bump_revision_locked();
                }
                wifi_scan_config_t scan{};
                scan.show_hidden = true;
                if (esp_wifi_scan_start(&scan, false) != ESP_OK) {
                    LockGuard guard;
                    s_snapshot.state = BUDDY_CONNECTIVITY_FAILED;
                    bump_revision_locked();
                }
                break;
            }
            case CommandType::kConnect: execute_connect(command); break;
            case CommandType::kForget: execute_forget(command); break;
            case CommandType::kDisconnect:
                (void)esp_wifi_disconnect();
                {
                    LockGuard guard;
                    s_snapshot.state = BUDDY_CONNECTIVITY_IDLE;
                    s_snapshot.ssid[0] = '\0';
                    s_snapshot.ipv4[0] = '\0';
                    s_retry_scheduled = false;
                    s_connect_deadline = 0;
                    bump_revision_locked();
                }
                break;
            }
        }
        if (s_persist_pending.exchange(false)) {
            remember_pending_network();
            if (persist_saved_networks() != ESP_OK) {
                ESP_LOGE(kTag, "Connected, but could not persist network metadata");
            }
        }
        bool connection_timed_out = false;
        bool run_automatic = false;
        Command automatic{};
        {
            LockGuard guard;
            const TickType_t now = xTaskGetTickCount();
            if (s_connect_deadline != 0 &&
                static_cast<int32_t>(now - s_connect_deadline) >= 0 &&
                s_snapshot.state == BUDDY_CONNECTIVITY_CONNECTING) {
                s_connect_deadline = 0;
                connection_timed_out = true;
            }
            if (s_retry_scheduled && static_cast<int32_t>(now - s_retry_at) >= 0 &&
                !s_saved.empty() && s_snapshot.state != BUDDY_CONNECTIVITY_CONNECTED &&
                s_snapshot.state != BUDDY_CONNECTIVITY_CONNECTING) {
                const size_t index = std::min(s_next_saved_index, s_saved.size() - 1);
                automatic.type = CommandType::kConnect;
                copy_text(automatic.ssid, s_saved[index].ssid.c_str());
                copy_text(automatic.password, s_saved[index].password.c_str());
                automatic.automatic = true;
                s_retry_scheduled = false;
                run_automatic = true;
            }
        }
        if (connection_timed_out) (void)esp_wifi_disconnect();
        if (run_automatic) execute_connect(automatic);
    }
}

void internet_probe_task(void *)
{
    while (true) {
        // A successful IP event wakes the first probe immediately. Afterwards,
        // re-check once a minute so a captive portal login or WAN recovery is
        // detected without coupling network latency to the LVGL/UI task.
        (void)ulTaskNotifyTake(pdTRUE, pdMS_TO_TICKS(60000));
        bool has_ipv4 = false;
        {
            LockGuard guard;
            has_ipv4 = s_snapshot.ipv4[0] != '\0';
        }
        if (!has_ipv4) continue;

        esp_http_client_config_t config{};
        config.url = kConnectivityCheckUrl;
        config.method = HTTP_METHOD_GET;
        config.timeout_ms = 5000;
        config.disable_auto_redirect = true;
        config.keep_alive_enable = false;
        config.user_agent = "BuddyBlocks-P4-connectivity-check/1";
        esp_http_client_handle_t client = esp_http_client_init(&config);
        if (client == nullptr) {
            buddy_connectivity_report_internet(false, false);
            continue;
        }
        const esp_err_t result = esp_http_client_perform(client);
        const int status = result == ESP_OK ? esp_http_client_get_status_code(client) : 0;
        esp_http_client_cleanup(client);

        const bool reachable = result == ESP_OK && status == 204;
        const bool captive = result == ESP_OK && status >= 200 && status < 400 && status != 204;
        ESP_LOGI(kTag, "Connectivity check result=%s status=%d", esp_err_to_name(result), status);
        buddy_connectivity_report_internet(reachable, captive);
    }
}

esp_err_t enqueue(const Command &command)
{
    if (!s_initialized || s_commands == nullptr) return ESP_ERR_INVALID_STATE;
    return xQueueSend(s_commands, &command, 0) == pdTRUE ? ESP_OK : ESP_ERR_TIMEOUT;
}

} // namespace

extern "C" esp_err_t buddy_connectivity_initialize(void)
{
    if (s_initialized) return ESP_OK;
    s_lock = xSemaphoreCreateMutex();
    s_commands = xQueueCreate(8, sizeof(Command));
    ESP_RETURN_ON_FALSE(s_lock != nullptr && s_commands != nullptr, ESP_ERR_NO_MEM, kTag,
                        "Could not allocate connectivity synchronization objects");
    ESP_RETURN_ON_ERROR(esp_netif_init(), kTag, "Network stack initialization failed");
    const esp_err_t loop_result = esp_event_loop_create_default();
    ESP_RETURN_ON_FALSE(loop_result == ESP_OK || loop_result == ESP_ERR_INVALID_STATE, loop_result,
                        kTag, "Default event loop initialization failed");
    s_station = esp_netif_create_default_wifi_sta();
    ESP_RETURN_ON_FALSE(s_station != nullptr, ESP_FAIL, kTag, "Station interface failed");
    wifi_init_config_t init = WIFI_INIT_CONFIG_DEFAULT();
    ESP_RETURN_ON_ERROR(esp_wifi_init(&init), kTag, "ESP32-C6 hosted Wi-Fi init failed");
    ESP_RETURN_ON_ERROR(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, event_handler,
                                                   nullptr),
                        kTag, "Wi-Fi event handler failed");
    ESP_RETURN_ON_ERROR(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, event_handler,
                                                   nullptr),
                        kTag, "IP event handler failed");
    ESP_RETURN_ON_ERROR(esp_wifi_set_storage(WIFI_STORAGE_RAM), kTag, "Wi-Fi RAM storage failed");
    ESP_RETURN_ON_ERROR(esp_wifi_set_mode(WIFI_MODE_STA), kTag, "Station mode failed");
    ESP_RETURN_ON_ERROR(esp_wifi_start(), kTag, "Hosted Wi-Fi start failed");
    esp_hosted_coprocessor_fwver_t c6_version{};
    const esp_err_t c6_version_result = esp_hosted_get_coprocessor_fwversion(&c6_version);
    if (c6_version_result == ESP_OK) {
        std::snprintf(s_snapshot.c6_firmware_version,
                      sizeof(s_snapshot.c6_firmware_version), "%u.%u.%u",
                      static_cast<unsigned>(c6_version.major1),
                      static_cast<unsigned>(c6_version.minor1),
                      static_cast<unsigned>(c6_version.patch1));
        ESP_LOGI(kTag, "ESP32-C6 hosted firmware version %s",
                 s_snapshot.c6_firmware_version);
    } else {
        std::snprintf(s_snapshot.c6_firmware_version,
                      sizeof(s_snapshot.c6_firmware_version), "unavailable (%s)",
                      esp_err_to_name(c6_version_result));
        ESP_LOGW(kTag, "Could not query ESP32-C6 hosted firmware version: %s",
                 esp_err_to_name(c6_version_result));
    }
    ESP_RETURN_ON_ERROR(load_saved_networks(), kTag, "Saved Wi-Fi load failed");
    s_initialized = true;
    {
        LockGuard guard;
        s_snapshot.state = BUDDY_CONNECTIVITY_IDLE;
        bump_revision_locked();
    }
    ESP_RETURN_ON_FALSE(xTaskCreate(connectivity_task, "buddy_connect", 7168, nullptr, 6,
                                    nullptr) == pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Connectivity task creation failed");
    ESP_RETURN_ON_FALSE(xTaskCreate(internet_probe_task, "buddy_net_probe", 5120, nullptr, 5,
                                    &s_probe_task) == pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Connectivity probe task creation failed");

    Command first{};
    first.type = CommandType::kConnect;
    {
        LockGuard guard;
        if (!s_saved.empty()) {
            copy_text(first.ssid, s_saved.front().ssid.c_str());
            copy_text(first.password, s_saved.front().password.c_str());
            first.save = false;
            first.automatic = true;
        } else if (CONFIG_BUDDY_WIFI_SSID[0] != '\0') {
            copy_text(first.ssid, CONFIG_BUDDY_WIFI_SSID);
            copy_text(first.password, CONFIG_BUDDY_WIFI_PASSWORD);
            first.save = true;
            first.automatic = true;
        }
    }
    if (first.ssid[0] != '\0') {
        (void)enqueue(first);
    } else {
        Command scan{};
        scan.type = CommandType::kScan;
        (void)enqueue(scan);
    }
    ESP_LOGI(kTag, "Hosted Wi-Fi ready asynchronously; %u saved network(s)",
             static_cast<unsigned>(s_snapshot.saved_network_count));
    return ESP_OK;
}

extern "C" esp_err_t buddy_connectivity_request_scan(void)
{
    Command command{};
    command.type = CommandType::kScan;
    return enqueue(command);
}

extern "C" esp_err_t buddy_connectivity_request_connect(const char *ssid, const char *password,
                                                          bool save_network, bool hidden)
{
    if (ssid == nullptr || password == nullptr || ssid[0] == '\0' || std::strlen(ssid) > 32 ||
        std::strlen(password) > 64) {
        return ESP_ERR_INVALID_ARG;
    }
    Command command{};
    command.type = CommandType::kConnect;
    copy_text(command.ssid, ssid);
    copy_text(command.password, password);
    command.save = save_network;
    command.hidden = hidden;
    return enqueue(command);
}

extern "C" esp_err_t buddy_connectivity_request_forget(const char *ssid)
{
    if (ssid == nullptr || ssid[0] == '\0' || std::strlen(ssid) > 32) return ESP_ERR_INVALID_ARG;
    Command command{};
    command.type = CommandType::kForget;
    copy_text(command.ssid, ssid);
    return enqueue(command);
}

extern "C" esp_err_t buddy_connectivity_request_disconnect(void)
{
    Command command{};
    command.type = CommandType::kDisconnect;
    return enqueue(command);
}

extern "C" esp_err_t buddy_connectivity_snapshot(buddy_connectivity_snapshot_t *snapshot)
{
    if (snapshot == nullptr || !s_initialized) return ESP_ERR_INVALID_ARG;
    LockGuard guard;
    *snapshot = s_snapshot;
    return ESP_OK;
}

extern "C" esp_err_t buddy_connectivity_scan_result(size_t index,
                                                       buddy_wifi_network_t *network)
{
    if (network == nullptr || !s_initialized) return ESP_ERR_INVALID_ARG;
    LockGuard guard;
    if (index >= s_scan_results.size()) return ESP_ERR_NOT_FOUND;
    *network = s_scan_results[index];
    return ESP_OK;
}

extern "C" void buddy_connectivity_report_internet(bool reachable, bool captive_portal)
{
    if (!s_initialized) return;
    LockGuard guard;
    if (s_snapshot.ipv4[0] == '\0') return;
    s_snapshot.state = reachable ? BUDDY_CONNECTIVITY_CONNECTED
                                 : captive_portal ? BUDDY_CONNECTIVITY_CAPTIVE_PORTAL
                                                  : BUDDY_CONNECTIVITY_NO_INTERNET;
    bump_revision_locked();
}
