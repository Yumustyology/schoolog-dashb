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

export type AddOnBillingType = 'recurring' | 'one_time';

export type AddOn = {
  _id: string;
  name: string;
  billingType: AddOnBillingType;
  price: number;
  currency: string;
  description: string;
  isActive: boolean;
};
