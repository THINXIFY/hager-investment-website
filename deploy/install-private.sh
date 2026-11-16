#!/usr/bin/env bash
# HAGER INVESTMENT: runs ON THE VPS (called by deploy/upload-private.ps1 from your PC).
# Reads the Resend API key from standard input (never from the command line, so it does not
# appear in the process list or shell history), writes it into .env.production, makes sure an
# OTP secret exists, and locks down the private documents so only the website can read them.
set -euo pipefail
cd "$(dirname "$0")/.."

read -r KEY || true
KEY="$(printf '%s' "$KEY" | tr -d '\r[:space:]')"

[ -f .env.production ] || cp .env.production.example .env.production

if [ -n "$KEY" ]; then
  case "$KEY" in re_*) ;; *) echo "That does not look like a Resend key (should start with re_)." >&2; exit 1 ;; esac
  sed -i "s|^RESEND_API_KEY=.*|RESEND_API_KEY=${KEY}|" .env.production
  echo "✔ Resend API key saved in .env.production"
fi

if ! grep -Eq '^OTP_HASH_SECRET=.{16,}' .env.production; then
  sed -i "s|^OTP_HASH_SECRET=.*|OTP_HASH_SECRET=$(openssl rand -hex 32)|" .env.production
  echo "✔ New OTP secret generated"
fi
chmod 600 .env.production

mkdir -p private/documents
chown -R 1001:1001 private/documents
chmod 700 private/documents
find private/documents -type f -exec chmod 600 {} +
n=$(find private/documents -maxdepth 1 -name '*.pdf' | wc -l)
echo "✔ ${n} PDF document(s) in place (readable only by the website)"
echo
echo "Next: ./deploy.sh"
