This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Local multi-tenant subdomain setup

This repo supports local multi-tenant development where each school uses a subdomain like `school1.localhost:3000`.

### Helper: `scripts/setup-dev.js`

Run the provided Node script to automatically add recommended hosts entries and flush DNS caches where possible.

Windows (PowerShell as Administrator):
```powershell
node ./scripts/setup-dev.js
```

macOS / Linux (run with sudo if required):
```bash
sudo node ./scripts/setup-dev.js
```

What the script does:
- Backs up your system hosts file to `<hosts>.copied.<timestamp>`
- Appends a marked block with entries such as:
	- `127.0.0.1   school1.localhost`
	- `127.0.0.1   school2.localhost`
	- `127.0.0.1   app.localhost`
- Attempts to flush local DNS caches (best-effort)

If you prefer to manage hosts entries manually, ensure the same entries exist in your hosts file.

Example output (screenshot):

![Hosts setup output](./docs/images/setup-output.png)

### Middleware behavior

The Next.js `middleware.ts` enforces the following rules locally:

- Global host (plain `localhost` or `localhost:3000`):
	- Allowed routes: `/`, `/signup`, and any `/school/*` routes
	- Disallowed routes: `/login`, `/dashboard`, and other private routes — requests to these paths on the global host redirect to `/`

- Subdomain host (`<school>.localhost`):
	- All routes are allowed
	- The middleware extracts the subdomain (tenant id) and sets an HTTP cookie named `tenant` and an outgoing response header `x-tenant` with the subdomain value. This allows server-side code and the backend API to detect which tenant is being requested.

- Redirect rule: visiting `/school/:slug` on the global host redirects to `https://:slug.localhost:3000` (the code preserves the rest of the URL where possible).

Note: The middleware sets the `tenant` cookie to enable server-side code (server components, API routes) to read the tenant when making outgoing requests.

### Client helper: `useSchoolContext`

There is a small hook `app/lib/hooks/useSchoolContext.tsx` that exposes:
- `tenant` (typed object: `{ id, isDefault, hostname }`)
- `openSchool(slug)` — opens `http://<slug>.localhost:3000` in a new tab
- `redirectToSchool(slug)` — navigates the current window to `http://<slug>.localhost:3000`

Use this in client components to show which tenant is active or to navigate users to school subdomains.

### How your NestJS backend should read the tenant

The frontend injects `X-Tenant` on client requests (via axios interceptors) and the middleware sets a `tenant` cookie and `x-tenant` response header for server requests. On your NestJS backend, read the tenant value from the incoming request headers or cookies.

Example (NestJS controller) — reading from header:

```ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('school')
export class SchoolController {
	@Get('info')
	getInfo(@Req() req: Request) {
		const tenant = req.header('x-tenant') || req.header('X-Tenant') || req.cookies?.tenant;
		// Now use tenant value to scope DB calls
		return { tenant };
	}
}
```

If you use NestJS pipes or global middleware, you can centralize tenant extraction into a reusable extractor/interceptor that attaches the tenant into the request context (e.g., `req['tenant']`) so downstream services and controllers don't need to re-parse headers.

Notes & security
- Never trust the `X-Tenant` header blindly in production — validate and map it to an internal tenant ID, or prefer server-side logic to derive tenant from the request host when possible.
- Cookie-based propagation is convenient for server components but ensure you use secure cookies and proper SameSite settings in production.

If you want, I can also add a small NestJS middleware/guard example that normalizes the tenant from headers or host and attaches it to `req['tenant']`.

### Quick start (copy/paste)

1. Ensure you have node installed and dependencies:
```bash
npm install
```
2. Add `.env.local` with your backend URL, e.g.:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
3. Run the hosts setup script (Admin / sudo):
```powershell
# Windows (Run PowerShell as Administrator)
node ./scripts/setup-dev.js
```
4. Start the app:
```bash
npm run dev
```
5. Open the app in your browser:
- Global: http://localhost:3000
- Tenant: http://school1.localhost:3000

If anything fails, check `scripts/setup-dev.js` output for backup path and errors.

## Dev credential (local development only)

> These credentials are for local development and testing only. Do NOT use them in production.

```json
{
  "email": "yumustyology@gmail.com",
  "audienceType": "Admin",
  "schoolSlugId": "AOM-431844",
  "password": "#Yung2020"
}
```
