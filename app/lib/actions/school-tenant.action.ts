import { getRequestWithHeaders } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export const fetchSchoolByTenant = async (xTenant: string): Promise<ResponseType<unknown>> => {
  // eslint-disable-next-line no-console
  console.debug('[api] fetchSchoolByTenant x-tenant ->', xTenant);
  try {
    const res = await getRequestWithHeaders<unknown>(
      '/school/tenant',
      undefined,
      { 'X-Tenant': xTenant }
    );

    // eslint-disable-next-line no-console
    console.debug('[api] fetchSchoolByTenant response ->', res?.data);
    return res;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.debug('[api] fetchSchoolByTenant error ->', e?.response?.data || e.message || e);
    throw e;
  }
};

export default fetchSchoolByTenant;
