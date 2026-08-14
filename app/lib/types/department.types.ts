import type { ApiListResponse, ApiResponse } from './api-response.types';

export type Department = {
  _id: string;
  name: string;
  code: string;
  description?: string | null;
  status: 'Active' | 'Inactive' | string;
  createdAt?: string;
  updatedAt?: string;
};

export type DepartmentResponse = ApiResponse<Department>;
export type DepartmentListResponse = ApiListResponse<Department>;

export type DepartmentCreatePayload = {
  name: string;
  code: string;
  description?: string;
  status?: 'Active' | 'Inactive' | string;
  schoolId?: string;
};

export type DepartmentUpdatePayload = Partial<DepartmentCreatePayload>;

export type SubjectLinkPayload = {
  classGradeId: string;
  linkMode: 'general' | 'departmental' | 'elective';
  departmentId?: string;
};
