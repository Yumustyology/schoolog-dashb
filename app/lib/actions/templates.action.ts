import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export enum BillingInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  ONE_TIME = 'one_time',
}

export type Template = {
  _id: string;
  name: string;
  description: string;
  // Smallest currency unit (kobo/cents) — divide by 100 before display.
  price: number;
  currency: string;
  billingInterval: BillingInterval;
  previewImages: string[];
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const fetchTemplates = async (): Promise<ResponseType<Template[]>> => {
  return getRequest<Template[]>('/templates');
};

export const fetchTemplateById = async (
  id: string
): Promise<ResponseType<Template>> => {
  return getRequest<Template>('/templates', id);
};

const templatesActions = {
  fetchTemplates,
  fetchTemplateById,
};

export default templatesActions;
