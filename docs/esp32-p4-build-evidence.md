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

The instrumented matrix was built in isolated fresh directories from the source
in this document's commit. Firmware version `0.1.0` and ESP-IDF reproducible
build mode prevent repository dirtiness, timestamps, and host paths from
changing these application images. Release artifacts will still be rebuilt
from a clean signed tag.

| Silicon profile | Rotation path | Image bytes | 7 MiB slot use | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Rev3.x | Waveshare BSP | 2,014,112 | 27.4% | `885e95bc8a9244c1e67692b4897d996001ebe2f0b177a6e27d932ab843323bdd` |
| Rev3.x | Deferred CPU | 1,937,872 | 26.4% | `c5f6f29be3e8d1d4e69ca463769f37a38ba947f93161cb1287826b37b7ed28cc` |
| Rev3.x | PPA | 2,014,656 | 27.4% | `36fca219f899a0c024509cb7cff970e8b4efc5c4e05efa40540533031ba678e7` |
| Rev1.3 | Waveshare BSP | 2,013,872 | 27.4% | `8f6237f86e69ea4cb8018265d275c7d51aace5a3322c41a3265f4427c99a855d` |
| Rev1.3 | Deferred CPU | 1,937,632 | 26.4% | `36c775fba74042e26bfd2829d0923c7df08e8d84a0388d7bdfd103faadc00a10` |
| Rev1.3 | PPA | 2,014,416 | 27.4% | `28291c9d2d48f58b6ad0c9cd0ffad3106f31f6fdd6b5dd312a8fbf9fbaa6e6bf` |

Every build generated a component-size report and passed the repository's
5,872,025-byte limit (80% of one 7 MiB OTA application slot). Build directories,
reports, binaries, managed components, and the resolver lock are ignored.

Two independent clean Rev3/BSP builds also produced the identical application
SHA-256 `885e95bc8a9244c1e67692b4897d996001ebe2f0b177a6e27d932ab843323bdd`.
The reproducibility verifier deliberately does not compare against persistent
developer build directories because an existing generated `sdkconfig` retains
the settings from when it was first created.

## Complete application candidate

After the offline application, device synchronization, OTA, diagnostics, and UI
were linked, the Rev3/BSP `1.0.0-rc.1` candidates built from regenerated tracked
sdkconfig overlays as follows:

| Security profile | Application bytes | Slot use | Bootloader bytes | Build result |
| --- | ---: | ---: | ---: | --- |
| Development | 2,014,112 | 27.4% | 22,144 | PASS |
| Pilot, RSA-signed | 2,035,712 | 27.7% | 22,240 | PASS |
| Production, RSA-signed | 2,101,248 | 28.6% | 45,056 | PASS |

The pilot release report records 5,304,320 bytes of application-slot headroom,
42,374 bytes of linker-reported static DRAM/DIRAM data plus BSS, and a 2,020,250
byte linked image. Its OTA image, combined USB-recovery image, manifest, reports,
and SHA-256 inventory verify locally. The package URL remains an intentionally
non-publishable `example.invalid` placeholder until a board-tested artifact is
approved for release.

The production generated configuration enables rollback, Secure Boot v2,
RSA-signed applications/updates, AES-256 release-mode flash encryption, and NVS
encryption. The larger Secure Boot bootloader fits below the partition table at
`0x10000` with 12,288 bytes remaining. This is configuration and build evidence
only: no candidate was flashed, no runtime watermark was measured, and no eFuse
was burned.

## Continuous integration

Pull-request run `32697315599` passed on exact source commit
`3071c4befe8700186994a47ff2b52238f5b82af4`. Its source-check job completed in
14 seconds and its build/test/package job completed in 21 minutes 57 seconds.
The run passed the website, Worker, content, and shared-vector validation; all
six silicon/rotation firmware builds; host domain and storage tests; the LVGL
interaction test and 30 reviewed 800 x 480 goldens; generated-file checks; and
unsigned, pull-request-safe recovery artifact packaging. This is host/CI
evidence only and does not satisfy any physical board exit gate.
