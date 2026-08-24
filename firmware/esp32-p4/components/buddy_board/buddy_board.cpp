#include "buddy_board.h"

#include <algorithm>
#include <atomic>
#include <cinttypes>
#include <cstdio>
#include <cstring>
#include <sys/unistd.h>

#include "bsp/esp-bsp.h"
#include "bsp/touch.h"
#include "esp_cache.h"
#include "esp_check.h"
#include "esp_chip_info.h"
#include "esp_flash.h"
#include "esp_heap_caps.h"
#include "esp_lcd_panel_ops.h"
#include "esp_lcd_touch.h"
#include "esp_littlefs.h"
#include "esp_log.h"
#include "esp_psram.h"
#include "esp_random.h"
#include "esp_system.h"
#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/semphr.h"
#include "freertos/task.h"
#include "lvgl.h"
#include "nvs.h"
#include "nvs_flash.h"
#include "sdkconfig.h"

namespace {

constexpr int kLogicalWidth = 800;
constexpr int kLogicalHeight = 480;
constexpr int kNativeWidth = 480;
constexpr int kNativeHeight = 800;
constexpr size_t kLogicalFrameBytes = kLogicalWidth * kLogicalHeight * sizeof(uint16_t);
constexpr size_t kNativeFrameBytes = kNativeWidth * kNativeHeight * sizeof(uint16_t);
constexpr size_t kMetricSampleCount = 128;
constexpr char kLittleFsLabel[] = "littlefs";
constexpr char kLittleFsBasePath[] = "/littlefs";
constexpr char kSystemNamespace[] = "buddy_system";
constexpr uint32_t kProbeMagic = 0x42425030; // "BBP0"
constexpr uint32_t kProbeSchema = 1;
constexpr char kTag[] = "buddy_m0";
#if CONFIG_BUDDY_TOUCH_SWAP_XY
constexpr bool kTouchSwapXy = true;
#else
constexpr bool kTouchSwapXy = false;
#endif
#if CONFIG_BUDDY_TOUCH_MIRROR_X
constexpr bool kTouchMirrorX = true;
#else
constexpr bool kTouchMirrorX = false;
#endif
#if CONFIG_BUDDY_TOUCH_MIRROR_Y
constexpr bool kTouchMirrorY = true;
#else
constexpr bool kTouchMirrorY = false;
#endif

struct StorageProbe {
    uint32_t magic;
    uint32_t schema;
    uint32_t boot_nonce;
    uint32_t checksum;
};

struct CpuFlushJob {
    lv_display_t *display;
    const uint16_t *source;
    int64_t queued_at_us;
};

struct CpuDisplayContext {
    lv_display_t *display = nullptr;
    lv_indev_t *input = nullptr;
    esp_lcd_panel_handle_t panel = nullptr;
    esp_lcd_touch_handle_t touch = nullptr;
    uint16_t *source_a = nullptr;
    uint16_t *source_b = nullptr;
    uint16_t *native = nullptr;
    QueueHandle_t flush_queue = nullptr;
};

struct SampleSeries {
    uint64_t total_us = 0;
    uint32_t count = 0;
    uint32_t max_us = 0;
    uint32_t samples[kMetricSampleCount]{};
    uint32_t sample_cursor = 0;
    uint32_t sample_fill = 0;
};

struct DisplayMetrics {
    SampleSeries refresh;
    SampleSeries render;
    SampleSeries flush_callback;
    SampleSeries flush_wait;
    SampleSeries cpu_rotation;
    SampleSeries cpu_pipeline;
    SampleSeries touch_dispatch;
    int64_t refresh_started_us = 0;
    int64_t render_started_us = 0;
    int64_t flush_started_us = 0;
    int64_t flush_wait_started_us = 0;
};

CpuDisplayContext s_cpu;
DisplayMetrics s_metrics;
// Diagnostics run in one task. Keep its fixed-size working buffers out of that
// task's stack: DisplayMetrics is roughly 3.7 KiB and the percentile scratch
// buffer is another 512 bytes.
DisplayMetrics s_metrics_snapshot;
uint32_t s_percentile_scratch[kMetricSampleCount]{};
portMUX_TYPE s_metrics_lock = portMUX_INITIALIZER_UNLOCKED;
std::atomic<uint32_t> s_touch_count{0};
std::atomic<int64_t> s_last_touch_report_us{0};
lv_obj_t *s_touch_status_label = nullptr;
#if CONFIG_BUDDY_ROTATION_PATH_CPU
SemaphoreHandle_t s_cpu_lvgl_mutex = nullptr;
#endif
lv_display_t *s_board_display = nullptr;
bool s_background_services_started = false;
std::atomic<uint8_t> s_awake_brightness{80};
std::atomic<uint8_t> s_timeout_minutes{5};
std::atomic<int> s_applied_brightness{-1};
std::atomic<bool> s_display_wake_lock{false};

const char *rotation_path_name()
{
#if CONFIG_BUDDY_ROTATION_PATH_CPU
    return "deferred-cpu";
#elif CONFIG_BUDDY_ROTATION_PATH_PPA
    return "ppa";
#else
    return "waveshare-bsp";
#endif
}

void record_sample(SampleSeries &series, uint32_t duration_us)
{
    series.total_us += duration_us;
    ++series.count;
    series.max_us = std::max(series.max_us, duration_us);
    series.samples[series.sample_cursor] = duration_us;
    series.sample_cursor = (series.sample_cursor + 1) % kMetricSampleCount;
    series.sample_fill = std::min<uint32_t>(series.sample_fill + 1, kMetricSampleCount);
}

uint32_t sample_average(const SampleSeries &series)
{
    return series.count == 0 ? 0 : static_cast<uint32_t>(series.total_us / series.count);
}

uint32_t sample_p95(const SampleSeries &series)
{
    if (series.sample_fill == 0) {
        return 0;
    }
    std::copy_n(series.samples, series.sample_fill, s_percentile_scratch);
    std::sort(s_percentile_scratch, s_percentile_scratch + series.sample_fill);
    const size_t index = (static_cast<size_t>(series.sample_fill) * 95 + 99) / 100 - 1;
    return s_percentile_scratch[index];
}

void display_metrics_callback(lv_event_t *event)
{
    const lv_event_code_t code = lv_event_get_code(event);
    const int64_t now = esp_timer_get_time();
    portENTER_CRITICAL(&s_metrics_lock);
    switch (code) {
    case LV_EVENT_REFR_START:
        s_metrics.refresh_started_us = now;
        break;
    case LV_EVENT_REFR_READY:
        if (s_metrics.refresh_started_us > 0) {
            record_sample(s_metrics.refresh,
                          static_cast<uint32_t>(now - s_metrics.refresh_started_us));
            s_metrics.refresh_started_us = 0;
        }
        break;
    case LV_EVENT_RENDER_START:
        s_metrics.render_started_us = now;
        break;
    case LV_EVENT_RENDER_READY:
        if (s_metrics.render_started_us > 0) {
            record_sample(s_metrics.render,
                          static_cast<uint32_t>(now - s_metrics.render_started_us));
            s_metrics.render_started_us = 0;
        }
        break;
    case LV_EVENT_FLUSH_START:
        s_metrics.flush_started_us = now;
        break;
    case LV_EVENT_FLUSH_FINISH:
        if (s_metrics.flush_started_us > 0) {
            record_sample(s_metrics.flush_callback,
                          static_cast<uint32_t>(now - s_metrics.flush_started_us));
            s_metrics.flush_started_us = 0;
        }
        break;
    case LV_EVENT_FLUSH_WAIT_START:
        s_metrics.flush_wait_started_us = now;
        break;
    case LV_EVENT_FLUSH_WAIT_FINISH:
        if (s_metrics.flush_wait_started_us > 0) {
            record_sample(s_metrics.flush_wait,
                          static_cast<uint32_t>(now - s_metrics.flush_wait_started_us));
            s_metrics.flush_wait_started_us = 0;
        }
        break;
    default:
        break;
    }
    portEXIT_CRITICAL(&s_metrics_lock);
}

uint32_t fnv1a(const void *data, size_t length)
{
    const auto *bytes = static_cast<const uint8_t *>(data);
    uint32_t value = 2166136261u;
    for (size_t index = 0; index < length; ++index) {
        value ^= bytes[index];
        value *= 16777619u;
    }
    return value;
}

bool probe_is_valid(const StorageProbe &probe)
{
    StorageProbe candidate = probe;
    const uint32_t expected = candidate.checksum;
    candidate.checksum = 0;
    return candidate.magic == kProbeMagic && candidate.schema == kProbeSchema &&
           fnv1a(&candidate, sizeof(candidate)) == expected;
}

esp_err_t read_previous_storage_probe()
{
    constexpr char path[] = "/littlefs/m0-storage-probe.bin";
    FILE *file = std::fopen(path, "rb");
    if (file == nullptr) {
        ESP_LOGW(kTag, "No previous LittleFS proof record (first boot is expected)");
        return ESP_OK;
    }

    StorageProbe probe{};
    const size_t read = std::fread(&probe, 1, sizeof(probe), file);
    std::fclose(file);
    if (read != sizeof(probe) || !probe_is_valid(probe)) {
        ESP_LOGE(kTag, "Previous LittleFS proof record is corrupt");
        return ESP_ERR_INVALID_CRC;
    }

    ESP_LOGI(kTag, "Previous LittleFS proof record verified (nonce suffix=%04" PRIx32 ")",
             probe.boot_nonce & 0xffffu);
    return ESP_OK;
}

esp_err_t write_atomic_storage_probe()
{
    constexpr char next_path[] = "/littlefs/m0-storage-probe.next";
    constexpr char final_path[] = "/littlefs/m0-storage-probe.bin";

    StorageProbe probe{
        .magic = kProbeMagic,
        .schema = kProbeSchema,
        .boot_nonce = esp_random(),
        .checksum = 0,
    };
    probe.checksum = fnv1a(&probe, sizeof(probe));

    FILE *file = std::fopen(next_path, "wb");
    ESP_RETURN_ON_FALSE(file != nullptr, ESP_FAIL, kTag,
                        "Could not create LittleFS proof temp file");
    const bool wrote_all = std::fwrite(&probe, 1, sizeof(probe), file) == sizeof(probe);
    const bool flushed = std::fflush(file) == 0;
    const bool synced = flushed && fsync(fileno(file)) == 0;
    const bool closed = std::fclose(file) == 0;
    ESP_RETURN_ON_FALSE(wrote_all && flushed && synced && closed, ESP_FAIL, kTag,
                        "LittleFS proof temp write/fsync failed");
    ESP_RETURN_ON_FALSE(std::rename(next_path, final_path) == 0, ESP_FAIL, kTag,
                        "LittleFS proof atomic rename failed");

    ESP_LOGI(kTag, "LittleFS proof write/fsync/rename completed");
    return read_previous_storage_probe();
}

esp_err_t init_storage()
{
    esp_vfs_littlefs_conf_t config{};
    config.base_path = kLittleFsBasePath;
    config.partition_label = kLittleFsLabel;
    config.format_if_mount_failed = false;
    config.dont_mount = false;
    esp_err_t mount_result = esp_vfs_littlefs_register(&config);
    if (mount_result != ESP_OK) {
        nvs_handle_t handle = 0;
        uint8_t initialized = 0;
        const esp_err_t open = nvs_open(kSystemNamespace, NVS_READWRITE, &handle);
        if (open == ESP_OK) {
            (void)nvs_get_u8(handle, "littlefs_ready", &initialized);
            nvs_close(handle);
        }
        ESP_RETURN_ON_FALSE(open == ESP_OK, open, kTag,
                            "Could not inspect the LittleFS first-boot marker");
        ESP_RETURN_ON_FALSE(initialized == 0, mount_result, kTag,
                            "LittleFS mount failed after prior initialization; refusing to format");
        ESP_LOGW(kTag, "Blank first boot detected; formatting LittleFS exactly once");
        ESP_RETURN_ON_ERROR(esp_littlefs_format(kLittleFsLabel), kTag,
                            "First-boot LittleFS format failed");
        ESP_RETURN_ON_ERROR(esp_vfs_littlefs_register(&config), kTag,
                            "LittleFS mount after first-boot format failed");
    }

    nvs_handle_t marker = 0;
    ESP_RETURN_ON_ERROR(nvs_open(kSystemNamespace, NVS_READWRITE, &marker), kTag,
                        "Could not open LittleFS marker");
    esp_err_t marker_result = nvs_set_u8(marker, "littlefs_ready", 1);
    if (marker_result == ESP_OK)
        marker_result = nvs_commit(marker);
    nvs_close(marker);
    ESP_RETURN_ON_ERROR(marker_result, kTag, "Could not retain LittleFS marker");

    size_t total = 0;
    size_t used = 0;
    ESP_RETURN_ON_ERROR(esp_littlefs_info(kLittleFsLabel, &total, &used), kTag,
                        "LittleFS size query failed");
    ESP_LOGI(kTag, "LittleFS mounted: total=%u used=%u", static_cast<unsigned>(total),
             static_cast<unsigned>(used));
    ESP_RETURN_ON_ERROR(read_previous_storage_probe(), kTag, "Previous LittleFS proof failed");
    return write_atomic_storage_probe();
}

esp_err_t init_nvs()
{
    esp_err_t result = nvs_flash_init();
    if (result == ESP_ERR_NVS_NO_FREE_PAGES || result == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_RETURN_ON_ERROR(nvs_flash_erase(), kTag, "NVS recovery erase failed");
        result = nvs_flash_init();
    }
    return result;
}

void log_hardware_identity()
{
    esp_chip_info_t chip{};
    esp_chip_info(&chip);
    uint32_t flash_bytes = 0;
    const esp_err_t flash_result = esp_flash_get_size(nullptr, &flash_bytes);
    const size_t psram_bytes = esp_psram_get_size();

    ESP_LOGI(kTag, "BUILD EVIDENCE ONLY: chip model=%d cores=%d revision=%d features=0x%" PRIx32,
             chip.model, chip.cores, chip.revision, chip.features);
    if (flash_result == ESP_OK) {
        ESP_LOGI(kTag, "External NOR bytes=%" PRIu32, flash_bytes);
    } else {
        ESP_LOGE(kTag, "External NOR size query failed: %s", esp_err_to_name(flash_result));
    }
    ESP_LOGI(kTag, "PSRAM bytes=%u", static_cast<unsigned>(psram_bytes));
    ESP_LOGI(kTag, "Reset reason=%d rotation candidate=%s", esp_reset_reason(),
             rotation_path_name());
}

#if CONFIG_BUDDY_ROTATION_PATH_CPU
void update_rotation_metrics(uint32_t rotation_us, uint32_t flush_us)
{
    portENTER_CRITICAL(&s_metrics_lock);
    record_sample(s_metrics.cpu_rotation, rotation_us);
    record_sample(s_metrics.cpu_pipeline, flush_us);
    portEXIT_CRITICAL(&s_metrics_lock);
}

void rotate_landscape_to_native(const uint16_t *source, uint16_t *destination)
{
    for (int y = 0; y < kLogicalHeight; ++y) {
        for (int x = 0; x < kLogicalWidth; ++x) {
#if CONFIG_BUDDY_CPU_ROTATE_CLOCKWISE
            const int native_x = kLogicalHeight - 1 - y;
            const int native_y = x;
#else
            const int native_x = y;
            const int native_y = kLogicalWidth - 1 - x;
#endif
            destination[native_y * kNativeWidth + native_x] = source[y * kLogicalWidth + x];
        }
    }
}

void cpu_rotation_task(void *)
{
    CpuFlushJob job{};
    while (true) {
        if (xQueueReceive(s_cpu.flush_queue, &job, portMAX_DELAY) != pdTRUE) {
            continue;
        }

        const int64_t rotation_started = esp_timer_get_time();
        rotate_landscape_to_native(job.source, s_cpu.native);
        const int64_t rotation_finished = esp_timer_get_time();
        const esp_err_t sync_result =
            esp_cache_msync(s_cpu.native, kNativeFrameBytes,
                            ESP_CACHE_MSYNC_FLAG_DIR_C2M | ESP_CACHE_MSYNC_FLAG_TYPE_DATA);
        if (sync_result != ESP_OK) {
            ESP_LOGE(kTag, "CPU rotation cache sync failed: %s", esp_err_to_name(sync_result));
        }
        const esp_err_t draw_result =
            esp_lcd_panel_draw_bitmap(s_cpu.panel, 0, 0, kNativeWidth, kNativeHeight, s_cpu.native);
        const int64_t flush_finished = esp_timer_get_time();
        if (draw_result != ESP_OK) {
            ESP_LOGE(kTag, "CPU rotation panel flush failed: %s", esp_err_to_name(draw_result));
        }

        update_rotation_metrics(static_cast<uint32_t>(rotation_finished - rotation_started),
                                static_cast<uint32_t>(flush_finished - job.queued_at_us));
        lv_display_flush_ready(job.display);
    }
}

void cpu_flush_callback(lv_display_t *display, const lv_area_t *area, uint8_t *pixel_map)
{
    if (area->x1 != 0 || area->y1 != 0 || area->x2 != kLogicalWidth - 1 ||
        area->y2 != kLogicalHeight - 1) {
        ESP_LOGE(kTag, "CPU rotation requires a full 800x480 flush; got (%d,%d)-(%d,%d)", area->x1,
                 area->y1, area->x2, area->y2);
        lv_display_flush_ready(display);
        return;
    }

    CpuFlushJob job{
        .display = display,
        .source = reinterpret_cast<const uint16_t *>(pixel_map),
        .queued_at_us = esp_timer_get_time(),
    };
    if (xQueueSend(s_cpu.flush_queue, &job, portMAX_DELAY) != pdTRUE) {
        ESP_LOGE(kTag, "CPU rotation flush queue rejected a frame");
        lv_display_flush_ready(display);
    }
}

void cpu_touch_read_callback(lv_indev_t *input, lv_indev_data_t *data)
{
    auto *context = static_cast<CpuDisplayContext *>(lv_indev_get_user_data(input));
    esp_lcd_touch_point_data_t point{};
    uint8_t points = 0;

    const esp_err_t read_result = esp_lcd_touch_read_data(context->touch);
    const esp_err_t data_result = read_result == ESP_OK
                                      ? esp_lcd_touch_get_data(context->touch, &point, &points, 1)
                                      : read_result;
    if (data_result == ESP_OK && points > 0) {
        data->point.x = point.x;
        data->point.y = point.y;
        data->state = LV_INDEV_STATE_PRESSED;
        s_last_touch_report_us.store(esp_timer_get_time());
    } else {
        data->state = LV_INDEV_STATE_RELEASED;
    }
}

uint32_t lvgl_tick_ms()
{
    return static_cast<uint32_t>(esp_timer_get_time() / 1000);
}

void cpu_lvgl_task(void *)
{
    while (true) {
        xSemaphoreTakeRecursive(s_cpu_lvgl_mutex, portMAX_DELAY);
        const uint32_t suggested = static_cast<uint32_t>(lv_timer_handler());
        xSemaphoreGiveRecursive(s_cpu_lvgl_mutex);
        const uint32_t delay_ms = std::clamp<uint32_t>(suggested, 5, 20);
        vTaskDelay(pdMS_TO_TICKS(delay_ms));
    }
}

esp_err_t init_cpu_display()
{
    bsp_display_config_t panel_config{};
    esp_lcd_panel_io_handle_t panel_io = nullptr;
    ESP_RETURN_ON_ERROR(bsp_display_new(&panel_config, &s_cpu.panel, &panel_io), kTag,
                        "BSP panel creation failed for CPU path");
    ESP_RETURN_ON_ERROR(esp_lcd_panel_disp_on_off(s_cpu.panel, true), kTag,
                        "Panel enable failed for CPU path");

    bsp_display_cfg_t touch_config{};
    touch_config.touch_flags.swap_xy = kTouchSwapXy;
    touch_config.touch_flags.mirror_x = kTouchMirrorX;
    touch_config.touch_flags.mirror_y = kTouchMirrorY;
    ESP_RETURN_ON_ERROR(bsp_touch_new(&touch_config, &s_cpu.touch), kTag,
                        "GT911 creation failed for CPU path");

    s_cpu.source_a = static_cast<uint16_t *>(
        heap_caps_aligned_alloc(64, kLogicalFrameBytes, MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT));
    s_cpu.source_b = static_cast<uint16_t *>(
        heap_caps_aligned_alloc(64, kLogicalFrameBytes, MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT));
    s_cpu.native = static_cast<uint16_t *>(
        heap_caps_aligned_alloc(64, kNativeFrameBytes, MALLOC_CAP_SPIRAM | MALLOC_CAP_8BIT));
    ESP_RETURN_ON_FALSE(s_cpu.source_a != nullptr && s_cpu.source_b != nullptr &&
                            s_cpu.native != nullptr,
                        ESP_ERR_NO_MEM, kTag, "Could not allocate three full RGB565 PSRAM buffers");
    std::memset(s_cpu.source_a, 0, kLogicalFrameBytes);
    std::memset(s_cpu.source_b, 0, kLogicalFrameBytes);
    std::memset(s_cpu.native, 0, kNativeFrameBytes);

    s_cpu.flush_queue = xQueueCreate(1, sizeof(CpuFlushJob));
    ESP_RETURN_ON_FALSE(s_cpu.flush_queue != nullptr, ESP_ERR_NO_MEM, kTag,
                        "Could not create CPU flush queue");
    s_cpu_lvgl_mutex = xSemaphoreCreateRecursiveMutex();
    ESP_RETURN_ON_FALSE(s_cpu_lvgl_mutex != nullptr, ESP_ERR_NO_MEM, kTag,
                        "Could not create CPU LVGL mutex");
    ESP_RETURN_ON_FALSE(xTaskCreate(cpu_rotation_task, "buddy_rotate", 6144, nullptr, 9, nullptr) ==
                            pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Could not create CPU rotation task");

    lv_init();
    lv_tick_set_cb(lvgl_tick_ms);
    s_cpu.display = lv_display_create(kLogicalWidth, kLogicalHeight);
    ESP_RETURN_ON_FALSE(s_cpu.display != nullptr, ESP_ERR_NO_MEM, kTag,
                        "Could not create LVGL display");
    lv_display_set_color_format(s_cpu.display, LV_COLOR_FORMAT_RGB565);
    lv_display_set_buffers(s_cpu.display, s_cpu.source_a, s_cpu.source_b, kLogicalFrameBytes,
                           LV_DISPLAY_RENDER_MODE_FULL);
    lv_display_set_flush_cb(s_cpu.display, cpu_flush_callback);

    s_cpu.input = lv_indev_create();
    ESP_RETURN_ON_FALSE(s_cpu.input != nullptr, ESP_ERR_NO_MEM, kTag,
                        "Could not create LVGL touch device");
    lv_indev_set_type(s_cpu.input, LV_INDEV_TYPE_POINTER);
    lv_indev_set_display(s_cpu.input, s_cpu.display);
    lv_indev_set_user_data(s_cpu.input, &s_cpu);
    lv_indev_set_read_cb(s_cpu.input, cpu_touch_read_callback);
    return ESP_OK;
}
#endif

#if CONFIG_BUDDY_ROTATION_PATH_PPA
lv_display_t *s_adapter_display = nullptr;
esp_lcd_panel_handle_t s_adapter_panel = nullptr;
esp_lcd_touch_handle_t s_adapter_touch = nullptr;

esp_err_t init_ppa_display()
{
    esp_lv_adapter_config_t adapter_config = ESP_LV_ADAPTER_DEFAULT_CONFIG();
    ESP_RETURN_ON_ERROR(esp_lv_adapter_init(&adapter_config), kTag, "PPA adapter init failed");

    bsp_display_config_t panel_config{};
    esp_lcd_panel_io_handle_t panel_io = nullptr;
    ESP_RETURN_ON_ERROR(bsp_display_new(&panel_config, &s_adapter_panel, &panel_io), kTag,
                        "BSP panel creation failed for PPA path");

    esp_lv_adapter_display_config_t display_config{};
    display_config.panel = s_adapter_panel;
    display_config.panel_io = panel_io;
    display_config.profile.interface = ESP_LV_ADAPTER_PANEL_IF_MIPI_DSI;
    display_config.profile.rotation = ESP_LV_ADAPTER_ROTATE_90;
    display_config.profile.hor_res = kNativeWidth;
    display_config.profile.ver_res = kNativeHeight;
    display_config.profile.buffer_height = kLogicalHeight;
    display_config.profile.use_psram = true;
    display_config.profile.enable_ppa_accel = true;
    display_config.profile.require_double_buffer = true;
    display_config.tear_avoid_mode = ESP_LV_ADAPTER_TEAR_AVOID_MODE_TRIPLE_PARTIAL;
    s_adapter_display = esp_lv_adapter_register_display(&display_config);
    ESP_RETURN_ON_FALSE(s_adapter_display != nullptr, ESP_FAIL, kTag,
                        "PPA display registration failed");

    bsp_display_cfg_t touch_config{};
    touch_config.touch_flags.swap_xy = kTouchSwapXy;
    touch_config.touch_flags.mirror_x = kTouchMirrorX;
    touch_config.touch_flags.mirror_y = kTouchMirrorY;
    ESP_RETURN_ON_ERROR(bsp_touch_new(&touch_config, &s_adapter_touch), kTag,
                        "GT911 creation failed for PPA path");
    const esp_lv_adapter_touch_config_t input_config =
        ESP_LV_ADAPTER_TOUCH_DEFAULT_CONFIG(s_adapter_display, s_adapter_touch);
    ESP_RETURN_ON_FALSE(esp_lv_adapter_register_touch(&input_config) != nullptr, ESP_FAIL, kTag,
                        "PPA touch registration failed");
    ESP_RETURN_ON_ERROR(esp_lv_adapter_start(), kTag, "PPA adapter start failed");
    ESP_RETURN_ON_ERROR(esp_lcd_panel_disp_on_off(s_adapter_panel, true), kTag,
                        "Panel enable failed for PPA path");
    return ESP_OK;
}
#endif

lv_display_t *init_display()
{
#if CONFIG_BUDDY_ROTATION_PATH_CPU
    if (init_cpu_display() != ESP_OK) {
        return nullptr;
    }
    return s_cpu.display;
#elif CONFIG_BUDDY_ROTATION_PATH_PPA
    if (init_ppa_display() != ESP_OK) {
        return nullptr;
    }
    return s_adapter_display;
#else
    bsp_display_cfg_t config{};
    config.lv_adapter_cfg = ESP_LV_ADAPTER_DEFAULT_CONFIG();
    config.rotation = ESP_LV_ADAPTER_ROTATE_90;
    config.tear_avoid_mode = ESP_LV_ADAPTER_TEAR_AVOID_MODE_TRIPLE_PARTIAL;
    config.touch_flags.swap_xy = kTouchSwapXy;
    config.touch_flags.mirror_x = kTouchMirrorX;
    config.touch_flags.mirror_y = kTouchMirrorY;
    return bsp_display_start_with_config(&config);
#endif
}

esp_err_t lock_display(uint32_t timeout_ms)
{
#if CONFIG_BUDDY_ROTATION_PATH_CPU
    const TickType_t wait = timeout_ms == UINT32_MAX ? portMAX_DELAY : pdMS_TO_TICKS(timeout_ms);
    return xSemaphoreTakeRecursive(s_cpu_lvgl_mutex, wait) == pdTRUE ? ESP_OK : ESP_ERR_TIMEOUT;
#elif CONFIG_BUDDY_ROTATION_PATH_PPA
    return esp_lv_adapter_lock(timeout_ms);
#else
    return bsp_display_lock(timeout_ms);
#endif
}

void unlock_display()
{
#if CONFIG_BUDDY_ROTATION_PATH_CPU
    xSemaphoreGiveRecursive(s_cpu_lvgl_mutex);
#elif CONFIG_BUDDY_ROTATION_PATH_PPA
    esp_lv_adapter_unlock();
#else
    bsp_display_unlock();
#endif
}

void grid_event_callback(lv_event_t *event)
{
    const lv_event_code_t code = lv_event_get_code(event);
    lv_obj_t *button = static_cast<lv_obj_t *>(lv_event_get_target(event));
    if (code == LV_EVENT_PRESSED) {
        lv_obj_set_style_bg_color(button, lv_color_hex(0xFFD84D), LV_PART_MAIN);
        const int64_t report_at = s_last_touch_report_us.load();
        if (report_at > 0) {
            const int64_t callback_delay = esp_timer_get_time() - report_at;
            portENTER_CRITICAL(&s_metrics_lock);
            record_sample(s_metrics.touch_dispatch, static_cast<uint32_t>(callback_delay));
            portEXIT_CRITICAL(&s_metrics_lock);
            ESP_LOGI(kTag, "Touch callback delay=%" PRId64 "us (CPU-path internal sample)",
                     callback_delay);
        }
        return;
    }
    if (code != LV_EVENT_CLICKED) {
        return;
    }

    lv_obj_set_style_bg_color(button, lv_color_hex(0x18BCA4), LV_PART_MAIN);
    const uint32_t count = s_touch_count.fetch_add(1) + 1;
    if (s_touch_status_label != nullptr) {
        lv_label_set_text_fmt(s_touch_status_label,
                              "Tap all 15 targets + 4 corners + center | taps: %" PRIu32, count);
    }
}

void build_proof_ui(lv_display_t *display)
{
    lv_display_set_default(display);
    lv_obj_t *screen = lv_screen_active();
    lv_obj_remove_flag(screen, LV_OBJ_FLAG_SCROLLABLE);
    lv_obj_set_style_bg_color(screen, lv_color_hex(0xFFF1F7), LV_PART_MAIN);
    lv_obj_set_style_pad_all(screen, 0, LV_PART_MAIN);

    lv_obj_t *header = lv_obj_create(screen);
    lv_obj_set_pos(header, 0, 0);
    lv_obj_set_size(header, kLogicalWidth, 58);
    lv_obj_set_style_radius(header, 0, LV_PART_MAIN);
    lv_obj_set_style_border_width(header, 0, LV_PART_MAIN);
    lv_obj_set_style_bg_color(header, lv_color_hex(0x242134), LV_PART_MAIN);
    lv_obj_remove_flag(header, LV_OBJ_FLAG_SCROLLABLE);

    lv_obj_t *title = lv_label_create(header);
    lv_label_set_text_fmt(title, "Buddy Blocks hardware proof | %s | 800 x 480",
                          rotation_path_name());
    lv_obj_set_style_text_color(title, lv_color_hex(0xFFFFFF), LV_PART_MAIN);
    lv_obj_set_style_text_font(title, &lv_font_montserrat_24, LV_PART_MAIN);
    lv_obj_center(title);

    for (int row = 0; row < 3; ++row) {
        for (int column = 0; column < 5; ++column) {
            const int index = row * 5 + column;
            lv_obj_t *button = lv_button_create(screen);
            lv_obj_set_pos(button, 8 + column * 158, 68 + row * 108);
            lv_obj_set_size(button, 150, 96);
            lv_obj_set_style_radius(button, 14, LV_PART_MAIN);
            lv_obj_set_style_bg_color(button, lv_color_hex(0xFFFFFF), LV_PART_MAIN);
            lv_obj_set_style_bg_color(button, lv_color_hex(0xFFD84D),
                                      LV_PART_MAIN | LV_STATE_PRESSED);
            lv_obj_set_style_border_color(button, lv_color_hex(0x5B79FF), LV_PART_MAIN);
            lv_obj_set_style_border_width(button, 3, LV_PART_MAIN);
            lv_obj_add_event_cb(button, grid_event_callback, LV_EVENT_ALL,
                                reinterpret_cast<void *>(static_cast<intptr_t>(index)));

            char label_text[32];
            std::snprintf(label_text, sizeof(label_text), "Target %d\n(%d, %d)", index + 1,
                          column + 1, row + 1);
            lv_obj_t *label = lv_label_create(button);
            lv_label_set_text(label, label_text);
            lv_obj_set_style_text_align(label, LV_TEXT_ALIGN_CENTER, LV_PART_MAIN);
            lv_obj_set_style_text_color(label, lv_color_hex(0x242134), LV_PART_MAIN);
            lv_obj_set_style_text_font(label, &lv_font_montserrat_16, LV_PART_MAIN);
            lv_obj_center(label);
        }
    }

    lv_obj_t *footer = lv_obj_create(screen);
    lv_obj_set_pos(footer, 0, 400);
    lv_obj_set_size(footer, kLogicalWidth, 80);
    lv_obj_set_style_radius(footer, 0, LV_PART_MAIN);
    lv_obj_set_style_border_width(footer, 0, LV_PART_MAIN);
    lv_obj_set_style_bg_color(footer, lv_color_hex(0xF0FFF9), LV_PART_MAIN);
    lv_obj_remove_flag(footer, LV_OBJ_FLAG_SCROLLABLE);

    s_touch_status_label = lv_label_create(footer);
    lv_label_set_text(s_touch_status_label, "Tap all 15 targets + 4 corners + center | taps: 0");
    lv_obj_set_style_text_color(s_touch_status_label, lv_color_hex(0x645D79), LV_PART_MAIN);
    lv_obj_set_style_text_font(s_touch_status_label, &lv_font_montserrat_20, LV_PART_MAIN);
    lv_obj_center(s_touch_status_label);
}

void diagnostics_task(void *)
{
    while (true) {
        portENTER_CRITICAL(&s_metrics_lock);
        s_metrics_snapshot = s_metrics;
        portEXIT_CRITICAL(&s_metrics_lock);
        const DisplayMetrics &snapshot = s_metrics_snapshot;

        ESP_LOGI(kTag,
                 "metrics path=%s frames=%" PRIu32 " refresh_us(avg/p95/max)=%" PRIu32 "/%" PRIu32
                 "/%" PRIu32 " render_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32
                 " flush_cb_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32,
                 rotation_path_name(), snapshot.refresh.count, sample_average(snapshot.refresh),
                 sample_p95(snapshot.refresh), snapshot.refresh.max_us,
                 sample_average(snapshot.render), sample_p95(snapshot.render),
                 snapshot.render.max_us, sample_average(snapshot.flush_callback),
                 sample_p95(snapshot.flush_callback), snapshot.flush_callback.max_us);
        ESP_LOGI(kTag,
                 "metrics wait_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32
                 " cpu_rotate_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32
                 " cpu_pipeline_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32,
                 sample_average(snapshot.flush_wait), sample_p95(snapshot.flush_wait),
                 snapshot.flush_wait.max_us, sample_average(snapshot.cpu_rotation),
                 sample_p95(snapshot.cpu_rotation), snapshot.cpu_rotation.max_us,
                 sample_average(snapshot.cpu_pipeline), sample_p95(snapshot.cpu_pipeline),
                 snapshot.cpu_pipeline.max_us);
        ESP_LOGI(kTag,
                 "metrics touch_dispatch_us(avg/p95/max)=%" PRIu32 "/%" PRIu32 "/%" PRIu32
                 " touches=%" PRIu32 " heap_min=%u psram_free=%u psram_min=%u",
                 sample_average(snapshot.touch_dispatch), sample_p95(snapshot.touch_dispatch),
                 snapshot.touch_dispatch.max_us, s_touch_count.load(),
                 static_cast<unsigned>(heap_caps_get_minimum_free_size(MALLOC_CAP_INTERNAL)),
                 static_cast<unsigned>(heap_caps_get_free_size(MALLOC_CAP_SPIRAM)),
                 static_cast<unsigned>(heap_caps_get_minimum_free_size(MALLOC_CAP_SPIRAM)));
        vTaskDelay(pdMS_TO_TICKS(10000));
    }
}

void display_power_task(void *)
{
    while (true) {
        const uint8_t awake = s_awake_brightness.load();
        const uint8_t timeout_minutes = s_timeout_minutes.load();
        uint32_t inactive_ms = 0;
        if (s_board_display != nullptr && lock_display(250) == ESP_OK) {
            inactive_ms = lv_display_get_inactive_time(s_board_display);
            unlock_display();
        }
        int requested = awake;
        if (!s_display_wake_lock.load() && timeout_minutes > 0) {
            const uint32_t dim_at_ms = static_cast<uint32_t>(timeout_minutes) * 60U * 1000U;
            if (inactive_ms >= dim_at_ms + 10000U) {
                requested = 0;
            } else if (inactive_ms >= dim_at_ms) {
                requested = std::max<int>(10, awake / 4);
            }
        }
        if (s_applied_brightness.exchange(requested) != requested) {
            const esp_err_t result = bsp_display_brightness_set(requested);
            if (result != ESP_OK) {
                ESP_LOGE(kTag, "Backlight update to %d%% failed: %s", requested,
                         esp_err_to_name(result));
                s_applied_brightness.store(-1);
            }
        }
        vTaskDelay(pdMS_TO_TICKS(250));
    }
}

} // namespace

extern "C" esp_err_t buddy_board_initialize(buddy_board_runtime_t *runtime)
{
    ESP_RETURN_ON_FALSE(runtime != nullptr, ESP_ERR_INVALID_ARG, kTag, "Runtime is required");
    if (s_board_display != nullptr) {
        runtime->display = s_board_display;
        return ESP_OK;
    }
    log_hardware_identity();
    ESP_RETURN_ON_ERROR(init_nvs(), kTag, "NVS initialization failed");
    ESP_RETURN_ON_ERROR(init_storage(), kTag, "LittleFS proof failed");

    s_board_display = init_display();
    ESP_RETURN_ON_FALSE(s_board_display != nullptr, ESP_FAIL, kTag,
                        "Display initialization failed");
    const int horizontal = lv_display_get_horizontal_resolution(s_board_display);
    const int vertical = lv_display_get_vertical_resolution(s_board_display);
    ESP_RETURN_ON_FALSE(
        horizontal == kLogicalWidth && vertical == kLogicalHeight, ESP_ERR_INVALID_SIZE, kTag,
        "Landscape invariant failed: expected 800x480, got %dx%d", horizontal, vertical);
    ESP_RETURN_ON_ERROR(lock_display(UINT32_MAX), kTag, "Could not lock initialized display");
    lv_display_add_event_cb(s_board_display, display_metrics_callback, LV_EVENT_ALL, nullptr);
    unlock_display();
    ESP_RETURN_ON_ERROR(bsp_display_backlight_on(), kTag, "Backlight enable failed");
    runtime->display = s_board_display;
    return ESP_OK;
}

extern "C" esp_err_t buddy_board_start_background_services(void)
{
    ESP_RETURN_ON_FALSE(s_board_display != nullptr, ESP_ERR_INVALID_STATE, kTag,
                        "Board must be initialized before services start");
    if (s_background_services_started) {
        return ESP_OK;
    }

#if CONFIG_BUDDY_ROTATION_PATH_CPU
    ESP_RETURN_ON_FALSE(xTaskCreate(cpu_lvgl_task, "buddy_lvgl", 8192, nullptr, 8, nullptr) ==
                            pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Could not create LVGL task");
#endif
    ESP_RETURN_ON_FALSE(xTaskCreate(diagnostics_task, "buddy_diag", 4096, nullptr, 3, nullptr) ==
                            pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Could not create diagnostics task");
    ESP_RETURN_ON_FALSE(xTaskCreate(display_power_task, "buddy_power", 3072, nullptr, 3, nullptr) ==
                            pdPASS,
                        ESP_ERR_NO_MEM, kTag, "Could not create display power task");

    s_background_services_started = true;
    return ESP_OK;
}

extern "C" uint32_t buddy_board_completed_frames(void)
{
    uint32_t completed_refreshes = 0;
    portENTER_CRITICAL(&s_metrics_lock);
    completed_refreshes = s_metrics.refresh.count;
    portEXIT_CRITICAL(&s_metrics_lock);
    return completed_refreshes;
}

extern "C" esp_err_t buddy_board_wait_for_frame_after(uint32_t completed_frames,
                                                      uint32_t timeout_ms)
{
    ESP_RETURN_ON_FALSE(s_board_display != nullptr, ESP_ERR_INVALID_STATE, kTag,
                        "Board must be initialized before waiting for a frame");
    const int64_t deadline_us = esp_timer_get_time() + static_cast<int64_t>(timeout_ms) * 1000;
    do {
        if (buddy_board_completed_frames() > completed_frames)
            return ESP_OK;
        vTaskDelay(pdMS_TO_TICKS(5));
    } while (esp_timer_get_time() < deadline_us);
    return ESP_ERR_TIMEOUT;
}

extern "C" esp_err_t buddy_board_display_lock(uint32_t timeout_ms)
{
    return lock_display(timeout_ms);
}

extern "C" void buddy_board_display_unlock(void)
{
    unlock_display();
}

extern "C" esp_err_t buddy_board_set_brightness(uint8_t brightness_percent)
{
    ESP_RETURN_ON_FALSE(brightness_percent >= 10 && brightness_percent <= 100, ESP_ERR_INVALID_ARG,
                        kTag, "Brightness must be 10..100");
    s_awake_brightness.store(brightness_percent);
    s_applied_brightness.store(-1);
    return ESP_OK;
}

extern "C" esp_err_t buddy_board_set_screen_timeout(uint8_t timeout_minutes)
{
    ESP_RETURN_ON_FALSE(timeout_minutes == 0 || timeout_minutes == 2 || timeout_minutes == 5 ||
                            timeout_minutes == 10,
                        ESP_ERR_INVALID_ARG, kTag, "Unsupported screen timeout");
    s_timeout_minutes.store(timeout_minutes);
    return ESP_OK;
}

extern "C" void buddy_board_set_display_wake_lock(bool enabled)
{
    const bool changed = s_display_wake_lock.exchange(enabled) != enabled;
    if (changed)
        s_applied_brightness.store(-1);
}

extern "C" esp_err_t buddy_board_run_hardware_proof(void)
{
    ESP_LOGW(kTag, "Milestone 0 proof boot: serial output is not physical pass evidence");
    buddy_board_runtime_t runtime{};
    ESP_RETURN_ON_ERROR(buddy_board_initialize(&runtime), kTag, "Board initialization failed");
    ESP_RETURN_ON_ERROR(buddy_board_display_lock(UINT32_MAX), kTag,
                        "Could not lock display for proof UI");
    build_proof_ui(runtime.display);
    buddy_board_display_unlock();
    return buddy_board_start_background_services();
}
