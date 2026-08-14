import { entity } from 'simpler-state';

export const studentFilterModal = entity(false);

export const OpenStudentFilterModal = () => {
  studentFilterModal.set(true);
};

export const closeStudentFilterModal = () => {
  studentFilterModal.set(false);
};

//Select Filter Type
export const selectedFilterType = entity<string>('all');
export const setSelecedFilterType = (value: string) => {
  selectedFilterType.set(value);
};

//Graduate Modal
export const graduateModal = entity(false);

export const OpenGraduateModal = () => {
  graduateModal.set(true);
};

export const closeGraduateModal = () => {
  graduateModal.set(false);
};

export const selectedGraduateType = entity<string>('wholeClass');
export const setSelectedGraduateType = (value: string) => {
  selectedGraduateType.set(value);
};

//Promte Modal
export const promoteModal = entity(false);

export const OpenPromoteModal = () => {
  promoteModal.set(true);
};

export const closePromoteModal = () => {
  promoteModal.set(false);
};

export const selectedPromoteType = entity<string>('wholeClass');
export const setSelectedPromoteType = (value: string) => {
  selectedPromoteType.set(value);
};

//Demote Modal
export const demoteModal = entity(false);

export const OpenDemoteModal = () => {
  demoteModal.set(true);
};

export const closeDemoteModal = () => {
  demoteModal.set(false);
};

export const selectedDemoteType = entity<string>('wholeClass');
export const setSelectedDemoteType = (value: string) => {
  selectedDemoteType.set(value);
};

//MOVE MODAL ACTIONS
export const moveModal = entity(false);

export const openMoveModal = () => {
  moveModal.set(true);
};

export const closeMoveModal = () => {
  moveModal.set(false);
};

export const selectedMoveType = entity<string>('promotion');
export const setSelectedMoveType = (value: string) => {
  selectedMoveType.set(value);
};

//SUSPEND MODAL
export const isSuspendStudentModalOpen = entity(false);

export const openSuspendStudentModal = () => {
  isSuspendStudentModalOpen.set(true);
};

export const closeSuspendStudentModal = () => {
  isSuspendStudentModalOpen.set(false);
};

//ADD Student Typr
export const isAddSudentsMenuOpen = entity(false);

export const openAddStudentsMenu = () => {
  isAddSudentsMenuOpen.set(true);
};

export const closeAddStudentsMenu = () => {
  isAddSudentsMenuOpen.set(false);
};

//Upload StudentList Modal
export const isUploadStudentsOpen = entity(false);

export const openUploadStudentModal = () => {
  isUploadStudentsOpen.set(true);
};

export const closeUploadStudentModal = () => {
  isUploadStudentsOpen.set(false);
};

// ADD STUDENT MANUALLY
export const totalNumberSteps = 2;

// initialize state
export const createAddStudentProgressState = entity(0);

// update state we use the initialization of the state.set(value)
export const createAddStudentNextStep = () => {
  createAddStudentProgressState.set((prevStep) =>
    Math.min(prevStep + 1, totalNumberSteps)
  );
};

export const createAddStudentPreviousStep = () => {
  createAddStudentProgressState.set((prevStep) => Math.max(prevStep - 1, 0));
};

export const createAddStudentSetStep = (arg: number) => {
  if (arg > 3 || arg < 0) return;
  createAddStudentProgressState.set(arg);
};

// Create Student Entity (form state across steps)
export type CreateStudentEntity = {
  firstName: string;
  lastName: string;
  email?: string;
  gender?: string | null;
  dob?: string | null; // ISO date string
  classGrade?: string | null; // class id (MongoId)
  guardianId?: string | null;
  guardianName?: string | null;
  guardianRelationship?: string | null;
  guardianEmail?: string | null;
  guardianPhone?: string | null;
  secondaryGuardianName?: string | null;
  secondaryGuardianPhone?: string | null;
  guardianAddress?: string | null;
  image?: File | null;
};

export const createStudentEntity = entity<CreateStudentEntity>({
  firstName: '',
  lastName: '',
  email: undefined,
  gender: null,
  dob: null,
  classGrade: null,
  guardianId: null,
  guardianName: null,
  guardianRelationship: null,
  guardianEmail: null,
  guardianPhone: null,
  secondaryGuardianName: null,
  secondaryGuardianPhone: null,
  guardianAddress: null,
  image: null,
});

export const resetCreateStudentEntity = () => {
  createStudentEntity.set({
    firstName: '',
    lastName: '',
    email: undefined,
    gender: null,
    dob: null,
    classGrade: null,
    guardianId: null,
    guardianName: null,
    guardianRelationship: null,
    guardianEmail: null,
    guardianPhone: null,
    secondaryGuardianName: null,
    secondaryGuardianPhone: null,
    guardianAddress: null,
    image: null,
  });
};

// Helper: set a single field on createStudentEntity without replacing other fields
export const setCreateStudentField = <K extends keyof CreateStudentEntity>(
  key: K,
  value: CreateStudentEntity[K]
) => {
  createStudentEntity.set((prev) => ({ ...prev, [key]: value } as CreateStudentEntity));
};
