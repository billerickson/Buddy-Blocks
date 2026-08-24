#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck disable=SC1091
source "${repo_root}/scripts/firmware-env.sh"
exec python "${repo_root}/scripts/firmware-hardware-evidence.py" "$@"
