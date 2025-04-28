import { entity } from 'simpler-state';

export const payForStudentOpenState = entity(false);
export const feeCategoryOpenState = entity(false);
export const salaryCategoryOpenState = entity(false);
export const deleteFeeCategoryOpenState = entity(false);
export const activateFeeCategoryOpenState = entity(false);
export const makePaymentOpenState = entity(false);

export const openPayForStudentModal = () =>
  payForStudentOpenState.set(true);
export const closePayForStudentModal = () =>
  payForStudentOpenState.set(false);

export const openActivateFeeCategoryModal = () =>
  activateFeeCategoryOpenState.set(true);
export const closeActivateFeeCategoryModal = () =>
  activateFeeCategoryOpenState.set(false);

export const openDeleteFeeCategoryModal = () =>
  deleteFeeCategoryOpenState.set(true);
export const closeDeleteFeeCategoryModal = () =>
  deleteFeeCategoryOpenState.set(false);

export const openSalaryCategoryModal = () => salaryCategoryOpenState.set(true);
export const closeSalaryCategoryModal = () =>
  salaryCategoryOpenState.set(false);

export const openFeeCategoryModal = () => feeCategoryOpenState.set(true);
export const closeFeeCategoryModal = () => feeCategoryOpenState.set(false);

export const openMakePaymentModal = () => makePaymentOpenState.set(true);
export const closeMakePaymentModal = () => makePaymentOpenState.set(false);
