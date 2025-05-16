import { entity } from 'simpler-state';

//Check in  Modal
export const checkInModal = entity(false);

export const OpenCheckInModal = () => {
  checkInModal.set(true);
};

export const closeCheckInModal = () => {
  checkInModal.set(false);
};

export const selectedCheckInType = entity<string>('teacher');
export const setSelectedCheckInType = (value: string) => {
  selectedCheckInType.set(value);
};

//Check out  Modal
export const checkOutModal = entity(false);

export const OpenCheckOutModal = () => {
  checkOutModal.set(true);
};

export const closeCheckOutModal = () => {
  checkOutModal.set(false);
};

export const selectedCheckOutType = entity<string>('teacher');
export const setSelectedCheckOutType = (value: string) => {
  selectedCheckOutType.set(value);
};
