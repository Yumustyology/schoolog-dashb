import { CurriculumType } from '@/components/molecules/dashboard/subjects/CreateSubject/CurriculumType';
import { entity } from 'simpler-state';

export const TOTAL_STEPS = 3;

// initialize state
export const createSubjectProgressState = entity(0);

// update state we use the initialization of the state.set(value)
export const createSubjectNextStep = () => {
  createSubjectProgressState.set((prevStep) =>
    Math.min(prevStep + 1, TOTAL_STEPS)
  );
};

export const createSubjectPreviousStep = () => {
  createSubjectProgressState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createSubjectSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createSubjectProgressState.set(arg);
};

//Change Teacher Modal Control
export const changeAssignedTeacherModal = entity(false);

export const openChangeTeacherModal = () => {
  changeAssignedTeacherModal.set(true);
};

export const closeChangeTeacherModal = () => {
  changeAssignedTeacherModal.set(false);
};

//Add Teacher Modal Control
export const addTeacherModal = entity(false);

export const openAddTeacherModal = () => {
  addTeacherModal.set(true);
};

export const closeAddTeacherModal = () => {
  addTeacherModal.set(false);
};

//Select CurriculumType
export const selectedCurriculumType = entity<string>('manual');
export const setSelectedCurriculumType = (value: string) => {
  selectedCurriculumType.set(value);
};

//Archive Subject
export const isArchive = entity(false);
export const Archived = () => {
  isArchive.set(true);
};

export const Unarchived = () => {
  isArchive.set(false);
};
