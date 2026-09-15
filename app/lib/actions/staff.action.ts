import { getRequest, patchRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type StaffClassAssignment = {
  classGradeId: { _id: string; name: string; level?: number } | string;
  isClassTeacher: boolean;
};

export type StaffProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  isTeachingStaff: boolean;
  staffSlugId: string;
  schoolId: string;
  classes: StaffClassAssignment[];
};

export const fetchMyStaffProfile = async (): Promise<ResponseType<StaffProfile>> => {
  return getRequest<StaffProfile>('/staff/me');
};

export type StaffListItem = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  isTeachingStaff: boolean;
  staffSlugId: string;
  createdAt?: string;
  classes: StaffClassAssignment[];
};

export const fetchSchoolStaff = async (): Promise<ResponseType<StaffListItem[]>> => {
  return getRequest<StaffListItem[]>('/staff');
};

export const fetchStaffById = async (
  id: string
): Promise<ResponseType<StaffListItem>> => {
  return getRequest<StaffListItem>(`/staff/${id}`);
};

export const updateStaffStatus = async (
  id: string,
  status: string
): Promise<ResponseType<StaffListItem>> => {
  return patchRequest<StaffListItem>(`/staff/${id}/status`, { status });
};

export type BulkUploadStaffResult = {
  totalRows: number;
  successCount: number;
  failureCount: number;
  results: {
    row: number;
    identifier: string;
    status: 'success' | 'failed';
    message: string;
  }[];
};

export const bulkUploadStaff = async (
  file: File
): Promise<ResponseType<BulkUploadStaffResult>> => {
  const formData = new FormData();
  formData.append('file', file);
  return postRequest<BulkUploadStaffResult>('/staff/bulk', formData);
};

const staffActions = {
  fetchMyStaffProfile,
  fetchSchoolStaff,
  fetchStaffById,
  updateStaffStatus,
  bulkUploadStaff,
};

export default staffActions;
