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
The application version is read from tracked `version.txt`, and reproducible
build mode removes timestamps and host paths. Verify a clean second build with:

```bash
./scripts/firmware-repro-check.sh rev3 bsp
```

## Local Wi-Fi proof credentials

Credentials must never be committed. Generate the ignored local `sdkconfig`
for the selected build, then use `idf.py menuconfig` and set:

```text
Buddy Blocks hardware proof
  -> Wi-Fi SSID for the Milestone 0 proof
  -> Wi-Fi password for the Milestone 0 proof
```

The UI and storage start before Wi-Fi and remain usable when those values are
blank or the router is unavailable.

## Flashing

When a supported board is attached, identify its serial port and revision first:

```bash
./scripts/firmware-chip-info.sh /dev/cu.usbmodemXXXX
./scripts/firmware-flash.sh /dev/cu.usbmodemXXXX rev3 bsp
```

The flash helper builds before flashing and never selects a profile implicitly.
It does not burn eFuses, enable irreversible security settings, or flash the C6
coprocessor. It records console output under the ignored `serial-logs/`
directory; leave the monitor with Ctrl-].

## Generated and secret files

Build directories, managed components, dependency resolver output, local
sdkconfig files, serial logs, recovery downloads, credentials, and all signing
or encryption keys are ignored by git. Release signing is introduced only in
Milestone 5 with separate development, pilot, and production profiles.
