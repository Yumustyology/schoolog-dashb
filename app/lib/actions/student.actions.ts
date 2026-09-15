import { postRequest, patchRequest } from '../service/apiRequests';
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

export type ClassMoveResult = {
  promoted?: number;
  demoted?: number;
  graduated?: number;
  targetClass: { _id: string; name: string } | null;
};

/**
 * Promote every active student in a class grade to the next-higher class
 * grade (graduates them instead if there is no higher class).
 * PATCH /students/class-grade/:classGradeId/promote
 */
export const promoteClassGrade = async (
  classGradeId: string
): Promise<ResponseType<ClassMoveResult>> => {
  return patchRequest<ClassMoveResult>(
    `/students/class-grade/${classGradeId}/promote`,
    {}
  );
};

/**
 * Move every active student in a class grade down to the next-lower class
 * grade.
 * PATCH /students/class-grade/:classGradeId/demote
 */
export const demoteClassGrade = async (
  classGradeId: string
): Promise<ResponseType<ClassMoveResult>> => {
  return patchRequest<ClassMoveResult>(
    `/students/class-grade/${classGradeId}/demote`,
    {}
  );
};

const studentActions = {
  createStudent,
  fetchStudents,
  promoteClassGrade,
  demoteClassGrade,
};

export default studentActions;
