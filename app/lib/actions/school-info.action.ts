import { getRequest } from '../service/apiRequests';
import type { PublicListResponse } from '../types/school-info.types';

/**
 * Fetch public schools list (paginated).
 * query can include { search?: string; page?: number; limit?: number }
 */
export const fetchPublicSchools = async (
  query?: Record<string, string | number>
) => {
  // getRequest supports passing an object as query params
  // DEBUG: log outgoing params so we can see when the action is called
  // eslint-disable-next-line no-console
  console.debug('[api] fetchPublicSchools called with ->', query);
  const res = await getRequest<{ data: PublicListResponse }>(
    '/school/public',
    query
  );

  // eslint-disable-next-line no-console
  console.debug('[api] fetchPublicSchools response ->', res?.data);

  return res?.data;
};

export default fetchPublicSchools;
