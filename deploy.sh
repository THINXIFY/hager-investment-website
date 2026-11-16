#!/usr/bin/env bash
# HAGER INVESTMENT: update the live website.
#   cd /opt/hager-investment && ./deploy.sh
# Pulls the latest code from GitHub, rebuilds the Docker image, restarts the site and checks it.
# If the new version fails its health check, the previous version is restored automatically.
# Touches only this project's container and images; other websites on the server are unaffected.
set -Eeuo pipefail

cd "$(dirname "$0")"

APP_IMAGE="hager-investment-web"
CONTAINER="hager-investment-web"
ENV_FILE=".env.production"
BRANCH="${DEPLOY_BRANCH:-main}"

say()  { printf '\n\033[1;36m▸ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✔ %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

# ---- Pre-flight -----------------------------------------------------------------------------
command -v docker >/dev/null || fail "Docker is not installed (see DEPLOYMENT.md, step 2)."
docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 is missing (docker compose …)."
[ -f "$ENV_FILE" ] || fail "$ENV_FILE not found. Create it: cp .env.production.example $ENV_FILE && nano $ENV_FILE"
grep -Eq '^OTP_HASH_SECRET=.{16,}' "$ENV_FILE" || fail "Set OTP_HASH_SECRET in $ENV_FILE (run: openssl rand -hex 32)."
if grep -Eq '^NEXT_PUBLIC_(SHOW_DRAFTS|REVIEW_MODE)=.+' "$ENV_FILE"; then
  fail "NEXT_PUBLIC_SHOW_DRAFTS / NEXT_PUBLIC_REVIEW_MODE must be empty in production ($ENV_FILE)."
fi

PORT="$(grep -E '^HAGER_PORT=' "$ENV_FILE" | cut -d= -f2 | tr -d '[:space:]')"
PORT="${PORT:-4300}"
compose() { docker compose --env-file "$ENV_FILE" "$@"; }

# Folders the container writes to / reads from (owned by the container's user, uid 1001)
mkdir -p data/otp data/image-cache private/documents
for dir in data/otp data/image-cache; do
  if [ "$(stat -c %u "$dir")" != "1001" ]; then
    chown -R 1001:1001 "$dir" 2>/dev/null || sudo chown -R 1001:1001 "$dir"
  fi
done
chmod 700 data/otp 2>/dev/null || true
# Private PDFs: readable by the website container only
(chown -R 1001:1001 private/documents && chmod 700 private/documents) 2>/dev/null \
  || sudo sh -c "chown -R 1001:1001 private/documents && chmod 700 private/documents" || true

# ---- 1. Latest code -------------------------------------------------------------------------
say "Fetching the latest code ($BRANCH)"
# Permission locks on private/documents must not count as local changes
git config core.fileMode false
git fetch --prune origin "$BRANCH"
git checkout -q "$BRANCH"
git pull --ff-only origin "$BRANCH"
REV="$(git rev-parse --short HEAD)"
ok "Code at $REV: $(git log -1 --pretty=%s)"

# ---- 2. Keep the running version for rollback ------------------------------------------------
if docker image inspect "$APP_IMAGE:latest" >/dev/null 2>&1; then
  docker tag "$APP_IMAGE:latest" "$APP_IMAGE:previous"
  HAVE_PREVIOUS=1
else
  HAVE_PREVIOUS=0
fi

# ---- 3. Build ----------------------------------------------------------------------------------
say "Building the website (this takes a few minutes)"
compose build --pull web
docker tag "$APP_IMAGE:latest" "$APP_IMAGE:$REV"

# ---- 4. Start --------------------------------------------------------------------------------
say "Starting the new version"
compose up -d --remove-orphans web

# ---- 5. Health check -------------------------------------------------------------------------
say "Checking the site responds on 127.0.0.1:$PORT"
healthy=0
for _ in $(seq 1 30); do
  if curl -fsS --max-time 5 "http://127.0.0.1:$PORT/api/health" >/dev/null 2>&1 \
     && curl -fsS --max-time 10 -o /dev/null "http://127.0.0.1:$PORT/"; then
    healthy=1
    break
  fi
  sleep 2
done

if [ "$healthy" != "1" ]; then
  printf '\n'
  docker logs --tail 40 "$CONTAINER" || true
  if [ "$HAVE_PREVIOUS" = "1" ]; then
    say "New version failed its health check, restoring the previous version"
    docker tag "$APP_IMAGE:previous" "$APP_IMAGE:latest"
    compose up -d --no-build web
    fail "Deployment of $REV rolled back. The site is running the previous version. Check the logs above."
  fi
  fail "The website did not start. Check the logs above."
fi
ok "Live: version $REV is healthy"

# ---- 6. Tidy up (this project's images only; keep latest, previous and the last 3 builds) -----
docker image prune -f --filter "label=com.hager-investment.app=website" >/dev/null 2>&1 || true
docker images "$APP_IMAGE" --format '{{.Tag}}' \
  | grep -Ev '^(latest|previous)$' | tail -n +4 \
  | xargs -r -I{} docker rmi "$APP_IMAGE:{}" >/dev/null 2>&1 || true

printf '\n\033[1;32mDone.\033[0m  https://hager-investment.com  (version %s)\n' "$REV"
