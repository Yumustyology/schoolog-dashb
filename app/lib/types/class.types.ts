export type ClassTeacher = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
};

export type ClassGrade = {
  _id: string;
  name: string;
  level?: string | null;
  classTeacher?: ClassTeacher | null;
  studentCount: number;
  studentMaleCount: number;
  studentFemaleCount: number;
};

export type ClassGradeResponse = {
  data?: ClassGrade[];
};

export type StudentCounts = {
  total: number;
  male: number;
  female: number;
};

export type AttendanceSummary = {
  todayPercentage: number;
  monthPercentage: number;
};

export type ClassGradeDetail = {
  classGrade: ClassGrade & {
    nextGrade?: string | null;
    schoolId?: string;
    isArchived?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  teacher?: ClassTeacher | null;
  studentCounts?: StudentCounts;
  attendance?: AttendanceSummary;
  activeTerm?: ActiveTerm | null;
};

export type ActiveTerm = {
  _id: string;
  name: string;
  schoolId?: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClassSubjectType = 'general' | 'departmental' | 'elective';

export type ClassSubjectTeacher = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ClassSubjectDepartment = {
  _id: string;
  name: string;
};

// A "rule" linking a subject to a class, replacing the legacy
// Subject.classGradeIds array — see class-grades/schema/class-subject.schema.ts
export type ClassSubject = {
  _id: string;
  schoolId: string;
  classGradeId: { _id: string; name: string; level?: number | string } | string;
  subjectId: { _id: string; name: string; code?: string } | string;
  type: ClassSubjectType;
  departmentIds?: ClassSubjectDepartment[] | string[];
  curriculumId?: string | null;
  teacherIds?: ClassSubjectTeacher[] | string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClassSubjectListResponse = {
  data: ClassSubject[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

