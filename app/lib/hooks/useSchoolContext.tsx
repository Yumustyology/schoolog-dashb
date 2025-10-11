"use client";
import { useEffect, useMemo, useState } from 'react';
import { getTenantFromHost, Tenant } from '../tenant';

export function useSchoolContext() {
  const [tenant, setTenant] = useState<Tenant>({ id: 'default', isDefault: true, hostname: '' });

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

  return useMemo(() => ({ tenant, openSchool, redirectToSchool }), [tenant]);
}
