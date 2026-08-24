#pragma once

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#include "lvgl.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    const char *child_name;
    const char *device_name;
    const char *flash_authoring_url;
    bool paired;
    bool online;
    size_t queued_events;
    size_t flash_section_count;
    size_t fluent_facts;
    int multiplication_xp_total;
    int best_60_seconds;
    int best_120_seconds;
    const char *last_sync_text;
    const char *device_id_suffix;
    const char *multiplication_session_json;
    const char *flash_session_json;
    uint32_t flash_content_revision;
    const char *firmware_version;
    const char *hardware_profile;
    uint8_t brightness_percent;
    uint8_t screen_timeout_minutes;
    bool reduced_motion;
} buddy_ui_bootstrap_t;

typedef bool (*buddy_ui_write_record_fn)(void *context, const char *relative_path,
                                         unsigned schema_version, const char *payload,
                                         size_t payload_size);
typedef bool (*buddy_ui_remove_record_fn)(void *context, const char *relative_path);
typedef bool (*buddy_ui_enqueue_event_fn)(void *context, const char *stable_event_id,
                                          const char *payload, size_t payload_size);
typedef bool (*buddy_ui_new_event_id_fn)(void *context, const char *event_prefix, char *output,
                                         size_t output_capacity);
typedef uint64_t (*buddy_ui_monotonic_ms_fn)(void *context);
typedef struct {
    char ssid[33];
    int signal_dbm;
    int security;
    bool saved;
    bool current;
} buddy_ui_wifi_network_t;
typedef bool (*buddy_ui_wifi_scan_fn)(void *context);
typedef size_t (*buddy_ui_wifi_network_count_fn)(void *context);
typedef bool (*buddy_ui_wifi_network_fn)(void *context, size_t index,
                                         buddy_ui_wifi_network_t *network);
typedef bool (*buddy_ui_wifi_connect_fn)(void *context, const char *ssid, const char *password,
                                         bool save, bool hidden);
typedef bool (*buddy_ui_wifi_forget_fn)(void *context, const char *ssid);
typedef bool (*buddy_ui_request_fn)(void *context);
typedef void (*buddy_ui_activity_state_fn)(void *context, bool timed_session, bool unsaved_session);
typedef bool (*buddy_ui_set_u8_fn)(void *context, uint8_t value);
typedef bool (*buddy_ui_set_bool_fn)(void *context, bool value);
typedef struct {
    char id[129];
    char title[101];
    char source[201];
    size_t card_count;
    bool pinned;
} buddy_ui_flash_section_t;
typedef struct {
    char id[129];
    char front[501];
    char back[801];
    char clue[801];
} buddy_ui_flash_card_t;
typedef size_t (*buddy_ui_flash_section_count_fn)(void *context);
typedef bool (*buddy_ui_flash_section_fn)(void *context, size_t index,
                                          buddy_ui_flash_section_t *section);
typedef bool (*buddy_ui_flash_card_fn)(void *context, size_t section_index, size_t card_index,
                                       buddy_ui_flash_card_t *card);
typedef bool (*buddy_ui_sha256_hex_fn)(void *context, const char *input, size_t input_size,
                                       char output[65]);
typedef struct {
    int attempts;
    int correct;
    int correct_streak;
    uint32_t best_keyboard_response_ms;
    bool has_best_keyboard_response;
} buddy_ui_mastery_t;
typedef bool (*buddy_ui_mastery_fn)(void *context, int factor, int multiplier,
                                    buddy_ui_mastery_t *mastery);
typedef struct {
    uint32_t p4_revision;
    char c6_firmware_version[32];
    size_t free_internal_heap;
    size_t minimum_internal_heap;
    size_t free_psram;
    size_t minimum_psram;
    size_t filesystem_free;
    bool filesystem_low;
    int reset_reason;
} buddy_ui_diagnostics_t;
typedef bool (*buddy_ui_diagnostics_fn)(void *context, buddy_ui_diagnostics_t *diagnostics);

typedef struct {
    void *context;
    buddy_ui_write_record_fn write_record;
    buddy_ui_remove_record_fn remove_record;
    buddy_ui_enqueue_event_fn enqueue_event;
    buddy_ui_new_event_id_fn new_event_id;
    buddy_ui_monotonic_ms_fn monotonic_ms;
    buddy_ui_wifi_scan_fn wifi_scan;
    buddy_ui_wifi_network_count_fn wifi_network_count;
    buddy_ui_wifi_network_fn wifi_network;
    buddy_ui_wifi_connect_fn wifi_connect;
    buddy_ui_wifi_forget_fn wifi_forget;
    buddy_ui_request_fn request_pairing;
    buddy_ui_request_fn request_sync;
    buddy_ui_request_fn request_firmware_check;
    buddy_ui_request_fn request_ota_install;
    buddy_ui_request_fn request_reboot;
    buddy_ui_activity_state_fn activity_state;
    buddy_ui_set_u8_fn set_brightness;
    buddy_ui_set_u8_fn set_screen_timeout;
    buddy_ui_set_bool_fn set_reduced_motion;
    buddy_ui_request_fn factory_reset;
    buddy_ui_flash_section_count_fn flash_section_count;
    buddy_ui_flash_section_fn flash_section;
    buddy_ui_flash_card_fn flash_card;
    buddy_ui_sha256_hex_fn sha256_hex;
    buddy_ui_mastery_fn mastery;
    buddy_ui_diagnostics_fn diagnostics;
} buddy_ui_services_t;

/** Install persistence/time services before starting the UI. May be null for the simulator. */
void buddy_ui_set_services(const buddy_ui_services_t *services);

/** Build the complete application shell on an already locked 800x480 display. */
bool buddy_ui_start(lv_display_t *display, const buddy_ui_bootstrap_t *bootstrap);

/** Stable diagnostic name for the currently rendered surface. */
const char *buddy_ui_current_screen_name(void);

/** Thread-safe callers must acquire the board display lock before updating. */
void buddy_ui_update_status(bool online, size_t queued_events, const char *last_sync_text);

/** Connectivity state values use the buddy_connectivity_state_t numeric contract. */
void buddy_ui_update_connectivity(int state, const char *ssid, const char *ipv4, int rssi,
                                  uint32_t revision);

void buddy_ui_update_device(bool paired, int state, const char *pairing_code, const char *claim_url,
                            const char *child_name, const char *device_name,
                            const char *flash_authoring_url, const char *last_error,
                            uint32_t content_revision, size_t queued_events, uint32_t revision);

/** OTA state values use the buddy::ota::State numeric contract. */
void buddy_ui_update_ota(int state, const char *version, const char *minimum_version,
                         const char *release_notes, const char *message, size_t downloaded,
                         size_t total_size, bool mandatory, uint32_t revision);

void buddy_ui_update_mastery(size_t fluent_facts, int xp_total, int best_60_seconds,
                             int best_120_seconds, uint32_t revision);

/** Deterministic host-only interaction assertions; never called by production firmware. */
bool buddy_ui_run_interaction_self_test(void);

/** Render deterministic host-simulator state. Returns false for unknown scenarios. */
bool buddy_ui_render_scenario(const char *scenario_name);

#ifdef __cplusplus
}
#endif
