import { appConfig } from '@/app/lib/config/app.config';

// Hostnames a school must never be able to register as their own custom domain:
// our app's own root/subdomains, localhost/dev hosts, and whatever is added to
// NEXT_PUBLIC_RESERVED_DOMAINS (our future dev/staging/prod URLs).
const STATIC_RESERVED = ['localhost', '127.0.0.1', '0.0.0.0'];

function normalize(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').split(':')[0];
}

function isSameOrSubdomainOf(hostname: string, root: string): boolean {
  if (!root) return false;
  return hostname === root || hostname.endsWith(`.${root}`);
}

export function getReservedDomains(): string[] {
  return [...STATIC_RESERVED, appConfig.appDomain.toLowerCase(), ...appConfig.reservedDomains];
}

export function isReservedDomain(rawHostname: string): boolean {
  const hostname = normalize(rawHostname);
  if (!hostname) return true;

  return getReservedDomains().some((reserved) => isSameOrSubdomainOf(hostname, reserved));
}

export function validateCustomDomainInput(rawHostname: string): { valid: boolean; error?: string } {
  const hostname = normalize(rawHostname);

  if (!hostname) {
    return { valid: false, error: 'Enter a hostname.' };
  }

  // basic hostname shape check: at least one dot, valid characters
  const hostnamePattern = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;
  if (!hostnamePattern.test(hostname)) {
    return { valid: false, error: 'Enter a valid domain, e.g. myschool.com' };
  }

  if (isReservedDomain(hostname)) {
    return {
      valid: false,
      error: `"${hostname}" can't be used as a custom domain — it's reserved.`,
    };
  }

  return { valid: true };
}
