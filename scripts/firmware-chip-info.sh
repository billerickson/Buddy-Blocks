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

python -m esptool --chip esp32p4 --port "${serial_port}" chip_id
