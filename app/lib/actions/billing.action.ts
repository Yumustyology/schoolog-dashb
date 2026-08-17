import { getRequest, postRequest, putRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { Plan, AddOn } from '@/app/lib/types/billing.types';

export type CreatePlanPayload = Omit<Plan, '_id' | 'isActive'>;
export type CreateAddOnPayload = Omit<AddOn, '_id' | 'isActive'>;

// ===== Plans =====

export const fetchPlans = async (): Promise<ResponseType<Plan[]>> => {
  return getRequest<Plan[]>('/billing/plans');
};

/** Public, unauthenticated — active plans only, for the pricing/signup pages. */
export const fetchPublicPlans = async (): Promise<ResponseType<Plan[]>> => {
  return getRequest<Plan[]>('/billing/plans/public');
};

export const createPlan = async (
  payload: CreatePlanPayload
): Promise<ResponseType<Plan>> => {
  return postRequest<Plan>('/billing/plans', payload);
};

export const updatePlan = async (
  id: string,
  payload: Partial<CreatePlanPayload> & { isActive?: boolean }
): Promise<ResponseType<Plan>> => {
  return putRequest<Plan>(`/billing/plans/${id}`, payload);
};

export const deletePlan = async (id: string): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/billing/plans', id);
};

// ===== Add-ons =====

export const fetchAddOns = async (): Promise<ResponseType<AddOn[]>> => {
  return getRequest<AddOn[]>('/billing/add-ons');
};

export const createAddOn = async (
  payload: CreateAddOnPayload
): Promise<ResponseType<AddOn>> => {
  return postRequest<AddOn>('/billing/add-ons', payload);
};

export const updateAddOn = async (
  id: string,
  payload: Partial<CreateAddOnPayload> & { isActive?: boolean }
): Promise<ResponseType<AddOn>> => {
  return putRequest<AddOn>(`/billing/add-ons/${id}`, payload);
};

export const deleteAddOn = async (id: string): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/billing/add-ons', id);
};

const billingActions = {
  fetchPlans,
  fetchPublicPlans,
  createPlan,
  updatePlan,
  deletePlan,
  fetchAddOns,
  createAddOn,
  updateAddOn,
  deleteAddOn,
};

export default billingActions;
