#!/usr/bin/env python3
"""Capture machine-checkable ESP32-P4 reboot and soak evidence.

The hardware commands import pyserial from the pinned ESP-IDF environment.
The self-test intentionally needs only the Python standard library so CI can
validate the parser without a board or serial device.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import stat
import subprocess
import sys
import time
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import TextIO


BOOT_MARKER = "BUDDY_BOOT_READY"
METRICS_MARKER = "metrics path="
FATAL_PATTERNS = (
    "Guru Meditation Error",
    "assert failed:",
    "panic'ed",
    "abort() was called",
    "Previous LittleFS proof record is corrupt",
    "Backtrace:",
)


@dataclass(frozen=True)
class BootReady:
    firmware_ms: int
    surface: str
    paired: bool
    display_frame: bool
    storage_verified: bool


@dataclass(frozen=True)
class RebootResult:
    iteration: int
    passed: bool
    firmware_ms: int | None
    host_reset_to_ready_ms: int | None
    surface: str | None
    paired: bool | None
    display_frame: bool | None
    storage_verified: bool
    reason: str


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_boot_ready(line: str) -> BootReady | None:
    marker_at = line.find(BOOT_MARKER)
    if marker_at < 0:
        return None
    fields: dict[str, str] = {}
    for token in line[marker_at + len(BOOT_MARKER) :].strip().split():
        if "=" in token:
            key, value = token.split("=", 1)
            fields[key] = value
    required = {"firmware_ms", "surface", "paired", "display_frame", "storage"}
    if not required.issubset(fields):
        return None
    try:
        firmware_ms = int(fields["firmware_ms"])
        paired = int(fields["paired"])
        display_frame = int(fields["display_frame"])
        storage = int(fields["storage"])
    except ValueError:
        return None
    if (
        firmware_ms < 0
        or paired not in (0, 1)
        or display_frame not in (0, 1)
        or storage not in (0, 1)
    ):
        return None
    if not re.fullmatch(r"[a-z0-9-]+", fields["surface"]):
        return None
    return BootReady(
        firmware_ms,
        fields["surface"],
        bool(paired),
        bool(display_frame),
        bool(storage),
    )


def fatal_reason(lines: list[str]) -> str | None:
    for line in lines:
        for pattern in FATAL_PATTERNS:
            if pattern in line:
                return f"fatal serial marker: {pattern}"
    return None


def evaluate_reboot(
    iteration: int,
    lines: list[str],
    host_elapsed_ms: int,
    expected_surface: str,
    max_ready_ms: int,
    require_paired: bool,
) -> RebootResult:
    fatal = fatal_reason(lines)
    markers = [parsed for line in lines if (parsed := parse_boot_ready(line)) is not None]
    ready = markers[-1] if markers else None
    storage_verified = ready.storage_verified if ready is not None else False
    reasons: list[str] = []
    if fatal is not None:
        reasons.append(fatal)
    if len(markers) != 1:
        reasons.append(f"expected one boot-ready marker, found {len(markers)}")
    if ready is not None:
        if ready.firmware_ms > max_ready_ms:
            reasons.append(
                f"firmware readiness {ready.firmware_ms} ms exceeds {max_ready_ms} ms"
            )
        if host_elapsed_ms > max_ready_ms:
            reasons.append(
                f"host reset-to-ready {host_elapsed_ms} ms exceeds {max_ready_ms} ms"
            )
        if ready.surface != expected_surface:
            reasons.append(
                f"expected surface {expected_surface}, observed {ready.surface}"
            )
        if require_paired and not ready.paired:
            reasons.append("device was not paired")
        if not ready.display_frame:
            reasons.append("no completed display frame")
    if not storage_verified:
        reasons.append("boot-ready marker did not confirm LittleFS")
    return RebootResult(
        iteration=iteration,
        passed=not reasons,
        firmware_ms=ready.firmware_ms if ready else None,
        host_reset_to_ready_ms=host_elapsed_ms if ready else None,
        surface=ready.surface if ready else None,
        paired=ready.paired if ready else None,
        display_frame=ready.display_frame if ready else None,
        storage_verified=storage_verified,
        reason="; ".join(reasons) if reasons else "ok",
    )


def require_character_device(path: str) -> None:
    try:
        mode = os.stat(path).st_mode
    except FileNotFoundError as error:
        raise SystemExit(f"Serial port does not exist: {path}") from error
    if not stat.S_ISCHR(mode):
        raise SystemExit(f"Serial port is not a character device: {path}")


def import_serial():
    try:
        import serial  # type: ignore[import-not-found]
    except ImportError as error:
        raise SystemExit(
            "pyserial is unavailable. Run this command through "
            "./scripts/firmware-hardware-evidence.sh."
        ) from error
    return serial


def open_serial(serial_module, port: str, deadline: float):
    last_error: Exception | None = None
    while time.monotonic() < deadline:
        try:
            return serial_module.Serial(port, 115200, timeout=0.1, write_timeout=1)
        except (OSError, serial_module.SerialException) as error:
            last_error = error
            time.sleep(0.1)
    raise RuntimeError(f"could not open {port}: {last_error}")


def write_line(log: TextIO, line: str) -> None:
    clean = line.rstrip("\r\n")
    print(clean, flush=True)
    log.write(clean + "\n")
    log.flush()


def read_until_boot_ready(
    serial_module, port: str, deadline: float, reset_started: float, log: TextIO
) -> tuple[list[str], int | None]:
    connection = open_serial(serial_module, port, deadline)
    lines: list[str] = []
    pending = b""
    ready_at: float | None = None
    try:
        while time.monotonic() < deadline:
            try:
                data = connection.read(4096)
            except (OSError, serial_module.SerialException) as error:
                raise RuntimeError(f"serial read failed on {port}: {error}") from error
            if not data:
                if ready_at is not None and time.monotonic() - ready_at >= 1:
                    elapsed = round((ready_at - reset_started) * 1000)
                    return lines, elapsed
                continue
            pending += data
            while b"\n" in pending:
                raw, pending = pending.split(b"\n", 1)
                line = raw.decode("utf-8", errors="replace").rstrip("\r")
                lines.append(line)
                write_line(log, line)
                if parse_boot_ready(line) is not None and ready_at is None:
                    ready_at = time.monotonic()
                if fatal_reason([line]) is not None:
                    elapsed = round((ready_at - reset_started) * 1000) if ready_at else None
                    return lines, elapsed
            # Keep capturing for one second after readiness so an immediate
            # connectivity/OTA-start panic cannot turn into a false reboot pass.
            if ready_at is not None and time.monotonic() - ready_at >= 1:
                elapsed = round((ready_at - reset_started) * 1000)
                return lines, elapsed
        if pending:
            line = pending.decode("utf-8", errors="replace")
            lines.append(line)
            write_line(log, line)
        elapsed = round((ready_at - reset_started) * 1000) if ready_at else None
        return lines, elapsed
    finally:
        connection.close()


def git_head(repo_root: Path) -> str:
    result = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        cwd=repo_root,
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def evidence_paths(repo_root: Path, kind: str) -> tuple[Path, Path]:
    output_dir = repo_root / "firmware" / "esp32-p4" / "serial-logs"
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    base = output_dir / f"{kind}-{stamp}"
    return base.with_suffix(".log"), base.with_suffix(".json")


def run_reboot_loop(args: argparse.Namespace, repo_root: Path) -> int:
    require_character_device(args.port)
    serial_module = import_serial()
    log_path, summary_path = evidence_paths(repo_root, "reboot-loop")
    results: list[RebootResult] = []
    interrupted = False
    started = utc_now()
    print(f"Capturing reboot evidence to {log_path}")
    with log_path.open("w", encoding="utf-8") as log:
        write_line(log, "Buddy Blocks hardware reboot loop")
        write_line(log, f"started_utc={started}")
        write_line(log, f"git_sha={git_head(repo_root)}")
        write_line(log, f"port={args.port}")
        write_line(log, f"count={args.count}")
        try:
            for iteration in range(1, args.count + 1):
                write_line(log, f"BUDDY_REBOOT_BEGIN iteration={iteration}")
                reset_started = time.monotonic()
                reset = subprocess.run(
                    [
                        sys.executable,
                        "-m",
                        "esptool",
                        "--chip",
                        "esp32p4",
                        "--port",
                        args.port,
                        "--after",
                        "hard_reset",
                        "run",
                    ],
                    check=False,
                    capture_output=True,
                    text=True,
                )
                for reset_line in (reset.stdout + reset.stderr).splitlines():
                    write_line(log, f"esptool: {reset_line}")
                if reset.returncode != 0:
                    result = RebootResult(
                        iteration, False, None, None, None, None, None, False,
                        f"esptool reset exited {reset.returncode}",
                    )
                else:
                    deadline = reset_started + args.boot_timeout_seconds
                    try:
                        lines, elapsed_ms = read_until_boot_ready(
                            serial_module, args.port, deadline, reset_started, log
                        )
                        result = evaluate_reboot(
                            iteration,
                            lines,
                            elapsed_ms if elapsed_ms is not None else round(
                                (time.monotonic() - reset_started) * 1000
                            ),
                            args.expected_surface,
                            args.max_ready_ms,
                            not args.allow_unpaired,
                        )
                    except RuntimeError as error:
                        result = RebootResult(
                            iteration, False, None, None, None, None, None, False, str(error)
                        )
                results.append(result)
                write_line(
                    log,
                    f"BUDDY_REBOOT_RESULT iteration={iteration} "
                    f"status={'PASS' if result.passed else 'FAIL'} reason={result.reason}",
                )
                if not result.passed and not args.keep_going:
                    break
        except KeyboardInterrupt:
            interrupted = True
            write_line(
                log,
                "BUDDY_REBOOT_RESULT status=FAIL "
                "reason=operator interrupted reboot loop before completion",
            )

    firmware_ready_values = [
        result.firmware_ms for result in results if result.firmware_ms is not None
    ]
    host_ready_values = [
        result.host_reset_to_ready_ms
        for result in results
        if result.host_reset_to_ready_ms is not None
    ]
    passed = (
        not interrupted
        and len(results) == args.count
        and all(result.passed for result in results)
    )
    summary = {
        "schemaVersion": 1,
        "kind": "reboot-loop",
        "startedUtc": started,
        "finishedUtc": utc_now(),
        "gitSha": git_head(repo_root),
        "port": args.port,
        "requestedCount": args.count,
        "completedCount": len(results),
        "interrupted": interrupted,
        "expectedSurface": args.expected_surface,
        "maxReadyMs": args.max_ready_ms,
        "maximumFirmwareReadyMs": max(firmware_ready_values, default=None),
        "maximumHostResetToReadyMs": max(host_ready_values, default=None),
        "passed": passed,
        "results": [asdict(result) for result in results],
    }
    summary_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(f"Summary: {summary_path}")
    print(f"Reboot loop: {'PASS' if passed else 'FAIL'}")
    return 0 if passed else 1


def run_soak(args: argparse.Namespace, repo_root: Path) -> int:
    require_character_device(args.port)
    serial_module = import_serial()
    log_path, summary_path = evidence_paths(repo_root, "screen-on-soak")
    duration_seconds = args.hours * 60 * 60
    started_monotonic = time.monotonic()
    deadline = started_monotonic + duration_seconds
    started = utc_now()
    boot_times: list[float] = []
    metrics_count = 0
    fatal: str | None = None
    disconnects = 0
    completed = False
    print(f"Capturing soak evidence to {log_path}")
    print("Keep Settings -> Display -> Screen timeout set to Never for the entire run.")
    with log_path.open("w", encoding="utf-8") as log:
        write_line(log, "Buddy Blocks screen-on soak")
        write_line(log, f"started_utc={started}")
        write_line(log, f"git_sha={git_head(repo_root)}")
        write_line(log, f"port={args.port}")
        write_line(log, f"requested_hours={args.hours}")
        connection = None
        pending = b""
        try:
            while time.monotonic() < deadline:
                if connection is None:
                    try:
                        connection = open_serial(
                            serial_module, args.port, min(deadline, time.monotonic() + 10)
                        )
                    except RuntimeError as error:
                        fatal = str(error)
                        break
                try:
                    data = connection.read(4096)
                except (OSError, serial_module.SerialException) as error:
                    write_line(log, f"BUDDY_SERIAL_DISCONNECT error={error}")
                    disconnects += 1
                    connection.close()
                    connection = None
                    continue
                if not data:
                    continue
                pending += data
                while b"\n" in pending:
                    raw, pending = pending.split(b"\n", 1)
                    line = raw.decode("utf-8", errors="replace").rstrip("\r")
                    write_line(log, line)
                    if parse_boot_ready(line) is not None:
                        boot_times.append(time.monotonic() - started_monotonic)
                    if METRICS_MARKER in line:
                        metrics_count += 1
                    detected = fatal_reason([line])
                    if detected is not None:
                        fatal = detected
                        break
                if fatal is not None:
                    break
            completed = time.monotonic() >= deadline
        except KeyboardInterrupt:
            fatal = "operator interrupted soak before the requested duration"
        finally:
            if connection is not None:
                connection.close()

    unexpected_boots = [seconds for seconds in boot_times if seconds > 30]
    minimum_metrics = max(1, int(duration_seconds / 10 * 0.8))
    reasons: list[str] = []
    if fatal is not None:
        reasons.append(fatal)
    if not completed:
        reasons.append("requested duration did not complete")
    if unexpected_boots:
        reasons.append(f"unexpected reboot markers at seconds {unexpected_boots}")
    if metrics_count < minimum_metrics:
        reasons.append(
            f"only {metrics_count} metric samples; expected at least {minimum_metrics}"
        )
    if disconnects:
        reasons.append(f"serial connection dropped {disconnects} time(s)")
    passed = not reasons
    summary = {
        "schemaVersion": 1,
        "kind": "screen-on-soak",
        "startedUtc": started,
        "finishedUtc": utc_now(),
        "gitSha": git_head(repo_root),
        "port": args.port,
        "requestedHours": args.hours,
        "completed": completed,
        "bootMarkerSeconds": boot_times,
        "unexpectedBootMarkerSeconds": unexpected_boots,
        "metricsCount": metrics_count,
        "minimumMetrics": minimum_metrics,
        "serialDisconnects": disconnects,
        "passed": passed,
        "reason": "; ".join(reasons) if reasons else "ok",
    }
    summary_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(f"Summary: {summary_path}")
    print(f"Screen-on soak: {'PASS' if passed else 'FAIL'}")
    if reasons:
        print(summary["reason"])
    return 0 if passed else 1


def run_self_test() -> int:
    good = [
        "I buddy_m0: Previous LittleFS proof record verified (nonce suffix=1234)",
        "I buddy_app: BUDDY_BOOT_READY firmware_ms=2840 surface=home paired=1 display_frame=1 storage=1",
    ]
    parsed = parse_boot_ready(good[1])
    assert parsed == BootReady(2840, "home", True, True, True)
    assert parse_boot_ready("BUDDY_BOOT_READY surface=home") is None
    assert parse_boot_ready(
        "BUDDY_BOOT_READY firmware_ms=x surface=home paired=1 display_frame=1 storage=1"
    ) is None
    passed = evaluate_reboot(1, good, 3100, "home", 5000, True)
    assert passed.passed
    late = evaluate_reboot(
        2,
        [good[0], good[1].replace("2840", "5001")],
        5200,
        "home",
        5000,
        True,
    )
    assert not late.passed and "exceeds" in late.reason
    host_late = evaluate_reboot(2, good, 5001, "home", 5000, True)
    assert not host_late.passed and "host reset-to-ready" in host_late.reason
    corrupt = evaluate_reboot(
        3,
        [good[1], "E buddy_m0: Previous LittleFS proof record is corrupt"],
        3000,
        "home",
        5000,
        True,
    )
    assert not corrupt.passed and "fatal serial marker" in corrupt.reason
    wrong_surface = evaluate_reboot(4, good, 3000, "wifi", 5000, True)
    assert not wrong_surface.passed and "expected surface" in wrong_surface.reason
    duplicate = evaluate_reboot(5, good + [good[1]], 3000, "home", 5000, True)
    assert not duplicate.passed and "found 2" in duplicate.reason
    storage_failed = evaluate_reboot(
        6, [good[1].replace("storage=1", "storage=0")], 3000, "home", 5000, True
    )
    assert not storage_failed.passed and "LittleFS" in storage_failed.reason
    print("firmware hardware evidence parser: PASS")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Capture non-destructive Buddy Blocks physical-board evidence"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    reboot = subparsers.add_parser(
        "reboot-loop", description="Run repeatable hard resets and verify cached Home"
    )
    reboot.add_argument("port")
    reboot.add_argument("--count", type=int, default=100)
    reboot.add_argument("--boot-timeout-seconds", type=float, default=20)
    reboot.add_argument("--max-ready-ms", type=int, default=5000)
    reboot.add_argument("--expected-surface", default="home")
    reboot.add_argument("--allow-unpaired", action="store_true")
    reboot.add_argument("--keep-going", action="store_true")

    soak = subparsers.add_parser(
        "soak", description="Capture the required screen-on stability soak"
    )
    soak.add_argument("port")
    soak.add_argument("--hours", type=float, default=8)

    subparsers.add_parser("self-test")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if args.command == "self-test":
        return run_self_test()
    repo_root = Path(__file__).resolve().parent.parent
    if args.command == "reboot-loop":
        if args.count < 1 or args.boot_timeout_seconds <= 0 or args.max_ready_ms <= 0:
            raise SystemExit("Reboot count and timeouts must be positive")
        if not re.fullmatch(r"[a-z0-9-]+", args.expected_surface):
            raise SystemExit("Expected surface must use lowercase letters, digits, or hyphens")
        return run_reboot_loop(args, repo_root)
    if args.hours < 8:
        raise SystemExit("A qualifying screen-on soak must run for at least 8 hours")
    return run_soak(args, repo_root)


if __name__ == "__main__":
    raise SystemExit(main())
