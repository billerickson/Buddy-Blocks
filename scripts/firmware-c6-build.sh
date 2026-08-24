#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
hosted_root="${firmware_root}/managed_components/espressif__esp_hosted"
patch_file="${firmware_root}/c6/esp-hosted-1.4.7-idf-5.5.patch"
c6_defaults="${firmware_root}/c6/sdkconfig.defaults"
c6_hosted_version="1.4.7"
c6_idf_version="5.5.5"

if [[ ! -f "${hosted_root}/idf_component.yml" ||
      ! -f "${hosted_root}/slave/main/coprocessor_fw_version.txt" ]]; then
  echo "Resolved ESP-Hosted sources are missing. Build a P4 profile first." >&2
  exit 2
fi
if ! grep -Fqx "version: ${c6_hosted_version}" "${hosted_root}/idf_component.yml" ||
   ! grep -Fqx "${c6_hosted_version}" "${hosted_root}/slave/main/coprocessor_fw_version.txt"; then
  echo "Refusing to build an ESP-Hosted source other than ${c6_hosted_version}." >&2
  exit 2
fi

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"
if [[ "$(git -C "${IDF_PATH}" describe --tags --always 2>/dev/null)" != "v${c6_idf_version}" ]]; then
  echo "ESP-IDF ${c6_idf_version} is required for the C6 recovery build." >&2
  exit 2
fi

work_root="$(realpath /tmp)/buddy-c6-reproducible"
case "${work_root}" in
  /tmp/buddy-c6-reproducible|/private/tmp/buddy-c6-reproducible) ;;
  *) echo "Unexpected temporary build path: ${work_root}" >&2; exit 2 ;;
esac
if ! mkdir "${work_root}"; then
  echo "C6 build root already exists; refuse concurrent or stale build: ${work_root}" >&2
  exit 2
fi
cleanup() {
  rm -rf -- "${work_root}"
}
trap cleanup EXIT

work_hosted="${work_root}/esp_hosted"
work_idf="${IDF_PATH}"
build_dir="${work_root}/build"
cp -R "${hosted_root}" "${work_hosted}"
patch -s -d "${work_hosted}" -p1 -i "${patch_file}"
cp "${c6_defaults}" "${work_hosted}/slave/sdkconfig.defaults.buddy"

# ESP-Hosted 1.4.7 uses legacy list variables which do not preserve paths with
# spaces. Copy only the ignored pinned IDF installation when that workaround is
# required; CI paths without spaces use the original tree.
if [[ "${IDF_PATH}" == *" "* ]]; then
  work_idf="${work_root}/esp-idf"
  rsync -a --exclude=.git "${IDF_PATH}/" "${work_idf}/"
  touch "${work_idf}/tools/cmake/cflags" "${work_idf}/tools/cmake/cxxflags" \
    "${work_idf}/tools/cmake/asmflags" "${work_idf}/tools/cmake/ldflags"
fi
export IDF_PATH="${work_idf}"

# Some macOS toolchain/CMake paths spell the canonical /private/tmp source as
# /tmp or //tmp. Map both aliases so the fixed temporary directory is absent
# from __FILE__ strings and DWARF, not only from canonical paths.
work_basename="$(basename "${work_root}")"
prefix_map_flags="-fmacro-prefix-map=/tmp/${work_basename}=/BUDDY_C6 -fmacro-prefix-map=//tmp/${work_basename}=/BUDDY_C6 -fdebug-prefix-map=/tmp/${work_basename}=/BUDDY_C6 -fdebug-prefix-map=//tmp/${work_basename}=/BUDDY_C6"

python "${work_idf}/tools/idf.py" \
  -C "${work_hosted}/slave" \
  -B "${build_dir}" \
  -D "SDKCONFIG=${build_dir}/sdkconfig" \
  -D "SDKCONFIG_DEFAULTS=sdkconfig.defaults;sdkconfig.defaults.esp32c6;sdkconfig.defaults.buddy" \
  -D "IDF_TARGET=esp32c6" \
  -D "PROJECT_VER=${c6_hosted_version}" \
  -D "CMAKE_C_FLAGS=${prefix_map_flags}" \
  -D "CMAKE_CXX_FLAGS=${prefix_map_flags}" \
  -D "CMAKE_ASM_FLAGS=${prefix_map_flags}" \
  build

# On macOS /tmp is a symlink to /private/tmp. Canonicalizing work_root and using
# a fixed exclusive path keep the ELF digest stable even in sections that an
# upstream component's build logic does not pass through ESP-IDF's prefix maps.
if strings "${build_dir}/network_adapter.bin" | grep -F "${work_basename}" >/dev/null; then
  echo "Temporary C6 build path leaked into network_adapter.bin." >&2
  exit 1
fi

required_config=(
  'CONFIG_IDF_TARGET="esp32c6"'
  'CONFIG_APP_REPRODUCIBLE_BUILD=y'
  'CONFIG_ESPTOOLPY_FLASHSIZE="4MB"'
  'CONFIG_ESP_SDIO_HOST_INTERFACE=y'
  'CONFIG_ESP_SDIO_STREAMING_MODE=y'
  'CONFIG_ESP_SDIO_PIN_CMD=18'
  'CONFIG_ESP_SDIO_PIN_CLK=19'
  'CONFIG_ESP_SDIO_PIN_D0=20'
  'CONFIG_ESP_SDIO_PIN_D1=21'
  'CONFIG_ESP_SDIO_PIN_D2=22'
  'CONFIG_ESP_SDIO_PIN_D3=23'
)
for required_value in "${required_config[@]}"; do
  if ! grep -Fqx "${required_value}" "${build_dir}/sdkconfig"; then
    echo "Resolved C6 sdkconfig is missing: ${required_value}" >&2
    exit 1
  fi
done
if ! grep -Fqx '#define PROJECT_VERSION_MAJOR_1 1' \
     "${work_hosted}/slave/main/coprocessor_fw_version.h" ||
   ! grep -Fqx '#define PROJECT_VERSION_MINOR_1 4' \
     "${work_hosted}/slave/main/coprocessor_fw_version.h" ||
   ! grep -Fqx '#define PROJECT_VERSION_PATCH_1 7' \
     "${work_hosted}/slave/main/coprocessor_fw_version.h"; then
  echo "Generated coprocessor version header is not ${c6_hosted_version}." >&2
  exit 1
fi

merged="${build_dir}/c6-hosted-${c6_hosted_version}-idf${c6_idf_version}-merged.bin"
python -m esptool --chip esp32c6 merge_bin \
  --flash_mode dio --flash_freq 80m --flash_size 4MB \
  -o "${merged}" \
  0x0 "${build_dir}/bootloader/bootloader.bin" \
  0x8000 "${build_dir}/partition_table/partition-table.bin" \
  0xd000 "${build_dir}/ota_data_initial.bin" \
  0x10000 "${build_dir}/network_adapter.bin"

app_hash="$(env LANG=C LC_ALL=C shasum -a 256 "${build_dir}/network_adapter.bin" | awk '{print $1}')"
artifact_dir="${firmware_root}/.artifacts/recovery/c6-hosted-${c6_hosted_version}-idf${c6_idf_version}-${app_hash:0:12}"
mkdir -p "${artifact_dir}/bootloader" "${artifact_dir}/partition_table"
cp "${build_dir}/bootloader/bootloader.bin" "${artifact_dir}/bootloader/"
cp "${build_dir}/partition_table/partition-table.bin" "${artifact_dir}/partition_table/"
cp "${build_dir}/ota_data_initial.bin" "${build_dir}/network_adapter.bin" \
  "${build_dir}/flash_args" "${build_dir}/flasher_args.json" \
  "${build_dir}/sdkconfig" "${merged}" "${artifact_dir}/"

echo "Built but did not flash ESP32-C6 recovery candidate: ${artifact_dir}"
env LANG=C LC_ALL=C shasum -a 256 \
  "${artifact_dir}/bootloader/bootloader.bin" \
  "${artifact_dir}/partition_table/partition-table.bin" \
  "${artifact_dir}/ota_data_initial.bin" \
  "${artifact_dir}/network_adapter.bin" \
  "${artifact_dir}/$(basename "${merged}")"
echo "Do not write this image until the installed C6 has been read and hashed through the 3.3 V C6-UART pads."
