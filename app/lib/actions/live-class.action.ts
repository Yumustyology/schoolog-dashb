import { getRequest, postRequest, patchRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export enum LiveClassStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
}

export type LiveClass = {
  _id: string;
  title: string;
  classGradeId?: { _id: string; name: string } | string | null;
  subjectId?: { _id: string; name: string } | string | null;
  hostId?: { _id: string; firstName: string; lastName: string; email: string } | string;
  scheduledStart: string;
  durationMinutes: number;
  status: LiveClassStatus;
};

export type CreateLiveClassPayload = {
  title: string;
  classGradeId?: string;
  subjectId?: string;
  scheduledStart: string;
  durationMinutes?: number;
};

export const createLiveClass = async (
  payload: CreateLiveClassPayload
): Promise<ResponseType<LiveClass>> => {
  return postRequest<LiveClass>('/live-classes', payload);
};

export const listLiveClasses = async (
  classGradeId?: string
): Promise<ResponseType<LiveClass[]>> => {
  return getRequest<LiveClass[]>('/live-classes', classGradeId ? { classGradeId } : undefined);
};

export const joinLiveClass = async (
  id: string
): Promise<ResponseType<{ meetingId: string; authToken: string }>> => {
  return postRequest<{ meetingId: string; authToken: string }>(`/live-classes/${id}/join`, {});
};

export const endLiveClass = async (id: string): Promise<ResponseType<LiveClass>> => {
  return patchRequest<LiveClass>(`/live-classes/${id}/end`, {});
};

const liveClassActions = {
  createLiveClass,
  listLiveClasses,
  joinLiveClass,
  endLiveClass,
};

export default liveClassActions;
