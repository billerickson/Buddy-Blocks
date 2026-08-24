# ESP32-P4 Build Evidence

This document records build-only evidence. It does not establish that a binary
boots, drives the display, maps touch, reaches the ESP32-C6, or passes any other
physical-hardware test.

## Pinned toolchain and dependency graph

The six Milestone 0 candidates resolved and compiled on 2026-08-23 with:

- ESP-IDF `5.5.5`, target `esp32p4`.
- CMake `3.30.2` and Ninja `1.12.1` installed by the repository bootstrap.
- RISC-V GNU toolchain `esp-14.2.0_20260121`.
- Python `3.14.6` in the ESP-IDF-managed environment.

The component manager resolved this exact 23-component graph in both silicon
profiles. Direct dependencies remain exact pins in `idf_component.yml`; the
generated `dependencies.lock` remains ignored as required by the application
specification.

| Component | Resolved version |
| --- | --- |
| `espressif/button` | `4.2.0` |
| `espressif/cmake_utilities` | `0.5.3` |
| `espressif/eppp_link` | `1.1.6` |
| `espressif/esp_codec_dev` | `1.5.11` |
| `espressif/esp_hosted` | `1.4.7` |
| `espressif/esp_lcd_st7701` | `2.0.2~2` |
| `espressif/esp_lcd_touch` | `1.2.1` |
| `espressif/esp_lcd_touch_gt911` | `1.2.1` |
| `espressif/esp_lv_decoder` | `0.4.3` |
| `espressif/esp_lv_fs` | `1.0.1` |
| `espressif/esp_lvgl_adapter` | `0.6.4` |
| `espressif/esp_mmap_assets` | `2.0.1` |
| `espressif/esp_new_jpeg` | `1.0.2` |
| `espressif/esp_serial_slave_link` | `1.1.2` |
| `espressif/esp_wifi_remote` | `0.14.5` |
| `espressif/freetype` | `2.14.3~1` |
| `espressif/knob` | `1.1.0` |
| `espressif/libpng` | `1.6.58~1` |
| `espressif/zlib` | `1.3.2~1` |
| `joltwallet/littlefs` | `1.22.3` |
| `lvgl/lvgl` | `9.5.0` |
| `waveshare/esp32_p4_wifi6_touch_lcd_4_3` | `1.0.1` |
| `idf` | `5.5.5` |

## Milestone 0 build matrix

The instrumented matrix compiled from the uncommitted Milestone 0 harness
based on repository revision `caa7d33`. These hashes identify the local build
outputs only; release artifacts will be rebuilt from a clean signed tag.

| Silicon profile | Rotation path | Image bytes | 7 MiB slot use | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Rev3.x | Waveshare BSP | 1,090,880 | 14.9% | `f25ef041b170b1fbadbefffd0a613134e407e829f81f4c85757c57d5df6d399f` |
| Rev3.x | Deferred CPU | 1,014,400 | 13.8% | `f8b8448138ec9bc2a7b5e26f014df3a86476c42e185d5a35a6c227d8d93326c0` |
| Rev3.x | PPA | 1,091,424 | 14.9% | `ec673ce90cc72fb8d651e3097f81e5bff969f6d5c1a2c0324040f45628aca133` |
| Rev1.3 | Waveshare BSP | 1,090,656 | 14.9% | `fb446ee1b31db7fe41730c0ddd33b79cc3eaa567f0a16c2a8399ba1fc500d3f5` |
| Rev1.3 | Deferred CPU | 1,014,176 | 13.8% | `9d6d6ea3b10e35497e0cb4b9c49085a424fe6d2b72d012026ba0b4a1c6dec0b6` |
| Rev1.3 | PPA | 1,091,200 | 14.9% | `3437cd83381d23c0d929774b10e5bc214c274d8e235670008e21e7e873920a54` |

Every build generated a component-size report and passed the repository's
5,872,025-byte limit (80% of one 7 MiB OTA application slot). Build directories,
reports, binaries, managed components, and the resolver lock are ignored.
