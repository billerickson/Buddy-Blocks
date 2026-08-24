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
| Rev3.x | Waveshare BSP | 1,090,720 | 14.9% | `c84727c8df84d2c73a50405784e3ed35f7534dbee8c6f2ae95d452bd134a5ee3` |
| Rev3.x | Deferred CPU | 1,014,240 | 13.8% | `b2b22d8de554b2321d47a2a2be066e997982b54038869941d7a0f89703d72806` |
| Rev3.x | PPA | 1,091,264 | 14.9% | `d71a7e3a962812a2773218b66e437571fd3c699cc7d6fa4ff72654dddb4b7028` |
| Rev1.3 | Waveshare BSP | 1,090,480 | 14.9% | `6f3ae2af7fad93371c54833d154aa342dbc96acb2ccea51781c3f61781c2dd32` |
| Rev1.3 | Deferred CPU | 1,014,000 | 13.8% | `39815a16e8d9fbc688d3aed56adc28fd97ae1801a60de0579cc693cc798942fd` |
| Rev1.3 | PPA | 1,091,024 | 14.9% | `c7f0abd14d0dffc7a55ca77a609e827d81ca26dade3512035fda7e6c4f457bde` |

Every build generated a component-size report and passed the repository's
5,872,025-byte limit (80% of one 7 MiB OTA application slot). Build directories,
reports, binaries, managed components, and the resolver lock are ignored.

Two independent clean Rev3/BSP builds also produced the identical application
SHA-256 `c84727c8df84d2c73a50405784e3ed35f7534dbee8c6f2ae95d452bd134a5ee3`.
The reproducibility verifier deliberately does not compare against persistent
developer build directories because an existing generated `sdkconfig` retains
the settings from when it was first created.

## Complete application candidate

After the offline application, device synchronization, OTA, diagnostics, and UI
were linked, the Rev3/BSP `1.0.0-rc.1` candidates built from regenerated tracked
sdkconfig overlays as follows:

| Security profile | Application bytes | Slot use | Bootloader bytes | Build result |
| --- | ---: | ---: | ---: | --- |
| Development | 2,009,744 | 27.4% | 22,144 | PASS |
| Pilot, RSA-signed | 2,035,712 | 27.7% | 22,240 | PASS |
| Production, RSA-signed | 2,035,712 | 27.7% | 45,056 | PASS |

The pilot release report records 5,304,320 bytes of application-slot headroom,
42,342 bytes of linker-reported static DRAM/DIRAM data plus BSS, and a 2,016,018
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
