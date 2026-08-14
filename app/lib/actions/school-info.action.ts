import { publicGetRequest } from '../service/apiRequests';
import type { ResponseType } from '../types/api-response.types';
import type { SchoolPublic } from '../types/school-info.types';

/**
 * Fetch public schools list (paginated).
 * query can include { search?: string; page?: number; limit?: number }
 * Returns ResponseType format with { data: SchoolPublic[], status, statusCode, message, meta }
 */
export const fetchPublicSchools = async (
  query?: Record<string, string | number>
): Promise<ResponseType<SchoolPublic[]>> => {
  return publicGetRequest<SchoolPublic[]>(
    '/school/public',
    query
  );
};

export default fetchPublicSchools;
