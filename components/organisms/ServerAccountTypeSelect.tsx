import AccountTypeSelect from './AccountTypeSelect';
import { headers } from 'next/headers';
import { getTenantFromHost } from '@/app/lib/tenant';
import fetchSchoolByTenant from '@/app/lib/actions/school-tenant.action';
import { notFound } from 'next/navigation';

export default async function ServerAccountTypeSelect() {
  const hdrs = await headers();
  const hostHeader = (hdrs.get('host') as string) || '';
  // strip port if present and normalize
  const host = hostHeader.split(':')[0].toLowerCase();
  const tenant = getTenantFromHost(host);

  // Use tenant.isCustomDomain (returned by getTenantFromHost) to decide whether
  // this request originates from a custom/external domain. This centralizes
  // the domain logic in the tenant helper.
  let schoolResponse: unknown = undefined;

  if (!tenant.isDefault) {
    // If it's a subdomain of our app, prefer tenant.id; for custom domains use full host
    const xTenant = tenant.isSubdomain && !tenant.isCustomDomain ? tenant.id : host;
    try {
      const res = await fetchSchoolByTenant(xTenant);
      // Keep the *whole* response (not just res.data) — AccountTypeSelect
      // expects `school.data` to be the school object (it checks
      // `school.data?.schoolImage` etc.), so unwrapping here would make it
      // always fall back to the "Tenant: {id}" placeholder text.
      schoolResponse = res;
      // server log for debugging - only stringify the data part (response has circular refs)
      // eslint-disable-next-line no-console
      console.debug('[server] SchoolService.findByTenant ->', JSON.stringify(res?.data, null, 2));

      // support a few shapes returned by the API when detecting a 404
      const isStatus404 = (obj: unknown) => {
        if (!obj || typeof obj !== 'object') return false;
        const o = obj as Record<string, unknown>;
        const data = (o.data as Record<string, unknown> | undefined) || undefined;
        return (
          o.statusCode === 404 ||
          o.status === 404 ||
          data?.statusCode === 404 ||
          data?.status === 404
        );
      };

      if (isStatus404(res)) {
        return notFound();
      }
    } catch (errUnknown) {
      // attempt to read a status code safely from the unknown error
      let status: number | undefined;
      try {
        if (errUnknown && typeof errUnknown === 'object') {
          const e = errUnknown as Record<string, unknown>;
          const resp = e.response as Record<string, unknown> | undefined;
          status = (resp?.status as number | undefined) || (resp?.data as Record<string, unknown> | undefined)?.statusCode as number | undefined;
        }
      } catch {
        status = undefined;
      }
      if (status === 404) return notFound();
      // eslint-disable-next-line no-console
      console.error('Error fetching school by tenant', errUnknown);
    }
  }

  // Render client component with tenant id and the server-fetched school response
  return <AccountTypeSelect tenantId={tenant.id} school={schoolResponse} />;
}
