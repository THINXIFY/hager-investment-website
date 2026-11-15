# Deploying HAGER INVESTMENT

The website runs in **one Docker container** on the VPS, listening only on `127.0.0.1:4300`.
The server's **Nginx** receives visitors on ports 80/443, handles HTTPS (Let's Encrypt) and passes requests to the container.
Only one Nginx file, `hager-investment.com.conf`, is added, and it answers only for `hager-investment.com` and `www.hager-investment.com`. Your other websites, containers and certificates are not changed.

| | |
|---|---|
| Live address | `https://hager-investment.com` (www, and http, redirect here) |
| VPS | `2.25.169.72` |
| Code on the VPS | `/opt/hager-investment` |
| Container | `hager-investment-web` (port `127.0.0.1:4300`) |
| Update command | `cd /opt/hager-investment && ./deploy.sh` |

---

## First deployment (once)

Run these in order. Commands assume you are logged in as `root`; if you use another user, put `sudo` in front of them.

### Step 0: Point the domain to the VPS
In Hostinger → **Domains → DNS / Nameservers** for `hager-investment.com`:

| Type | Name | Points to | TTL |
|---|---|---|---|
| A | `@` | `2.25.169.72` | 3600 |
| A | `www` | `2.25.169.72` | 3600 |

Delete any other `A` / `AAAA` / `CNAME` records for `@` or `www` that point elsewhere (e.g. a parking page). DNS can take from a few minutes to a few hours.

### Step 1: Connect and download the code
```bash
ssh root@2.25.169.72

apt update && apt install -y git curl
git clone https://github.com/THINXIFY/hager-investment-website.git /opt/hager-investment
cd /opt/hager-investment
chmod +x deploy.sh deploy/check-server.sh
```
> If the GitHub repository is **private**, set up a deploy key first (see "Private repository" at the end), then clone with `git@github.com:THINXIFY/hager-investment-website.git`.

### Step 2: Check the server (changes nothing)
```bash
bash deploy/check-server.sh
```
Read the result:
- **Docker not installed** → install it:
  ```bash
  curl -fsSL https://get.docker.com | sh
  ```
- **Host Nginx serves 80/443** → normal case, continue.
- **Nothing listens on 80/443** → install Nginx and Certbot:
  ```bash
  apt install -y nginx certbot
  ```
- **"Another program owns 80/443"** → **stop here** and read "Different web server" at the end. Do not install Nginx; it would conflict with your other sites.
- **Port 4300 is taken** → choose another free port (e.g. 4310): set `HAGER_PORT=4310` in `.env.production` (step 3) and replace `4300` in both files in `deploy/nginx/`.
- **DNS** shows the wrong IP → finish step 0 first (the certificate in step 6 needs it).

If Nginx is already installed but Certbot is not: `apt install -y certbot`.

### Step 3: Production settings
```bash
cd /opt/hager-investment
cp .env.production.example .env.production
openssl rand -hex 32          # copy the output
nano .env.production
```
Fill in:
- `OTP_HASH_SECRET=`: paste the random value from `openssl` (**required**).
- `RESEND_API_KEY=`: from [resend.com](https://resend.com) (needed for the enquiry form and the private-documents emails). In Resend, add the domain `hager-investment.com` and create the DNS records it shows you in Hostinger, so emails can be sent from `@hager-investment.com`.
- Check `CONTACT_TO_EMAIL` (where enquiries arrive) and the sender addresses.
- Leave `NEXT_PUBLIC_SHOW_DRAFTS` and `NEXT_PUBLIC_REVIEW_MODE` **empty**.

Save with `Ctrl+O`, `Enter`, `Ctrl+X`. Then protect the file:
```bash
chmod 600 .env.production
```

### Step 4: Private documents (optional)
The approved PDFs sent after email verification are **not** in GitHub. From **your computer** (PowerShell), upload them:
```powershell
scp "C:\path\to\HAGER-Company-Profile.pdf" root@2.25.169.72:/opt/hager-investment/private/documents/
```
Use the file names listed in `private/documents/README.md`.

### Step 5: Build and start the website
```bash
cd /opt/hager-investment
./deploy.sh
```
The first build takes about 3–6 minutes. It ends with **"Live: version … is healthy"**.
Check: `curl -I http://127.0.0.1:4300` → `HTTP/1.1 200 OK`.

### Step 6: Connect the domain (Nginx, HTTP first)
```bash
mkdir -p /var/www/hager-investment-acme
cp deploy/nginx/hager-investment.com.http-only.conf /etc/nginx/sites-available/hager-investment.com.conf
ln -sf /etc/nginx/sites-available/hager-investment.com.conf /etc/nginx/sites-enabled/hager-investment.com.conf
nginx -t && systemctl reload nginx
```
`nginx -t` must say **"syntax is ok"** and **"test is successful"**. If it reports an error, nothing has been reloaded and your other sites keep running. Fix the error before continuing.

Check: open `http://hager-investment.com`; the site should load (without the padlock yet).

### Step 7: HTTPS certificate
```bash
certbot certonly --webroot -w /var/www/hager-investment-acme \
  -d hager-investment.com -d www.hager-investment.com \
  --email info@hager-investment.com --agree-tos --no-eff-email
```
It should say **"Successfully received certificate"**.

### Step 8: Switch on HTTPS and the redirects
```bash
cp deploy/nginx/hager-investment-proxy.conf /etc/nginx/snippets/hager-investment-proxy.conf
cp deploy/nginx/hager-investment.com.conf /etc/nginx/sites-available/hager-investment.com.conf
nginx -t && systemctl reload nginx
```

### Step 9: Automatic certificate renewal
Certbot renews certificates automatically. This makes Nginx pick up each renewed certificate:
```bash
mkdir -p /etc/letsencrypt/renewal-hooks/deploy
printf '#!/bin/sh\nnginx -t && systemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
certbot renew --dry-run
```
The dry run should end with **"Congratulations, all simulated renewals succeeded"**.

### Step 10: Final check
```bash
curl -I https://hager-investment.com             # 200
curl -I https://www.hager-investment.com         # 301 → https://hager-investment.com/
curl -I http://hager-investment.com              # 301 → https://hager-investment.com/
curl -s https://hager-investment.com/api/health  # {"status":"ok"}
```
Then open `https://hager-investment.com` in a browser and try the Contact form.

If a firewall is active: `ufw allow 'Nginx Full'`. In Hostinger hPanel → VPS → **Firewall**, make sure ports 80 and 443 are allowed.

---

## Updating the website (every time)

1. On your computer, commit and push your changes:
   ```bash
   git add -A
   git commit -m "Describe the change"
   git push
   ```
2. On the VPS:
   ```bash
   cd /opt/hager-investment && ./deploy.sh
   ```

`deploy.sh` pulls the latest code, builds a new image, restarts the site and checks that it responds.
If the new version fails the check, **it automatically restores the previous version**, so the site stays online.

---

## Everyday commands (on the VPS, in `/opt/hager-investment`)

| What | Command |
|---|---|
| Is it running? | `docker ps --filter name=hager-investment-web` |
| Live logs | `docker logs -f --tail 100 hager-investment-web` |
| Restart | `docker compose --env-file .env.production restart web` |
| Stop | `docker compose --env-file .env.production stop web` |
| Start again | `docker compose --env-file .env.production up -d web` |
| Roll back to the previous version | `docker tag hager-investment-web:previous hager-investment-web:latest && docker compose --env-file .env.production up -d --no-build web` |
| Nginx logs for this site | `tail -f /var/log/nginx/hager-investment.error.log` |
| After editing `.env.production` | `./deploy.sh` (public values are built into the site) |

These commands only affect the HAGER INVESTMENT container.

---

## Troubleshooting

**Build stops with "Killed" or runs out of memory.** The build needs about 2 GB of RAM. Add swap once:
```bash
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

**502 Bad Gateway.** The container isn't running or is still starting: `docker logs --tail 50 hager-investment-web`, then `./deploy.sh`.

**Certbot fails.** DNS doesn't point to `2.25.169.72` yet (`bash deploy/check-server.sh`), or port 80 is blocked by a firewall.

**Contact form says it can't send.** `RESEND_API_KEY` is missing, or the domain isn't verified in Resend. Fix `.env.production`, then `./deploy.sh`.

**"git pull" asks for a password.** The repository is private. Set up a deploy key (below).

---

## Private repository (recommended)

The GitHub repository is currently **public**. To make it private: GitHub → repository → **Settings → General → Danger Zone → Change visibility**. Then give the VPS read-only access:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/hager_deploy -N "" -C "hager-vps"
cat ~/.ssh/hager_deploy.pub
```
Add that key in GitHub → repository → **Settings → Deploy keys → Add deploy key** (leave "write access" unticked). Then:
```bash
cat >> ~/.ssh/config <<'EOF'
Host github-hager
  HostName github.com
  User git
  IdentityFile ~/.ssh/hager_deploy
  IdentitiesOnly yes
EOF
cd /opt/hager-investment
git remote set-url origin git@github-hager:THINXIFY/hager-investment-website.git
git pull
```

---

## Different web server

If `check-server.sh` shows that something other than Nginx owns ports 80/443 (a hosting control panel such as CloudPanel, aaPanel or Plesk, or Apache, Caddy, Traefik or a Docker proxy), don't install Nginx. Instead:
1. Do steps 1, 3, 4 and 5 (the website then runs on `127.0.0.1:4300`).
2. In that tool, create a site for `hager-investment.com` and `www.hager-investment.com` as a **reverse proxy** to `http://127.0.0.1:4300`, enable its Let's Encrypt SSL, and set a redirect from `www` to `hager-investment.com`.

---

## What's where

| File | Purpose |
|---|---|
| `Dockerfile` | Builds the production image (Next.js standalone server, non-root user, health check) |
| `docker-compose.yml` | The container: port `127.0.0.1:4300`, settings, data folders, restart policy |
| `.env.production.example` | Template for `.env.production` (never committed) |
| `deploy.sh` | One-command update with health check and automatic rollback |
| `deploy/check-server.sh` | Read-only server check |
| `deploy/nginx/` | Nginx site files (HTTP-only bootstrap, full HTTPS site, proxy settings) |
| `data/otp/` (VPS only) | One-time-code store for private documents |
| `private/documents/` (VPS only) | Approved PDFs (not in GitHub) |
