#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="${repo_root}/firmware/esp32-p4"
host_build="${firmware_root}/.artifacts/host-tests"
simulator_build="${firmware_root}/.artifacts/simulator"

# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh" >/dev/null

expected_clang="Espressif LLVM version 19.1.2"
if [[ "$(clang-tidy --version)" != *"${expected_clang}"* ]]; then
  echo "Expected ${expected_clang}; run ./scripts/firmware-bootstrap.sh." >&2
  exit 1
fi
if [[ "$(clang-format --version)" != *"esp-19.1.2_20250312"* ]]; then
  echo "Expected Espressif clang-format esp-19.1.2_20250312." >&2
  exit 1
fi

format_files=()
while IFS= read -r file; do
  format_files+=("${repo_root}/${file}")
done < <(git -C "${repo_root}" ls-files \
  'firmware/esp32-p4/**/*.c' \
  'firmware/esp32-p4/**/*.cc' \
  'firmware/esp32-p4/**/*.cpp' \
  'firmware/esp32-p4/**/*.h' \
  'firmware/esp32-p4/**/*.hpp')

if [[ ${#format_files[@]} -eq 0 ]]; then
  echo "No tracked ESP32-P4 C/C++ sources found." >&2
  exit 1
fi

clang-format --dry-run --Werror "${format_files[@]}"

if [[ ! -f "${host_build}/compile_commands.json" ]]; then
  "${repo_root}/scripts/firmware-test-host.sh"
fi
if [[ ! -f "${simulator_build}/compile_commands.json" ]]; then
  "${repo_root}/scripts/firmware-test-simulator.sh"
fi

jobs="$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 2)"
project_headers='.*/firmware/esp32-p4/(components|main|simulator|test)/.*'
host_sources='.*/firmware/esp32-p4/(components/buddy_(domain|content|storage)|test/host)/.*\.(c|cc|cpp)$'
simulator_sources='.*/firmware/esp32-p4/(components/buddy_(domain|ui)|simulator)/.*\.(c|cc|cpp)$'
host_target="$(c++ -dumpmachine)"
tidy_platform_args=(-extra-arg-before="--target=${host_target}")
if [[ "$(uname -s)" == "Darwin" ]]; then
  tidy_platform_args+=(-extra-arg-before="--sysroot=$(xcrun --show-sdk-path)")
fi

run-clang-tidy -quiet -j "${jobs}" -p "${host_build}" \
  -config-file "${firmware_root}/.clang-tidy" \
  -header-filter "${project_headers}" \
  "${tidy_platform_args[@]}" \
  "${host_sources}"
run-clang-tidy -quiet -j "${jobs}" -p "${simulator_build}" \
  -config-file "${firmware_root}/.clang-tidy" \
  -header-filter "${project_headers}" \
  "${tidy_platform_args[@]}" \
  "${simulator_sources}"

echo "Pinned Espressif clang-format and clang-tidy checks passed."
