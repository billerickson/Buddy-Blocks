#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <rev3|rev1_3> <bsp|cpu|ppa>" >&2
  exit 2
fi

profile="$1"
rotation="$2"
case "${profile}" in
  rev3) profile_overlay="sdkconfig.defaults.rev3" ;;
  rev1_3) profile_overlay="sdkconfig.defaults.rev1_3" ;;
  *) echo "Unknown silicon profile: ${profile}" >&2; exit 2 ;;
esac
case "${rotation}" in
  bsp|cpu|ppa) rotation_overlay="sdkconfig.defaults.rotation-${rotation}" ;;
  *) echo "Unknown rotation candidate: ${rotation}" >&2; exit 2 ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
build_dir="${firmware_root}/build-${profile}-${rotation}"

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"

defaults="${firmware_root}/sdkconfig.defaults;${firmware_root}/${profile_overlay};${firmware_root}/${rotation_overlay}"
idf.py -C "${firmware_root}" -B "${build_dir}" \
  -D "SDKCONFIG=${build_dir}/sdkconfig" \
  -D "SDKCONFIG_DEFAULTS=${defaults}" \
  build

image="${build_dir}/buddy_blocks_p4.bin"
if [[ ! -f "${image}" ]]; then
  echo "Expected application image was not generated: ${image}" >&2
  exit 1
fi

if stat -f%z "${image}" >/dev/null 2>&1; then
  image_bytes="$(stat -f%z "${image}")"
else
  image_bytes="$(stat -c%s "${image}")"
fi
max_bytes=5872025
if (( image_bytes > max_bytes )); then
  echo "Application image ${image_bytes} bytes exceeds 80% of the 7 MiB OTA slot (${max_bytes})." >&2
  exit 1
fi

size_report="${build_dir}/size-components.txt"
idf.py -C "${firmware_root}" -B "${build_dir}" size-components >"${size_report}"
echo "Built ${profile}/${rotation}: ${image_bytes} bytes (${image})"
echo "Component size report: ${size_report}"
