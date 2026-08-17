import {
  postRequest,
  getRequest,
  getFileRequest,
  patchRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { BulkImportSummary } from '@/app/lib/types/bulk-import.types';
import type { BulkActionSummary } from '@/app/lib/types/bulk-action.types';

export type CreateStudentPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  gender?: string | null;
  dob?: string | null;
  classGrade: string;
  guardianId?: string | null;
};

/**
 * Create a new student
 * POST /students
 */
export const createStudent = async (
  payload: CreateStudentPayload | FormData
): Promise<ResponseType<unknown>> => {
  return postRequest<unknown>('/students', payload);
};

export type GetStudentsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  classGradeId?: string; 
};

export const fetchStudents = async (
  query: Record<string, unknown> | undefined
): Promise<ResponseType<Record<string, unknown>[]>> => {
  return getRequest<Record<string, unknown>[]>('/students', query);
};

/**
 * Bulk import students from a CSV file
 * POST /students/bulk
 */
export const bulkCreateStudents = async (
  file: File
): Promise<ResponseType<BulkImportSummary>> => {
  const formData = new FormData();
  formData.append('file', file);
  return postRequest<BulkImportSummary>('/students/bulk', formData);
};

/**
 * Download a sample CSV/XLSX file for bulk student import
 * GET /students/bulk/sample
 */
export const downloadStudentBulkSample = async (
  format: 'csv' | 'xlsx' = 'csv'
): Promise<{ blob: Blob; filename: string }> => {
  return getFileRequest('/students/bulk/sample', { format });
};

export type BulkMoveClassPayload = {
  studentIds: string[];
  nextClassGradeId: string;
  departmentId?: string;
};

/**
 * Bulk move students to another class grade (promote or demote)
 * PATCH /students/bulk-move-class
 */
export const bulkMoveClass = async (
  payload: BulkMoveClassPayload
): Promise<ResponseType<BulkActionSummary>> => {
  return patchRequest<BulkActionSummary>('/students/bulk-move-class', payload);
};

/**
 * Bulk graduate students
 * PATCH /students/bulk-graduate
 */
export const bulkGraduateStudents = async (
  studentIds: string[]
): Promise<ResponseType<BulkActionSummary>> => {
  return patchRequest<BulkActionSummary>('/students/bulk-graduate', {
    studentIds,
  });
};

const studentActions = {
  createStudent,
  fetchStudents,
  bulkCreateStudents,
  downloadStudentBulkSample,
  bulkMoveClass,
  bulkGraduateStudents,
};

export default studentActions;
