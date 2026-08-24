#include "buddy_board.h"
#include "esp_err.h"

extern "C" void app_main(void)
{
    ESP_ERROR_CHECK(buddy_board_run_hardware_proof());
}
