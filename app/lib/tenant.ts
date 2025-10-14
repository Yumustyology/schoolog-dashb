export type Tenant = {
  id: string; // subdomain id or 'default' or full host for custom domains
  isDefault: boolean;
  hostname: string;
  isSubdomain: boolean;
  isCustomDomain: boolean;
};

import { appConfig } from './config/app.config';

function normalizeHost(raw: string | undefined): string {
  if (!raw) return '';
  let host = raw.trim();
  // strip port if present
  const colonIndex = host.indexOf(':');
  if (colonIndex !== -1) {
    // IPv6 addresses are bracketed like [::1]:3000
    if (host.startsWith('[') && host.indexOf(']') !== -1) {
      // keep the bracketed address content
      const endBracket = host.indexOf(']');
      host = host.slice(0, endBracket + 1);
    } else {
      host = host.slice(0, colonIndex);
    }
  }
  // unwrap IPv6 brackets
  if (host.startsWith('[') && host.endsWith(']')) {
    host = host.slice(1, -1);
  }
  return host.toLowerCase();
}

export function getTenantFromHost(hostname: string): Tenant {
  const normalized = normalizeHost(hostname);
  const result: Tenant = {
    id: 'default',
    isDefault: true,
    hostname: normalized,
    isSubdomain: false,
    isCustomDomain: false,
  };
  if (!normalized) return result;

  const parts = normalized.split('.').filter(Boolean);

  // determine whether this host belongs to our app domain (e.g. 'schoolog.com')
  const appDomain = (appConfig && appConfig.appDomain) ? appConfig.appDomain.toLowerCase() : 'localhost';
  const appParts = appDomain.split('.').filter(Boolean);

  // Consider as our domain only when either exact match or a dot-prefixed subdomain (avoid naive endsWith)
  const isExact = normalized === appDomain;
  const isDotPrefixedSubdomain = parts.length > appParts.length && parts.slice(-appParts.length).join('.') === appDomain;
  const isLocalHostLike = normalized === 'localhost' || normalized === '127.0.0.1' || normalized.endsWith('.localhost');

  // Localhost handling: ehs.localhost or localhost
  if (isLocalHostLike) {
    const id = parts[0] || 'localhost';
    result.id = id;
    result.isDefault = id === '' || id === 'localhost';
    result.isSubdomain = !result.isDefault;
    result.isCustomDomain = false;
    return result;
  }

  if (isExact || isDotPrefixedSubdomain) {
    // subdomain of our app (foo.schoolog.com)
    if (parts.length > appParts.length) {
      result.id = parts[0];
      result.isDefault = false;
      result.isSubdomain = true;
      result.isCustomDomain = false;
      return result;
    }

    // plain root of our domain (schoolog.com)
    result.id = 'default';
    result.isDefault = true;
    result.isSubdomain = false;
    result.isCustomDomain = false;
    return result;
  }

  // Otherwise, it's an external/custom domain (e.g. myschool.com or app.myschool.com)
  result.id = normalized; // use full host as id for custom domains
  result.isDefault = false;
  result.isSubdomain = false;
  result.isCustomDomain = true;
  return result;
}
