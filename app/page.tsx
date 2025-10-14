import SelectSchool from '@/components/organisms/SelectSchool';
import ServerAccountTypeSelect from '@/components/organisms/ServerAccountTypeSelect';
import { getTenantFromHost } from './lib/tenant';
import { ParticlesComp } from '@/components/molecules/Particles';
import NextLoader from '@/components/atoms/NextLoader';
import { headers } from 'next/headers';

export default async function Page() {
  const hdrs = await headers();
  const hostHeader = (hdrs.get('host') as string) || '';
  const host = hostHeader.split(':')[0];
  const tenant = getTenantFromHost(host);


  return (
    <>
      <NextLoader />
      <ParticlesComp />
      {tenant.isDefault ? (
        <SelectSchool />
      ) : (
        // For any non-default host (subdomain or custom domain) run server-side validation
        // ServerAccountTypeSelect will call the backend with the appropriate x-tenant
        // (subdomain id for subdomains, full host for custom domains) and render 404 if not found.
        <ServerAccountTypeSelect />
      )}
    </>
  );
}
