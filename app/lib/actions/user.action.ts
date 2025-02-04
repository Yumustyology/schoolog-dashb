// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { getRequest, postRequest } from '../service/apiRequests';

export const fetchProfileDetails = async (id?: string): Promise<any> => {
  const response = await getRequest('profile', id);
  return response;
};

export const updateProfileAvatar = async (payload: unknown): Promise<any> => {
  const response = await postRequest('change-avatar', payload);
  return response;
};
