#pragma once

#include "esp_err.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Run the Milestone 0 physical hardware proof.
 *
 * This function initializes local storage and the 800x480 UI before starting
 * optional Wi-Fi work. It records diagnostics but never marks a hardware test
 * as passed; physical observations belong in the evidence log.
 */
esp_err_t buddy_board_run_hardware_proof(void);

#ifdef __cplusplus
}
#endif
