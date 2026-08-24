# Buddy Blocks ESP32-P4 Firmware

Native ESP-IDF/LVGL firmware for the Waveshare
ESP32-P4-WIFI6-Touch-LCD-4.3. The source of truth is
[`../../docs/esp32-p4-app.md`](../../docs/esp32-p4-app.md).

Milestone 0 is a hardware proof harness. It deliberately exposes three separate
rotation builds and does not claim a winner until measurements are recorded in
[`../../docs/esp32-p4-hardware-evidence.md`](../../docs/esp32-p4-hardware-evidence.md).

## Reproducible toolchain

From the repository root:

```bash
./scripts/firmware-bootstrap.sh
./scripts/firmware-build.sh rev3 bsp
./scripts/firmware-build.sh rev3 cpu
./scripts/firmware-build.sh rev3 ppa
./scripts/firmware-verify-matrix.sh
```

Valid silicon profiles are `rev3` and `rev1_3`. Never flash a profile until the
physical revision has been read with esptool and confirmed in the boot log.

The bootstrap installs ESP-IDF `v5.5.5` below ignored `.toolchains/`. Override
`BUDDY_IDF_PATH` and `IDF_TOOLS_PATH` if an audited installation already exists.
The normal application version is `0.1.0`; release/package builds set
`BUDDY_FIRMWARE_VERSION` and use a version-specific ignored build directory.
Every build recreates generated `sdkconfig` from the tracked silicon, rotation,
security, and version overlays so cached settings cannot leak across profiles.
Verify a clean second build with:

```bash
./scripts/firmware-repro-check.sh rev3 bsp
```

Host-only domain, content/schema, atomic-storage/recovery, and deterministic
800 × 480 UI checks do not require a board:

```bash
./scripts/firmware-test-host.sh
./scripts/firmware-test-simulator.sh
```

Simulator screenshots are compared byte-for-byte with reviewed PNGs in
`test/goldens/`. Use `./scripts/firmware-test-simulator.sh --update` only when
intentionally reviewing a visual change; CI never accepts new goldens.

## Wi-Fi and pairing

Use Settings → Wi-Fi on the touchscreen to scan, enter WPA2/WPA3 credentials,
connect to hidden networks, forget saved networks, or continue offline. Use
Settings → Pair this board to generate the parent-authorized pairing code. The
UI and storage start before Wi-Fi and remain usable when the router is missing.
Credentials are stored only in NVS and erased by the typed factory-reset flow.

## Flashing

When a supported board is attached, identify its serial port and revision first:

```bash
./scripts/firmware-chip-info.sh /dev/cu.usbmodemXXXX
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
```

The flash helper builds before flashing, always forces the `development`
security profile, and never selects a silicon profile implicitly.
It does not burn eFuses, enable irreversible security settings, or flash the C6
coprocessor. It records console output under the ignored `serial-logs/`
directory; leave the monitor with Ctrl-].

## Generated and secret files

Build directories, managed components, dependency resolver output, local
sdkconfig files, serial logs, recovery downloads, credentials, and all signing
or encryption keys are ignored by git. Separate `development`, `pilot`, and
`production` profiles are documented in
[`../../docs/esp32-p4-security-runbook.md`](../../docs/esp32-p4-security-runbook.md).
The board-day command sequence is in
[`../../docs/esp32-p4-board-test-runbook.md`](../../docs/esp32-p4-board-test-runbook.md).
No repository script burns eFuses; production flashing remains prohibited until
the owner approves it after recovery and rollback pass on sacrificial hardware.
