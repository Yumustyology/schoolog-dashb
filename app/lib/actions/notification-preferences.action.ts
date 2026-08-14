import { getRequest, patchRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type NotificationChannelPreferences = {
  announcement: boolean;
  subjectUpdate: boolean;
  classUpdate: boolean;
  assignmentUpdate: boolean;
  bookUpdate: boolean;
  messageUpdate: boolean;
};

export type NotificationPreferences = {
  _id: string;
  audienceId: string;
  audienceType: string;
  schoolId: string;
  inApp: NotificationChannelPreferences;
  email: NotificationChannelPreferences;
};

export type UpdateNotificationPreferencesPayload = {
  inApp?: Partial<NotificationChannelPreferences>;
  email?: Partial<NotificationChannelPreferences>;
};

export const fetchMyNotificationPreferences = async (): Promise<
  ResponseType<NotificationPreferences>
> => {
  return getRequest<NotificationPreferences>('/notification-preferences/me');
};

export const updateMyNotificationPreferences = async (
  payload: UpdateNotificationPreferencesPayload
): Promise<ResponseType<NotificationPreferences>> => {
  return patchRequest<NotificationPreferences>(
    '/notification-preferences/me',
    payload
  );
};

const notificationPreferencesActions = {
  fetchMyNotificationPreferences,
  updateMyNotificationPreferences,
};

export default notificationPreferencesActions;
