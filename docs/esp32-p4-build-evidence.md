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
from exact firmware source commit
`2cf1f64349acb948bd492a1efa75908e9b22c307`. Firmware version `0.1.0` and
ESP-IDF reproducible-build mode prevent repository dirtiness, timestamps, and
host paths from changing these application images. Release artifacts must still
be rebuilt from a clean signed tag after the physical gates pass.

| Silicon profile | Rotation path | Image bytes | 7 MiB slot use | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Rev3.x | Waveshare BSP | 2,024,096 | 27.6% | `3c2925a87b96bc0643f863a98dee5c4481693e410773ca9b0c69d3568f6d0707` |
| Rev3.x | Deferred CPU | 1,947,472 | 26.5% | `fb344fdda794d05f942b3e9d484a903253c662533c5e756de3dc7eaba237ec43` |
| Rev3.x | PPA | 2,024,640 | 27.6% | `0e0aa20a6cc2ed4fcb323417b96023a4d03f185a339e2bc470ff40c6807b9594` |
| Rev1.3 | Waveshare BSP | 2,023,872 | 27.6% | `30a33fc8c852572c4a4f491d28ed8b56b7842d4ab174dabd0d70d330757a61d9` |
| Rev1.3 | Deferred CPU | 1,947,248 | 26.5% | `4447dea97393f64d56b8910f79d317bfdc58ed6a97a879b6671adb108b532c34` |
| Rev1.3 | PPA | 2,024,416 | 27.6% | `cf62b1d898ac43204fadaa9a7cb6e49000efd8792abe0738ed7b4ca1d7066bae` |

Every build generated a component-size report and passed the repository's
5,872,025-byte limit (80% of one 7 MiB OTA application slot). Build directories,
reports, binaries, managed components, and the resolver lock are ignored.

Two additional independent clean Rev3/BSP builds from the exact source also
produced the identical application SHA-256
`3c2925a87b96bc0643f863a98dee5c4481693e410773ca9b0c69d3568f6d0707`.
The reproducibility verifier deliberately does not compare against persistent
developer build directories because an existing generated `sdkconfig` retains
the settings from when it was first created.

## Complete application candidate

After the offline application, device synchronization, OTA, diagnostics,
machine-readable hardware gates, and UI were linked, the `1.0.0-rc.3`
candidates built from regenerated tracked sdkconfig overlays as follows:

| Silicon | Security profile | Application bytes | Slot headroom | Build result |
| --- | --- | ---: | ---: | --- |
| Rev3.x | Development | 2,024,096 | 5,315,936 | PASS |
| Rev1.3 | Development | 2,023,872 | 5,316,160 | PASS |
| Rev3.x / Rev1.3 | Pilot, RSA-signed | 2,035,712 | 5,304,320 | PASS |
| Rev3.x / Rev1.3 | Production, RSA-signed | 2,101,248 | 5,238,784 | PASS |

Four ignored signed package inventories were regenerated from commit
`69e234bdc32adca3f76b5e8fc9b698d62bc63ce6` and verify locally:

| Silicon | Security | Application SHA-256 | USB recovery SHA-256 |
| --- | --- | --- | --- |
| Rev3.x | Pilot | `d416bed9bcabf17810b998f8910099042e309c0650de02119983556142a73da0` | `9c4bc0d84d8cad9a446d8497677416e7f12bdb6cd9d7f456867ad91ce6b0a2ef` |
| Rev1.3 | Pilot | `0c5ed0aed0a40e5ad795cb99491fdd220892fd4f5e9aafc00440d13619f0bc9c` | `c66d380237379bed73251950ae718276710acb39939acdcd03eb1ee4501e8386` |
| Rev3.x | Production | `d864694e431a4714cdbf06bc999770c0e687f2db95bdc1dd2cae10815bd60f99` | `135a1e2843a99d5e47448d4de5f85318ce32228e97294993fa5e231617f2f6c3` |
| Rev1.3 | Production | `0296938d2f1d88f45279f7c33483519367b1e2360d2b657c3fd7812a734092ed` | `65b5202b688972d4f2e0c9466156184f00ea4380c4b77d5f22a3d0266472e113` |

The pilot release reports record 42,374 bytes of linker-reported static
DRAM/DIRAM data plus BSS and linked-image sizes of 2,029,994 bytes for Rev3.x
and 2,029,986 bytes for Rev1.3. Their combined USB recovery images are
2,232,320 bytes. Production reports record 42,816 static bytes, linked-image
sizes of 2,041,520 and 2,041,512 bytes, and 2,297,856-byte recovery images.
Every generated SHA-256 inventory entry verifies locally. All four package URLs
remain intentionally non-publishable `example.invalid` placeholders until a
board-tested artifact and exact hardware profile are approved for release.

The production generated configuration enables rollback, Secure Boot v2,
RSA-signed applications/updates, AES-256 release-mode flash encryption, and NVS
encryption. The larger Secure Boot bootloader fits below the partition table at
`0x10000` with 12,288 bytes remaining. This is configuration and build evidence
only: no candidate was flashed, no runtime watermark was measured, and no eFuse
was burned.

## Continuous integration

Pull-request run `32736296956` passed on branch-head commit
`69e234bdc32adca3f76b5e8fc9b698d62bc63ce6`. GitHub evaluated PR merge commit
`83cb9af892bcf1e93cd0a2b30c9f9c04aa9ee0f4`, which is also the uploaded
artifact namespace. The source-check job completed in five seconds and the
build/test/package job completed in 22 minutes 52 seconds. It restored only the
pinned Component Manager cache and passed website, Worker, content, and shared
vector validation; all six silicon/rotation firmware builds; host domain,
content/schema, and storage/recovery tests; the LVGL interaction test and 31
reviewed 800 x 480 goldens; pinned Espressif Clang formatting/static analysis;
generated-file checks; and unsigned, pull-request-safe artifact packaging.

The downloaded ignored CI inventory verifies locally. Its six application
SHA-256 values are:

| Silicon profile | Rotation path | CI application SHA-256 |
| --- | --- | --- |
| Rev3.x | Waveshare BSP | `2fd68299f9093442b8e709aa9e41ee6a50c193308ad39ed4c80533c08aa87085` |
| Rev3.x | Deferred CPU | `910de2b2eee744cd91066624b04f65848108e9a8a345c19b5773a24afdaa51aa` |
| Rev3.x | PPA | `980dc74e188bb9dea182e0aefaac164960fd84f42c70e20da344258a96317877` |
| Rev1.3 | Waveshare BSP | `a5ff248cec59df49b3362a20c7172d3fd3d87b83ef966c67394f750a4abf5635` |
| Rev1.3 | Deferred CPU | `c203dc9fef6a4bd9e56dff29cbe69825f95dde4d64a0a8b1c6cb61428d0e1ea8` |
| Rev1.3 | PPA | `5ded37fe07ac1d32090bca688a07b4d888d5a93ee19c1a050cc38b3c610118d3` |

All results above are host/CI evidence and do not satisfy any physical board
exit gate.
