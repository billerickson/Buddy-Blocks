#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <rev3|rev1_3> <bsp|cpu|ppa>" >&2
  exit 2
fi

profile="$1"
rotation="$2"
case "${profile}" in
  rev3|rev1_3) ;;
  *) echo "Unknown silicon profile: ${profile}" >&2; exit 2 ;;
esac
case "${rotation}" in
  bsp|cpu|ppa) ;;
  *) echo "Unknown rotation candidate: ${rotation}" >&2; exit 2 ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temp_parent="${TMPDIR:-/tmp}"
temp_root="$(mktemp -d "${temp_parent%/}/buddy-p4-repro.XXXXXX")"
cleanup() {
  rm -rf "${temp_root}"
}
trap cleanup EXIT

reference_build="${temp_root}/reference"
rebuilt_build="${temp_root}/rebuilt"
BUDDY_BUILD_DIR="${reference_build}" \
  "${repo_root}/scripts/firmware-build.sh" "${profile}" "${rotation}"
BUDDY_BUILD_DIR="${rebuilt_build}" \
  "${repo_root}/scripts/firmware-build.sh" "${profile}" "${rotation}"

reference_image="${reference_build}/buddy_blocks_p4.bin"
rebuilt_image="${rebuilt_build}/buddy_blocks_p4.bin"
reference_hash="$(LC_ALL=C shasum -a 256 "${reference_image}" | awk '{print $1}')"
rebuilt_hash="$(LC_ALL=C shasum -a 256 "${rebuilt_image}" | awk '{print $1}')"
if [[ "${reference_hash}" != "${rebuilt_hash}" ]]; then
  echo "Reproducibility failure: ${reference_hash} != ${rebuilt_hash}" >&2
  exit 1
fi

echo "Reproducible ${profile}/${rotation}: ${reference_hash}"
