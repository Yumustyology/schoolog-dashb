import { getRequest, patchRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type AdminPreferences = {
  sessionTimeoutMinutes?: number | null;
  appearance?: string | null;
};

export type AdminProfile = {
  _id: string;
  email: string;
  role: string;
  status: string;
  schoolId: string;
  slgId: string;
  adminSlugId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  dob?: string | null;
  gender?: string | null;
  country?: string | null;
  image?: string | null;
  preferences?: AdminPreferences;
};

export type UpdateAdminProfilePayload = Partial<
  Pick<
    AdminProfile,
    'firstName' | 'lastName' | 'phoneNumber' | 'dob' | 'gender' | 'country'
  >
> & { preferences?: AdminPreferences };

export const fetchMyProfile = async (): Promise<ResponseType<AdminProfile>> => {
  return getRequest<AdminProfile>('/admin/me');
};

export const updateMyProfile = async (
  payload: UpdateAdminProfilePayload
): Promise<ResponseType<AdminProfile>> => {
  return patchRequest<AdminProfile>('/admin/me', payload);
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ResponseType<null>> => {
  return postRequest<null>('/auth/change-password', payload);
};

const adminActions = {
  fetchMyProfile,
  updateMyProfile,
  changePassword,
};

export default adminActions;
