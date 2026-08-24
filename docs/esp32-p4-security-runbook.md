# ESP32-P4 Security and Recovery Runbook

This runbook separates reversible software validation from irreversible device
provisioning. No repository script burns eFuses. Never run an `espefuse` burn
command, flash a production image, or enable release-mode flash encryption on a
board without the owner's explicit approval after signed OTA, automatic
rollback, and USB recovery have passed on sacrificial hardware.

## Security profiles

| Profile | Signed app/OTA | Secure Boot eFuses | Flash encryption | Encrypted NVS | Intended use |
| --- | --- | --- | --- | --- | --- |
| `development` | No | Off | Off | Off | USB bring-up, rotation measurement, recovery testing |
| `pilot` | RSA-3072 signature required | Off | Off | Off | Signed OTA and rollback validation while USB recovery remains simple |
| `production` | RSA-3072 signature required | Secure Boot v2 configured | AES-256 release mode configured | On | Build validation only until the irreversible gate is approved |

The pilot profile is the only security profile authorized for the first OTA
test. The normal flash helper always forces `development`, even if a caller has
set a production environment variable.

## Key handling

Use an offline, backed-up production signing key. Never commit, paste into an
issue, or upload that key. The build expects this ignored path:

```text
firmware/esp32-p4/secrets/secure_boot_signing_key.pem
```

Generate a disposable local key only for build/pilot testing:

```bash
mkdir -p firmware/esp32-p4/secrets
source scripts/firmware-env.sh
espsecure.py generate_signing_key --version 2 \
  firmware/esp32-p4/secrets/secure_boot_signing_key.pem
```

Confirm Git ignores it before building:

```bash
git check-ignore -v firmware/esp32-p4/secrets/secure_boot_signing_key.pem
```

## Reversible validation sequence

1. Flash and validate a development image over USB.
2. Fetch and hash a known-good Waveshare P4 recovery image.
3. Prove the recovery image boots, then restore Buddy Blocks development.
4. Build a signed pilot image and publish its exact-profile manifest.
5. Install pilot through the touchscreen OTA flow on stable USB power.
6. Confirm the pending image marks itself healthy only after display, storage,
   cached content, connectivity task, and board services start.
7. Interrupt a pilot download, then verify the existing slot still boots.
8. Install a deliberately unhealthy signed pilot image and record automatic
   rollback.
9. Repeat USB recovery after the OTA tests.

Commands and evidence fields are in
[`esp32-p4-board-test-runbook.md`](./esp32-p4-board-test-runbook.md) and
[`esp32-p4-hardware-evidence.md`](./esp32-p4-hardware-evidence.md).

## Packaging

Package an exact-profile signed release only after the ignored signing key and
release notes exist:

```bash
./scripts/firmware-package.sh rev3 bsp pilot 1.0.0-rc.3 0.1.0 \
  https://example.invalid/releases/buddy-blocks-p4-rev3-v1.0.0-rc.3.bin \
  /absolute/path/to/release-notes.txt \
  firmware/esp32-p4/.artifacts/releases/v1.0.0-rc.3/rev3-pilot
```

The output is ignored and contains the signed application image, a combined
32 MiB USB recovery image, manifest, release report, component-size report, and
SHA-256 inventory. Verify every hash after copying artifacts to release
storage. The manifest hardware profile must exactly match the board profile.

Pre-board `1.0.0-rc.3` pilot packages have been prepared and hash-verified for
both `rev3` and `rev1_3` under the ignored
`firmware/esp32-p4/.artifacts/releases/` tree. Matching production-profile
packages exist only as configuration/build evidence. Their manifests use
`example.invalid`, none is published, and none is authorized for flashing.
After step 1 of the board runbook identifies the silicon, verify the matching
pilot inventory locally with:

```bash
cd firmware/esp32-p4/.artifacts/releases/v1.0.0-rc.3/rev3-pilot
env LC_ALL=C LANG=C shasum -a 256 -c SHA256SUMS
```

Use `rev1_3-pilot` instead only when the chip-identification evidence requires
that profile. Publishing a real manifest remains gated on development-image
bring-up and physical USB recovery.

## Irreversible production gate

Production provisioning remains prohibited until all of these have physical
evidence and the owner explicitly approves the exact board and command:

- sacrificial board identity and revision recorded;
- development USB flash and Waveshare factory recovery both proven;
- signed pilot OTA success, interrupted-download survival, and bad-image
  rollback proven;
- Buddy Blocks combined USB recovery image proven;
- production signing key custody and backup reviewed;
- release manifest and artifact hashes recorded;
- consequences for ROM download mode, JTAG, key revocation, and future recovery
  reviewed.

Approval to build a production image is not approval to flash it or burn
eFuses. If the gate is approved later, record the full `espefuse` summary before
and after each individually approved operation. Never batch irreversible burns.

## Factory reset

The touchscreen Settings → Factory reset flow requires typing `RESET`. It
erases saved Wi-Fi, pairing/device credentials, settings, cached child content,
outbox, resumable sessions, and local diagnostics, then restarts. It does not
change Secure Boot, flash encryption, eFuses, or the server-side revoked-device
history. Revoke the board from the parent dashboard before reset when network
access is available.
