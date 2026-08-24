#!/usr/bin/env bash

# Source this file; do not execute it. It exports the pinned local ESP-IDF
# environment without adding any generated toolchain content to git.

buddy_repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export BUDDY_IDF_PATH="${BUDDY_IDF_PATH:-${buddy_repo_root}/.toolchains/esp-idf-v5.5.5}"
export IDF_TOOLS_PATH="${IDF_TOOLS_PATH:-${buddy_repo_root}/.toolchains/espressif-tools-v5.5.5}"

if [[ ! -f "${BUDDY_IDF_PATH}/export.sh" ]]; then
  echo "ESP-IDF v5.5.5 is not installed at ${BUDDY_IDF_PATH}." >&2
  echo "Run ./scripts/firmware-bootstrap.sh first." >&2
  return 1 2>/dev/null || exit 1
fi

# ESP-IDF owns this generated environment script.
# shellcheck disable=SC1090
source "${BUDDY_IDF_PATH}/export.sh"

idf_version="$(idf.py --version)"
if [[ "${idf_version}" != *"v5.5.5"* ]]; then
  echo "Expected ESP-IDF v5.5.5, got: ${idf_version}" >&2
  return 1 2>/dev/null || exit 1
fi
