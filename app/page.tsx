import SelectSchool from '@/components/organisms/SelectSchool';
import ServerAccountTypeSelect from '@/components/organisms/ServerAccountTypeSelect';
import PublicWebsiteRenderer from '@/components/organisms/PublicWebsiteRenderer';
import { getTenantFromHost } from './lib/tenant';
import { resolveDomainPublic } from './lib/actions/domains.action';
import { ParticlesComp } from '@/components/molecules/Particles';
import NextLoader from '@/components/atoms/NextLoader';
import { headers } from 'next/headers';

export default async function Page() {
  const hdrs = await headers();
  const hostHeader = (hdrs.get('host') as string) || '';
  const host = hostHeader.split(':')[0];
  const tenant = getTenantFromHost(host);

  // Custom domains can be configured (per settings > Domains) to show either the
  // school's public website or the portal sign-in flow. A failed/empty lookup
  // (e.g. backend doesn't support this endpoint yet) safely falls back to the
  // portal — today's behavior — rather than blocking the request.
  let showPublicWebsite = false;
  if (tenant.isCustomDomain) {
    try {
      const domainInfo = await resolveDomainPublic(tenant.hostname);
      showPublicWebsite = domainInfo.data?.type === 'website';
    } catch {
      showPublicWebsite = false;
    }
  }

  return (
    <>
      <NextLoader />
      <ParticlesComp />
      {tenant.isDefault ? (
        <SelectSchool />
      ) : showPublicWebsite ? (
        <PublicWebsiteRenderer hostname={tenant.hostname} />
      ) : (
        // For any non-default host (subdomain or custom domain) run server-side validation
        // ServerAccountTypeSelect will call the backend with the appropriate x-tenant
        // (subdomain id for subdomains, full host for custom domains) and render 404 if not found.
        <ServerAccountTypeSelect />
      )}
    </>
  );
}
