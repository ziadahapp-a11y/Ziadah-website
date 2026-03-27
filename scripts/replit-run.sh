#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

log() {
  printf '[startup %s] %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"
}

if [[ -z "${PORT:-}" ]]; then
  log "PORT is required (provided by Replit) but missing."
  exit 1
fi

WEB_PORT="${PORT}"
BASE_PATH="${BASE_PATH:-/}"

# Replit secrets can override these values automatically.
export JWT_SECRET="${JWT_SECRET:-YkFwcTU9aqruIFWZn0WO6zotqTvohjer}"
export CMS_ADMIN_EMAIL="${CMS_ADMIN_EMAIL:-admin@ziadah.app}"
export CMS_ADMIN_PASSWORD="${CMS_ADMIN_PASSWORD:-Admin@ziadah2024}"

if [[ -z "${DATABASE_URL:-}" ]]; then
  log "DATABASE_URL is required. Set it in Replit Secrets."
  exit 1
fi

log "Using PORT=${WEB_PORT} BASE_PATH=${BASE_PATH}"
log "Installing dependencies..."
pnpm install

log "Running database migrations..."
(cd lib/db && pnpm run migrate)

log "Ensuring CMS admin user..."
(cd artifacts/api-server && pnpm run seed:cms-admin)

log "Seeding CMS content blocks..."
(cd artifacts/api-server && pnpm run seed:content)

log "Building SPA for static hosting..."
if ! (cd artifacts/ziadah-landing && PORT="${WEB_PORT}" BASE_PATH="${BASE_PATH}" pnpm run build); then
  log "WARN: SPA build failed; continuing with API server startup."
  log "WARN: /api will still work, but web UI may be unavailable until build succeeds."
fi

log "Starting unified server on ${WEB_PORT} (SPA + /api)..."
cd artifacts/api-server
# Ensure stale local api-server from previous runs doesn't mask readiness checks.
pkill -f "artifacts/api-server/src/index.ts" >/dev/null 2>&1 || true

log "Handing off to api-server process..."
exec env PORT="${WEB_PORT}" node --import tsx ./src/index.ts
