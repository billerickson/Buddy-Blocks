#pragma once

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#include "esp_err.h"

#ifdef __cplusplus
extern "C" {
#endif

#define BUDDY_CONNECTIVITY_MAX_NETWORKS 5
#define BUDDY_CONNECTIVITY_MAX_SCAN_RESULTS 20

typedef enum {
    BUDDY_CONNECTIVITY_STOPPED = 0,
    BUDDY_CONNECTIVITY_IDLE,
    BUDDY_CONNECTIVITY_SCANNING,
    BUDDY_CONNECTIVITY_CONNECTING,
    BUDDY_CONNECTIVITY_CONNECTED,
    BUDDY_CONNECTIVITY_WRONG_PASSWORD,
    BUDDY_CONNECTIVITY_NO_INTERNET,
    BUDDY_CONNECTIVITY_CAPTIVE_PORTAL,
    BUDDY_CONNECTIVITY_FAILED,
} buddy_connectivity_state_t;

typedef enum {
    BUDDY_WIFI_OPEN = 0,
    BUDDY_WIFI_WPA2_PERSONAL,
    BUDDY_WIFI_WPA3_PERSONAL,
    BUDDY_WIFI_UNSUPPORTED,
} buddy_wifi_security_t;

typedef struct {
    char ssid[33];
    int8_t rssi;
    uint8_t channel;
    buddy_wifi_security_t security;
    bool saved;
    bool current;
} buddy_wifi_network_t;

typedef struct {
    buddy_connectivity_state_t state;
    char ssid[33];
    char ipv4[16];
    int8_t rssi;
    uint8_t disconnect_reason;
    size_t scan_result_count;
    size_t saved_network_count;
    uint32_t revision;
} buddy_connectivity_snapshot_t;

/** Initialize ESP-Hosted Wi-Fi and return without waiting for an access point. */
esp_err_t buddy_connectivity_initialize(void);

/** Commands are queued and never wait for a scan or association to finish. */
esp_err_t buddy_connectivity_request_scan(void);
esp_err_t buddy_connectivity_request_connect(const char *ssid, const char *password,
                                             bool save_network, bool hidden);
esp_err_t buddy_connectivity_request_forget(const char *ssid);
esp_err_t buddy_connectivity_request_disconnect(void);

/** Copies a coherent redacted status or scan row. No password is exposed. */
esp_err_t buddy_connectivity_snapshot(buddy_connectivity_snapshot_t *snapshot);
esp_err_t buddy_connectivity_scan_result(size_t index, buddy_wifi_network_t *network);

/** Used by the HTTPS probe to distinguish associated-without-internet outcomes. */
void buddy_connectivity_report_internet(bool reachable, bool captive_portal);

#ifdef __cplusplus
}
#endif
