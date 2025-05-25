import { AxiosResponse } from 'axios';
import { postRequest } from '../service/apiRequests';
import showToast from '../utils/toast';

type CreateSchoolResponse = {
  message: string;
  statusCode: number;
  data: {
    token?: string;
    slg_id: string;
    school_id: string;
    slug_id: string;
    audience: string;
    slug: string;
    firstName: string;
    lastName: string;
    email?: string;
    school_slug_id: string;
  };
};

export const createNewSchool = async (
  payload: unknown
): Promise<AxiosResponse<CreateSchoolResponse> | void> => {
  const response = await postRequest<CreateSchoolResponse>('school/', payload);

  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: 'success',
    });
    return response;
  }

  return;
};

export const setPasswordSchool = async (
  payload: unknown
): Promise<AxiosResponse<CreateSchoolResponse> | void> => {
  const response = await postRequest<CreateSchoolResponse>(
    'auth/set-password',
    payload
  );

  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: 'success',
    });
  }
  
  return response;
};

export const generateSlugFromBackend = async ({
  schoolName,
}: {
  schoolName: string;
}) => {
  const response = (await postRequest('/slug/generate', {
    schoolName,
  })) as { data: { data: { slug: string } } };
  return response?.data?.data;
};
