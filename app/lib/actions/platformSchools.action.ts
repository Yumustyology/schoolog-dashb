import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type PlatformSchool = {
  _id: string;
  name: string;
  email: string;
  address?: string;
  country: string;
  state?: string;
  slug: string;
  schoolSlugId: string;
  tenantDomain?: string;
  createdAt: string;
};

/**
 * List every school on the platform — Platform_Admin only.
 * GET /school
 */
export const fetchAllSchools = async (
  search?: string
): Promise<ResponseType<PlatformSchool[]>> => {
  return getRequest<PlatformSchool[]>('/school', search ? { search } : undefined);
};

/**
 * Get a single school by id — Platform_Admin only.
 * GET /school/:id
 */
export const fetchSchoolByIdAsAdmin = async (
  id: string
): Promise<ResponseType<PlatformSchool>> => {
  return getRequest<PlatformSchool>(`/school/${id}`);
};

const platformSchoolsActions = {
  fetchAllSchools,
  fetchSchoolByIdAsAdmin,
};

export default platformSchoolsActions;
