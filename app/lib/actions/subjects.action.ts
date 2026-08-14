import { getRequest, postRequest, deleteRequest, patchRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { SubjectLinkPayload } from '@/app/lib/types/department.types';

/**
 * Fetch school subjects with optional query params.
 * query: { search?: string; classGrades?: string[] | string }
 */
export const getSchoolSubjects = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<Record<string, unknown>[]>> => {
  return getRequest<Record<string, unknown>[]>('/subjects/school', query);
};

/**
 * Create a new subject
 * payload: subject data including name, description, coverImage, etc.
 */
export const createSubject = async (
  payload: Record<string, unknown>
): Promise<ResponseType<unknown>> => {
  return postRequest<unknown>('/subjects', payload);
};

/**
 * Delete a subject by ID
 * id: subject ID to delete
 */
export const deleteSubject = async (
  id: string
): Promise<ResponseType<unknown>> => {
  return deleteRequest<unknown>('/subjects', id);
};

/** Archive a subject by id */
export const archiveSubject = async (
  id: string
): Promise<ResponseType<unknown>> => {
  return patchRequest<unknown>(`/subjects/${id}/archive`, {});
};

/** Unarchive a subject by id */
export const unarchiveSubject = async (
  id: string
): Promise<ResponseType<unknown>> => {
  return patchRequest<unknown>(`/subjects/${id}/unarchive`, {});
};

/** Link a subject to a class grade and optional department */
export const linkSubjectToClass = async (
  subjectId: string,
  payload: SubjectLinkPayload
): Promise<ResponseType<unknown>> => {
  if (!subjectId || !payload.classGradeId) return Promise.reject(new Error('Required fields missing'));
  return postRequest<unknown>(`/subjects/${subjectId}/link`, payload);
};

const subjectsActions = {
  getSchoolSubjects,
  createSubject,
  deleteSubject,
  archiveSubject,
  unarchiveSubject,
  linkSubjectToClass,
};

export default subjectsActions;
