import { entity } from 'simpler-state';

export type CheckoutTemplate = {
  templateId: string;
  name: string;
  amount: number; // smallest currency unit (kobo/cents)
  currency: string;
};

export const templateCheckoutOpenState = entity(false);
export const checkoutTemplateState = entity<CheckoutTemplate | null>(null);

export const openTemplateCheckoutModal = (template: CheckoutTemplate) => {
  checkoutTemplateState.set(template);
  templateCheckoutOpenState.set(true);
};

export const closeTemplateCheckoutModal = () => {
  templateCheckoutOpenState.set(false);
  checkoutTemplateState.set(null);
};
