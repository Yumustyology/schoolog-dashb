"use client";
import { useEffect } from 'react';

type School = {
  name?: string;
  image?: string | null;
  logo?: string | null;
  schoo_image?: string | null;
  school_image?: string | null;
  avatar?: string | null;
};

function setFavicon(url?: string | null) {
  const rels = ['icon', 'shortcut icon', 'apple-touch-icon'];
  const head = document.querySelector('head');
  if (!head) return;

  // remove any existing favicon links we control
  const selector = rels.map((r) => `link[rel~="${r}"]`).join(', ');
  const existing = Array.from(head.querySelectorAll(selector));
  existing.forEach((el) => el.parentNode?.removeChild(el));

  if (!url) return; // explicitly leave head without a favicon

  // append new favicon
  try {
    const link = document.createElement('link');
    link.rel = 'icon';
    // add cache buster to force browser refresh when favicon changes
    const cacheBusted = url.includes('?') ? `${url}&v=${Date.now()}` : `${url}?v=${Date.now()}`;
    link.href = cacheBusted;
    link.type = 'image/png';
    head.appendChild(link);
  } catch (err) {
    console.error('[TenantHeadManager] failed to append favicon', err);
  }
}

export default function TenantHeadManager() {
  useEffect(() => {
    try {
      // indicate loading state immediately
      try {
        document.title = 'Loading…';
        const el = document.querySelector('title');
        if (el) el.textContent = 'Loading…';
      } catch {
        // ignore if DOM not ready
      }
      const hostname = window.location.hostname;
      if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') return;

  // call the local proxy route which will forward to the backend and inject X-Tenant server-side
  const base = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5080').replace(/\/$/, '');
  // backend endpoint should include /api prefix
  const endpoint = `${base}/school/tenant`;
  // determine tenant header value using shared tenant logic
  // import lazily to avoid adding server-only code into client bundle if not available
  let tenantHeader = window.location.hostname;
  // track whether this host is a subdomain so we can fall back to full URL when name is missing
  let tenantIsSubdomain = false;
      (async () => {
        try {
          try {
            const mod = await import('@/app/lib/tenant');
            const tenant = mod.getTenantFromHost(window.location.hostname);
            tenantIsSubdomain = !!tenant.isSubdomain;
            if (tenant.isCustomDomain) {
              tenantHeader = tenant.hostname; // full host for custom domains
            } else if (tenant.isSubdomain) {
              tenantHeader = tenant.id; // send only the subdomain id (removes .localhost part)
            } else {
              tenantHeader = tenant.hostname;
            }
          } catch {
            console.warn('[TenantHeadManager] could not load tenant helper, falling back to hostname');
            tenantHeader = window.location.hostname;
            tenantIsSubdomain = false;
          }

          const res = await fetch(endpoint, { method: 'GET', mode: 'cors', credentials: 'include', headers: { 'X-Tenant': tenantHeader } });
          if (!res.ok) {
            // try to read response text to surface server error message (HTML or JSON)
            let text = '';
            try {
              text = await res.text();
            } catch {
              text = '';
            }
            console.warn('[TenantHeadManager] tenant endpoint returned non-ok', { status: res.status, body: text });
            setFavicon(undefined);
            return;
          }

          const data = await res.json();
          const payload = (data && (data.school ?? data.data ?? data)) as School | null;
          if (!payload) {
            // try to use cached value if available
            try {
              const cached = localStorage.getItem('schoolog:tenant_school');
              if (cached) {
                const parsed = JSON.parse(cached) as School;
                if (parsed.name) {
                  document.title = parsed.name;
                } else if (tenantIsSubdomain) {
                  // fall back to full url for tenant subdomains
                  const full = window.location.href;
                  document.title = full;
                }
                const imageCached = parsed.school_image ?? parsed.schoo_image ?? parsed.image ?? parsed.logo ?? parsed.avatar ?? null;
                if (imageCached) setFavicon(typeof imageCached === 'string' && imageCached.startsWith('http') ? imageCached : `${window.location.origin}${imageCached}`);
                return;
              }
            } catch (e) {
              console.warn('[TenantHeadManager] failed to read cached school payload');
            }
            setFavicon(undefined);
            return;
          }

          // persist the payload to localStorage so we can fallback if backend becomes unreachable
          try {
            localStorage.setItem('schoolog:tenant_school', JSON.stringify(payload));
          } catch {
            /* ignore storage errors */
          }

          const setTitle = (t: string) => {
            if (!t) return;
            document.title = t;
            const el = document.querySelector('title');
            if (el) el.textContent = t;
          };

          if (payload.name) {
            setTitle(payload.name);
          } else if (tenantIsSubdomain) {
            setTitle(window.location.href);
          }

          const image = payload.school_image ?? payload.schoo_image ?? payload.image ?? payload.logo ?? payload.avatar ?? null;
          if (image) {
            const url = typeof image === 'string' && image.startsWith('http') ? image : `${window.location.origin}${image}`;
            setFavicon(url);
          } else {
            // explicitly remove any favicon - do NOT show any default favicon on tenant/custom domain
            setFavicon(undefined);
          }
        } catch (err) {
          console.error('[TenantHeadManager] tenant request failed', err);
          if (err instanceof TypeError) {
            console.error('[TenantHeadManager] network/CORS or network error likely. endpoint:', endpoint, 'sent X-Tenant:', tenantHeader);
          }
          setFavicon(undefined);
        }
      })();
    } catch {
      // noop
    }
  }, []);

  return null;
}
