import { getRequest, postRequest, deleteRequest } from '../service/apiRequests';
import type { AxiosResponse } from 'axios';

export type SubjectsResponse<T = Record<string, unknown>> = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T[];
  meta?: { count: number };
};

export type CreateSubjectResponse = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
};

export type DeleteSubjectResponse = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
};

/**
 * Fetch school subjects with optional query params.
 * query: { search?: string; classGrades?: string[] | string }
 * headers: optional headers (e.g. Authorization, x-tenant)
 */
export const getSchoolSubjects = async (
  query?: Record<string, string | number | boolean>,
//   headers?: Record<string, string>
): Promise<AxiosResponse<SubjectsResponse> | void> => {
//   if (headers) {
//     return getRequestWithHeaders<SubjectsResponse>('/subjects/school', query, headers);
//   }

  return getRequest<SubjectsResponse>('/subjects/school', query);
};

/**
 * Create a new subject
 * payload: subject data including name, description, coverImage, etc.
 */
export const createSubject = async (
  payload: Record<string, unknown>
): Promise<AxiosResponse<CreateSubjectResponse> | void> => {
  return postRequest<CreateSubjectResponse>('/subjects', payload);
};

/**
 * Delete a subject by ID
 * id: subject ID to delete
 */
export const deleteSubject = async (
  id: string
): Promise<AxiosResponse<DeleteSubjectResponse> | void> => {
  return deleteRequest<DeleteSubjectResponse>('/subjects', id);
};

const subjectsActions = {
  getSchoolSubjects,
  createSubject,
  deleteSubject,
};

export default subjectsActions;
