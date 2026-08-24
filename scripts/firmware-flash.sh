#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <serial-port> <rev3|rev1_3> <bsp|cpu|ppa>" >&2
  exit 2
fi

serial_port="$1"
profile="$2"
rotation="$3"
if [[ ! -c "${serial_port}" ]]; then
  echo "Serial port is not a character device: ${serial_port}" >&2
  exit 2
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
"${repo_root}/scripts/firmware-build.sh" "${profile}" "${rotation}"

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"
firmware_root="${repo_root}/firmware/esp32-p4"
build_dir="${firmware_root}/build-${profile}-${rotation}"
log_dir="${firmware_root}/serial-logs"
mkdir -p "${log_dir}"
log_file="${log_dir}/m0-${profile}-${rotation}-$(date -u +%Y%m%dT%H%M%SZ).log"

echo "Capturing ignored serial evidence to ${log_file}"
echo "Exit the monitor with Ctrl-]."
idf.py -C "${firmware_root}" -B "${build_dir}" -p "${serial_port}" flash monitor \
  2>&1 | tee "${log_file}"
