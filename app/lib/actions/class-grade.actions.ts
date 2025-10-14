import { getRequest, getRequestWithHeaders } from '../service/apiRequests';
import type { AxiosResponse } from 'axios';

export type ClassGradeResponse<T = Record<string, unknown>> = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T[];
  meta?: { count: number };
};

/**
 * Fetch paginated class grades for a school
 * query: { page?: number; limit?: number; search?: string }
 */
export const fetchClassGradesPaginated = async (
  query?: Record<string, string | number | boolean>,
//   headers?: Record<string, string>
): Promise<AxiosResponse<ClassGradeResponse> | void> => {
//   if (headers) return getRequestWithHeaders<ClassGradeResponse>('/class-grades/school', query, headers);
  return getRequest<ClassGradeResponse>('/class-grades/school', query);
};

/**
 * Fetch all matching class grades (limit=-1 is used by the backend to return all)
 */
export const fetchClassGradesAll = async (
  query?: Record<string, string | number | boolean>,
//   headers?: Record<string, string>
): Promise<AxiosResponse<ClassGradeResponse> | void> => {
  const q = { ...(query || {}), limit: -1 };
//   if (headers) return getRequestWithHeaders<ClassGradeResponse>('/class-grades/school', q, headers);
  return getRequest<ClassGradeResponse>('/class-grades/school', q);
};

/**
 * Reorder class grades
 * payload: { ids: string[] } - Array of class grade IDs in the new desired order
 */
export const reorderClassGrades = async (
  ids: string[]
): Promise<AxiosResponse<{ message: string; data: null; status: string; statusCode: number }> | void> => {
  const { patchRequest } = await import('../service/apiRequests');
  return patchRequest('/class-grades/reorder', { ids });
};

const classGradeActions = {
  fetchClassGradesPaginated,
  fetchClassGradesAll,
  reorderClassGrades,
};

export default classGradeActions;
