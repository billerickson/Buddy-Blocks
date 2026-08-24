#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
firmware_root="$repo_root/firmware/esp32-p4"
build_dir="$firmware_root/.artifacts/simulator"
actual_dir="$build_dir/screenshots"
golden_dir="$firmware_root/test/goldens"
update=false
if [[ "${1:-}" == "--update" ]]; then
  update=true
elif [[ $# -ne 0 ]]; then
  echo "usage: $0 [--update]" >&2
  exit 2
fi

if ! command -v cmake >/dev/null 2>&1 || ! command -v ninja >/dev/null 2>&1; then
  # shellcheck disable=SC1091
  source "$repo_root/scripts/firmware-env.sh"
fi

cmake -S "$firmware_root/simulator" -B "$build_dir" -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build "$build_dir"
mkdir -p "$actual_dir" "$golden_dir"
"$build_dir/buddy_blocks_simulator" --self-test

scenarios=(
  home-offline
  home-online
  home-syncing
  option-states
  choice-grid
  choice-grid-2
  choice-grid-3
  long-option-list
  text-boundaries
  multiplication-selection
  multiplication-no-selection
  multiplication-locked-feedback
  mastery-overview
  mastery-detail
  flash-card-reveal
  flash-library-empty
  wifi-selection
  wifi-scanning
  wifi-wrong-password
  wifi-password
  wifi-forget
  pairing-code
  pairing-syncing
  pairing-error
  diagnostics
  software-update
  software-update-checking
  software-update-error
  settings
  display-settings
  factory-reset
)

for scenario in "${scenarios[@]}"; do
  actual="$actual_dir/$scenario.png"
  golden="$golden_dir/$scenario.png"
  "$build_dir/buddy_blocks_simulator" "$scenario" "$actual"
  if $update; then
    cp "$actual" "$golden"
  elif [[ ! -f "$golden" ]]; then
    echo "missing golden: $golden (review and run $0 --update)" >&2
    exit 1
  elif ! cmp -s "$actual" "$golden"; then
    echo "golden mismatch: $scenario" >&2
    echo "actual: $actual" >&2
    echo "expected: $golden" >&2
    exit 1
  fi
done

if $update; then
  echo "Updated ${#scenarios[@]} reviewed golden candidates in $golden_dir"
else
  echo "Simulator interaction states and ${#scenarios[@]} golden screenshots passed"
fi
