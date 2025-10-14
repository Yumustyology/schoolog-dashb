import { NextResponse } from 'next/server';
import { getTenantFromHost } from '@/app/lib/tenant';

const BACKEND = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5080').replace(/\/$/, '');

export async function GET(req: Request) {
  try {
    const host = req.headers.get('host') || '';
    const tenant = getTenantFromHost(host);
    const tenantHeader = tenant.isCustomDomain ? tenant.hostname : tenant.isSubdomain ? tenant.id : tenant.hostname;

    const endpoint = `${BACKEND}/api/school/tenant`;
    const url = new URL(req.url);
    const debug = url.searchParams.get('debug');
    if (debug === '1') {
      // quick health/debug response so client can verify the proxy route and tenant resolution
      // eslint-disable-next-line no-console
      console.log('[proxy-debug] host=', host, 'tenantHeader=', tenantHeader);
      return NextResponse.json({ ok: true, host, tenantHeader });
    }
    // log diagnostic info to server console to help debug 404s
    // (check your Next.js console for these logs)
    // Incoming request host, resolved tenant header, and target endpoint
    // This will confirm the proxy route is being hit and what it forwards.
    // eslint-disable-next-line no-console
    console.log('[proxy] incoming host=', host, 'tenantHeader=', tenantHeader, 'forward->', endpoint);

    // server-side fetch to backend - avoids browser CORS
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-Tenant': tenantHeader,
      },
    });

    const data = await res.json();
    // eslint-disable-next-line no-console
    console.log('[proxy] upstream status=', res.status);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[proxy] error', err);
    return NextResponse.json({ error: 'proxy_error', detail: String(err) }, { status: 502 });
  }
}
