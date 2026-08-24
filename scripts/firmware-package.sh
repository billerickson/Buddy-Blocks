#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 7 || $# -gt 8 ]]; then
  echo "Usage: $0 <rev3|rev1_3> <bsp|cpu|ppa> <pilot|production> <version> <minimum-version> <https-image-url> <release-notes-file> [output-dir]" >&2
  exit 2
fi

profile="$1"
rotation="$2"
security_profile="$3"
version="$4"
minimum_version="$5"
image_url="$6"
notes_file="$7"
case "${profile}" in rev3|rev1_3) ;; *) echo "Unknown silicon profile" >&2; exit 2 ;; esac
case "${rotation}" in bsp|cpu|ppa) ;; *) echo "Unknown rotation candidate" >&2; exit 2 ;; esac
case "${security_profile}" in pilot|production) ;; *) echo "Release packages must be pilot or production" >&2; exit 2 ;; esac
if [[ ! -f "${notes_file}" ]]; then
  echo "Release notes file not found: ${notes_file}" >&2
  exit 2
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
version_suffix="-v${version}"
if [[ "${version}" == "0.1.0" ]]; then version_suffix=""; fi
build_dir="${firmware_root}/build-${profile}-${rotation}-${security_profile}${version_suffix}"
output_dir="${8:-${firmware_root}/.artifacts/releases/v${version}/${profile}-${security_profile}}"

BUDDY_FIRMWARE_VERSION="${version}" \
  "${repo_root}/scripts/firmware-build.sh" "${profile}" "${rotation}" "${security_profile}"
mkdir -p "${output_dir}"
artifact_prefix="buddy-blocks-p4-${profile}-v${version}"
app_artifact="${output_dir}/${artifact_prefix}.bin"
recovery_artifact="${output_dir}/${artifact_prefix}-usb-recovery.bin"
cp "${build_dir}/buddy_blocks_p4.bin" "${app_artifact}"
cp "${build_dir}/size-components.txt" "${output_dir}/${artifact_prefix}-size-components.txt"
cp "${build_dir}/size-summary.json" "${output_dir}/${artifact_prefix}-size-summary.json"

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"
python -m esptool --chip esp32p4 merge_bin --flash_size 32MB \
  -o "${recovery_artifact}" \
  0x2000 "${build_dir}/bootloader/bootloader.bin" \
  0x10000 "${build_dir}/partition_table/partition-table.bin" \
  0x22000 "${build_dir}/ota_data_initial.bin" \
  0x30000 "${build_dir}/buddy_blocks_p4.bin"

hardware_revision="${profile}"
if [[ "${profile}" == "rev1_3" ]]; then hardware_revision="rev1.3"; fi
git_sha="$(git -C "${repo_root}" rev-parse HEAD)"
node "${repo_root}/scripts/generate-firmware-release-metadata.mjs" \
  "${output_dir}/manifest-${profile}.json" \
  "${output_dir}/release-report-${profile}.json" \
  "waveshare-p4-lcd43-${hardware_revision}" "${version}" "${minimum_version}" \
  "${app_artifact}" "${image_url}" "${notes_file}" "${security_profile}" "${git_sha}" \
  "${build_dir}/size-summary.json" "${recovery_artifact}"

node "${repo_root}/scripts/generate-sha256sums.mjs" "${output_dir}" \
  "${output_dir}/SHA256SUMS"
echo "Packaged signed ${security_profile} artifacts in ${output_dir}"
echo "Do not flash a production package until the sacrificial-hardware security gate is approved."
