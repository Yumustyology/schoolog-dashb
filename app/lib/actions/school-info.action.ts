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
  const res = await getRequest<{ data: PublicListResponse }>(
    '/school/public',
    query
  );

  return res?.data;
};

export default fetchPublicSchools;
