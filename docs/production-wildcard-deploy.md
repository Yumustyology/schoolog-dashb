# Production: Deploying with wildcard subdomains (Hostinger VPS)

This guide shows a recommended, repeatable setup to serve the multi-tenant Next.js frontend from a VPS (Hostinger or similar) using wildcard subdomains such as `*.example.com` so each school can use `school1.example.com`, `school2.example.com`, etc.

High-level flow
- Purchase or use an existing domain (example.com).
- Create DNS records: A (or ALIAS) + wildcard `*.example.com` pointing to your VPS IP.
- Configure Nginx to proxy requests to the Next.js app and preserve Host header.
- Obtain a wildcard TLS certificate (Let's Encrypt DNS challenge or use provider certs).
- Run the Next.js app in production (PM2 or systemd) and forward traffic from Nginx.

Important security note
- In production you must NOT blindly trust client-sent `X-Tenant`. Use the Host header to derive tenant when possible. Trust headers only when they are set by your reverse proxy (same server) and validated.

1) DNS setup (Hostinger)

- In your Hostinger control panel (or DNS provider), create these records:
  - A record for the root domain: `@` -> VPS_IP
  - A record for wildcard subdomain: `*` -> VPS_IP

  Example:
  - `example.com. A 203.0.113.12`
  - `*.example.com. A 203.0.113.12`

  TTL can be default. Wildcard A records ensure any subdomain resolves to your VPS.

2) Prepare the VPS

- SSH into VPS and install required packages (Node.js, npm, nginx, certbot, pm2):

```bash
# on Ubuntu/Debian
sudo apt update && sudo apt install -y build-essential nginx git curl
# install Node (recommended Node 18+). Example using NodeSource:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
# install pm2 to manage the Node app (optional but recommended)
sudo npm install -g pm2
# install certbot (for Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

3) Deploy your app on the VPS

- Clone or copy the repo to the VPS and install dependencies:

```bash
git clone https://github.com/your-org/schoolog-frontend.git /var/www/schoolog-frontend
cd /var/www/schoolog-frontend
npm ci
```

- Configure production environment variables in `.env.production` or via PM2 ecosystem file. At minimum:

```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.example.com
# any other backend secrets
```

- Build the Next app and start it under PM2:

```bash
npm run build
# start with pm2; choose the correct start script (next start)
pm2 start npm --name schoolog-frontend -- start
pm2 save
# optionally create systemd startup script for pm2
pm2 startup systemd
```

4) Nginx configuration (reverse proxy + preserve Host)

- Place an nginx server block for both example.com and wildcard subdomains. Create `/etc/nginx/sites-available/schoolog.conf` with:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com *.example.com;

    # Redirect HTTP to HTTPS (we'll enable SSL later)
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com *.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Enable and test nginx configuration:

```bash
sudo ln -s /etc/nginx/sites-available/schoolog.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5) TLS / wildcard certificates

- Let's Encrypt wildcard certificates require DNS-01 challenge (automatic or manual) because HTTP-01 cannot validate wildcards.

- Option A — Use `certbot` with a DNS plugin (recommended if your DNS provider supports API plugins, e.g., Cloudflare, Route53):

```bash
# example for Cloudflare plugin
sudo apt install python3-certbot-dns-cloudflare
certbot certonly --dns-cloudflare --dns-cloudflare-credentials ~/.secrets/cloudflare.ini -d example.com -d "*.example.com"
```

- Option B — Use manual DNS challenge (you will create TXT records manually each renewal — not recommended for long-term):

```bash
sudo certbot certonly --manual --preferred-challenges dns -d example.com -d "*.example.com"
```

- After obtaining the cert, update paths in the nginx config and reload Nginx.

6) Middleware and production concerns

- Update production `middleware.ts` behavior:
  - In local dev we used `localhost`-specific checks. For production you should detect tenant from the hostname generically (for `school1.example.com` return tenant=`school1`).
  - Do not rely on client-provided `X-Tenant` headers. Instead derive tenant from `Host` header and only accept `X-Tenant` if it's injected by your trusted reverse proxy.

- Secure cookies: set `secure: true`, `sameSite: 'lax'` or `strict` as appropriate in production and set `domain` when needed.

7) Process management and auto-restart

- PM2 is recommended for process management. Alternatively, use `systemd` unit files.

PM2 example to ensure restart on server reboot:

```bash
pm2 start npm --name schoolog-frontend -- start
pm2 save
pm2 startup systemd
# follow the printed instructions from pm2 startup to enable the service
```

8) Testing & verification

- Verify DNS resolves:
```bash
dig +short school1.example.com
```

- Hit the app and confirm tenant detection (replace example.com with your domain):
```bash
curl -I -H "Host: school1.example.com" https://example.com/
```

- In application logs, confirm that the tenant was derived from the host and that requests to `school1.example.com` return the expected content.

9) Automating renewals

- If you used certbot with a DNS plugin, certbot can renew automatically (cron or systemd timer). Confirm with:

```bash
sudo certbot renew --dry-run
```

10) Notes and troubleshooting

- If you use a CDN or proxy in front of your VPS, confirm it preserves the original Host header (or configure it to forward a header you trust).
- If your reverse proxy sets `X-Forwarded-Host` or other headers rewrite rules, update your middleware to trust those values only from your proxy.
- Performance: consider adding caching (e.g., Nginx microcaching) or edge CDN for static assets.

11) Checklist before going live

- [ ] Domain DNS A `*` and `@` point to your VPS IP
- [ ] Nginx server_name includes `*.example.com`
- [ ] TLS certificate covers `example.com` and `*.example.com`
- [ ] Proc manager (PM2/systemd) configured and auto-start enabled
- [ ] Middleware updated to parse tenant from hostname generically
- [ ] Cookie & session security settings set for production

If you want, I can generate the exact `systemd` unit file, a PM2 ecosystem file, and a more strict nginx config (HSTS, HTTP2 tuning) for your domain. I can also add a small middleware debug endpoint to verify tenant parsing in production.

## Optional: Use Cloudflare for free SSL and DNS (recommended)

Cloudflare offers free DNS and flexible SSL options that simplify wildcard or multi-domain setups. There are two common ways to use Cloudflare for SSL with a VPS:

1) Cloudflare proxy (Flexible/Full)
  - In Cloudflare DNS, create the same A records (`@` and `*`) and toggle the cloud icon to **Proxied** (orange).
  - Under SSL/TLS settings in Cloudflare, set SSL mode to **Full (strict)** if you have a valid certificate on your origin. If you don't have an origin cert, you can use **Full** mode but **Full (strict)** is safer.
  - Cloudflare will present a valid certificate to clients and proxy traffic to your origin. Ensure Nginx trusts the Host header and only accepts traffic from Cloudflare IPs if you rely on headers.

2) Cloudflare Origin CA (recommended for origin security)
  - In Cloudflare dashboard → SSL/TLS → Origin Server → Create Certificate.
  - Choose a certificate for `example.com` and `*.example.com` and choose PEM (RSA or ECC). Cloudflare will give you certificate and private key.
  - Install the Cloudflare Origin certificate on your VPS and configure Nginx to use these files as the `ssl_certificate` and `ssl_certificate_key`.
  - In Cloudflare SSL/TLS set the mode to **Full (strict)** so Cloudflare verifies the origin cert.

Notes when using Cloudflare
- If you proxy (orange cloud) ensure your application derives tenant from the `Host` header forwarded by Cloudflare (Cloudflare preserves the original host by default when proxied).
- To avoid spoofed headers, restrict access to your origin by allowing only Cloudflare IP ranges (via firewall or Nginx `allow` rules).
- If you need wildcard certificates outside Cloudflare (e.g., for other services), you can still use Certbot DNS-01 to obtain them.

Quick Cloudflare Nginx snippet (use the origin cert files Cloudflare provides):

```nginx
server {
  listen 443 ssl http2;
  server_name example.com *.example.com;

  ssl_certificate /etc/ssl/certs/cloudflare-origin-cert.pem; # from Cloudflare
  ssl_certificate_key /etc/ssl/private/cloudflare-origin-key.pem; # from Cloudflare

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Cloudflare simplifies TLS for end users and offloads certificate renewal. Use **Full (strict)** with Origin CA certs for maximum security.
