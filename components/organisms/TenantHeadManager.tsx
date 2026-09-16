'use client';
import { useEffect } from 'react';

type School = {
  name?: string;
  image?: string | null;
  logo?: string | null;
  schoolImage?: string | null;
  avatar?: string | null;
};

/**
 * Keeps the `schoolog:tenantSchool` localStorage cache warm so components
 * like AsideBar can render the school logo instantly without waiting on a
 * network round trip. Deliberately does NOT touch document.title or the
 * favicon — those are owned server-side by generateMetadata() in
 * app/layout.tsx (Next Metadata API), which already resolves them per
 * tenant with proper caching. Duplicating that here previously caused a
 * "Loading…" title flash on every page load and a redundant fetch.
 */
export default function TenantHeadManager() {
  useEffect(() => {
    const hostname = window.location.hostname;
    if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') return;

    const base = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5080').replace(/\/$/, '');
    const endpoint = `${base}/school/tenant`;

    (async () => {
      try {
        let tenantHeader = hostname;
        try {
          const mod = await import('@/app/lib/tenant');
          const tenant = mod.getTenantFromHost(hostname);
          tenantHeader = tenant.isCustomDomain || !tenant.isSubdomain ? tenant.hostname : tenant.id;
        } catch {
          console.warn('[TenantHeadManager] could not load tenant helper, falling back to hostname');
        }

        const res = await fetch(endpoint, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: { 'X-Tenant': tenantHeader },
        });
        if (!res.ok) return;

        const data = await res.json().catch(() => null);
        const payload = (data && (data.school ?? data.data ?? data)) as School | null;
        if (!payload) return;

        try {
          localStorage.setItem('schoolog:tenantSchool', JSON.stringify(payload));
          const logo = payload.schoolImage || payload.image || payload.logo;
          if (logo) {
            document.cookie = `schoolog_logo=${encodeURIComponent(logo)}; path=/; max-age=31536000; SameSite=Lax`;
          }
        } catch {
          /* ignore storage errors */
        }
      } catch (err) {
        console.error('[TenantHeadManager] tenant request failed', err);
      }
    })();
  }, []);

  return null;
}
