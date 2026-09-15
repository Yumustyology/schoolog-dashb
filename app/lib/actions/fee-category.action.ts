import { getRequest, postRequest, putRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type FeeCategory = {
  _id: string;
  name: string;
  amount: number;
  currency: string;
  classGradeIds: string[] | { _id: string; name: string }[];
  schoolId: string;
};

export type FeeCategoryPayload = {
  name: string;
  amount: number;
  currency?: string;
  classGradeIds: string[];
};

export const listFeeCategories = async (): Promise<ResponseType<FeeCategory[]>> => {
  return getRequest<FeeCategory[]>('/fee-categories');
};

export const createFeeCategory = async (
  payload: FeeCategoryPayload
): Promise<ResponseType<FeeCategory>> => {
  return postRequest<FeeCategory>('/fee-categories', payload);
};

export const updateFeeCategory = async (
  id: string,
  payload: Partial<FeeCategoryPayload>
): Promise<ResponseType<FeeCategory>> => {
  return putRequest<FeeCategory>(`/fee-categories/${id}`, payload);
};

export const deleteFeeCategory = async (id: string): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/fee-categories', id);
};

const feeCategoryActions = {
  listFeeCategories,
  createFeeCategory,
  updateFeeCategory,
  deleteFeeCategory,
};

export default feeCategoryActions;
