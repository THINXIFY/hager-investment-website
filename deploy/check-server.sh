#!/usr/bin/env bash
# HAGER INVESTMENT: read-only pre-flight check for the VPS. Changes nothing.
#   bash deploy/check-server.sh
set -uo pipefail

DOMAIN="hager-investment.com"
EXPECTED_IP="2.25.169.72"
PORT="${HAGER_PORT:-4300}"

pass() { printf '  \033[1;32m✔\033[0m %s\n' "$*"; }
warn() { printf '  \033[1;33m!\033[0m %s\n' "$*"; }
bad()  { printf '  \033[1;31m✖\033[0m %s\n' "$*"; }
section() { printf '\n\033[1m%s\033[0m\n' "$*"; }

section "System"
. /etc/os-release 2>/dev/null && pass "$PRETTY_NAME" || warn "Unknown OS"
mem=$(awk '/MemTotal/ {printf "%.1f", $2/1024/1024}' /proc/meminfo)
swap=$(awk '/SwapTotal/ {printf "%.1f", $2/1024/1024}' /proc/meminfo)
pass "Memory ${mem} GB, swap ${swap} GB"
awk -v m="$mem" -v s="$swap" 'BEGIN { exit !(m + s < 2.5) }' && warn "Building needs ~2 GB: add swap (see DEPLOYMENT.md, troubleshooting)."
df -h / | awk 'NR==2 {print "  ✔ Disk free on /: " $4}'

section "Docker"
if command -v docker >/dev/null; then
  pass "$(docker --version)"
  docker compose version >/dev/null 2>&1 && pass "$(docker compose version)" || bad "Docker Compose v2 missing"
  n=$(docker ps -q | wc -l); pass "$n container(s) running (left untouched)"
else
  warn "Docker not installed (step 2 installs it)"
fi

section "Web server on ports 80 / 443"
listeners=$(ss -ltnpH '( sport = :80 or sport = :443 )' 2>/dev/null)
if [ -z "$listeners" ]; then
  warn "Nothing listens on 80/443 yet (step 3 installs Nginx)"
else
  echo "$listeners" | awk '{print "    " $4 "  " $6}'
  if echo "$listeners" | grep -q nginx; then pass "Host Nginx serves 80/443: the standard setup in DEPLOYMENT.md applies"
  else bad "Another program owns 80/443 (e.g. a control panel, Apache, Caddy or a Docker proxy). Do not install Nginx; see DEPLOYMENT.md, 'Different web server'."; fi
fi
if command -v nginx >/dev/null; then
  pass "$(nginx -v 2>&1)"
  existing=$(sudo nginx -T 2>/dev/null | grep -nE "server_name[^;]*${DOMAIN//./\\.}" || true)
  if [ -n "$existing" ]; then
    warn "Nginx already mentions $DOMAIN (check these before continuing):"
    echo "$existing" | sed 's/^/      /'
  else
    pass "No existing Nginx site for $DOMAIN"
  fi
fi

section "Local port $PORT (website container)"
if ss -ltnH "( sport = :$PORT )" | grep -q .; then
  owner=$(docker ps --filter "publish=$PORT" --format '{{.Names}}' 2>/dev/null)
  [ "$owner" = "hager-investment-web" ] && pass "Used by hager-investment-web (this site)" || bad "Port $PORT is taken by another service: set HAGER_PORT in .env.production and the Nginx file"
else
  pass "Port $PORT is free"
fi

section "DNS"
for host in "$DOMAIN" "www.$DOMAIN"; do
  ip=$(getent ahostsv4 "$host" | awk 'NR==1 {print $1}')
  if [ "$ip" = "$EXPECTED_IP" ]; then pass "$host → $ip"
  elif [ -z "$ip" ]; then bad "$host does not resolve yet (add an A record → $EXPECTED_IP)"
  else bad "$host → $ip (expected $EXPECTED_IP: update the A record)"; fi
done

section "Firewall"
if command -v ufw >/dev/null && sudo ufw status 2>/dev/null | grep -q "Status: active"; then
  sudo ufw status | grep -Eq '(80|Nginx|443)' && pass "ufw active and allows web traffic" || warn "ufw active: allow web traffic with: sudo ufw allow 'Nginx Full'"
else
  pass "ufw not active (also check Hostinger's firewall in hPanel allows 80 and 443)"
fi
printf '\n'
