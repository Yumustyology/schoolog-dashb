import { getRequest, patchRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type CurriculumResponse<T = any> = ResponseType<T[]>;

/**
 * Fetch curriculum for a specific class grade and subject
 */
export const getCurriculumForClassSubject = async (
  classGradeId: string,
  subjectId: string
): Promise<ResponseType<unknown[]>> => {
  if (!classGradeId || !subjectId) return Promise.reject(new Error('Missing classGradeId or subjectId'));
  const endpoint = `/curriculum/class/${classGradeId}/subject/${subjectId}`;
  return getRequest<unknown[]>(endpoint);
};

/**
 * Patch (update) curriculum for a specific class grade and subject
 * payload should be an object that the backend accepts (we send { curriculum })
 */
export const patchCurriculumForClassSubject = async (
  classGradeId: string,
  subjectId: string,
  payload: Record<string, any>
): Promise<ResponseType<unknown>> => {
  if (!classGradeId || !subjectId) return Promise.reject(new Error('Missing classGradeId or subjectId'));
  const endpoint = `/curriculum/class/${classGradeId}/subject/${subjectId}`;
  return patchRequest<unknown>(endpoint, payload);
};

const curriculumActions = {
  getCurriculumForClassSubject,
  patchCurriculumForClassSubject,
};

export default curriculumActions;
