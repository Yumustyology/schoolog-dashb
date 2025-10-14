"use client";
import { useEffect, useMemo, useState, useCallback } from 'react';
import { getTenantFromHost, Tenant } from '../tenant';

export function useSchoolContext() {
  const [tenant, setTenant] = useState<Tenant>({ id: 'default', isDefault: true, hostname: '', isSubdomain: false, isCustomDomain: false });

  useEffect(() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const t = getTenantFromHost(hostname);
    setTenant(t);
  }, []);

  const openSchool = (slug: string) => {
    const url = `http://${slug}.localhost:3000`;
    window.open(url, '_blank');
  };

  const redirectToSchool = (slug: string) => {
    const url = `http://${slug}.localhost:3000`;
    window.location.href = url;
  };

  // fast helper used by client code (including axios interceptor) to get the exact x-tenant value
  const getTenantHeader = useCallback(() => {
    // subdomain -> send id (e.g. 'ehs')
    if (tenant.isSubdomain) return tenant.id;
    // custom domain -> send full host (e.g. 'myschool.com')
    if (tenant.isCustomDomain) return tenant.hostname;
    // default/global
    return 'default';
  }, [tenant]);

  return useMemo(() => ({ tenant, openSchool, redirectToSchool, getTenantHeader }), [tenant, getTenantHeader]);
}
