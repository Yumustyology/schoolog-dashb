import { getRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { ClassGradeDetailResponse } from '@/app/lib/types/class.types';

/**
 * Fetch paginated class grades for a school
 * query: { page?: number; limit?: number; search?: string }
 */
export const fetchClassGradesPaginated = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<Record<string, unknown>[]>> => {
  return getRequest<Record<string, unknown>[]>('/class-grades/school', query);
};

/**
 * Fetch all matching class grades (limit=-1 is used by the backend to return all)
 */
export const fetchClassGradesAll = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<Record<string, unknown>[]>> => {
  const q = { ...(query || {}), limit: -1 };
  return getRequest<Record<string, unknown>[]>('/class-grades/school', q);
};

/**
 * Reorder class grades
 * payload: { ids: string[] } - Array of class grade IDs in the new desired order
 */
export const reorderClassGrades = async (
  ids: string[]
): Promise<ResponseType<null>> => {
  return patchRequest<null>('/class-grades/reorder', { ids });
};

/**
 * Fetch a single class grade by id
 */
export const fetchClassGradeById = async (
  id: string
): Promise<ResponseType<ClassGradeDetailResponse>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return getRequest<ClassGradeDetailResponse>(`/class-grades/${id}`);
};

/**
 * Update a class grade by id
 * payload: Partial<CreateClassGradeDto>
 */
export const updateClassGrade = async (
  id: string,
  payload: Record<string, any>
): Promise<ResponseType<unknown>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return patchRequest<unknown>(`/class-grades/${id}`, payload);
};

/**
 * Delete a class grade by id
 */
export const deleteClassGrade = async (
  id: string
): Promise<ResponseType<null>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return deleteRequest<null>(`/class-grades`, id);
};

const classGradeActions = {
  fetchClassGradesPaginated,
  fetchClassGradesAll,
  reorderClassGrades,
  fetchClassGradeById,
  updateClassGrade,
  deleteClassGrade,
};

export default classGradeActions;
