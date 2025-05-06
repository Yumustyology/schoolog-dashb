import { entity } from 'simpler-state';

//Graduate Modal
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
