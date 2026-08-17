import { getRequest, postRequest, getFileRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { BulkImportSummary } from '@/app/lib/types/bulk-import.types';

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

/** Fetch all staff for the authenticated school */
export const fetchStaffList = async (): Promise<ResponseType<StaffProfile[]>> => {
  return getRequest<StaffProfile[]>('/staff');
};

/**
 * Bulk import staff from a CSV file
 * POST /staff/bulk
 */
export const bulkCreateStaff = async (
  file: File
): Promise<ResponseType<BulkImportSummary>> => {
  const formData = new FormData();
  formData.append('file', file);
  return postRequest<BulkImportSummary>('/staff/bulk', formData);
};

/**
 * Download a sample CSV/XLSX file for bulk staff import
 * GET /staff/bulk/sample
 */
export const downloadStaffBulkSample = async (
  format: 'csv' | 'xlsx' = 'csv'
): Promise<{ blob: Blob; filename: string }> => {
  return getFileRequest('/staff/bulk/sample', { format });
};

const staffActions = {
  fetchMyStaffProfile,
  fetchStaffList,
  bulkCreateStaff,
  downloadStaffBulkSample,
};

export default staffActions;
