import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTenantFromHost } from './app/lib/tenant';
import { appConfig } from './app/lib/config/app.config';

/**
 * Middleware rules:
 * - global/default host (e.g. localhost, or NEXT_PUBLIC_APP_DOMAIN in prod, no subdomain)
 *   => only allow '/', '/signup', '/school/*'
 * - subdomain of the app domain (<school>.localhost, <school>.<appDomain>)
 *   => allow everything and set tenant cookie
 * - custom tenant domain (e.g. myschool.com) => allow everything, same as a subdomain
 * - redirect '/school/:slug' -> '<slug>.<appDomain>' (preserve pathname/port)
 *
 * Host detection is delegated entirely to getTenantFromHost (same logic used
 * server- and client-side for tenant resolution) so this stays correct in
 * every environment instead of only matching literal 'localhost' strings.
 */

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const tenant = getTenantFromHost(hostname);

  // redirect /school/:slug -> subdomain
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  // normalize pathname: remove trailing slashes except for root '/'
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$|\/+$/g, '/').replace(/\/$/, '');
  const segments = normalizedPathname.split('/').filter(Boolean);
  // Allow static assets to bypass middleware (so images, css, etc. load correctly)
  const staticExtRegex = /\.(png|jpg|jpeg|svg|gif|webp|css|js|map|ico)$/i;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/public') ||
    staticExtRegex.test(pathname) ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }
  // Only redirect /school/:slug -> subdomain when the request comes from the global host
  // (e.g., someone on plain localhost clicked a link). If the request is already on a subdomain
  // we should not rewrite the hostname because that can swap subdomains unexpectedly.
  if (segments[0] === 'school' && segments[1]) {
    const slug = segments[1];
    // Only redirect to the tenant subdomain when the request is on the app's
    // default/global host. If we're already on a subdomain or custom domain,
    // don't rewrite the host — let the request proceed as-is.
    if (tenant.isDefault) {
      const target = new URL(url.toString());
      target.hostname = `${slug}.${appConfig.appDomain}`;
      return NextResponse.redirect(target);
    }
    return NextResponse.next();
  }

  // global/default host restrictions (the app's marketing root domain — no tenant)
  if (tenant.isDefault) {
    // allowed paths on global host (supports exact paths or prefix with '/*')
  const allowedPaths = ['/', '/signup', '/select-school', '/account-login'];

    const matchesPattern = (pattern: string, path: string) => {
      if (pattern === path) return true;
      // support '/foo/*' or '/foo*' for prefix matching
      if (pattern.endsWith('/*') || pattern.endsWith('*')) {
        const prefix = pattern.replace(/\*+$/, '');
        return path.startsWith(prefix);
      }
      return false;
    };

  const isAllowed = allowedPaths.some((p) => matchesPattern(p, normalizedPathname));

    // Explicitly block any dashboard-related routes on the global host
    // This includes /school, /teacher, /student, /dashboard and /dashboards
    const dashboardPaths = ['school', 'teacher', 'student', 'dashboard', 'dashboards'];
  const firstSegment = segments[0] || '';
    if (dashboardPaths.includes(firstSegment.toLowerCase())) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (!isAllowed) {
      // e.g., /login on global host -> redirect to /
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // If subdomain, attach tenant cookie so server-side code can read it
  const res = NextResponse.next();
  if (!tenant.isDefault) {
    // set cookie for tenant (1 hour)
    res.cookies.set('tenant', tenant.id, { path: '/', maxAge: 60 * 60 });
    res.headers.set('x-tenant', tenant.id);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/school/:slug*'],
};
