import { entity } from 'simpler-state';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
import type {
  CurriculumEntry,
  SubjectTimetableEntry,
} from '@/app/lib/types/curriculum.types';

// Create Subject entity state (holds the form data across steps)
export type CreateSubjectEntity = {
  name: string;
  coverImage: File | string | null; // File while editing or URL after upload
  curriculumSource: 'manual' | 'waec' | 'neco' | 'subeb' | 'ube' | 'upload' | null;
  // Store selected term session for curriculum creation, keyed by classId
  selectedTerm: Record<string, TermSessionType | null>;
  // minimal curriculum shape (can be expanded or replaced by curriculum.entity types)
  curriculum?: CurriculumEntry[];
  assignedTeacherId?: string | null;
  classGrades?: string[];
  timetable?: SubjectTimetableEntry[];
};

export const defaultCreateSubjectEntity: CreateSubjectEntity = {
  name: '',
  coverImage: null,
  curriculumSource: 'manual',
  selectedTerm: {},
  curriculum: [],
  assignedTeacherId: null,
  classGrades: [],
  timetable: [
    { day: 'Monday', periods: [] },
    { day: 'Tuesday', periods: [] },
    { day: 'Wednesday', periods: [] },
    { day: 'Thursday', periods: [] },
    { day: 'Friday', periods: [] },
    { day: 'Saturday', periods: [] },
    { day: 'Sunday', periods: [] },
  ],
};

export const createSubjectEntity = entity<CreateSubjectEntity>(
  defaultCreateSubjectEntity
);

export const setCreateSubjectField = <K extends keyof CreateSubjectEntity>(
  key: K,
  value: CreateSubjectEntity[K]
) => {
  createSubjectEntity.set((prev) => ({ ...prev, [key]: value }));
};

export const resetCreateSubjectEntity = () => {
  createSubjectEntity.set(defaultCreateSubjectEntity);
};


export const TOTAL_STEPS = 2;

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
  if (arg > 2 || arg < 0) return;
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
