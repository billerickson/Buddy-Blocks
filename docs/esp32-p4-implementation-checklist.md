# ESP32-P4 Version 1 Implementation Checklist

This is the executable checklist for the source-of-truth specification in
[`esp32-p4-app.md`](./esp32-p4-app.md). A box is checked only when the linked
test or recorded evidence exists. A successful compile is never treated as
physical-hardware evidence.

Status values:

- `ACTIVE`: implementation or verification is in progress.
- `BLOCKED—HARDWARE`: a prepared command is ready, but a physical board and
  operator evidence are required.
- `PENDING`: gated by the preceding milestone.
- `PASS`: the implementation and required evidence are both complete.

## Repository audit — PASS

- [x] Source specification reviewed completely (1,149 lines on 2026-08-23).
- [x] Existing web baseline recorded: `npm test` passes 17 files / 159 tests.
- [x] Existing content baseline recorded: `npm run content:validate` passes.
- [x] Child flash-card authoring remains at
  `/kid/:childSlug/flash-cards/`; exact matching child mode is required.
- [x] Multiplication server policy is centralized in
  `src/lib/multiplication.ts` and the existing Worker submission path.
- [x] Existing idempotency is keyed by child plus `clientAttemptId`.
- [x] No ESP-IDF project or firmware CI existed before this work.
- [x] No ESP-IDF, CMake, Ninja, or esptool installation was visible in the
  initial shell.
- [x] No target board was visible in the initial USB audit. The only
  `usbmodem` device was an LG monitor control interface.
- [x] Waveshare repository and BSP `1.0.1` are Apache-2.0.
- [x] The referenced SeedSigner builder/screens repositories expose no
  repository-level license in their current trees. They are behavioral and
  measurement references only; no source or assets may be copied.

## Milestone 0 — Hardware proof — ACTIVE

Implementation:

- [x] Add a reproducible ESP-IDF `v5.5.5` bootstrap and build entry point.
- [x] Pin target `esp32p4`, LVGL `9.5.0`, and Waveshare BSP `1.0.1`.
- [x] Add explicit Rev3.x and Rev1.3 sdkconfig overlays.
- [x] Add a 32 MB partition table with NVS, NVS keys, OTA data, two 7 MiB
  application slots, 16 MiB LittleFS, core dump, and reserve.
- [x] Add a landscape 800 × 480 color/grid proof UI.
- [x] Add selectable BSP, deferred CPU, and PPA rotation candidates.
- [x] Add the initial SeedSigner-informed touch transform candidate:
  `swap_xy=true`, `mirror_x=true`, `mirror_y=false`.
- [x] Add chip revision, flash, PSRAM, LittleFS, heap, render, flush, and touch
  diagnostics without logging secrets.
- [x] Add an asynchronous ESP32-C6-hosted Wi-Fi station proof whose credentials
  live only in ignored local `sdkconfig`.
- [x] Add immutable upstream P4 factory-recovery metadata and a guarded recovery
  command. No recovery image is committed.
- [x] Resolve the component-manager graph after both Rev3 and Rev1.3 builds and
  keep every direct manifest dependency on an exact version. The first resolver
  run proved the proposed hosted 2.4.x/remote 1.0.x tuple unavailable for IDF
  5.5.5; the manifest now uses Waveshare factory pins 1.4.7/0.14.5. After
  successful builds, verify the resolved transitive versions and keep generated
  `dependencies.lock` ignored as required by the specification. The complete
  23-component graph is recorded in
  [`esp32-p4-build-evidence.md`](./esp32-p4-build-evidence.md).
- [ ] Record the exact ESP-Hosted host/slave compatibility tuple and C6 image
  hash. The current board example and the source specification name different
  host component lines; the physical C6 handshake decides the supported tuple.

Build evidence:

- [x] Rev3 BSP candidate builds with ESP-IDF `v5.5.5`.
- [x] Rev1.3 BSP candidate builds with ESP-IDF `v5.5.5`.
- [x] Deferred CPU candidate builds for both silicon overlays.
- [x] PPA candidate builds for both silicon overlays.
- [x] Application size is below 80% of a 7 MiB slot. The original hardware
  proof matrix peaked at 1,091,264 bytes; the complete signed pilot candidate
  is 2,035,712 bytes (27.7%) and the signed production-profile build is
  2,101,248 bytes (28.6%).
- [x] Fixed firmware version plus ESP-IDF reproducible-build mode produce
  byte-identical application images in two independent clean Rev3/BSP builds.

Physical evidence (`BLOCKED—HARDWARE` until the board is connected):

- [ ] Board model and printed PCB revision photographed/recorded.
- [ ] `esptool.py chip_id`, boot log, and `esp_chip_info()` agree on silicon
  revision.
- [ ] Flash size is 32 MiB and PSRAM size is 32 MiB.
- [ ] LittleFS atomic probe survives reboot.
- [ ] Waveshare BSP rotation: frame/flush/input/tearing/memory measurements.
- [ ] Deferred CPU rotation: frame/flush/input/tearing/memory measurements.
- [ ] PPA rotation: frame/flush/input/tearing/memory measurements.
- [ ] Selected path and fallback are recorded with rationale.
- [ ] Four corners, center, and all targets in the 5 × 3 grid map correctly.
- [ ] ESP32-C6 hosted Wi-Fi obtains an IP and records both protocol versions.
- [ ] Known-good P4 recovery image is verified by hash and recovery flash.
- [ ] Known-good C6 recovery image/procedure is verified on the board.

Exit gate: every Milestone 0 box above is checked. Until then, Milestone 1 is
`PENDING` even if preparatory files exist.

## Milestone 1 — Firmware foundation — PENDING

- [x] Service/event-queue architecture with bounded queues.
- [x] `buddy_ui` theme, `TopNav`, `OptionTile`, `OptionList`, `ChoiceGrid`,
  `ConfirmBar`, and pure `SelectionModel`.
- [x] Atomic versioned CRC32 storage, interrupted-rename recovery, schema
  rejection tests, migrations, and diagnostics. Completed multiplication and
  flash-card sessions persist a completion marker before outbox handoff and
  replay the byte-identical event automatically after an interrupted reboot.
- [ ] Offline cached Home usable within five seconds.
- [x] Host LVGL simulator fixed at 800 × 480.
- [x] Deterministic interaction assertions and 34 reviewed golden screenshots,
  including first-boot pairing/sync, empty, loading, error, mastery, and manual
  sync/update states plus completed-session reboot recovery for both learning
  modes.
- [x] Firmware CI: both silicon profiles, host tests, simulator, formatting,
  static analysis, size threshold, and SHA-bound unsigned artifacts.
- [x] Machine-readable post-frame boot marker and non-destructive 100-reboot /
  eight-hour soak evidence harness with a board-free parser self-test in CI.
- [x] Live Home warning below 2 MiB LittleFS free while atomic writes preserve
  the separate 1 MiB headroom; deterministic low-storage golden reviewed.
- [ ] 100-reboot loop evidence.
- [ ] Power-loss snapshot/outbox evidence.

Exit gate: reboot and power-loss storage tests pass with physical evidence.

## Milestone 2 — Offline Multiplication Facts Lab — PENDING

- [x] Shared JSON golden vectors consumed by TypeScript and firmware tests.
- [x] Factor normalization, pools, weights, seeded shuffle, no immediate repeat,
  and missed-fact spacing match the website.
- [x] Practice, 60-second, and 120-second modes use monotonic time.
- [x] Table/mode selection, Needs Practice, keypad, locked feedback, summary,
  mastery, and personal best UI.
- [x] Typed touch input uploads as `inputMethod: "keyboard"`.
- [x] Active-session recovery and immutable bounded outbox.
- [x] A single upload is bounded to the Worker contract of 500 attempts;
  completion persists before handoff and replays with the same client ID after
  a reset.
- [x] Server scoring, XP, mastery, and idempotency parity tests.
- [ ] Completed offline session survives reboot on hardware.

Exit gate: every website multiplication rule matches and reboot recovery passes.

## Milestone 3 — Wi-Fi, pairing, and device APIs — PENDING

- [x] Touch Wi-Fi scanning, saved networks, WPA2/WPA3, hidden SSID, keyboard,
  forget, test outcomes, and continue-offline flow.
- [x] Host interaction proof advances an unpaired board from connected Wi-Fi to
  pairing, holds during initial sync, and enters Home only after sync succeeds.
- [x] Pairing/device/content-revision D1 migration and index assertions.
- [x] HMAC pairing codes, poll secret, token hashing, constant-time comparison,
  rate limits, and stable error contract.
- [x] Parent list/claim/rename/revoke UI with normal-parent-mode enforcement.
- [x] Device bootstrap/mastery endpoint and at-most-hourly `last_seen_at` write.
- [x] Firmware pairing state, initial sync, and local purge on revoke/archive.
- [ ] Clean-board touchscreen setup/pairing physical evidence.

Exit gate: pairing needs no serial credentials and revocation purges child data.

## Milestone 4 — Flash-card sync and study — PENDING

- [x] All parent and child flash-card mutations increment revision atomically.
- [x] Child-mode authoring regression tests remain green.
- [x] Visible snapshot filtering, limits, ETag, and 304 endpoint.
- [x] Device library ordering, empty state, reveal/rate, deterministic shuffle,
  three-card requeue, finish, summary, and round recovery.
- [x] Study session/review migration and neutral recent activity.
- [x] Immutable idempotent study outbox with nullable edited-card references and
  irreversible fingerprints.
- [x] Completed study duration is frozen before handoff, a finished record is
  retried on boot, and one activity is bounded to the Worker contract of 1,000
  reviews.
- [x] Reviewable, ignored D1 HIL fixture SQL generator for the 1/10/100/2,500
  card ladder, with exact-source cleanup and local-schema integration proof.
- [ ] End-to-end create/edit/archive/offline/upload story passes once each.

Exit gate: the specification's complete flash-card synchronization story passes.

## Milestone 5 — OTA and production security — PENDING

- [x] Exact-profile firmware manifest and authenticated endpoint.
- [x] Two-slot HTTPS OTA, size/SHA verification, health confirmation, and IDF
  rollback.
- [x] Touchscreen manual firmware-policy check with deterministic checking,
  offline, available, error, and retry behavior.
- [x] SHA-labeled build/package/recovery artifacts and release report; runtime
  hardware fields remain explicitly pending.
- [x] Development, pilot, and production security profiles.
- [x] Encrypted NVS, release-mode flash encryption, Secure Boot v2, signed OTA,
  and redacted logs.
- [ ] USB recovery runbook tested on sacrificial hardware.
- [ ] Valid, interrupted, deliberately unhealthy, and rollback OTA evidence.
- [ ] Explicit owner approval recorded before any irreversible eFuse operation.

Exit gate: OTA, rollback, and USB recovery pass on sacrificial hardware. No
irreversible eFuse is burned by an automated script.

## Milestone 6 — Pilot and release — PENDING

- [ ] Full hardware checklist recorded for the release candidate.
- [ ] Exact 18-step end-to-end acceptance story passes.
- [ ] Eight-hour screen-on soak passes.
- [ ] Seven-day family pilot passes without crash, corruption, lost queue, or
  serial intervention.
- [x] Exhaustive board-day runbook and blank evidence matrices cover every
  §17.5 gate, the exact 18-step story, and all seven pilot days without
  claiming unobserved results.
- [ ] Performance measurements remain pending hardware; operations,
  factory-reset, support, security, board-test, and release procedures are
  documented.
- [x] All web and firmware tests pass in CI. Pull-request run `32743061296`
  passed on branch-head commit
  `99a6560cf3062ce8fbcfcdb18cc751b9a25a5f8d`, including Component Manager
  cache restore, the six-profile firmware matrix, domain/content/storage host
  tests, 32 reviewed simulator goldens, pinned formatting/static analysis,
  generated-file checks, and unsigned recovery artifact packaging.
- [x] D1 migration 0004 validated locally, then applied and verified remotely
  through the established
  deployment process.
- [x] Website/API deployment `558acc76-d085-439e-a7f5-e5cad81439a7`
  passes public health and expected unauthenticated-boundary smoke tests.
- [x] Coherent hardware-proof, build-matrix, firmware, device-platform,
  release/CI, and final evidence commits are pushed to
  `origin/codex/esp32-p4-app`.
- [ ] Version 1 release artifacts are published without secrets/signing keys.

Exit gate: the complete Version 1 Definition of Done is satisfied.

## 2026-08-24 software validation evidence

- `npm run content:validate`: PASS, 22 tracks / 3,882 questions.
- `npm test`: PASS, 18 files / 164 tests.
- `npm run check`: PASS, 93 files with zero diagnostics.
- `npm run build`: PASS, including SEO validation for 12 public pages.
- Host firmware tests: PASS, domain, content/schema, and atomic-storage/recovery
  suites.
- LVGL simulator: PASS, interaction self-test and 34 golden screenshots,
  including automatic, byte-identical completion replay from both durable
  session types.
- Outbox limit/replay regression: PASS; an identical event remains idempotent
  at the 8 MiB limit, while a conflicting payload fails closed and a new event
  returns `outbox_full`.
- D1 HIL fixture integration: PASS in a fresh local database; 25 sections /
  2,500 cards created, then exact-source cleanup returned both counts to zero.
- Pinned Espressif `clang-format` and native host/simulator `clang-tidy`:
  PASS; the first analysis pass corrected timestamp, storage/content size,
  RSSI, and simulator-buffer integer widths.
- All six silicon/rotation development builds, byte-for-byte Rev3/BSP
  reproducibility, signed pilot, and signed production builds: PASS.
- Four ignored, unpublished `1.0.0-rc.3` pilot/production package inventories
  for both silicon profiles verify at commit
  `69e234bdc32adca3f76b5e8fc9b698d62bc63ce6`.
- Wrangler deploy dry-run: PASS; local and remote D1 migration verification:
  PASS; production public/auth-boundary smoke: PASS.

No line above is physical-board evidence. Milestone exit order, OTA/recovery,
soak, and family-pilot gates remain unchanged.
