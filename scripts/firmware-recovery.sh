#!/usr/bin/env bash
set -euo pipefail

confirmation="--confirm-p4-factory-recovery"
if [[ $# -ne 3 || "$3" != "${confirmation}" ]]; then
  echo "Usage: $0 <serial-port> <verified-factory-image.bin> ${confirmation}" >&2
  echo "This overwrites the ESP32-P4 application flash at offset 0x0." >&2
  exit 2
fi

serial_port="$1"
image="$2"
if [[ ! -c "${serial_port}" ]]; then
  echo "Serial port is not a character device: ${serial_port}" >&2
  exit 2
fi
if [[ ! -f "${image}" ]]; then
  echo "Recovery image not found: ${image}" >&2
  exit 2
fi

image_name="$(basename "${image}")"
case "${image_name}" in
  ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260206.bin)
    expected_hash="f87b4b16f49704dc8b05b44953a45c011ca9c244e05547e035b4bfa3db74e022" ;;
  ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin)
    expected_hash="60f1ea3c77d75c95bd1de75b12642fe11c53873e0290a9b96bb6bb7a4c3aad78" ;;
  *) echo "Refusing unrecognized recovery image name: ${image_name}" >&2; exit 2 ;;
esac

actual_hash="$(IMAGE_PATH="${image}" python3 - <<'PY'
import hashlib
import os
from pathlib import Path
print(hashlib.sha256(Path(os.environ["IMAGE_PATH"]).read_bytes()).hexdigest())
PY
)"
if [[ "${actual_hash}" != "${expected_hash}" ]]; then
  echo "Recovery image SHA-256 mismatch: ${actual_hash}" >&2
  exit 1
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"

python -m esptool --chip esp32p4 --port "${serial_port}" write_flash 0x0 "${image}"
