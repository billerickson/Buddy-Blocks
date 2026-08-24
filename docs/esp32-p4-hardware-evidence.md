# ESP32-P4 Hardware Evidence Log

This log contains observations from the physical
Waveshare ESP32-P4-WIFI6-Touch-LCD-4.3 connected on 2026-08-24. A compile,
simulator result, or expected behavior belongs in software evidence, not this
file. Use `Pass`, `Fail`, `Pending`, or `Not available`; never turn an
unobserved result into a pass.

Attach redacted photos, videos, raw serial logs, harness JSON, and read-only
server queries by path or URL. Evidence must identify the exact candidate and
must not contain Wi-Fi passwords, device tokens, signing keys, or child content.

## Candidate identity and test conditions

| Field | Recorded value |
| --- | --- |
| Firmware Git SHA | `3415692c51bc1b6ca83f648cc96efdeeae71dc6b` (the flashed binary was built from the same firmware sources immediately before this commit) |
| Firmware semantic version | `0.1.0` |
| Silicon overlay | `rev1_3` |
| Rotation path | Waveshare BSP candidate |
| Security profile | Development |
| Application SHA-256 | `90cb91626549261ab56aa35f801dd8ec6a2df3b3565b26aba14dc80a4507342a` (current corrected BSP image); the first stable image was `c01d2b9bff869e47691c2428151cbc1db6f4c924d40326a5204bfdf47bb87cf2` |
| Manifest URL / SHA-256 | Pending |
| Operator | Repository owner, reporting visible results through the Codex desktop session |
| Start date/time/time zone | 2026-08-24, America/Chicago |
| USB power supply/cable | Computer USB-C connection to the board's `USB TO UART` connector; exact cable rating not recorded |
| Router/test networks | Home 2.4 GHz network; SSID and password intentionally not recorded; security mode not yet recorded |
| Room-light conditions | Normal indoor light; exact lux not recorded |
| Evidence directory/index | Ignored `firmware/esp32-p4/serial-logs/`, `.artifacts/hil/`, and `.artifacts/recovery/`; exact files are named below |

## Unit under test

| Field | Recorded value |
| --- | --- |
| Board product | Waveshare `ESP32-P4-WIFI6-Touch-LCD-4.3` — Pass |
| Printed PCB revision | Not legible in the supplied module-side photo — Not available |
| Board/module photo | Ignored `.artifacts/hil/board-rev1_3-20260824.jpg`, SHA-256 `0ee689a7ce38d7c3c65dac6af41897937cbf1f2ae3e7f01c9695e487adfeda4f` |
| Serial port | `/dev/cu.usbmodem5B901597411`; the other visible usbmodem device is not this P4 |
| ESP32-P4 chip ID / revision | P4 has no separate chip ID; `esptool` reports revision `v1.3` (MAC intentionally omitted) — Pass |
| Boot-log revision | `v1.3` — Pass |
| `esp_chip_info()` revision | `103` — Pass |
| External NOR size | 33,554,432 bytes / 32 MiB — Pass |
| In-package PSRAM size | 33,554,432 bytes / 32 MiB at the Rev1.3-safe 200 MHz; memory test OK — Pass |
| ESP32-C6 module marking | Shielded C6 module visible in photo; marking not readable — Not available |
| ESP-Hosted host version | `1.4.7` |
| ESP-WiFi-Remote version | `0.14.5` |
| ESP32-C6 slave firmware version/hash | Factory slave implements the required Wi-Fi RPCs, but its optional version RPC timed out; existing image hash requires a 3.3 V USB-TTL connection to the C6 pads — Pending |
| Identification raw log | Ignored `serial-logs/board-identify-20260824T161921Z.log` — Pass |

## Rotation candidates

Use the same firmware commit, screen sequence, brightness, USB power source, and
touch sequence for every row.

| Candidate | App SHA | Mean / p95 frame | Mean / p95 flush | Touch p95 | Internal heap min | PSRAM min | Tearing/corruption | 100 transitions | Result / evidence |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| Waveshare BSP rotation | `c01d2b9b…7cf2` measured; `90cb9162…342a` current | 3,304 / 7,055 us after Wi-Fi interaction on prior stable image; current-image comparable sequence pending | callback 1,021 / 2,880 us; wait 3 / 4 us on prior stable image | Pending | 124,784 bytes on prior image | 29,329,424 bytes on prior image | User reported a readable landscape Wi-Fi and pairing screen; corrected image boots without the duplicate LEDC warning; current visible/tearing rerun pending | Pending | Partial pass; `serial-logs/m0-rev1_3-bsp-restored-20260824T165500Z.log` and `serial-logs/m0-rev1_3-bsp-20260824T171654Z.log` |
| Deferred CPU full-frame rotation | `db139b4f…b6658` prepared | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Reproducible Rev1.3 image prepared; not yet flashed |
| PPA rotation | `357ca812…06a55` prepared | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Reproducible Rev1.3 image prepared; not yet flashed |

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
| Board and silicon revision recorded | Product and P4 v1.3 recorded; printed PCB revision is not legible | Pass with printed-revision limitation |
| Cold boot | User removed and restored USB power; Buddy image was restored afterward and reached ready state in 549 ms | Pass |
| 100-reboot loop | Pending | Pending |
| Landscape output and full touch grid | User observed readable landscape Wi-Fi/pairing screens with the USB connectors on the right; full grid not yet run | Partial |
| Rotation/flush/input timing measured | Pending | Pending |
| 100 transitions without tearing, incomplete frames, or LVGL-lock stalls | Pending | Pending |
| 30-minute rapid-input test | Pending | Pending |
| Required UI states visible in room light | Pending | Pending |
| Long list and fixed action behavior | Pending | Pending |
| Wi-Fi scan/connect/wrong-password/forget/hidden flow | Network list, touchscreen password entry, connection, and HTTPS check observed; negative/forget/hidden cases pending | Partial |
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
| LittleFS probe writes, fsyncs, renames, reads, and verifies | Serial log records successful atomic proof write/fsync/rename and immediate verification | Pass |
| Probe remains valid after normal reboot | Repeated boots verify the prior nonce before writing the next record | Pass |
| Probe remains valid after controlled power removal | Prior Buddy proof verified after the operator's USB power removal, factory A/B boot, and Buddy restoration | Pass |
| Router-off paired cached Home ready within 5,000 ms | Pending | Pending |
| Completed frame and successful LittleFS init at ready marker | Current corrected image: `BUDDY_BOOT_READY firmware_ms=475 surface=wifi paired=0 display_frame=1 storage=1`; prior stable image: 549 ms | Pass |
| ESP32-C6 hosted link initializes | 40 MHz four-bit SDIO, INIT received, WLAN capability, board type 13, slave chip ID 12 | Pass |
| 2.4 GHz WPA2 obtains IPv4 | Home network security mode not yet recorded; the board advanced to pairing and HTTPS connectivity returned 204 | Partial; association/IP/TLS pass, WPA mode pending |
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
| P4 factory image boots | A validated 4.5 MiB prefix from the unit's own full-flash backup booted, but repeatedly failed C6 SDIO `send_op_cond` with `0x107`, including after a cold power cycle | Fail for factory Wi-Fi proof; P4 boot itself observed |
| Buddy Blocks development image restores afterward | Flash hashes verified; restored image reached `BUDDY_BOOT_READY` and later scanned/connected to Wi-Fi | Pass |
| Exact C6 image, pads, command, and hash recorded | Pending | Pending |
| C6 recovery physically tested | Pending | Pending |
| Signed pilot manifest/profile/hash verified | Pending | Pending |
| Valid OTA installs and keeps state | Pending | Pending |
| Interrupted download keeps old slot bootable | Pending | Pending |
| Interrupted switch boots old or valid new slot | Pending | Pending |
| Deliberately unhealthy signed image rolls back | Pending | Pending |
| Buddy Blocks USB recovery repeats after OTA tests | Pending | Pending |
| No production image/eFuse operation performed | Only development P4 images were written; no C6 write and no security eFuse operation occurred | Pass |

## 2026-08-24 exploratory hardware session notes

- A read-only 32 MiB unit backup was captured before the first Buddy write as
  ignored `.artifacts/recovery/factory-backup-rev1_3-e8f60ae531d2.bin`, SHA-256
  `32a16b209166b7bf2cc1d1381d692f81858791b29c5605a6c660c793630a6106`.
- The first Rev1.3 build was rejected before flashing because its generated
  sdkconfig had silently selected Rev3.1. The overlay now selects pre-v3
  silicon explicitly and the build script validates every resolved
  silicon/PSRAM value.
- The first flashed Buddy image reached display/touch/storage initialization,
  then reset because the diagnostic task placed roughly 4.2 KiB of fixed
  metric buffers on its 4 KiB stack. Moving those fixed buffers to static
  storage stopped the resets; the blue blinking seen during that reset loop
  was not intentional.
- The factory P4 application could not initialize the existing C6 image even
  after a cold power cycle. The restored Buddy host did initialize the C6. Its
  optional version RPC was deferred because the factory slave did not answer
  that command; a subsequent cold boot produced the network list, accepted a
  touchscreen-entered Wi-Fi password, reached the pairing screen, and returned
  HTTP 204 from the production connectivity check.
- The operator reported the Wi-Fi and pairing screens as readable landscape
  with the USB connectors on the right. This is not yet evidence for the full
  touch grid, tearing sequence, alternate rotation candidates, or pairing
  claim.
- The tracked Waveshare BSP patches were applied to current application
  `90cb91626549261ab56aa35f801dd8ec6a2df3b3565b26aba14dc80a4507342a`
  and flashed through the P4 USB-UART path. The boot log contains no duplicate
  GPIO26/LEDC reservation warning, verifies the existing LittleFS record,
  reports one saved Wi-Fi profile, reacquires IPv4, and returns HTTPS 204.
  Brightness levels still need visible operator confirmation.

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
