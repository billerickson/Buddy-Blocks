#include "buddy_board.h"
#include "buddy_content.h"
#include "buddy_connectivity.h"
#include "buddy_ota.h"
#include "buddy_storage.h"
#include "buddy_sync.h"
#include "buddy_ui.h"
#include "esp_err.h"
#include "esp_random.h"
#include "esp_littlefs.h"
#include "esp_chip_info.h"
#include "esp_heap_caps.h"
#include "esp_log.h"
#include "esp_system.h"
#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "sdkconfig.h"
#include "mbedtls/sha256.h"
#include "nvs.h"

#include <algorithm>
#include <array>
#include <ctime>
#include <cstdio>
#include <mutex>
#include <string>
#include <vector>

namespace {

buddy::storage::Store s_store("/littlefs");
buddy::content::Library s_library;
buddy::content::Bootstrap s_bootstrap_data;
std::recursive_mutex s_bootstrap_mutex;
uint32_t s_bootstrap_generation = 0;
buddy::sync::Service s_sync(
    s_store, {CONFIG_BUDDY_API_BASE_URL, CONFIG_BUDDY_HARDWARE_REVISION,
              CONFIG_BUDDY_FIRMWARE_VERSION});

std::string hardware_profile()
{
    const std::string revision = CONFIG_BUDDY_HARDWARE_REVISION;
    return "waveshare-p4-lcd43-" + (revision == "rev1_3" ? std::string("rev1.3") : revision);
}

buddy::ota::Service s_ota(hardware_profile());
constexpr char kSettingsNamespace[] = "buddy_settings";
constexpr char kTag[] = "buddy_app";
uint8_t s_brightness_percent = 80;
uint8_t s_screen_timeout_minutes = 5;
bool s_reduced_motion = true;

bool save_setting(const char *key, uint8_t value)
{
    nvs_handle_t handle = 0;
    if (nvs_open(kSettingsNamespace, NVS_READWRITE, &handle) != ESP_OK) return false;
    esp_err_t result = nvs_set_u8(handle, key, value);
    if (result == ESP_OK) result = nvs_commit(handle);
    nvs_close(handle);
    return result == ESP_OK;
}

void load_settings()
{
    nvs_handle_t handle = 0;
    if (nvs_open(kSettingsNamespace, NVS_READONLY, &handle) == ESP_OK) {
        uint8_t reduced_motion = 1;
        (void)nvs_get_u8(handle, "brightness", &s_brightness_percent);
        (void)nvs_get_u8(handle, "timeout", &s_screen_timeout_minutes);
        (void)nvs_get_u8(handle, "motion", &reduced_motion);
        s_reduced_motion = reduced_motion != 0;
        nvs_close(handle);
    }
    if (s_brightness_percent < 10 || s_brightness_percent > 100) s_brightness_percent = 80;
    if (s_screen_timeout_minutes != 0 && s_screen_timeout_minutes != 2 &&
        s_screen_timeout_minutes != 5 && s_screen_timeout_minutes != 10) {
        s_screen_timeout_minutes = 5;
    }
    (void)buddy_board_set_brightness(s_brightness_percent);
    (void)buddy_board_set_screen_timeout(s_screen_timeout_minutes);
}

bool write_record(void *, const char *relative_path, unsigned schema_version,
                  const char *payload, size_t payload_size)
{
    const auto *begin = reinterpret_cast<const uint8_t *>(payload);
    return s_store.write_atomic(relative_path, static_cast<uint16_t>(schema_version),
                                std::vector<uint8_t>(begin, begin + payload_size)) ==
           buddy::storage::Result::kOk;
}

bool remove_record(void *, const char *relative_path)
{
    const auto result = s_store.remove(relative_path);
    return result == buddy::storage::Result::kOk || result == buddy::storage::Result::kNotFound;
}

bool enqueue_event(void *, const char *stable_event_id, const char *payload, size_t payload_size)
{
    const auto *begin = reinterpret_cast<const uint8_t *>(payload);
    return s_store.enqueue(stable_event_id, std::vector<uint8_t>(begin, begin + payload_size)) ==
           buddy::storage::Result::kOk;
}

bool new_event_id(void *, const char *, char *output, size_t output_capacity)
{
    static constexpr char alphabet[] = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    std::array<uint8_t, 16> entropy{};
    nvs_handle_t handle = 0;
    if (nvs_open("buddy_system", NVS_READWRITE, &handle) != ESP_OK) return false;
    uint64_t last_timestamp_ms = 0;
    (void)nvs_get_u64(handle, "event_ms", &last_timestamp_ms);
    const time_t wall_seconds = std::time(nullptr);
    const uint64_t candidate_ms = wall_seconds >= 1704067200
                                      ? static_cast<uint64_t>(wall_seconds) * 1000ULL
                                      : static_cast<uint64_t>(esp_timer_get_time() / 1000);
    const uint64_t timestamp_ms = std::max(candidate_ms, last_timestamp_ms + 1) &
                                  0x0000FFFFFFFFFFFFULL;
    esp_err_t persisted = nvs_set_u64(handle, "event_ms", timestamp_ms);
    if (persisted == ESP_OK) persisted = nvs_commit(handle);
    nvs_close(handle);
    if (persisted != ESP_OK) return false;
    for (size_t index = 0; index < 6; ++index) {
        entropy[index] = static_cast<uint8_t>(timestamp_ms >> (40 - index * 8));
    }
    esp_fill_random(entropy.data() + 6, entropy.size() - 6);
    char ulid[27]{};
    for (size_t character = 0; character < 26; ++character) {
        uint8_t value = 0;
        for (size_t bit = 0; bit < 5; ++bit) {
            const int source_bit = static_cast<int>(character * 5 + bit) - 2;
            value <<= 1;
            if (source_bit >= 0) {
                value |= static_cast<uint8_t>(
                    (entropy[static_cast<size_t>(source_bit) / 8] >>
                     (7 - static_cast<size_t>(source_bit) % 8)) &
                    1U);
            }
        }
        ulid[character] = alphabet[value];
    }
    const auto sync = s_sync.snapshot();
    const char *suffix = sync.device_id_suffix.empty() ? "demo" : sync.device_id_suffix.c_str();
    return std::snprintf(output, output_capacity, "esp32p4_%s_%s", suffix, ulid) > 0 &&
           std::char_traits<char>::length(output) < output_capacity;
}

uint64_t monotonic_ms(void *)
{
    return static_cast<uint64_t>(esp_timer_get_time() / 1000);
}

bool wifi_scan(void *) { return buddy_connectivity_request_scan() == ESP_OK; }

size_t wifi_network_count(void *)
{
    buddy_connectivity_snapshot_t snapshot{};
    return buddy_connectivity_snapshot(&snapshot) == ESP_OK ? snapshot.scan_result_count : 0;
}

bool wifi_network(void *, size_t index, buddy_ui_wifi_network_t *output)
{
    if (output == nullptr) return false;
    buddy_wifi_network_t network{};
    if (buddy_connectivity_scan_result(index, &network) != ESP_OK) return false;
    std::snprintf(output->ssid, sizeof(output->ssid), "%s", network.ssid);
    output->signal_dbm = network.rssi;
    output->security = static_cast<int>(network.security);
    output->saved = network.saved;
    output->current = network.current;
    return true;
}

bool wifi_connect(void *, const char *ssid, const char *password, bool save, bool hidden)
{
    return buddy_connectivity_request_connect(ssid, password, save, hidden) == ESP_OK;
}

bool wifi_forget(void *, const char *ssid)
{
    return buddy_connectivity_request_forget(ssid) == ESP_OK;
}

bool request_pairing(void *) { return s_sync.request_pairing() == ESP_OK; }
bool request_sync(void *) { return s_sync.request_sync() == ESP_OK; }
bool request_firmware_check(void *) { return s_sync.request_firmware_check() == ESP_OK; }
bool request_ota_install(void *) { return s_ota.request_install() == ESP_OK; }

bool request_reboot(void *)
{
    if (s_ota.snapshot().state != buddy::ota::State::kRebootReady) return false;
    esp_restart();
    return true;
}

void activity_state(void *, bool timed_session, bool unsaved_session)
{
    // This board has no battery: a running unit is externally powered. The update screen still
    // requires explicit confirmation and tells the parent to use stable USB power.
    s_ota.set_install_blockers(timed_session, unsaved_session, true);
}

bool set_brightness(void *, uint8_t value)
{
    if (buddy_board_set_brightness(value) != ESP_OK || !save_setting("brightness", value)) {
        return false;
    }
    s_brightness_percent = value;
    return true;
}

bool set_screen_timeout(void *, uint8_t value)
{
    if (buddy_board_set_screen_timeout(value) != ESP_OK || !save_setting("timeout", value)) {
        return false;
    }
    s_screen_timeout_minutes = value;
    return true;
}

bool set_reduced_motion(void *, bool value)
{
    if (!save_setting("motion", value ? 1 : 0)) return false;
    s_reduced_motion = value;
    return true;
}

void erase_namespace(const char *name)
{
    nvs_handle_t handle = 0;
    if (nvs_open(name, NVS_READWRITE, &handle) != ESP_OK) return;
    esp_err_t result = nvs_erase_all(handle);
    if (result == ESP_OK) result = nvs_commit(handle);
    nvs_close(handle);
    if (result != ESP_OK) {
        std::printf("Factory reset could not erase a local namespace: %s\n",
                    esp_err_to_name(result));
    }
}

void factory_reset_task(void *)
{
    s_sync.set_online(false);
    (void)buddy_connectivity_request_disconnect();
    vTaskDelay(pdMS_TO_TICKS(500));
    esp_err_t format = esp_vfs_littlefs_unregister("littlefs");
    if (format == ESP_OK) format = esp_littlefs_format("littlefs");
    erase_namespace("buddy_wifi");
    erase_namespace("buddy_device");
    erase_namespace(kSettingsNamespace);
    erase_namespace("buddy_system");
    if (format != ESP_OK) {
        std::printf("Factory reset could not erase local content: %s\n",
                    esp_err_to_name(format));
        vTaskDelete(nullptr);
        return;
    }
    esp_restart();
}

bool request_factory_reset(void *)
{
    return xTaskCreate(factory_reset_task, "buddy_factory", 4096, nullptr, 10, nullptr) ==
           pdPASS;
}

bool reload_flash_library()
{
    buddy::storage::Record record{};
    if (s_store.read("content/flash-cards.json", 1, record) != buddy::storage::Result::kOk) {
        s_library.clear();
        return false;
    }
    return s_library.replace_from_snapshot(std::string(record.payload.begin(), record.payload.end()));
}

bool reload_bootstrap()
{
    buddy::storage::Record record{};
    if (s_store.read("content/bootstrap.json", 1, record) != buddy::storage::Result::kOk) {
        return false;
    }
    buddy::content::Bootstrap parsed;
    if (!buddy::content::parse_bootstrap(
            std::string(record.payload.begin(), record.payload.end()), parsed)) {
        return false;
    }
    std::lock_guard<std::recursive_mutex> guard(s_bootstrap_mutex);
    s_bootstrap_data = std::move(parsed);
    ++s_bootstrap_generation;
    return true;
}

std::string last_sync_text(int64_t last_sync_unix)
{
    if (last_sync_unix <= 0) return "Never";
    const int64_t now = static_cast<int64_t>(std::time(nullptr));
    if (now < 1704067200 || now < last_sync_unix) return "Previously";
    const int64_t seconds = now - last_sync_unix;
    if (seconds < 120) return "Just now";
    if (seconds < 3600) return std::to_string(seconds / 60) + " minutes ago";
    if (seconds < 86400) return std::to_string(seconds / 3600) + " hours ago";
    const int64_t days = seconds / 86400;
    return std::to_string(days) + " days ago" +
           (days >= 7 ? " - content may be stale" : "");
}

bool mastery(void *, int factor, int multiplier, buddy_ui_mastery_t *output)
{
    if (output == nullptr || factor < 1 || factor > 12 || multiplier < 1 || multiplier > 12) {
        return false;
    }
    std::lock_guard<std::recursive_mutex> guard(s_bootstrap_mutex);
    const size_t index = static_cast<size_t>((factor - 1) * 12 + multiplier - 1);
    if (index >= s_bootstrap_data.mastery_by_ordered_fact.size()) return false;
    const auto &stats = s_bootstrap_data.mastery_by_ordered_fact[index];
    output->attempts = stats.attempts;
    output->correct = stats.correct;
    output->correct_streak = stats.correct_streak;
    output->has_best_keyboard_response = stats.best_keyboard_response_ms.has_value();
    output->best_keyboard_response_ms = stats.best_keyboard_response_ms.value_or(0);
    return true;
}

bool diagnostics(void *, buddy_ui_diagnostics_t *output)
{
    if (output == nullptr) return false;
    esp_chip_info_t chip{};
    esp_chip_info(&chip);
    buddy::storage::Capacity capacity{};
    (void)s_store.capacity(capacity);
    output->p4_revision = chip.revision;
    buddy_connectivity_snapshot_t connectivity{};
    if (buddy_connectivity_snapshot(&connectivity) == ESP_OK) {
        std::snprintf(output->c6_firmware_version, sizeof(output->c6_firmware_version), "%s",
                      connectivity.c6_firmware_version);
    }
    output->free_internal_heap = heap_caps_get_free_size(MALLOC_CAP_INTERNAL);
    output->minimum_internal_heap = heap_caps_get_minimum_free_size(MALLOC_CAP_INTERNAL);
    output->free_psram = heap_caps_get_free_size(MALLOC_CAP_SPIRAM);
    output->minimum_psram = heap_caps_get_minimum_free_size(MALLOC_CAP_SPIRAM);
    output->filesystem_free = capacity.free_bytes;
    output->reset_reason = static_cast<int>(esp_reset_reason());
    return true;
}

size_t flash_section_count(void *) { return s_library.section_count(); }

bool flash_section(void *, size_t index, buddy_ui_flash_section_t *output)
{
    if (output == nullptr) return false;
    buddy::content::Section section;
    if (!s_library.section(index, section)) return false;
    std::snprintf(output->id, sizeof(output->id), "%s", section.id.c_str());
    std::snprintf(output->title, sizeof(output->title), "%s", section.title.c_str());
    std::snprintf(output->source, sizeof(output->source), "%s", section.source.c_str());
    output->card_count = section.cards.size();
    output->pinned = section.pinned;
    return true;
}

bool flash_card(void *, size_t section_index, size_t card_index, buddy_ui_flash_card_t *output)
{
    if (output == nullptr) return false;
    buddy::content::Card card;
    if (!s_library.card(section_index, card_index, card)) return false;
    std::snprintf(output->id, sizeof(output->id), "%s", card.id.c_str());
    std::snprintf(output->front, sizeof(output->front), "%s", card.front.c_str());
    std::snprintf(output->back, sizeof(output->back), "%s", card.back.c_str());
    std::snprintf(output->clue, sizeof(output->clue), "%s", card.clue.c_str());
    return true;
}

bool sha256_hex(void *, const char *input, size_t input_size, char output[65])
{
    if (input == nullptr || output == nullptr) return false;
    std::array<unsigned char, 32> digest{};
    if (mbedtls_sha256(reinterpret_cast<const unsigned char *>(input), input_size,
                       digest.data(), 0) != 0) {
        return false;
    }
    static constexpr char alphabet[] = "0123456789abcdef";
    for (size_t index = 0; index < digest.size(); ++index) {
        output[index * 2] = alphabet[digest[index] >> 4];
        output[index * 2 + 1] = alphabet[digest[index] & 0x0fU];
    }
    output[64] = '\0';
    return true;
}

void connectivity_ui_task(void *)
{
    uint32_t displayed_revision = UINT32_MAX;
    uint32_t displayed_sync_revision = UINT32_MAX;
    uint32_t displayed_ota_revision = UINT32_MAX;
    uint32_t loaded_content_revision = s_library.revision();
    uint32_t loaded_bootstrap_sync_revision = UINT32_MAX;
    std::string loaded_firmware_policy;
    std::string displayed_last_sync;
    while (true) {
        buddy_connectivity_snapshot_t snapshot{};
        if (buddy_connectivity_snapshot(&snapshot) == ESP_OK) {
            const bool online = snapshot.state == BUDDY_CONNECTIVITY_CONNECTED;
            s_sync.set_online(online);
            const auto sync = s_sync.snapshot();
            if (sync.content_revision != loaded_content_revision) {
                (void)reload_flash_library();
                loaded_content_revision = s_library.revision();
            }
            if (sync.state == buddy::sync::State::kReady &&
                sync.revision != loaded_bootstrap_sync_revision) {
                (void)reload_bootstrap();
                loaded_bootstrap_sync_revision = sync.revision;
            }
            const std::string firmware_policy =
                sync.firmware_hardware_profile + "\n" + sync.firmware_version + "\n" +
                sync.firmware_minimum_version + "\n" + sync.firmware_url + "\n" +
                sync.firmware_sha256 + "\n" + sync.firmware_release_notes + "\n" +
                std::to_string(sync.firmware_size) + "\n" +
                (sync.firmware_mandatory ? "required" : "optional");
            if (!sync.firmware_hardware_profile.empty() &&
                firmware_policy != loaded_firmware_policy) {
                buddy::ota::Manifest manifest{
                    .hardware_profile = sync.firmware_hardware_profile,
                    .version = sync.firmware_version,
                    .minimum_version = sync.firmware_minimum_version,
                    .url = sync.firmware_update_available ? sync.firmware_url : std::string{},
                    .sha256 = sync.firmware_update_available ? sync.firmware_sha256 : std::string{},
                    .release_notes = sync.firmware_release_notes,
                    .size = sync.firmware_update_available ? sync.firmware_size : 0,
                    .mandatory = sync.firmware_mandatory,
                };
                s_ota.set_manifest(manifest);
                loaded_firmware_policy = firmware_policy;
            }
            const auto ota = s_ota.snapshot();
            buddy_board_set_display_wake_lock(
                ota.state == buddy::ota::State::kDownloading ||
                ota.state == buddy::ota::State::kVerifying);
            const std::string authoring_url = sync.child_slug.empty()
                                                  ? std::string{}
                                                  : std::string(CONFIG_BUDDY_API_BASE_URL) +
                                                        "/kid/" + sync.child_slug +
                                                        "/flash-cards/";
            const std::string current_last_sync =
                last_sync_text(sync.last_successful_sync_unix);
            if ((snapshot.revision != displayed_revision ||
                 sync.revision != displayed_sync_revision ||
                 ota.revision != displayed_ota_revision ||
                 current_last_sync != displayed_last_sync) &&
                buddy_board_display_lock(1000) == ESP_OK) {
                displayed_revision = snapshot.revision;
                displayed_sync_revision = sync.revision;
                displayed_ota_revision = ota.revision;
                displayed_last_sync = current_last_sync;
                buddy_ui_update_status(online, sync.queued_events,
                                       displayed_last_sync.c_str());
                buddy_ui_update_connectivity(static_cast<int>(snapshot.state), snapshot.ssid,
                                             snapshot.ipv4, snapshot.rssi, snapshot.revision);
                buddy_ui_update_device(sync.paired, static_cast<int>(sync.state),
                                       sync.pairing_code.c_str(), sync.claim_url.c_str(),
                                       sync.child_name.c_str(), sync.device_name.c_str(),
                                       authoring_url.c_str(),
                                       sync.last_error.c_str(),
                                       sync.content_revision, sync.queued_events, sync.revision);
                buddy_ui_update_ota(static_cast<int>(ota.state), ota.manifest.version.c_str(),
                                    ota.manifest.minimum_version.c_str(),
                                    ota.manifest.release_notes.c_str(), ota.message.c_str(),
                                    ota.downloaded, ota.manifest.size, ota.manifest.mandatory,
                                    ota.revision);
                {
                    std::lock_guard<std::recursive_mutex> guard(s_bootstrap_mutex);
                    buddy_ui_update_mastery(s_bootstrap_data.fluent_facts,
                                            s_bootstrap_data.xp_total,
                                            s_bootstrap_data.best_60_seconds,
                                            s_bootstrap_data.best_120_seconds,
                                            s_bootstrap_generation);
                }
                buddy_board_display_unlock();
            }
        }
        vTaskDelay(pdMS_TO_TICKS(250));
    }
}

} // namespace

extern "C" void app_main(void)
{
    buddy_board_runtime_t runtime{};
    ESP_ERROR_CHECK(buddy_board_initialize(&runtime));

    ESP_ERROR_CHECK(s_store.initialize() == buddy::storage::Result::kOk ? ESP_OK : ESP_FAIL);
    load_settings();
    ESP_ERROR_CHECK(s_sync.start());
    ESP_ERROR_CHECK(s_ota.start());
    (void)s_store.recover("content/flash-cards.json", 1);
    (void)s_store.recover("content/mastery.json", 1);
    (void)s_store.recover("sessions/multiplication-active.json", 1);
    (void)s_store.recover("sessions/flash-card-active.json", 1);
    buddy::storage::Record active_record{};
    std::string active_session;
    std::string active_flash_session;
    if (s_store.read("sessions/multiplication-active.json", 1, active_record) ==
        buddy::storage::Result::kOk) {
        active_session.assign(active_record.payload.begin(), active_record.payload.end());
    }
    buddy::storage::Record active_flash_record{};
    if (s_store.read("sessions/flash-card-active.json", 1, active_flash_record) ==
        buddy::storage::Result::kOk) {
        active_flash_session.assign(active_flash_record.payload.begin(),
                                    active_flash_record.payload.end());
    }
    (void)reload_flash_library();
    (void)reload_bootstrap();

    const buddy_ui_services_t services{
        .context = nullptr,
        .write_record = write_record,
        .remove_record = remove_record,
        .enqueue_event = enqueue_event,
        .new_event_id = new_event_id,
        .monotonic_ms = monotonic_ms,
        .wifi_scan = wifi_scan,
        .wifi_network_count = wifi_network_count,
        .wifi_network = wifi_network,
        .wifi_connect = wifi_connect,
        .wifi_forget = wifi_forget,
        .request_pairing = request_pairing,
        .request_sync = request_sync,
        .request_firmware_check = request_firmware_check,
        .request_ota_install = request_ota_install,
        .request_reboot = request_reboot,
        .activity_state = activity_state,
        .set_brightness = set_brightness,
        .set_screen_timeout = set_screen_timeout,
        .set_reduced_motion = set_reduced_motion,
        .factory_reset = request_factory_reset,
        .flash_section_count = flash_section_count,
        .flash_section = flash_section,
        .flash_card = flash_card,
        .sha256_hex = sha256_hex,
        .mastery = mastery,
        .diagnostics = diagnostics,
    };
    buddy_ui_set_services(&services);

    buddy_connectivity_snapshot_t connectivity{};
    (void)buddy_connectivity_snapshot(&connectivity);
    const auto sync = s_sync.snapshot();
    const std::string initial_last_sync = last_sync_text(sync.last_successful_sync_unix);
    const std::string initial_hardware_profile = hardware_profile();
    const std::string initial_authoring_url = sync.child_slug.empty()
                                                  ? std::string{}
                                                  : std::string(CONFIG_BUDDY_API_BASE_URL) +
                                                        "/kid/" + sync.child_slug +
                                                        "/flash-cards/";
    const buddy_ui_bootstrap_t bootstrap{
        .child_name = sync.child_name.empty() ? "Demo Learner" : sync.child_name.c_str(),
        .device_name = sync.device_name.empty() ? "Buddy Board" : sync.device_name.c_str(),
        .flash_authoring_url = initial_authoring_url.c_str(),
        .paired = sync.paired,
        .online = connectivity.state == BUDDY_CONNECTIVITY_CONNECTED,
        .queued_events = sync.queued_events,
        .flash_section_count = s_library.section_count(),
        .fluent_facts = s_bootstrap_data.fluent_facts,
        .multiplication_xp_total = s_bootstrap_data.xp_total,
        .best_60_seconds = s_bootstrap_data.best_60_seconds,
        .best_120_seconds = s_bootstrap_data.best_120_seconds,
        .last_sync_text = initial_last_sync.c_str(),
        .device_id_suffix = sync.device_id_suffix.c_str(),
        .multiplication_session_json = active_session.empty() ? nullptr : active_session.c_str(),
        .flash_session_json = active_flash_session.empty() ? nullptr : active_flash_session.c_str(),
        .flash_content_revision = s_library.revision(),
        .firmware_version = CONFIG_BUDDY_FIRMWARE_VERSION,
        .hardware_profile = initial_hardware_profile.c_str(),
        .brightness_percent = s_brightness_percent,
        .screen_timeout_minutes = s_screen_timeout_minutes,
        .reduced_motion = s_reduced_motion,
    };
    ESP_ERROR_CHECK(buddy_board_display_lock(UINT32_MAX));
    const bool ui_started = buddy_ui_start(runtime.display, &bootstrap);
    buddy_board_display_unlock();
    ESP_ERROR_CHECK(ui_started ? ESP_OK : ESP_FAIL);
    ESP_ERROR_CHECK(xTaskCreate(connectivity_ui_task, "buddy_wifi_ui", 4096, nullptr, 4,
                                nullptr) == pdPASS
                        ? ESP_OK
                        : ESP_ERR_NO_MEM);
    ESP_ERROR_CHECK(buddy_board_start_background_services());

    // The complete local UI is now usable. Hosted Wi-Fi initialization comes
    // afterwards so a slow or absent C6 cannot hold the learning experience at
    // a boot splash. A connectivity-start failure rejects only a pending OTA
    // image; a normal development boot remains available offline for recovery.
    const esp_err_t connectivity_result = buddy_connectivity_initialize();
    if (connectivity_result != ESP_OK) {
        ESP_LOGE(kTag, "Hosted Wi-Fi could not start; continuing offline: %s",
                 esp_err_to_name(connectivity_result));
    }
    ESP_ERROR_CHECK(s_ota.confirm_running_image_healthy(connectivity_result == ESP_OK));
}
