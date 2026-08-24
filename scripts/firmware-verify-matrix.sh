#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
artifact_dir="${firmware_root}/.artifacts/build-evidence"
manifest="${artifact_dir}/sha256sums.txt"
mkdir -p "${artifact_dir}"
: >"${manifest}"
temp_parent="${TMPDIR:-/tmp}"
matrix_build_root="$(mktemp -d "${temp_parent%/}/buddy-p4-matrix.XXXXXX")"
cleanup() {
  rm -rf "${matrix_build_root}"
}
trap cleanup EXIT

for profile in rev3 rev1_3; do
  for rotation in bsp cpu ppa; do
    build_dir="${matrix_build_root}/build-${profile}-${rotation}"
    BUDDY_BUILD_DIR="${build_dir}" \
      "${repo_root}/scripts/firmware-build.sh" "${profile}" "${rotation}"
    image="${build_dir}/buddy_blocks_p4.bin"
    if stat -f%z "${image}" >/dev/null 2>&1; then
      image_bytes="$(stat -f%z "${image}")"
    else
      image_bytes="$(stat -c%s "${image}")"
    fi
    image_hash="$(LC_ALL=C shasum -a 256 "${image}" | awk '{print $1}')"
    printf '%s  %s  %s\n' "${image_hash}" "${image_bytes}" \
      "build-${profile}-${rotation}/buddy_blocks_p4.bin" >>"${manifest}"
  done
done

echo "Verified six-profile matrix; ignored SHA manifest: ${manifest}"
sed -n '1,6p' "${manifest}"
