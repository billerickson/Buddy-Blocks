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

The final pre-board instrumented matrix was built in isolated fresh directories
by GitHub Actions run `32713158857` from exact firmware source commit
`4aa090503c4eabb5c3b115b6785614d09370cca6`. Firmware version `0.1.0` and
ESP-IDF reproducible-build mode prevent repository dirtiness, timestamps, and
host paths from changing these application images. Release artifacts will still
be rebuilt from a clean signed tag.

| Silicon profile | Rotation path | Image bytes | 7 MiB slot use | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Rev3.x | Waveshare BSP | 2,022,672 | 27.6% | `135fe1fd90deb975b2c4b0f565cf658bc2e37c3ebdbe59a5805c53c5090adedc` |
| Rev3.x | Deferred CPU | 1,946,048 | 26.5% | `c0f7807d2c97baca2c94a9c53cc7fa95a1099a0290966f9f5d58f276009d62bf` |
| Rev3.x | PPA | 2,023,216 | 27.6% | `92e99fd46d7b328a166927671cbc5a800a9104121d0c57125599a6d808640caa` |
| Rev1.3 | Waveshare BSP | 2,022,432 | 27.6% | `adc8399198f340fc6995184272a4d831e6acab87a9a71f1c1ad3893156c62282` |
| Rev1.3 | Deferred CPU | 1,945,824 | 26.5% | `07f9d0d92d3b4a88d7b8f17248080d8f0860feb8f08a84a3ca8f02cefd7d984b` |
| Rev1.3 | PPA | 2,022,976 | 27.6% | `cbf229de9a471e81ea7b620120ac1ddb749a74d17f12dd9ac9939ee4f54e50ac` |

Every build generated a component-size report and passed the repository's
5,872,025-byte limit (80% of one 7 MiB OTA application slot). Build directories,
reports, binaries, managed components, and the resolver lock are ignored.

Two additional independent clean Rev3/BSP builds from the same source also
produced the identical application SHA-256
`3bb540aa183fdcea314a4912f7e4b64977febb4104c648a6ec61808772cbdc94`.
The reproducibility verifier deliberately does not compare against persistent
developer build directories because an existing generated `sdkconfig` retains
the settings from when it was first created.

## Complete application candidate

After the offline application, device synchronization, OTA, diagnostics, and UI
were linked, the Rev3/BSP `1.0.0-rc.2` candidates built from regenerated tracked
sdkconfig overlays as follows:

| Security profile | Application bytes | Slot use | Bootloader bytes | Build result |
| --- | ---: | ---: | ---: | --- |
| Development | 2,022,672 | 27.6% | 22,144 | PASS |
| Pilot, RSA-signed | 2,035,712 | 27.7% | 22,240 | PASS |
| Production, RSA-signed | 2,101,248 | 28.6% | 45,056 | PASS |

The final ignored pilot package was regenerated from commit
`4aa090503c4eabb5c3b115b6785614d09370cca6`. Its release report records
5,304,320 bytes of application-slot headroom, 42,374 bytes of linker-reported
static DRAM/DIRAM data plus BSS, and a 2,028,442-byte linked image. The signed
OTA image SHA-256 is
`9708d12d5aacdd2292f8e6c548ef497a2aefbb42438700426f80a541c16f9481`;
the combined USB-recovery image SHA-256 is
`a86d8286a8da5cca5f853a9f64dd1d4374dc18dba52df74193729b485ab599a9`.
Every entry in the generated SHA-256 inventory verifies locally. The package
URL remains an intentionally non-publishable `example.invalid` placeholder
until a board-tested artifact is approved for release.

The production generated configuration enables rollback, Secure Boot v2,
RSA-signed applications/updates, AES-256 release-mode flash encryption, and NVS
encryption. The larger Secure Boot bootloader fits below the partition table at
`0x10000` with 12,288 bytes remaining. This is configuration and build evidence
only: no candidate was flashed, no runtime watermark was measured, and no eFuse
was burned.

## Continuous integration

Pull-request run `32713158857` passed on exact source commit
`4aa090503c4eabb5c3b115b6785614d09370cca6`. Its source-check job completed in
16 seconds and its build/test/package job completed in 22 minutes 18 seconds.
The run passed the website, Worker, content, and shared-vector validation; all
six silicon/rotation firmware builds; host domain, content/schema, and
storage/recovery tests; the LVGL interaction test and 31 reviewed 800 x 480
goldens; generated-file checks; and unsigned, pull-request-safe recovery
artifact packaging. The downloaded ignored CI inventory and all six application
hashes were verified locally. This is host/CI evidence only and does not satisfy
any physical board exit gate.
