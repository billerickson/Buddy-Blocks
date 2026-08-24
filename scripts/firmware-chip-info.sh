#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <serial-port>" >&2
  exit 2
fi

serial_port="$1"
if [[ ! -c "${serial_port}" ]]; then
  echo "Serial port is not a character device: ${serial_port}" >&2
  exit 2
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"

log_dir="${repo_root}/firmware/esp32-p4/serial-logs"
mkdir -p "${log_dir}"
log_file="${log_dir}/board-identify-$(date -u +%Y%m%dT%H%M%SZ).log"

echo "Capturing ignored board-identification evidence to ${log_file}"
{
  echo "Buddy Blocks board identification"
  echo "UTC: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "Port: ${serial_port}"
  python -m esptool --chip esp32p4 --port "${serial_port}" chip_id
  python -m esptool --chip esp32p4 --port "${serial_port}" flash_id
} 2>&1 | tee "${log_file}"
