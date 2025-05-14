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









// NON-TEACHING STAFF

// ADD TEACHER MANUALLY



// initialize state
export const createAddTeamProgressState = entity(0);

// update state we use the initialization of the state.set(value)
export const createAddTeamNextStep = () => {
  createAddTeamProgressState.set((prevStep) =>
    Math.min(prevStep + 1, totalNumberSteps)
  );
};

export const createAddTeamPreviousStep = () => {
  createAddTeamProgressState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createAddTeamSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createAddTeamProgressState.set(arg);
};

//ADD NONT-TEACHING STAFF Typr
export const isAddTeamMenuOpen = entity(false);

export const openAddTeamMenu = () => {
  isAddTeamMenuOpen.set(true);
};

export const closeAddTeamMenu = () => {
  isAddTeacherMenuOpen.set(false);
};


//STAFF PERMISSIONS MODAL 
export const isStaffPermissionsOpen = entity(false);

export const openStaffPermissionsModal = () => {
  isStaffPermissionsOpen.set(true);
};

export const closeStaffPermissionsModal = () => {
  isStaffPermissionsOpen.set(false);
};


//Add Staff role modal
export const isAddStaffPermissionOpen = entity(false);

export const openAddStaffPermissionModal = () => {
  isAddStaffPermissionOpen.set(true);
};


export const closeAddStaffPermissionModal = () => {
  isAddStaffPermissionOpen.set(false);
};


//EDIT STAFF PERMISSION Modal
export const isEditStaffPermissionOpen = entity(false);

export const openEditStaffPermissionModal = () => {
  isEditStaffPermissionOpen.set(true);
};

export const closeEditStaffPermissionModal = () => {
  isEditStaffPermissionOpen.set(false);
};