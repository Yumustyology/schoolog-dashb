import { AxiosResponse } from 'axios';
import { getRequest, postRequest } from '../service/apiRequests';

export const createNewSchool = async (
  payload: unknown
): Promise<AxiosResponse<unknown> | void> => {
  const response = await postRequest<unknown>(
    'organization/new-organization',
    payload
  );
  if (response && response.data) {
    // showToast(response.data.message, response.data.message, {
    //   type: 'success',
    // });
  }
  return response;
};

export const generateSlugFromBackend = async ({
  schoolName,
}: {
  schoolName: string;
}) => {
  const response = await postRequest('/slug/generate', {
    schoolName,
  }) as {data: {data: {slug: string}}};
  return response?.data?.data;
};
