import { getRequestWithHeaders } from '../service/apiRequests';
import type { AxiosResponse } from 'axios';

export const fetchSchoolByTenant = async (xTenant: string) => {
  // eslint-disable-next-line no-console
  console.debug('[api] fetchSchoolByTenant x-tenant ->', xTenant);
  try {
    const res = await getRequestWithHeaders<{ data: any }>(
      '/school/tenant',
      undefined,
      { 'X-Tenant': xTenant }
    );

    // eslint-disable-next-line no-console
    console.debug('[api] fetchSchoolByTenant response ->', res?.data);
    return res?.data;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.debug('[api] fetchSchoolByTenant error ->', e?.response?.data || e.message || e);
    throw e;
  }
};

export default fetchSchoolByTenant;
