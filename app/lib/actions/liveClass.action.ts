import { getRequest, postRequest, patchRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { LiveClass, LiveClassJoinInfo } from '@/app/lib/types/liveClass.types';

export type CreateLiveClassPayload = {
  title: string;
  classGradeId?: string;
  subjectId?: string;
  scheduledStart: string;
  durationMinutes?: number;
};

/**
 * Create a new live class
 * POST /live-classes
 */
export const createLiveClass = async (
  payload: CreateLiveClassPayload
): Promise<ResponseType<LiveClass>> => {
  return postRequest<LiveClass>('/live-classes', payload);
};

/**
 * List live classes for the authenticated school
 * GET /live-classes
 */
export const fetchLiveClasses = async (
  query?: { classGradeId?: string }
): Promise<ResponseType<LiveClass[]>> => {
  return getRequest<LiveClass[]>('/live-classes', query);
};

/**
 * Get a Dyte join token for a live class
 * POST /live-classes/:id/join
 */
export const joinLiveClass = async (
  id: string
): Promise<ResponseType<LiveClassJoinInfo>> => {
  return postRequest<LiveClassJoinInfo>(`/live-classes/${id}/join`, {});
};

/**
 * End a live class
 * PATCH /live-classes/:id/end
 */
export const endLiveClass = async (
  id: string
): Promise<ResponseType<LiveClass>> => {
  return patchRequest<LiveClass>(`/live-classes/${id}/end`, {});
};

const liveClassActions = {
  createLiveClass,
  fetchLiveClasses,
  joinLiveClass,
  endLiveClass,
};

export default liveClassActions;
