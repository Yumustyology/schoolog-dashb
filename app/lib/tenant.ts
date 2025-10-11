export type Tenant = {
  id: string; // subdomain or 'default'
  isDefault: boolean;
  hostname: string;
};

export function getTenantFromHost(hostname: string): Tenant {
  const result: Tenant = { id: 'default', isDefault: true, hostname };
  if (!hostname) return result;

  const parts = hostname.split('.');
  if (hostname.includes('localhost')) {
    result.id = parts[0] || 'default';
    result.isDefault = result.id === '' || result.id === 'localhost';
    return result;
  }

  if (parts.length > 2) {
    result.id = parts[0];
    result.isDefault = false;
    return result;
  }

  return result;
}
