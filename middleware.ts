import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTenantFromHost } from './app/lib/tenant';

/**
 * Middleware rules:
 * - global domain: localhost (no subdomain) => only allow '/', '/signup', '/school/*'
 * - subdomain domain: <school>.localhost => allow everything and set tenant cookie
 * - redirect '/school/:slug' -> 'https://:slug.localhost:3000' (preserve pathname)
 */

function isGlobalHost(hostname: string) {
  // treat plain 'localhost' or 'localhost:3000' as global
  return hostname === 'localhost' || hostname === 'localhost:3000' || hostname === '';
}

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const tenant = getTenantFromHost(hostname);

  // redirect /school/:slug -> subdomain
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean);
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
  if (segments[0] === 'school' && segments[1]) {
    const slug = segments[1];
    const target = new URL(url.toString());
    target.hostname = `${slug}.localhost`;
    // keep same port
    return NextResponse.redirect(target);
  }

  // global host restrictions
  if (isGlobalHost(hostname)) {
    // allowed paths on global host (supports exact paths or prefix with '/*')
    const allowedPaths = ['/', '/signup', '/select-school'];

    const matchesPattern = (pattern: string, path: string) => {
      if (pattern === path) return true;
      // support '/foo/*' or '/foo*' for prefix matching
      if (pattern.endsWith('/*') || pattern.endsWith('*')) {
        const prefix = pattern.replace(/\*+$/, '');
        return path.startsWith(prefix);
      }
      return false;
    };

    const isAllowed = allowedPaths.some((p) => matchesPattern(p, pathname));

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
