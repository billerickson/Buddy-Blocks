#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
idf_path="${1:-${BUDDY_IDF_PATH:-${repo_root}/.toolchains/esp-idf-v5.5.5}}"
expected_commit="b774170ff46c393eeb5e495ea37936038d3f4f4f"
patch_file="${repo_root}/firmware/esp32-p4/idf-patches/esp-idf-5.5.5-ppa-srm-freeze.patch"
target="${idf_path}/components/esp_driver_ppa/src/ppa_srm.c"

if [[ ! -d "${idf_path}/.git" || ! -f "${target}" ]]; then
  echo "ESP-IDF v5.5.5 source is missing at ${idf_path}." >&2
  exit 1
fi
actual_commit="$(git -C "${idf_path}" rev-parse HEAD)"
if [[ "${actual_commit}" != "${expected_commit}" ]]; then
  echo "Refusing to patch ESP-IDF commit ${actual_commit}; expected ${expected_commit}." >&2
  exit 1
fi

if patch --dry-run --forward -s -d "${idf_path}" -p1 -i "${patch_file}" >/dev/null 2>&1; then
  patch --forward -s -d "${idf_path}" -p1 -i "${patch_file}"
elif patch --dry-run --reverse -s -d "${idf_path}" -p1 -i "${patch_file}" >/dev/null 2>&1; then
  : # Already applied in this ignored toolchain checkout.
else
  echo "Pinned ESP-IDF source no longer matches $(basename "${patch_file}")." >&2
  exit 1
fi

if ! rg -Fq 'ppa_ll_srm_bypass_mb_order(platform->hal.dev, true);' "${target}" ||
   rg -Fq 'bool bypass_mb_order = false;' "${target}"; then
  echo "ESP-IDF PPA freeze workaround was not applied exactly." >&2
  exit 1
fi
