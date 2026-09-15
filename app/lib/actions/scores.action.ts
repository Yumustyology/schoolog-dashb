import { getRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type CaEntry = {
  label: string;
  score: number;
  maxScore: number;
};

export type StudentScore = {
  _id: string;
  studentId: { _id: string; firstName: string; lastName: string; studentSlugId: string } | string;
  classGradeId: string;
  subjectId: string;
  caScores: CaEntry[];
  examScore: number;
  examMaxScore: number;
  bonusMarks: number;
  totalScore: number;
  totalMaxScore: number;
  percentage: number;
  grade: string;
  remark?: string | null;
};

export type ScoreEntryPayload = {
  studentId: string;
  caScores?: CaEntry[];
  examScore?: number;
  bonusMarks?: number;
  remark?: string;
};

export type BulkUpsertScoresPayload = {
  classGradeId: string;
  subjectId: string;
  termSessionId?: string;
  examMaxScore?: number;
  entries: ScoreEntryPayload[];
};

export type ScoreSummary = {
  totalStudents: number;
  recordedCount: number;
  completionPercentage: number;
  calculation: {
    caStructure: { label: string; maxScore: number }[];
    examMaxScore: number;
    totalMaxScore: number;
  } | null;
  averagePercentage: number;
  gradeDistribution: Record<string, number>;
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

export const fetchScoreSummary = async (
  classGradeId: string,
  subjectId: string,
  termSessionId?: string
): Promise<ResponseType<ScoreSummary>> => {
  return getRequest<ScoreSummary>('/scores/summary', {
    classGradeId,
    subjectId,
    ...(termSessionId ? { termSessionId } : {}),
  });
};

const scoresActions = {
  bulkUpsertScores,
  fetchScores,
  fetchScoreSummary,
};

export default scoresActions;
