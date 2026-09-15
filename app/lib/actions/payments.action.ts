import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { Template } from './templates.action';

export enum PaymentProvider {
  STRIPE = 'stripe',
  PAYSTACK = 'paystack',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export type SavedPaymentMethod = {
  _id: string;
  provider: PaymentProvider;
  providerCustomerId: string;
  providerPaymentMethodId: string;
  brand?: string | null;
  last4?: string | null;
  expiryMonth?: number | null;
  expiryYear?: number | null;
  isDefault: boolean;
  isActive: boolean;
};

export type TemplatePurchase = {
  _id: string;
  schoolId: string;
  templateId: Template | string;
  transactionId: string;
  subscriptionId?: string | null;
  isActive: boolean;
  createdAt: string;
};

export type CheckoutPayload = {
  templateId: string;
  provider: PaymentProvider;
  idempotencyKey: string;
  saveCard?: boolean;
};

export type CheckoutResult = {
  transactionId: string;
  status?: TransactionStatus;
  providerReference?: string;
  clientSecret?: string; // Stripe Elements
  authorizationUrl?: string; // Paystack hosted checkout
};

export type ChargeSavedMethodPayload = {
  templateId: string;
  paymentMethodId: string;
  idempotencyKey: string;
};

export const checkout = async (
  payload: CheckoutPayload
): Promise<ResponseType<CheckoutResult>> => {
  return postRequest<CheckoutResult>('/payments/checkout', payload);
};

export const chargeSavedMethod = async (
  payload: ChargeSavedMethodPayload
): Promise<ResponseType<CheckoutResult>> => {
  return postRequest<CheckoutResult>(
    '/payments/charge-saved-method',
    payload
  );
};

export const listSavedMethods = async (): Promise<
  ResponseType<SavedPaymentMethod[]>
> => {
  return getRequest<SavedPaymentMethod[]>('/payments/methods');
};

export const deleteSavedMethod = async (
  id: string
): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/payments/methods', id);
};

export const listMyPurchases = async (): Promise<
  ResponseType<TemplatePurchase[]>
> => {
  return getRequest<TemplatePurchase[]>('/payments/purchases');
};

export const newIdempotencyKey = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export type Plan = {
  _id: string;
  name: string;
  pricePerStudent: number;
  currency: string;
  annualDiscountPercent: number;
  includedLiveClassMinutes: number;
  maxParticipantsPerSession: number;
  hasBrainyAI: boolean;
  isCustomPricing: boolean;
  features: string[];
  isActive: boolean;
};

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELLED = 'cancelled',
}

export type Subscription = {
  _id: string;
  planId?: string | null;
  provider: PaymentProvider;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  currentPeriodEnd: string;
  consecutiveFailedRenewals: number;
  cancelledAt?: string | null;
};

export type MySubscription = {
  plan: Plan | null;
  planStatus: string;
  planActivatedAt: string | null;
  subscription: Subscription | null;
  usage: {
    liveClassMinutesUsedThisMonth: number;
    liveClassMinutesIncluded: number;
    periodStart: string;
  };
};

export const getMySubscription = async (): Promise<ResponseType<MySubscription>> => {
  return getRequest<MySubscription>('/payments/my-subscription');
};

export type CheckoutPlanPayload = {
  planId: string;
  provider: PaymentProvider;
  idempotencyKey: string;
  saveCard?: boolean;
};

export const checkoutPlan = async (
  payload: CheckoutPlanPayload
): Promise<ResponseType<CheckoutResult>> => {
  return postRequest<CheckoutResult>('/payments/checkout-plan', payload);
};

export type ChargeSavedMethodForPlanPayload = {
  planId: string;
  paymentMethodId: string;
  idempotencyKey: string;
};

export const chargeSavedMethodForPlan = async (
  payload: ChargeSavedMethodForPlanPayload
): Promise<ResponseType<CheckoutResult>> => {
  return postRequest<CheckoutResult>('/payments/charge-saved-method-plan', payload);
};

const paymentsActions = {
  checkout,
  chargeSavedMethod,
  listSavedMethods,
  deleteSavedMethod,
  listMyPurchases,
  newIdempotencyKey,
  getMySubscription,
  checkoutPlan,
  chargeSavedMethodForPlan,
};

export default paymentsActions;
