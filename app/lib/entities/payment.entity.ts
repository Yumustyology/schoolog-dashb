import { entity } from 'simpler-state';
import type { FeeCategory } from '@/app/lib/actions/fee-category.action';

export const payForStudentOpenState = entity(false);
export const feeCategoryOpenState = entity(false);
export const salaryCategoryOpenState = entity(false);
export const deleteFeeCategoryOpenState = entity(false);
export const activateFeeCategoryOpenState = entity(false);
export const makePaymentOpenState = entity(false);

// The fee category currently being edited (feeCategoryOpenState) or
// considered for deletion (deleteFeeCategoryOpenState). null means "create".
export const selectedFeeCategoryState = entity<FeeCategory | null>(null);

export const openPayForStudentModal = () => payForStudentOpenState.set(true);
export const closePayForStudentModal = () => payForStudentOpenState.set(false);

export const openActivateFeeCategoryModal = () =>
  activateFeeCategoryOpenState.set(true);
export const closeActivateFeeCategoryModal = () =>
  activateFeeCategoryOpenState.set(false);

export const openDeleteFeeCategoryModal = (category: FeeCategory) => {
  selectedFeeCategoryState.set(category);
  deleteFeeCategoryOpenState.set(true);
};
export const closeDeleteFeeCategoryModal = () =>
  deleteFeeCategoryOpenState.set(false);

export const openSalaryCategoryModal = () => salaryCategoryOpenState.set(true);
export const closeSalaryCategoryModal = () =>
  salaryCategoryOpenState.set(false);

export const openFeeCategoryModal = (category?: FeeCategory | null) => {
  selectedFeeCategoryState.set(category ?? null);
  feeCategoryOpenState.set(true);
};
export const closeFeeCategoryModal = () => {
  feeCategoryOpenState.set(false);
  selectedFeeCategoryState.set(null);
};

export const openMakePaymentModal = () => makePaymentOpenState.set(true);
export const closeMakePaymentModal = () => makePaymentOpenState.set(false);
