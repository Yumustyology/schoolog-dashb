export type ClassTeacher = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ClassGrade = {
  _id: string;
  name: string;
  level?: string | null;
  classTeacher?: ClassTeacher | null;
  studentCount: number;
  studentMale: number;
  studentFemale: number;
};

export type ClassGradeResponse = {
  data?: ClassGrade[];
};
