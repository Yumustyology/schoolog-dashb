import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type TimetableEntry = {
  _id: string;
  classGradeId: string | { _id: string; name: string };
  day: string;
  subject: { _id: string; name: string; code?: string } | string;
  period: number;
  teacherId?: string;
};

export const fetchClassTimetable = async (
  classGradeId: string
): Promise<ResponseType<TimetableEntry[]>> => {
  return getRequest<TimetableEntry[]>(`/timetable/class/${classGradeId}`);
};

export const fetchMyTimetable = async (): Promise<ResponseType<TimetableEntry[]>> => {
  return getRequest<TimetableEntry[]>('/timetable/my');
};

const timetableActions = {
  fetchClassTimetable,
  fetchMyTimetable,
};

export default timetableActions;
