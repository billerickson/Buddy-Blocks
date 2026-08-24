#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
idf_path="${BUDDY_IDF_PATH:-${repo_root}/.toolchains/esp-idf-v5.5.5}"
tools_path="${IDF_TOOLS_PATH:-${repo_root}/.toolchains/espressif-tools-v5.5.5}"

mkdir -p "$(dirname "${idf_path}")" "${tools_path}"

if [[ ! -d "${idf_path}/.git" ]]; then
  git clone --branch v5.5.5 --depth 1 --recursive --shallow-submodules \
    https://github.com/espressif/esp-idf.git "${idf_path}"
fi

actual_tag="$(git -C "${idf_path}" describe --tags --exact-match 2>/dev/null || true)"
if [[ "${actual_tag}" != "v5.5.5" ]]; then
  echo "Refusing to use ${idf_path}: expected exact tag v5.5.5, got ${actual_tag:-unknown}." >&2
  exit 1
fi

IDF_TOOLS_PATH="${tools_path}" "${idf_path}/install.sh" esp32p4
IDF_TOOLS_PATH="${tools_path}" python3 "${idf_path}/tools/idf_tools.py" install \
  cmake@3.30.2 ninja@1.12.1 esp-clang@esp-19.1.2_20250312

echo "ESP-IDF v5.5.5 is ready."
echo "Next: source ./scripts/firmware-env.sh"
echo "Then: ./scripts/firmware-build.sh rev3 bsp"
