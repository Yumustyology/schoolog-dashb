import { getRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
}

export type StudentAttendanceEntry = {
  studentId: string;
  status: AttendanceStatus;
};

export type AttendanceEvent = {
  _id: string;
  schoolId: string;
  eventType: string;
  date: string;
  classGradeId: string;
  students: StudentAttendanceEntry[];
  takenBy?: string;
  sessionStatus?: string;
};

export type RecordClassAttendancePayload = {
  classGradeId: string;
  takenBy: string;
  date: string;
  students: StudentAttendanceEntry[];
};

export const recordClassAttendance = async (
  payload: RecordClassAttendancePayload
): Promise<ResponseType<AttendanceEvent>> => {
  return postRequest<AttendanceEvent>('/attendance/class', payload);
};

export const fetchClassAttendance = async (
  classGradeId: string,
  date: string
): Promise<ResponseType<AttendanceEvent | null>> => {
  return getRequest<AttendanceEvent | null>(`/attendance/class/${classGradeId}`, {
    date,
  });
};

export const fetchClassAttendanceHistory = async (
  classGradeId: string
): Promise<ResponseType<AttendanceEvent[]>> => {
  return getRequest<AttendanceEvent[]>(`/attendance/class/${classGradeId}/history`);
};

const attendanceActions = {
  recordClassAttendance,
  fetchClassAttendance,
  fetchClassAttendanceHistory,
};

export default attendanceActions;
