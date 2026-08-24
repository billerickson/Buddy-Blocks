#pragma once

#include <stdint.h>

#include "esp_err.h"
#include "lvgl.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    lv_display_t *display;
} buddy_board_runtime_t;

esp_err_t buddy_board_initialize(buddy_board_runtime_t *runtime);
esp_err_t buddy_board_start_background_services(void);
esp_err_t buddy_board_display_lock(uint32_t timeout_ms);
void buddy_board_display_unlock(void);
/** Apply the configured awake brightness immediately (10..100 percent). */
esp_err_t buddy_board_set_brightness(uint8_t brightness_percent);
/** Configure dim/off after 0 (never), 2, 5, or 10 inactive minutes. */
esp_err_t buddy_board_set_screen_timeout(uint8_t timeout_minutes);
/** Keep the display awake during a critical visible operation such as OTA. */
void buddy_board_set_display_wake_lock(bool enabled);

/** Keep the standalone Milestone 0 grid available for bench diagnostics. */
esp_err_t buddy_board_run_hardware_proof(void);

#ifdef __cplusplus
}
#endif
