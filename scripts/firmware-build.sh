#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <rev3|rev1_3> <bsp|cpu|ppa> [development|pilot|production]" >&2
  exit 2
fi

profile="$1"
rotation="$2"
security_profile="${3:-${BUDDY_SECURITY_PROFILE:-development}}"
case "${profile}" in
  rev3) profile_overlay="sdkconfig.defaults.rev3" ;;
  rev1_3) profile_overlay="sdkconfig.defaults.rev1_3" ;;
  *) echo "Unknown silicon profile: ${profile}" >&2; exit 2 ;;
esac
case "${rotation}" in
  bsp|cpu|ppa) rotation_overlay="sdkconfig.defaults.rotation-${rotation}" ;;
  *) echo "Unknown rotation candidate: ${rotation}" >&2; exit 2 ;;
esac
case "${security_profile}" in
  development|pilot|production) security_overlay="sdkconfig.defaults.security-${security_profile}" ;;
  *) echo "Unknown security profile: ${security_profile}" >&2; exit 2 ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
firmware_version="${BUDDY_FIRMWARE_VERSION:-0.1.0}"
if [[ ! "${firmware_version}" =~ ^[0-9]+\.[0-9]+\.[0-9]+([+-][0-9A-Za-z.-]+)?$ ]]; then
  echo "Invalid semantic firmware version: ${firmware_version}" >&2
  exit 2
fi
version_suffix=""
if [[ "${firmware_version}" != "0.1.0" ]]; then
  version_suffix="-v${firmware_version}"
fi
if [[ "${security_profile}" == "development" ]]; then
  default_build_dir="${firmware_root}/build-${profile}-${rotation}${version_suffix}"
else
  default_build_dir="${firmware_root}/build-${profile}-${rotation}-${security_profile}${version_suffix}"
fi
build_dir="${BUDDY_BUILD_DIR:-${default_build_dir}}"

if [[ "${security_profile}" != "development" &&
      ! -f "${firmware_root}/secrets/secure_boot_signing_key.pem" ]]; then
  echo "${security_profile} builds require the ignored firmware/esp32-p4/secrets/secure_boot_signing_key.pem" >&2
  exit 1
fi

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"

mkdir -p "${build_dir}"
version_overlay="${build_dir}/sdkconfig.defaults.version"
printf 'CONFIG_BUDDY_FIRMWARE_VERSION="%s"\n' "${firmware_version}" >"${version_overlay}"
defaults="${firmware_root}/sdkconfig.defaults;${firmware_root}/${profile_overlay};${firmware_root}/${rotation_overlay};${firmware_root}/${security_overlay};${version_overlay}"
# sdkconfig is generated output. Recreate it from the tracked overlays on every
# invocation so a prior profile or a newly added security default cannot leak
# into a supposedly reproducible release build.
rm -f "${build_dir}/sdkconfig" "${build_dir}/sdkconfig.old"
idf.py -C "${firmware_root}" -B "${build_dir}" \
  -D "PROJECT_VER=${firmware_version}" \
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
size_summary="${build_dir}/size-summary.json"
python -m esp_idf_size --format json --target esp32p4 \
  --output-file "${size_summary}" "${build_dir}/buddy_blocks_p4.map"
echo "Built ${profile}/${rotation}/${security_profile} v${firmware_version}: ${image_bytes} bytes (${image})"
echo "Component size report: ${size_report}"
echo "Machine-readable size summary: ${size_summary}"
