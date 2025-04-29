import { entity } from "simpler-state";

//ADD Teacher Typr
export const isAddTeacherMenuOpen = entity(false);

export const openAddTeacherMenu = () => {
  isAddTeacherMenuOpen.set(true);
};

export const closeAddTeacherMenu = () => {
  isAddTeacherMenuOpen.set(false);
};

//Upload TeacherList Modal
export const isUploadTeachersOpen = entity(false);

export const openUploadTeacherModal = () => {
  isUploadTeachersOpen.set(true);
};

export const closeUploadTeacherModal = () => {
  isUploadTeachersOpen.set(false);
};



// ADD TEACHER MANUALLY
export const totalNumberSteps = 2;


// initialize state
export const createAddTeacherProgressState = entity(0);

// update state we use the initialization of the state.set(value)
export const createAddTeacherNextStep = () => {
  createAddTeacherProgressState.set((prevStep) =>
    Math.min(prevStep + 1, totalNumberSteps)
  );
};

export const createAddTeacherPreviousStep = () => {
  createAddTeacherProgressState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createAddTeacherSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createAddTeacherProgressState.set(arg);
};



//SUSPEND TEACHER MODAL
export const isSuspendTeacherModalOpen = entity(false);

export const openSuspendTeacherModal = () => {
  isSuspendTeacherModalOpen.set(true);
};

export const closeSuspendTeacherModal = () => {
  isSuspendTeacherModalOpen.set(false);
};

//TERMINATE TEACHER MODAL
export const isTerminateTeacherModalOpen = entity(false);

export const openTerminateTeacherModal = () => {
  isTerminateTeacherModalOpen.set(true);
};

export const closeTerminateTeacherModal = () => {
  isTerminateTeacherModalOpen.set(false);
};