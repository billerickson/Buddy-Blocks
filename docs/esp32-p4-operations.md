# ESP32-P4 Operations and Support

This guide covers routine support for a Buddy Blocks board after it has passed
the physical bring-up and pilot gates. It does not replace the board or security
runbooks, and it does not authorize production flashing or eFuse changes.

## Routine status checks

Open **Settings → Diagnostics** on the board. Record the firmware and hardware
profile, redacted device suffix, reset reason, IP address, last successful sync,
content revision, queued-event count, OTA state, minimum internal heap, minimum
PSRAM, and LittleFS free space. Do not photograph pairing codes, Wi-Fi passwords,
bearer tokens, or unredacted credentials.

The top status area deliberately distinguishes:

- **Offline**: local multiplication and cached flash cards remain available.
- **No internet / sign-in required**: Wi-Fi association succeeded, but the
  connectivity probe did not reach the internet; captive portals are unsupported.
- **Sync pending**: completed activity is durable in the outbox and will retry.
- **Update required**: hosted content/activity calls are paused until the exact
  hardware-profile firmware requirement is satisfied.

## Queued activity and storage pressure

Never factory-reset a board with queued events unless losing those unsynchronized
events is explicitly acceptable. The outbox is immutable, CRC-protected, and
removed only after the server accepts the event or reports the same idempotency
key as already stored. A conflicting payload is quarantined for diagnosis rather
than retried forever.

When LittleFS or the outbox approaches its bound, the UI stops promising that new
activity was retained. Restore networking and allow sync to drain first. If space
does not recover, capture Diagnostics, preserve the serial log, and stop using the
board until the corrupt or quarantined record can be examined. Do not format the
filesystem as a repair shortcut.

## Pairing, revocation, and archived children

Pairing is parent-authorized from the normal parent dashboard. A pairing code
expires after ten minutes and is safe to regenerate. Renaming affects the paired
device display name. Revoking a board, or archiving its child, causes the next
authenticated contact to reject the credential and purge child-owned content,
sessions, and queued activity locally. Restore an archived child before re-pairing
if continued use is intended.

## OTA recovery

Keep stable USB power throughout an update. If download is interrupted before the
slot switch, reboot normally and retry. A pending image marks itself valid only
after board, display/touch, storage, cached-content, and connectivity services
initialize; otherwise ESP-IDF rollback returns to the previous slot.

Use the combined USB recovery artifact only after verifying `SHA256SUMS`. For
factory recovery and the initial signed-OTA sequence, follow
[`esp32-p4-board-test-runbook.md`](./esp32-p4-board-test-runbook.md) and
[`esp32-p4-security-runbook.md`](./esp32-p4-security-runbook.md). No routine
support action requires an eFuse burn.

## Factory reset

When synchronization is complete, use **Settings → Factory reset**, type
`RESET`, then choose **Erase and restart**. This clears saved Wi-Fi, pairing
credentials, settings, cached child data, sessions, diagnostics, and the outbox.
It does not revoke the server-side device record or change Secure Boot, flash
encryption, or eFuses. Revoke the board from the parent dashboard first whenever
network access is available.

## Release and pilot evidence

For every candidate, retain the commit SHA, exact hardware profile, signed image
and recovery-image hashes, release report, serial logs, rotation measurements,
100-reboot and power-loss results, OTA/rollback results, eight-hour soak result,
and seven-day family-pilot record. Runtime heap/PSRAM/filesystem watermarks in a
release report remain `null` until copied from physical-board evidence; build-only
reports must never imply that these measurements passed.

Version 1 promotion requires the entire hardware checklist and 18-step acceptance
story in [`esp32-p4-app.md`](./esp32-p4-app.md), with no critical or high-severity
issue open.
