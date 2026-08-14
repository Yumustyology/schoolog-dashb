import { publicPostRequest, postRequest } from '../service/apiRequests';
import showToast from '../utils/toast';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type CreateSchoolResponse = {
  token?: string;
  refreshToken?: string;
  slgId: string;
  schoolId: string;
  slugId: string;
  audience: string;
  slug: string;
  firstName: string;
  lastName: string;
  email?: string;
  schoolSlugId: string;
};

export const createNewSchool = async (
  payload: unknown
): Promise<ResponseType<CreateSchoolResponse>> => {
  const response = await publicPostRequest<CreateSchoolResponse>('school/', payload);

  if (response?.message) {
    showToast(response.message, response.message, {
      type: 'success',
    });
  }
  return response;
};

export const setPasswordSchool = async (
  payload: unknown
): Promise<ResponseType<CreateSchoolResponse>> => {
  const response = await publicPostRequest<CreateSchoolResponse>(
    'auth/set-password',
    payload
  );

  if (response?.message) {
    showToast(response.message, response.message, {
      type: 'success',
    });
  }
  return response;
};

export const generateSlugFromBackend = async ({
  schoolName,
}: {
  schoolName: string;
}): Promise<string | undefined> => {
  const response = await postRequest<{ slug: string }>('/slug/generate', {
    schoolName,
  });
  return response?.data?.slug;
};
