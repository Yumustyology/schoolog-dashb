import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { Plan } from './payments.action';

export type AddOn = {
  _id: string;
  name: string;
  billingType: 'recurring' | 'one_time';
  price: number;
  currency: string;
  description?: string;
  isActive: boolean;
};

export const listPublicPlans = async (): Promise<ResponseType<Plan[]>> => {
  return getRequest<Plan[]>('/billing/plans/public');
};

export const listPublicAddOns = async (): Promise<ResponseType<AddOn[]>> => {
  return getRequest<AddOn[]>('/billing/add-ons/public');
};

const billingActions = {
  listPublicPlans,
  listPublicAddOns,
};

export default billingActions;
