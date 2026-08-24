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

# Resolve the pinned managed components before applying the two narrow BSP
# compatibility fixes. Keeping them as tracked patches avoids relying on local
# edits inside the ignored managed_components directory and makes clean CI
# checkouts behave like developer builds.
idf.py -C "${firmware_root}" -B "${build_dir}" \
  -D "PROJECT_VER=${firmware_version}" \
  -D "SDKCONFIG=${build_dir}/sdkconfig" \
  -D "SDKCONFIG_DEFAULTS=${defaults}" \
  reconfigure

waveshare_root="${firmware_root}/managed_components/waveshare__esp32_p4_wifi6_touch_lcd_4_3"
waveshare_source="${waveshare_root}/esp32_p4_wifi6_touch_lcd_4_3.c"
if [[ ! -f "${waveshare_root}/idf_component.yml" || ! -f "${waveshare_source}" ]] ||
   ! grep -Fqx 'version: 1.0.1' "${waveshare_root}/idf_component.yml"; then
  echo "Refusing to patch anything other than Waveshare BSP 1.0.1." >&2
  exit 1
fi
for bsp_patch in \
  "${firmware_root}/bsp-patches/waveshare-1.0.1-rev1-phy.patch" \
  "${firmware_root}/bsp-patches/waveshare-1.0.1-double-brightness.patch"; do
  if patch --dry-run --forward -s -d "${waveshare_root}" -p1 -i "${bsp_patch}" >/dev/null 2>&1; then
    patch --forward -s -d "${waveshare_root}" -p1 -i "${bsp_patch}"
  elif patch --dry-run --reverse -s -d "${waveshare_root}" -p1 -i "${bsp_patch}" >/dev/null 2>&1; then
    : # Already applied by an earlier local build.
  else
    echo "Pinned Waveshare source no longer matches $(basename "${bsp_patch}")." >&2
    exit 1
  fi
done

idf.py -C "${firmware_root}" -B "${build_dir}" \
  -D "PROJECT_VER=${firmware_version}" \
  -D "SDKCONFIG=${build_dir}/sdkconfig" \
  -D "SDKCONFIG_DEFAULTS=${defaults}" \
  build

# ESP32-P4 revisions before 3.0 and revisions 3.x are mutually exclusive in
# ESP-IDF. Fail the build if Kconfig silently rejected a profile overlay, since
# a successful compile is not evidence that the generated image can boot the
# silicon named on the command line.
sdkconfig="${build_dir}/sdkconfig"
if [[ "${profile}" == "rev1_3" ]]; then
  required_profile_values=(
    'CONFIG_ESP32P4_SELECTS_REV_LESS_V3=y'
    'CONFIG_ESP32P4_REV_MIN_100=y'
    'CONFIG_ESP32P4_REV_MIN_FULL=100'
    'CONFIG_SPIRAM_SPEED_200M=y'
  )
else
  required_profile_values=(
    '# CONFIG_ESP32P4_SELECTS_REV_LESS_V3 is not set'
    'CONFIG_ESP32P4_REV_MIN_300=y'
    'CONFIG_ESP32P4_REV_MIN_FULL=300'
    'CONFIG_SPIRAM_SPEED_250M=y'
  )
fi
for required_value in "${required_profile_values[@]}"; do
  if ! grep -Fqx "${required_value}" "${sdkconfig}"; then
    echo "Resolved sdkconfig does not match ${profile}: missing ${required_value}" >&2
    exit 1
  fi
done

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
