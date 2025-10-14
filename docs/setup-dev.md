# Developer setup — local hosts, custom domains, and optional SSL

This guide walks through setting up local hostnames (subdomains and custom test domains) and optionally generating temporary self-signed SSL certificates for local dev.

> WARNING: These scripts modify your system hosts file and (on Windows) may install self-signed certificates into the machine Trusted Root store. Run them only on machines you control and understand the security implications.

## What the repo provides



## Quick start (recommended)

1. Open a terminal with elevated privileges (Administrator on Windows, sudo on macOS/Linux).
2. From the project root, run the default setup (this will add default localhost subdomains defined in the script):

PowerShell (Windows):

```powershell
# Runs setup-dev.js which will internally call the PowerShell helper on Windows
node .\scripts\setup-dev.js
```

Bash (macOS / Linux):

```bash
sudo DEV_HOSTS="school1.localhost,school2.localhost,slg.com" node ./scripts/setup-dev.js
```

## Add custom test domains (example: `slg.com`)

You can set the `DEV_HOSTS` environment variable to a comma-separated list of domains. `setup-dev.js` will add entries for each domain.

PowerShell example (Windows):

```powershell
$Env:DEV_HOSTS = 'slg.com,another.test'
node .\scripts\setup-dev.js
```

Bash example (macOS / Linux):

```bash
DEV_HOSTS="slg.com,another.test" node ./scripts/setup-dev.js
```

## Generate self-signed certificates (Windows only)

`add-local-hosts-domain.ps1` supports generating and installing self-signed certificates for each domain. To enable it via `setup-dev.js`, set the `DEV_GENERATE_CERT` environment variable to `1` before running.

PowerShell example (Windows, Administrator):

```powershell
$Env:DEV_HOSTS = 'slg.com,another.test'
$Env:DEV_GENERATE_CERT = '1'
node .\scripts\setup-dev.js
```

Note: certificate generation attempts to install certs into the LocalMachine Trusted Root store. Browser restart may be required to pick them up.

## Safety and troubleshooting

- The script always creates a timestamped backup of your hosts file in the same directory before editing it. If you need to restore it, open the backup and copy the contents back into the hosts file.
- Use `--dry-run` to make sure the script will do what you expect before it touches system files.
- If you see permission errors, run the command from an elevated shell (Administrator on Windows).

If you'd like, I can also wire the script to automatically configure your local Next.js dev server to use the generated certs — tell me which dev server command you use and I'll add a short guide or script to do that.

## Dry-run and why it's useful

- You can pass `--dry-run` to `setup-dev.js` (for example `node ./scripts/setup-dev.js --dry-run`) to preview exactly what the script would write to your hosts file and what cert commands it would run. In dry-run mode the script prints actions and does not modify system files.
- Why it's good:
	- Prevents accidental hosts changes when testing or scripting.
	- Lets you review the domains and commands before applying them.
	- Useful for teams or CI to validate intent without requiring elevated privileges.

## mkcert — recommended for dev certs

- `mkcert` is the preferred cross-platform tool to generate locally-trusted certificates. It installs a small local CA into your operating system's trust store and issues certificates signed by that CA for your test domains.
- Benefits:
	- Cross-platform (macOS, Linux, Windows).
	- Automatically trusted by browsers after `mkcert -install`.
	- Simple workflow: `mkcert example.test` creates a cert and key you can use locally.

If `mkcert` is installed and available on PATH, `setup-dev.js` will use it automatically. If mkcert is missing and you're on Windows, the script falls back to the PowerShell helper that attempts to create and install self-signed certs.

Install mkcert examples:

macOS (Homebrew):

```bash
brew install mkcert
mkcert -install
```

Windows (scoop):

```powershell
scoop install mkcert
mkcert -install
```

## Serve the app over HTTPS locally (using generated certs)

After you generate certs with `mkcert` or the PowerShell helper, you can run a small HTTPS → HTTP proxy shipped in this repo. The proxy presents your dev certificate on an HTTPS port and forwards traffic to the running Next.js dev server (usually http://127.0.0.1:3000).

Steps:

1. Generate certs with mkcert or `setup-dev.js` (with cert generation). The default place the proxy expects is `scripts/.certs/` with files `cert.pem` and `key.pem`.
2. Start your dev server in one terminal:

```bash
npm run dev
```

3. Start the HTTPS proxy in another terminal (defaults can be overridden with env vars):

```bash
npm run https-proxy
```

4. Open the HTTPS URL in your browser (default proxy port 3443):

```
https://slg.com:3443
```

Environment variables the proxy accepts:

- `DEV_CERT_DIR` — directory containing `cert.pem` and `key.pem` (default `scripts/.certs`).
- `DEV_CERT_PEM` — explicit path to the cert file.
- `DEV_CERT_KEY` — explicit path to the key file.
- `DEV_HTTPS_PORT` — port for the HTTPS proxy (default 3443).
- `DEV_HTTP_TARGET` — where to forward traffic (default `http://127.0.0.1:3000`).

If you prefer I can also add a combined script that runs your dev server and the HTTPS proxy together (or a small PM2/forever wrapper) so one command starts both.

## Quick start (recommended)

1. Open a terminal with elevated privileges (Administrator on Windows, sudo on macOS/Linux).
2. From the project root, run the default setup (this will add default localhost subdomains defined in the script):

PowerShell (Windows):

```powershell
# Runs setup-dev.js which will internally call the PowerShell helper on Windows
node .\scripts\setup-dev.js
```

Bash (macOS / Linux):

```bash
sudo DEV_HOSTS="school1.localhost,school2.localhost,slg.com" node ./scripts/setup-dev.js
```

## Add custom test domains (example: `slg.com`)

You can set the `DEV_HOSTS` environment variable to a comma-separated list of domains. `setup-dev.js` will add entries for each domain.

PowerShell example (Windows):

```powershell
$Env:DEV_HOSTS = 'slg.com,another.test'
node .\scripts\setup-dev.js
```

Bash example (macOS / Linux):

```bash
DEV_HOSTS="slg.com,another.test" node ./scripts/setup-dev.js
```

## Generate self-signed certificates (Windows only)

`add-local-hosts-domain.ps1` supports generating and installing self-signed certificates for each domain. To enable it via `setup-dev.js`, set the `DEV_GENERATE_CERT` environment variable to `1` before running.

PowerShell example (Windows, Administrator):

```powershell
$Env:DEV_HOSTS = 'slg.com,another.test'
$Env:DEV_GENERATE_CERT = '1'
node .\scripts\setup-dev.js
```

Note: certificate generation attempts to install certs into the LocalMachine Trusted Root store. Browser restart may be required to pick them up.
## Verifying changes

- Visit `http://slg.com:3000` (or whichever domain you added) and verify the app responds.
- If you generated certificates, visit `https://slg.com` and check the browser certificate details (look for `schoolog-local` or the generated CN).

## Troubleshooting

- "Hosts already contain entries": the script will skip existing entries.
- DNS cache: the scripts attempt to flush DNS caches but this may require manual steps on some systems. On Windows run `ipconfig /flushdns` and on macOS `sudo killall -HUP mDNSResponder`.
- If cert generation fails, check PowerShell output and ensure you ran as Administrator. You can use `mkcert` as an alternative for easier cross-platform trust.

## Safety

- Only run these scripts on developer machines you control.
- Removing installed certificates may require administrator steps (CertMgr.msc on Windows).

---

## Example: full flow using mkcert + HTTPS proxy

This example shows a fast way to get a trusted HTTPS URL for a custom test domain on your machine using mkcert and the repository proxy.

1. Install mkcert and register the local CA (one-time):

```bash
brew install mkcert    # macOS (Homebrew)
mkcert -install
```

2. Generate certs for your test domains (writes cert and key in the current directory):

```bash
mkcert slg.com localhost
mkdir -p scripts/.certs
mv slg.com+2.pem scripts/cert.pem
mv slg.com+2-key.pem scripts/key.pem
```

3. Start your Next.js dev server:

```bash
npm run dev
```

4. Start the HTTPS proxy (default port 3443):

```bash
npm run https-proxy
```

Now open https://slg.com:3443 — the browser should trust the certificate and the proxy will forward requests to your local dev server.

If you used `setup-dev.js` with `DEV_GENERATE_CERT=1`, the script may have already created and (on Windows) installed certificates; just ensure they are placed in `scripts/.certs/` or set `DEV_CERT_DIR` accordingly before running the proxy.
