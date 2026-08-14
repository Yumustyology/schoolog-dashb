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

export type ClassGradeDetailResponse = {
  data?: ClassGradeDetail;
};
