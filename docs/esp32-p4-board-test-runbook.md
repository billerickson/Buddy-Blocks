# ESP32-P4 Board Test Runbook

Use this sequence when the Waveshare ESP32-P4-WIFI6-Touch-LCD-4.3 is connected.
It starts with a reversible development image and never touches security
eFuses. Do not infer the silicon profile from the product name.

## 1. Identify the board

From the repository root, replace the example port with the actual character
device:

```bash
find /dev -maxdepth 1 \( -name 'cu.usbmodem*' -o -name 'cu.usbserial*' \) -print
./scripts/firmware-chip-info.sh /dev/cu.usbmodemXXXX
```

Photograph the board/module markings and record the printed PCB revision,
esptool chip revision, flash size, and port in
[`esp32-p4-hardware-evidence.md`](./esp32-p4-hardware-evidence.md). Choose
`rev3` only for Rev3.x silicon; use `rev1_3` for Rev1.3.
The identification helper performs only read/reset operations and saves both
`chip_id` and `flash_id` output under the ignored `serial-logs/` directory.

## 2. Flash the complete development app

Start with the reliable Waveshare BSP candidate. This rebuilds from tracked
defaults, flashes the P4, opens the monitor, and saves an ignored serial log:

```bash
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
```

Exit the serial monitor with Ctrl-]. If the board is Rev1.3, replace `rev3`
with `rev1_3` everywhere. Do not use a pilot or production image for initial
bring-up.

## 3. Functional smoke

Record photo/video plus the serial log while checking:

- screen is landscape 800 × 480 with no tearing or color corruption;
- Settings → Hardware proof: four corners, center, and all 15 grid targets;
- multiplication: select multiple tables, practice, 60-second mode, wrong
  answer lock/retry, summary, and rapid taps without double-submit;
- power-cycle during an active multiplication round and resume it;
- Settings → Wi-Fi: scan, wrong password, WPA2 connection, refresh, forget,
  hidden SSID, and continue offline;
- Settings → Pair this board: generate the code, claim it as a parent, and
  select/name a child;
- initial mastery/XP summary and flash-card library synchronize;
- create a flash-card section in website child mode, sync, reveal/rate it,
  disconnect the router, and repeat after a power cycle;
- reconnect and confirm each queued multiplication/study event appears exactly
  once;
- change brightness and timeout, reboot, and confirm both persist;
- Diagnostics shows the redacted device suffix, P4 revision, versions, IP,
  last sync, content revision, heap/PSRAM/filesystem space, queue, reset reason,
  and OTA state;
- parent revocation causes the next authenticated contact to erase child data
  and return to pairing.

Do not factory-reset until queued activity has synchronized. The reset flow is
Settings → Factory reset → type `RESET` → Erase and restart.

## 4. Rotation measurements

Use the same brightness, screens, touch sequence, power source, and firmware
commit for all candidates. Flash each candidate separately and retain its log:

```bash
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 cpu
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 ppa
```

For each, record mean/p95 frame, flush, touch latency, heap/PSRAM minima,
tearing/corruption, and 100 navigation cycles. Select a winner only from the
physical measurements and retain BSP as the fallback unless evidence supports
another reliable path.

## 5. Recovery before OTA

Fetch a known upstream factory image into the ignored artifact directory:

```bash
./scripts/firmware-fetch-recovery.sh
```

Use the exact path printed by that script. The guarded recovery helper verifies
the known filename and SHA-256 before overwriting P4 flash:

```bash
./scripts/firmware-recovery.sh /dev/cu.usbmodemXXXX \
  /absolute/path/to/ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin \
  --confirm-p4-factory-recovery
```

After proving the factory image, restore Buddy Blocks with the development
flash command from step 2. Record the C6 companion version/hash and recovery
procedure separately; do not overwrite the C6 until its exact board procedure
and image have been verified.

## 6. Cached-Home and 100-reboot gate

After pairing, finish or discard any active study session, synchronize once,
and return to Home. Disconnect or disable the router so this measures the local
path rather than a successful network request. The harness performs only reset
line/ROM-loader operations; it never writes flash or eFuses. It requires one
completed display frame, a valid LittleFS probe, paired cached Home within five
seconds by both firmware and host clocks, and no panic on every boot:

```bash
./scripts/firmware-hardware-evidence.sh reboot-loop \
  /dev/cu.usbmodemXXXX --count 100
```

The command stops at the first failure by default. Add `--keep-going` only when
collecting all failures for diagnosis. It writes an ignored raw serial log and
JSON summary under `firmware/esp32-p4/serial-logs/`; attach both paths to the
hardware evidence log. A reset loop is not power-loss evidence. Separately cut
board power during an active session, after a completed offline multiplication
session, and after a completed flash-card round, then verify recovery and the
exact-once queues as described in step 3.

## 7. Signed OTA gate

Stop and review
[`esp32-p4-security-runbook.md`](./esp32-p4-security-runbook.md). OTA validation
uses the pilot profile only and starts after USB recovery is physically proven.
Stable USB power is mandatory. Production flashing and all eFuse burns require
a later, explicit owner approval for the exact command.

## 8. Eight-hour screen-on soak

Set Settings → Display → Screen timeout to **Never**, use stable USB power, and
leave a representative cached screen visible. Exercise navigation, offline
study, and reconnect/sync periodically while this command records the
ten-second display/heap telemetry stream:

```bash
./scripts/firmware-hardware-evidence.sh soak \
  /dev/cu.usbmodemXXXX --hours 8
```

The harness fails on a panic marker, an unexpected reboot after the first 30
seconds, a serial disconnect, an incomplete duration, or insufficient telemetry.
It emits ignored raw and JSON evidence paths. The operator must also record the
visible screen state, touch responsiveness, and absence of tearing/corruption;
serial telemetry alone does not prove those observations or the seven-day pilot.
