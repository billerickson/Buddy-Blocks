#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_root="${repo_root}/firmware/esp32-p4/test/host"
build_root="${repo_root}/firmware/esp32-p4/.artifacts/host-tests"
vector_header="${build_root}/generated/esp32_p4_domain_vectors.h"

if ! command -v cmake >/dev/null 2>&1 || ! command -v ninja >/dev/null 2>&1; then
  # shellcheck disable=SC1091
  source "${repo_root}/scripts/firmware-env.sh"
fi

node "${repo_root}/scripts/generate-firmware-domain-vectors.mjs" \
  "${repo_root}/tests/fixtures/esp32-p4-domain-vectors.json" "${vector_header}"

cmake -S "${source_root}" -B "${build_root}" -G Ninja \
  -DCMAKE_BUILD_TYPE=RelWithDebInfo
cmake --build "${build_root}"
ctest --test-dir "${build_root}" --output-on-failure
