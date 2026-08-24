# ESP32-P4 Board Test Runbook

Use this sequence when the Waveshare ESP32-P4-WIFI6-Touch-LCD-4.3 is
connected. It starts with reversible development firmware and never touches
security eFuses. Do not infer the silicon profile from the product name, skip a
failed gate, or mark a physical test passed without a photo, video, serial log,
or directly recorded observation.

For every candidate, first record the Git SHA, build/profile, USB power source,
board markings, router/test-network details, operator, and local time zone in
[`esp32-p4-hardware-evidence.md`](./esp32-p4-hardware-evidence.md). Keep all raw
logs under the ignored `firmware/esp32-p4/serial-logs/` or
`firmware/esp32-p4/.artifacts/hil/` directories. Never put Wi-Fi passwords,
device tokens, signing keys, or child content in an evidence attachment.

## 1. Identify the board — hard stop before flashing

From the repository root, replace the example port with the actual character
device:

```bash
find /dev -maxdepth 1 \( -name 'cu.usbmodem*' -o -name 'cu.usbserial*' \) -print
./scripts/firmware-chip-info.sh /dev/cu.usbmodemXXXX
```

Photograph the board/module markings and record the printed PCB revision,
esptool chip revision, flash size, and port. Choose `rev3` only for Rev3.x
silicon; use `rev1_3` for Rev1.3. The helper performs only read/reset operations
and saves `chip_id` and `flash_id` output under the ignored `serial-logs/`
directory.

Stop here and share the output and board-marking photo before choosing a flash
profile. The next command depends on this evidence.

## 2. Flash the complete development app

After the silicon profile is confirmed, start with the reliable Waveshare BSP
candidate. This rebuilds from tracked defaults, flashes the P4, opens the
monitor, and saves an ignored serial log:

```bash
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
```

Exit the serial monitor with Ctrl-]. If the board is Rev1.3, replace `rev3`
with `rev1_3` everywhere. Do not use a pilot or production image for initial
bring-up. Do not update the C6 companion during P4 bring-up.

Before proceeding, record the boot log's chip revision, PSRAM size, external
flash size, ESP-Hosted host version, C6 slave version, LittleFS probe, and
`BUDDY_BOOT_READY` line. Stop if the screen, PSRAM, LittleFS, or C6 hosted link
does not initialize.

## 3. Display, touch, and local-learning baseline

Record continuous video plus the serial log while checking:

- the screen is landscape 800 × 480 with correct colors and no tearing,
  incomplete frame, or corruption;
- Settings → Hardware proof maps four corners, center, and all 15 grid targets;
- a press released outside its tile does not select, a scroll does not click,
  and a touch does not carry into the next screen;
- the home, multiplication, flash-card, Wi-Fi, pairing, Settings, and
  Diagnostics screens remain navigable without a router;
- multiplication supports multi-table selection, practice, 60-second mode,
  wrong-answer lock/retry, keypad entry, summary, mastery, and personal best;
- a power cycle during an active multiplication round restores the active
  round;
- brightness, timeout, and reduced-motion settings persist across reboot;
- Diagnostics shows only the redacted device suffix plus P4/C6 versions, IP,
  last sync, content revision, heap/PSRAM/filesystem space, queue count, reset
  reason, and OTA state.

Do not factory-reset while unsynchronized activity exists. The reset flow is
Settings → Factory reset → type `RESET` → Erase and restart.

## 4. Rotation measurements

Use the same brightness, screens, touch sequence, power source, firmware Git
SHA, and board for all candidates. Flash each candidate separately and retain
its complete log:

```bash
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 cpu
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 ppa
```

For each candidate, record mean/p95 frame time, mean/p95 flush time, p95 touch
latency, minimum internal heap, minimum PSRAM, tearing/corruption, and 100
screen transitions. Use Home → Multiplication → table selection → Back → Flash
cards → Back → Settings → Back as a repeatable transition loop.

Select a winner only from the physical measurements. Retain BSP as the reliable
fallback unless evidence supports another path. Restore the selected candidate
before continuing the functional tests.

## 5. UI/input endurance and visible states

Run a continuous 30-minute input session and record start/end times plus video.
Mix rapid press/release, double taps, drag-out, vertical scrolling, keypad
entry, Back during transitions, and repeated confirmation presses across
Multiplication, flash cards, Wi-Fi, pairing, and Settings. The gate fails on a
double submission, unintended selection, carried touch, LVGL lock stall,
crash, unexpected reboot, or unresponsive control.

In ordinary room light, photograph each of these distinguishable states:
pressed, selected, checked, disabled, correct, and incorrect. Exercise a long
option list whose saved selection starts below the fold. Confirm the selected
row is restored/revealed without a top-to-bottom animation and the confirmation
action stays fixed and visible while the list scrolls.

## 6. Wi-Fi, pairing, and fault matrix

Use a disposable active child profile for all HIL content tests. Record the
SSID names but never their passwords.

1. Boot while the router is unavailable. Cached Home and local multiplication
   must remain usable.
2. Scan, connect to 2.4 GHz WPA2, forget it, and reconnect.
3. Enter a wrong password and confirm a recoverable message without losing the
   saved/cached state.
4. Add a hidden SSID. If a WPA3 network is available, connect to it and record
   the result; otherwise record `Not available`, not `Pass`.
5. Connect to a captive-portal test network. Confirm Settings reports that
   internet access/sign-in is required while local learning remains usable.
6. Start an initial or manual sync, disable the access point while Syncing is
   visible, wait for the recoverable offline/queued state, restore the access
   point, and retry. Confirm no partial content is exposed and no activity is
   duplicated.
7. From the touchscreen, generate a pairing code. Claim it from the parent
   website, select the disposable active child, and name the board. Confirm the
   initial mastery, XP, and flash-card snapshot synchronizes without serial
   credentials.
8. Revoke the board from the parent page. On its next authenticated contact,
   confirm local child content, credentials, active sessions, and outbox are
   purged and pairing is required again.

## 7. Deterministic 1/10/100/2,500-card scale ladder

This procedure deliberately writes HIL-only rows to D1. Use only a disposable
child, review every generated SQL file, and do not run the remote command until
the correct Cloudflare account, config, and child ID have been confirmed. The
generator itself never contacts Cloudflare. Its cleanup is scoped to the exact
child ID and source `buddy-blocks-hil:content-scale`.

List active children with a read-only query and record the disposable child's
ID:

```bash
npx wrangler d1 execute DB --config wrangler.deploy.jsonc --remote \
  --command "SELECT id, display_name FROM child_profiles WHERE status = 'active' ORDER BY updated_at DESC;"
```

For each count in `1`, `10`, `100`, and `2500`, generate a separate ignored
SQL file, inspect it, then explicitly apply it. The example below is the one-card
case; replace both `1` values for the next rung:

```bash
node scripts/generate-firmware-card-fixture.mjs \
  --child-id CHILD_ID --count 1 \
  --output firmware/esp32-p4/.artifacts/hil/cards-1.sql
sed -n '1,80p' firmware/esp32-p4/.artifacts/hil/cards-1.sql
npx wrangler d1 execute DB --config wrangler.deploy.jsonc --remote \
  --file firmware/esp32-p4/.artifacts/hil/cards-1.sql
```

For every rung, keep the board offline while applying the fixture, then restore
Wi-Fi and tap Sync now. Record section/card counts, sync duration, HTTP result,
content revision, minimum heap/PSRAM, LittleFS free space, order, pinned state,
and whether first/middle/last cards can be revealed and rated. A 2,500-card
response must succeed without `413`, partial rendering, corruption, or an
unresponsive UI.

After the final rung, generate and review the exact-source cleanup, apply it,
sync again, and confirm all HIL sections disappear while unrelated child cards
remain:

```bash
node scripts/generate-firmware-card-fixture.mjs \
  --child-id CHILD_ID --count 0 \
  --output firmware/esp32-p4/.artifacts/hil/cards-cleanup.sql
sed -n '1,80p' firmware/esp32-p4/.artifacts/hil/cards-cleanup.sql
npx wrangler d1 execute DB --config wrangler.deploy.jsonc --remote \
  --file firmware/esp32-p4/.artifacts/hil/cards-cleanup.sql
```

## 8. Atomic storage and controlled power removal

Use a switched USB supply or physically remove board power. Reset-line cycling
does not count. Repeat an ambiguous cut rather than inferring that it overlapped
the intended write.

| Cut point | Setup and observation after reboot |
| --- | --- |
| Content temporary-file write | Change the website section so its revision advances, start Sync now, and remove power while Syncing is visible. Reboot offline. The prior complete snapshot or the new complete snapshot may load; a partial/corrupt snapshot may not. Reconnect and retry successfully. |
| Multiplication outbox write | Work offline, finish a session, and remove power immediately as completion is committed. After reboot, an unfinished record is resumable and a completed record is handed to the outbox automatically; it must not require answering another question. Reconnect and confirm exactly one D1 session for its client ID. |
| Flash-card outbox write | Work offline, finish a study round, and remove power immediately as its summary is committed. After reboot, the completed summary must return and retry the same frozen-duration payload automatically. Reconnect and confirm exactly one D1 session for its client ID. |
| OTA download | Start a pilot OTA only after USB recovery passes, remove power while download progress is changing, then reboot. The old slot must boot and remain usable. |
| OTA switch/reboot | Remove power after verification/reboot-ready and around the first boot into the new slot. The old or valid new image must boot; the board may not brick or lose child state. |

For each case, save before/cut/after video, the full serial log, the event's
redacted client ID, Diagnostics storage/queue values, and the server row-count
query used to prove idempotency.

Near-full LittleFS, deliberate watchdog, and deliberate crash injection are
release gates, not first-flash experiments. Run them only after ordinary USB
recovery is proven and from a tracked, reviewable HIL-only build prepared for
the identified silicon. Do not fill the filesystem or inject a panic with an
untracked serial command or patched binary. Record that these gates remain
`Pending` until that candidate and physical evidence exist.

## 9. Recovery before OTA

Fetch a known upstream factory image into the ignored artifact directory:

```bash
./scripts/firmware-fetch-recovery.sh
```

Use the exact path printed by that script. The guarded helper verifies the
known filename and SHA-256 before overwriting P4 flash:

```bash
./scripts/firmware-recovery.sh /dev/cu.usbmodemXXXX \
  /absolute/path/to/ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin \
  --confirm-p4-factory-recovery
```

After proving the factory image, restore Buddy Blocks with the development
flash command from step 2. Record the C6 companion version/hash and recovery
procedure separately; do not overwrite the C6 until its exact board procedure
and image have been verified.

### C6 read-before-write recovery procedure

The C6 does not appear on the P4's `USB TO UART` connection. This procedure
requires a separate 3.3 V USB-TTL adapter and jumper wires at the unpopulated
four-pad `C6-UART` header. Do not connect a 5 V logic adapter or its VCC pin.
With all power removed, connect adapter TX to board RX, adapter RX to board TX,
and GND to GND. Short C6 IO9 to GND before applying power. Hold the P4 BOOT
button while powering the board so the P4 cannot take the C6 back out of its
ROM downloader. Use the serial device belonging to the TTL adapter below, not
the P4 usbmodem device.

Build the hash-bound candidate without touching the board:

```bash
./scripts/firmware-c6-build.sh
```

Then identify and read all 4 MiB of the installed C6 before considering a
write. Replace the placeholders with the actual TTL port and ignored backup
path:

```bash
source scripts/firmware-env.sh
python -m esptool --chip esp32c6 --port /dev/cu.usbserialXXXX flash_id
python -m esptool --chip esp32c6 --port /dev/cu.usbserialXXXX \
  read_flash 0x0 0x400000 \
  firmware/esp32-p4/.artifacts/recovery/c6-factory-before-write.bin
shasum -a 256 \
  firmware/esp32-p4/.artifacts/recovery/c6-factory-before-write.bin
```

Stop and record the flash ID, byte count, and SHA-256. Preserve two copies of
that ignored backup. Do not run `erase_flash`, do not write the C6 candidate,
and do not change any eFuse in this step. A later C6 write requires explicit
owner approval after reviewing those facts and the exact artifact hash.

## 10. Cached-Home and 100-reboot gate

After pairing, finish or discard any active study session, synchronize once,
and return to Home. Disable the router so this measures the local path. The
harness performs only reset-line/ROM-loader operations; it never writes flash
or eFuses. It requires one completed display frame, a valid LittleFS probe,
paired cached Home within five seconds by both clocks, and no panic on every
boot:

```bash
./scripts/firmware-hardware-evidence.sh reboot-loop \
  /dev/cu.usbmodemXXXX --count 100
```

The command stops at the first failure. Add `--keep-going` only to collect all
failures for diagnosis. Attach its ignored raw log and JSON summary paths to
the evidence log. This reset loop does not replace the controlled power-removal
tests in step 8.

## 11. Signed OTA and rollback gate

Stop and review
[`esp32-p4-security-runbook.md`](./esp32-p4-security-runbook.md). OTA validation
uses the signed pilot profile only and begins after P4 factory recovery and
Buddy Blocks USB recovery are physically proven. Use stable USB power except
for the explicitly controlled interruption cases.

Record exact manifest URL, candidate version, hardware profile, image size,
SHA-256, signing-key fingerprint, running/next slot, and rollback result. Test a
valid update, interrupted download, interrupted switch, and deliberately
unhealthy signed image. Re-run USB recovery afterward. Production flashing and
every eFuse operation remain prohibited until the owner explicitly approves
the exact board and command.

## 12. Exact Version 1 acceptance story

Run the following as one continuous release-candidate story and attach evidence
to the matching numbered rows in the hardware evidence log. A result from an
earlier development build cannot be substituted.

1. Flash a clean supported board over USB-UART.
2. Boot to a correctly rotated 800 × 480 Buddy Blocks screen.
3. Skip Wi-Fi, choose multiple tables, and finish a bundled demo multiplication
   round with no double-submit under rapid taps.
4. Add home Wi-Fi through the touchscreen keyboard.
5. Confirm a wrong password produces a recoverable message.
6. Generate a pairing code.
7. Sign in as parent on the deployed website, claim the code, select one active
   child, and name the board.
8. Confirm initial multiplication mastery and flash cards synchronize.
9. Enter website child mode and create a flash-card section.
10. Sync and confirm every front, back, clue, order, and pinned state.
11. Disconnect the router.
12. Power-cycle and finish a multiplication session and flash-card round
    offline; `Reveal`, `Again`, and `Got it` remain in the fixed action region.
13. Power-cycle again; both events remain queued and cached content works.
14. Restore Wi-Fi; each event is stored exactly once in D1.
15. Edit and then archive the website section; later syncs update then remove
    it.
16. Revoke the board; its next contact purges child data and requires pairing.
17. Re-pair, apply a valid signed pilot OTA, and confirm state survives.
18. Apply a deliberately unhealthy signed pilot image and confirm automatic
    rollback.

## 13. Eight-hour screen-on soak

Set Settings → Display → Screen timeout to **Never**, use stable USB power, and
leave a representative cached screen visible. Exercise navigation, offline
study, and reconnect/sync periodically while this command records the
ten-second display/heap telemetry stream:

```bash
./scripts/firmware-hardware-evidence.sh soak \
  /dev/cu.usbmodemXXXX --hours 8
```

The harness fails on a panic marker, unexpected reboot after the first 30
seconds, serial disconnect, incomplete duration, or insufficient telemetry.
The operator must also record visible screen correctness, touch responsiveness,
and absence of tearing/corruption; serial telemetry alone cannot prove them.

## 14. Seven-day family pilot

Use the exact release candidate and one family; do not update or serially repair
the board during the pilot. Each day, record boot/reset reason, offline and
online sessions completed, queued/uploaded event counts, content revision,
minimum heap/PSRAM, LittleFS free space, last sync, clock behavior, and observed
issues. Include at least one full day without the router and reconnect afterward
to prove the seven-day clock/queue behavior and exact-once upload.

The pilot passes only after seven complete days with no crash, corruption, lost
or duplicate activity, credential leak, manual filesystem repair, or serial
intervention, and with no open critical/high-severity issue. The eight-hour
soak and prior bench tests do not substitute for this pilot.
