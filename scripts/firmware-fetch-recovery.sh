#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
destination="${repo_root}/firmware/esp32-p4/.artifacts/recovery"
mkdir -p "${destination}"

base_url="https://raw.githubusercontent.com/waveshareteam/ESP32-P4-WIFI6-Touch-LCD-4.3/main/firmware"
old_name="ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260206.bin"
new_name="ESP32-P4-WIFI6-Touch-LCD-4.3-FactoryOnly-260820.bin"
old_hash="f87b4b16f49704dc8b05b44953a45c011ca9c244e05547e035b4bfa3db74e022"
new_hash="60f1ea3c77d75c95bd1de75b12642fe11c53873e0290a9b96bb6bb7a4c3aad78"

curl -L --fail --output "${destination}/${old_name}" "${base_url}/${old_name}"
curl -L --fail --output "${destination}/${new_name}" "${base_url}/${new_name}"

OLD_IMAGE="${destination}/${old_name}" NEW_IMAGE="${destination}/${new_name}" \
OLD_HASH="${old_hash}" NEW_HASH="${new_hash}" python3 - <<'PY'
import hashlib
import os
from pathlib import Path

for path_key, hash_key in (("OLD_IMAGE", "OLD_HASH"), ("NEW_IMAGE", "NEW_HASH")):
    path = Path(os.environ[path_key])
    actual = hashlib.sha256(path.read_bytes()).hexdigest()
    expected = os.environ[hash_key]
    if actual != expected:
        raise SystemExit(f"SHA-256 mismatch for {path.name}: {actual} != {expected}")
    print(f"verified {path.name}: {actual}")
PY

echo "Recovery downloads are verified in ignored ${destination}."
