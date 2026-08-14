import { postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import { getRequest } from '../service/apiRequests';

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

const studentActions = {
  createStudent,
  fetchStudents,
};

export default studentActions;
