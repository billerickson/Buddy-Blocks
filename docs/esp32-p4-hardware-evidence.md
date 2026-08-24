# ESP32-P4 Hardware Evidence Log

This log is intentionally blank until observations come from the physical
Waveshare ESP32-P4-WIFI6-Touch-LCD-4.3. A compile result belongs in CI/build
evidence, not in this file.

## Unit under test

| Field | Recorded value |
| --- | --- |
| Board product | Pending |
| Printed PCB revision | Pending |
| Board photo | Pending |
| ESP32-P4 chip ID / revision | Pending |
| Boot-log revision | Pending |
| `esp_chip_info()` revision | Pending |
| External NOR size | Pending |
| In-package PSRAM size | Pending |
| ESP32-C6 module marking | Pending |
| ESP-Hosted host version | Pending |
| ESP-WiFi-Remote version | Pending |
| ESP32-C6 slave firmware version/hash | Pending |

## Rotation candidates

Use the same firmware commit, screen sequence, brightness, USB power source, and
touch sequence for every row.

| Candidate | Build SHA | Mean / p95 frame | Mean / p95 flush | Touch p95 | Internal heap min | PSRAM min | Tearing/corruption | 100 nav cycles | Result |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| Waveshare BSP rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Deferred CPU full-frame rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| PPA rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

Selected path: Pending.

Reliable fallback: Pending.

Decision rationale: Pending physical measurements.

## Touch transform

Initial candidate: `swap_xy=true`, `mirror_x=true`, `mirror_y=false`.

- [ ] Top-left.
- [ ] Top-right.
- [ ] Bottom-left.
- [ ] Bottom-right.
- [ ] Center.
- [ ] Every target in the 5 × 3 proof grid.
- [ ] No press/release crosses a screen transition.
- [ ] Drag-out and scroll gestures do not click.

Recorded transform and rationale: Pending.

## Storage and connectivity

- [ ] LittleFS probe writes, `fsync`s, renames, reads, and verifies.
- [ ] Probe remains valid after a normal reboot.
- [ ] Probe remains valid after controlled power removal.
- [ ] Paired cached Home produces `BUDDY_BOOT_READY` within 5,000 ms with one
      completed display frame while the router is unavailable.
- [ ] Machine-checked 100-reboot harness passes every iteration.
- [ ] ESP32-C6 hosted link initializes.
- [ ] 2.4 GHz WPA2 network obtains an IPv4 address.
- [ ] 2.4 GHz WPA3 network obtains an IPv4 address, if available.
- [ ] Missing router does not block the local proof UI.

100-reboot raw log: Pending.

100-reboot JSON summary: Pending.

Maximum observed firmware readiness time: Pending.

Maximum observed host reset-to-ready time: Pending.

## Recovery

The upstream Waveshare P4 factory images are downloads, not repository files:

| Image | Bytes | SHA-256 |
| --- | ---: | --- |
| `ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260206.bin` | 33,488,896 | `f87b4b16f49704dc8b05b44953a45c011ca9c244e05547e035b4bfa3db74e022` |
| `ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin` | 16,777,216 | `60f1ea3c77d75c95bd1de75b12642fe11c53873e0290a9b96bb6bb7a4c3aad78` |

- [ ] Downloaded P4 recovery image matches the recorded size and SHA-256.
- [ ] P4 factory recovery flash boots on the unit under test.
- [ ] Buddy Blocks development image can be restored afterward.
- [ ] Exact C6 recovery image, pads, command, and image hash are recorded.
- [ ] C6 recovery procedure is physically tested.

## Soak

- [ ] Display timeout is set to Never for the complete run.
- [ ] Eight-hour harness completes with no panic, unexpected reboot, serial
      disconnect, or telemetry gap.
- [ ] Screen remains visibly correct and touch remains responsive after the run.

Eight-hour raw log: Pending.

Eight-hour JSON summary: Pending.

## Test operator sign-off

Operator: Pending.

Date/time/time zone: Pending.

Firmware Git SHA: Pending.

Attached serial log/photo/video references: Pending.
