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

/**
 * Fetch single subject by ID
 */
export const getSubjectById = async (
  id: string
): Promise<ResponseType<Record<string, unknown>>> => {
  return getRequest<Record<string, unknown>>(`/subjects/${id}`);
};

/** Link a subject to a class grade and optional department */
export const linkSubjectToClass = async (
  subjectId: string,
  payload: SubjectLinkPayload
): Promise<ResponseType<unknown>> => {
  if (!subjectId || !payload.classGradeId) return Promise.reject(new Error('Required fields missing'));
  return postRequest<unknown>(`/subjects/${subjectId}/link`, payload);
};

export type AssignTutorPayload = {
  classGradeId: string;
  teacherId: string;
  departmentId?: string;
};

/**
 * Assign a tutor/teacher to a subject for a specific class grade and optional department
 */
export const assignTutorToSubjectClass = async (
  subjectId: string,
  payload: AssignTutorPayload
): Promise<ResponseType<unknown>> => {
  if (!subjectId || !payload.classGradeId || !payload.teacherId) {
    return Promise.reject(new Error('Required fields missing'));
  }
  return postRequest<unknown>(`/subjects/${subjectId}/assign-tutor`, payload);
};

/**
 * Fetch all subject links for a subject
 */
export const getSubjectLinks = async (
  subjectId: string
): Promise<ResponseType<Record<string, unknown>[]>> => {
  if (!subjectId) return Promise.reject(new Error('Subject ID is required'));
  return getRequest<Record<string, unknown>[]>(`/subjects/${subjectId}/links`);
};

const subjectsActions = {
  getSchoolSubjects,
  getSubjectById,
  createSubject,
  deleteSubject,
  archiveSubject,
  unarchiveSubject,
  linkSubjectToClass,
  assignTutorToSubjectClass,
  getSubjectLinks,
};

export default subjectsActions;
