# ESP32-P4 Hardware Evidence Log

This log is intentionally blank until observations come from the physical
Waveshare ESP32-P4-WIFI6-Touch-LCD-4.3. A compile, simulator result, or expected
behavior belongs in software evidence, not this file. Use `Pass`, `Fail`,
`Pending`, or `Not available`; never turn an unobserved result into a pass.

Attach redacted photos, videos, raw serial logs, harness JSON, and read-only
server queries by path or URL. Evidence must identify the exact candidate and
must not contain Wi-Fi passwords, device tokens, signing keys, or child content.

## Candidate identity and test conditions

| Field | Recorded value |
| --- | --- |
| Firmware Git SHA | Pending |
| Firmware semantic version | Pending |
| Silicon overlay | Pending |
| Rotation path | Pending |
| Security profile | Pending |
| Application SHA-256 | Pending |
| Manifest URL / SHA-256 | Pending |
| Operator | Pending |
| Start date/time/time zone | Pending |
| USB power supply/cable | Pending |
| Router/test networks | Pending |
| Room-light conditions | Pending |
| Evidence directory/index | Pending |

## Unit under test

| Field | Recorded value |
| --- | --- |
| Board product | Pending |
| Printed PCB revision | Pending |
| Board/module photo | Pending |
| Serial port | Pending |
| ESP32-P4 chip ID / revision | Pending |
| Boot-log revision | Pending |
| `esp_chip_info()` revision | Pending |
| External NOR size | Pending |
| In-package PSRAM size | Pending |
| ESP32-C6 module marking | Pending |
| ESP-Hosted host version | Pending |
| ESP-WiFi-Remote version | Pending |
| ESP32-C6 slave firmware version/hash | Pending |
| Identification raw log | Pending |

## Rotation candidates

Use the same firmware commit, screen sequence, brightness, USB power source, and
touch sequence for every row.

| Candidate | App SHA | Mean / p95 frame | Mean / p95 flush | Touch p95 | Internal heap min | PSRAM min | Tearing/corruption | 100 transitions | Result / evidence |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| Waveshare BSP rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Deferred CPU full-frame rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| PPA rotation | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

Selected path: Pending.

Reliable fallback: Pending.

Decision rationale: Pending physical measurements.

## Touch, input, and visible UI states

Initial candidate: `swap_xy=true`, `mirror_x=true`, `mirror_y=false`.

| Check | Observation / evidence | Result |
| --- | --- | --- |
| Top-left, top-right, bottom-left, bottom-right, center | Pending | Pending |
| Every target in the 5 × 3 proof grid | Pending | Pending |
| Press/release does not cross a transition | Pending | Pending |
| Drag-out and scroll do not click | Pending | Pending |
| 30-minute rapid-input start/end and video | Pending | Pending |
| No double-submit, carried touch, lock stall, or unexpected reboot | Pending | Pending |
| Pressed state distinguishable in room light | Pending | Pending |
| Selected state distinguishable in room light | Pending | Pending |
| Checked state distinguishable in room light | Pending | Pending |
| Disabled state distinguishable in room light | Pending | Pending |
| Correct state distinguishable in room light | Pending | Pending |
| Incorrect state distinguishable in room light | Pending | Pending |
| Long-list selection restored/revealed below fold | Pending | Pending |
| Fixed confirmation remains visible while scrolling | Pending | Pending |

Recorded transform and rationale: Pending.

## Complete hardware-in-the-loop matrix

| Release gate | Observation / evidence | Result |
| --- | --- | --- |
| Board and silicon revision recorded | Pending | Pending |
| Cold boot | Pending | Pending |
| 100-reboot loop | Pending | Pending |
| Landscape output and full touch grid | Pending | Pending |
| Rotation/flush/input timing measured | Pending | Pending |
| 100 transitions without tearing, incomplete frames, or LVGL-lock stalls | Pending | Pending |
| 30-minute rapid-input test | Pending | Pending |
| Required UI states visible in room light | Pending | Pending |
| Long list and fixed action behavior | Pending | Pending |
| Wi-Fi scan/connect/wrong-password/forget/hidden flow | Pending | Pending |
| Router unavailable at boot | Pending | Pending |
| Wi-Fi loss during sync and recovery | Pending | Pending |
| Captive-portal detection message and local use | Pending | Pending |
| Content sync at 1, 10, 100, and 2,500 cards | Pending | Pending |
| Power removal during content temporary-file write | Pending | Pending |
| Power removal during outbox write | Pending | Pending |
| Power removal during OTA download | Pending | Pending |
| Power removal during OTA switch | Pending | Pending |
| Forced bad OTA rollback | Pending | Pending |
| Seven-day offline clock/queue behavior | Pending | Pending |
| Child/device revocation and local purge | Pending | Pending |
| Eight-hour screen-on soak | Pending | Pending |
| LittleFS near-full behavior | Pending | Pending |
| Watchdog recovery | Pending | Pending |
| Crash recovery | Pending | Pending |

## Storage, boot, and connectivity detail

| Check | Measured value / evidence | Result |
| --- | --- | --- |
| LittleFS probe writes, fsyncs, renames, reads, and verifies | Pending | Pending |
| Probe remains valid after normal reboot | Pending | Pending |
| Probe remains valid after controlled power removal | Pending | Pending |
| Router-off paired cached Home ready within 5,000 ms | Pending | Pending |
| Completed frame and successful LittleFS init at ready marker | Pending | Pending |
| ESP32-C6 hosted link initializes | Pending | Pending |
| 2.4 GHz WPA2 obtains IPv4 | Pending | Pending |
| 2.4 GHz WPA3 obtains IPv4, if available | Pending | Pending |
| Hidden SSID connects | Pending | Pending |
| Wrong password is recoverable | Pending | Pending |
| Forget/reconnect works | Pending | Pending |
| Captive portal is distinguished from working internet | Pending | Pending |
| Wi-Fi loss during sync exposes no partial snapshot | Pending | Pending |
| Missing router does not block local learning | Pending | Pending |

100-reboot raw log: Pending.

100-reboot JSON summary: Pending.

Maximum firmware readiness time: Pending.

Maximum host reset-to-ready time: Pending.

## Content scale ladder

Use only the disposable child and exact-source fixture described in the board
runbook. Confirm unrelated cards remain after cleanup.

| Cards | Sections | Sync ms | HTTP/result | Revision | Heap min | PSRAM min | LittleFS free | Order/pinned/use | Evidence / result |
| ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: | --- | --- |
| 1 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 10 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 100 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 2,500 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 0 cleanup | 0 expected | Pending | Pending | Pending | Pending | Pending | Pending | Unrelated cards preserved: Pending | Pending |

Disposable child ID: Pending.

Generated fixture SQL paths/hashes: Pending.

## Controlled power interruption and idempotency

| Cut point | Pre-cut state | Post-boot local result | Server exact-once query | Evidence / result |
| --- | --- | --- | --- | --- |
| Content temporary-file write | Pending | Pending | Not applicable | Pending |
| Multiplication outbox write | Pending | Pending | Pending | Pending |
| Flash-card outbox write | Pending | Pending | Pending | Pending |
| OTA download | Pending | Pending | Not applicable | Pending |
| OTA switch/first boot | Pending | Pending | Not applicable | Pending |

LittleFS near-full starting/ending free bytes: Pending.

Near-full write/recovery observation: Pending.

Watchdog reset reason and recovered state: Pending.

Deliberate crash reset reason and recovered state: Pending.

## Recovery and OTA

The upstream Waveshare P4 factory images are downloads, not repository files:

| Image | Bytes | SHA-256 |
| --- | ---: | --- |
| `ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260206.bin` | 33,488,896 | `f87b4b16f49704dc8b05b44953a45c011ca9c244e05547e035b4bfa3db74e022` |
| `ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin` | 16,777,216 | `60f1ea3c77d75c95bd1de75b12642fe11c53873e0290a9b96bb6bb7a4c3aad78` |

| Gate | Image/slot/hash and evidence | Result |
| --- | --- | --- |
| Downloaded P4 factory image matches size and SHA-256 | Pending | Pending |
| P4 factory image boots | Pending | Pending |
| Buddy Blocks development image restores afterward | Pending | Pending |
| Exact C6 image, pads, command, and hash recorded | Pending | Pending |
| C6 recovery physically tested | Pending | Pending |
| Signed pilot manifest/profile/hash verified | Pending | Pending |
| Valid OTA installs and keeps state | Pending | Pending |
| Interrupted download keeps old slot bootable | Pending | Pending |
| Interrupted switch boots old or valid new slot | Pending | Pending |
| Deliberately unhealthy signed image rolls back | Pending | Pending |
| Buddy Blocks USB recovery repeats after OTA tests | Pending | Pending |
| No production image/eFuse operation performed | Pending | Pending |

## Exact Version 1 acceptance story

Run these 18 actions continuously on the exact release candidate.

| Step | Required observation | Evidence | Result |
| ---: | --- | --- | --- |
| 1 | Clean USB-UART flash | Pending | Pending |
| 2 | Correct 800 × 480 landscape boot | Pending | Pending |
| 3 | Offline multi-table demo round; rapid taps do not double-submit | Pending | Pending |
| 4 | Touchscreen home Wi-Fi setup | Pending | Pending |
| 5 | Wrong password gives recoverable message | Pending | Pending |
| 6 | Pairing code generated | Pending | Pending |
| 7 | Parent claims code, selects child, names board | Pending | Pending |
| 8 | Initial mastery and flash cards synchronize | Pending | Pending |
| 9 | Child authors website flash-card section | Pending | Pending |
| 10 | Device fronts/backs/clues/order/pinned state match | Pending | Pending |
| 11 | Router disconnected | Pending | Pending |
| 12 | Offline power cycle, multiplication and study; fixed actions remain visible | Pending | Pending |
| 13 | Second power cycle; both events queued and cache usable | Pending | Pending |
| 14 | Wi-Fi restored; each D1 event exists exactly once | Pending | Pending |
| 15 | Website edit then archive update/remove on sync | Pending | Pending |
| 16 | Parent revocation purges child data and requires pairing | Pending | Pending |
| 17 | Re-pair and valid signed pilot OTA preserves state | Pending | Pending |
| 18 | Unhealthy signed pilot image rolls back automatically | Pending | Pending |

## Eight-hour soak

| Check | Recorded value / evidence | Result |
| --- | --- | --- |
| Display timeout set to Never for complete run | Pending | Pending |
| Harness completes without panic, reboot, disconnect, or telemetry gap | Pending | Pending |
| Screen remains visibly correct | Pending | Pending |
| Touch remains responsive | Pending | Pending |

Eight-hour raw log: Pending.

Eight-hour JSON summary: Pending.

## Seven-day family pilot

Use the same release candidate for all seven complete days. A firmware update,
manual filesystem repair, or serial intervention restarts the pilot.

| Day | Reset reason | Online/offline sessions | Queue before/after sync | Content revision | Heap / PSRAM minima | LittleFS free | Clock/last sync | Issues / evidence | Result |
| ---: | --- | --- | --- | ---: | --- | ---: | --- | --- | --- |
| 1 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 2 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 3 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 4 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 5 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 6 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 7 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

Full router-off interval and exact-once reconnect evidence: Pending.

Open critical/high-severity issues: Pending.

Pilot result: Pending.

## Test operator sign-off

Operator: Pending.

Completion date/time/time zone: Pending.

Final firmware Git SHA and application SHA-256: Pending.

Evidence index: Pending.

Unresolved failures/not-available equipment: Pending.
