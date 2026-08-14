import { getRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type StudentScore = {
  _id: string;
  studentId: { _id: string; firstName: string; lastName: string; studentSlugId: string } | string;
  classGradeId: string;
  subjectId: string;
  score: number;
  maxScore: number;
  remark?: string | null;
};

export type ScoreEntryPayload = {
  studentId: string;
  score: number;
  remark?: string;
};

export type BulkUpsertScoresPayload = {
  classGradeId: string;
  subjectId: string;
  termSessionId?: string;
  maxScore?: number;
  entries: ScoreEntryPayload[];
};

export const bulkUpsertScores = async (
  payload: BulkUpsertScoresPayload
): Promise<ResponseType<StudentScore[]>> => {
  return postRequest<StudentScore[]>('/scores/bulk', payload);
};

export const fetchScores = async (
  classGradeId: string,
  subjectId: string,
  termSessionId?: string
): Promise<ResponseType<StudentScore[]>> => {
  return getRequest<StudentScore[]>('/scores', {
    classGradeId,
    subjectId,
    ...(termSessionId ? { termSessionId } : {}),
  });
};

const scoresActions = {
  bulkUpsertScores,
  fetchScores,
};

export default scoresActions;
