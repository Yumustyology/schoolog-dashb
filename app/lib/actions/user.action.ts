import { getRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export const fetchProfileDetails = async (id?: string): Promise<ResponseType<unknown>> => {
  return getRequest<unknown>('profile', id);
};

export const updateProfileAvatar = async (payload: unknown): Promise<ResponseType<unknown>> => {
  return postRequest<unknown>('change-avatar', payload);
};
