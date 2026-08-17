import { getRequest, postRequest, putRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { FeeCategory } from '@/app/lib/types/feeCategory.types';

export type CreateFeeCategoryPayload = {
  name: string;
  amount: number;
  currency?: string;
  classGradeIds: string[];
};

/**
 * Create a new fee category
 * POST /fee-categories
 */
export const createFeeCategory = async (
  payload: CreateFeeCategoryPayload
): Promise<ResponseType<FeeCategory>> => {
  return postRequest<FeeCategory>('/fee-categories', payload);
};

/**
 * List fee categories for the authenticated school
 * GET /fee-categories
 */
export const fetchFeeCategories = async (): Promise<
  ResponseType<FeeCategory[]>
> => {
  return getRequest<FeeCategory[]>('/fee-categories');
};

/**
 * Update a fee category
 * PUT /fee-categories/:id
 */
export const updateFeeCategory = async (
  id: string,
  payload: Partial<CreateFeeCategoryPayload>
): Promise<ResponseType<FeeCategory>> => {
  return putRequest<FeeCategory>(`/fee-categories/${id}`, payload);
};

/**
 * Delete a fee category
 * DELETE /fee-categories/:id
 */
export const deleteFeeCategory = async (
  id: string
): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/fee-categories', id);
};

const feeCategoryActions = {
  createFeeCategory,
  fetchFeeCategories,
  updateFeeCategory,
  deleteFeeCategory,
};

export default feeCategoryActions;
