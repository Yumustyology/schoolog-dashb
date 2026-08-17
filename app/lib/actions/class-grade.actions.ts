import { getRequest, patchRequest, deleteRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type {
  ClassGradeDetail,
  ClassSubject,
  ClassSubjectListResponse,
  ClassSubjectType,
} from '@/app/lib/types/class.types';

/**
 * Create a new class grade
 */
export const createClassGrade = async (payload: {
  name: string;
  code?: string;
  levelCategory?: 'junior' | 'senior';
  hasDepartments?: boolean;
  departmentIds?: string[];
  academicYear?: string;
  capacity?: number;
  description?: string;
}): Promise<ResponseType<Record<string, unknown>>> => {
  return postRequest<Record<string, unknown>>('/class-grades', payload);
};

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
): Promise<ResponseType<ClassGradeDetail>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return getRequest<ClassGradeDetail>(`/class-grades/${id}`);
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

/**
 * Archive a class grade by id
 */
export const archiveClassGrade = async (
  id: string
): Promise<ResponseType<unknown>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return patchRequest<unknown>(`/class-grades/${id}/archive`, {});
};

/**
 * Unarchive a class grade by id
 */
export const unarchiveClassGrade = async (
  id: string
): Promise<ResponseType<unknown>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return patchRequest<unknown>(`/class-grades/${id}/unarchive`, {});
};

/**
 * Remove a teacher from a class-subject assignment
 */
export const removeTeacherFromClassSubject = async (
  classSubjectId: string,
  teacherId: string
): Promise<ResponseType<unknown>> => {
  if (!classSubjectId || !teacherId)
    return Promise.reject(new Error('classSubjectId and teacherId are required'));
  return patchRequest<unknown>(
    `/class-grades/subjects/${classSubjectId}/remove-teacher`,
    { teacherId }
  );
};

/**
 * Fetch the class-subject rule (with populated teachers) and students for a
 * given subject + class grade pair.
 */
export const getClassSubjectForSubjectAndClass = async (
  subjectId: string,
  classGradeId: string
): Promise<ResponseType<{ classSubject: Record<string, any>; students: unknown[] }>> => {
  if (!subjectId || !classGradeId)
    return Promise.reject(new Error('subjectId and classGradeId are required'));
  return getRequest(`/class-grades/subjects/${subjectId}/students/${classGradeId}`);
};

/**
 * Create a class-subject rule (link a subject to a class)
 */
export const createClassSubject = async (payload: {
  classGradeId: string;
  subjectId: string;
  type: ClassSubjectType;
  departmentIds?: string[];
  teacherIds?: string[];
}): Promise<ResponseType<ClassSubject>> => {
  return postRequest<ClassSubject>('/class-grades/subjects', payload);
};

/**
 * List class-subject rules, optionally filtered by subject and/or class
 */
export const fetchClassSubjects = async (query?: {
  subjectId?: string;
  classGradeId?: string;
  page?: number;
  limit?: number;
}): Promise<ResponseType<ClassSubjectListResponse>> => {
  return getRequest<ClassSubjectListResponse>('/class-grades/subjects', {
    limit: 100,
    ...query,
  });
};

/**
 * Delete (unlink) a class-subject rule
 */
export const deleteClassSubject = async (
  id: string
): Promise<ResponseType<null>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return deleteRequest<null>('/class-grades/subjects', id);
};

const classGradeActions = {
  createClassGrade,
  fetchClassGradesPaginated,
  fetchClassGradesAll,
  reorderClassGrades,
  fetchClassGradeById,
  updateClassGrade,
  deleteClassGrade,
  archiveClassGrade,
  unarchiveClassGrade,
  removeTeacherFromClassSubject,
  getClassSubjectForSubjectAndClass,
  createClassSubject,
  fetchClassSubjects,
  deleteClassSubject,
};

export default classGradeActions;
