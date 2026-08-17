import { entity } from 'simpler-state';

export const isPlanFormOpen = entity(false);
export const selectedPlanId = entity<string | null>(null);

export const openPlanForm = (id?: string) => {
  selectedPlanId.set(id || null);
  isPlanFormOpen.set(true);
};
export const closePlanForm = () => {
  selectedPlanId.set(null);
  isPlanFormOpen.set(false);
};

export const isAddOnFormOpen = entity(false);
export const selectedAddOnId = entity<string | null>(null);

export const openAddOnForm = (id?: string) => {
  selectedAddOnId.set(id || null);
  isAddOnFormOpen.set(true);
};
export const closeAddOnForm = () => {
  selectedAddOnId.set(null);
  isAddOnFormOpen.set(false);
};
