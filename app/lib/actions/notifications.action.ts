import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export enum NotificationStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENT = 'sent',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  IN_APP = 'in_app',
  PUSH = 'push',
}

export enum AudienceFilter {
  ALL_STUDENTS = 'all_students',
  ALL_STAFF = 'all_staff',
  ALL_GUARDIANS = 'all_guardians',
  SPECIFIC_CLASS = 'specific_class',
  SPECIFIC_STUDENTS = 'specific_students',
  SPECIFIC_STAFF = 'specific_staff',
  SPECIFIC_GUARDIANS = 'specific_guardians',
  ALL_USERS = 'all_users',
}

export type TargetAudience = {
  filter: AudienceFilter;
  classIds?: string[];
  studentIds?: string[];
  staffIds?: string[];
  guardianIds?: string[];
};

export type NotificationMetrics = {
  totalRecipients: number;
  delivered: number;
  failed: number;
  opened: number;
  clicked: number;
};

export type NotificationItem = {
  _id: string;
  schoolId: string;
  title: string;
  message: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  targetAudience: TargetAudience;
  scheduledAt?: string;
  sentAt?: string;
  createdBy: string;
  metrics: NotificationMetrics;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type CreateNotificationPayload = {
  title: string;
  message: string;
  priority?: NotificationPriority;
  channels?: NotificationChannel[];
  targetAudience: TargetAudience;
  scheduledAt?: string;
  metadata?: Record<string, any>;
};

export const fetchNotifications = async (
  status?: NotificationStatus
): Promise<ResponseType<NotificationItem[]>> => {
  return getRequest<NotificationItem[]>(
    '/notifications',
    status ? { status } : undefined
  );
};

export const fetchNotificationById = async (
  id: string
): Promise<ResponseType<NotificationItem>> => {
  return getRequest<NotificationItem>('/notifications', id);
};

export const createNotification = async (
  payload: CreateNotificationPayload
): Promise<ResponseType<NotificationItem>> => {
  return postRequest<NotificationItem>('/notifications', payload);
};

export const updateNotification = async (
  id: string,
  payload: Partial<CreateNotificationPayload>
): Promise<ResponseType<NotificationItem>> => {
  return patchRequest<NotificationItem>(`/notifications/${id}`, payload);
};

export const deleteNotification = async (
  id: string
): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/notifications', id);
};

export const sendNotificationNow = async (
  id: string
): Promise<ResponseType<null>> => {
  return postRequest<null>(`/notifications/${id}/send-now`, {});
};

export const undraftNotification = async (
  id: string,
  scheduledAt?: string
): Promise<ResponseType<null>> => {
  return postRequest<null>(
    `/notifications/${id}/undraft`,
    scheduledAt ? { scheduledAt } : {}
  );
};

const notificationsActions = {
  fetchNotifications,
  fetchNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  sendNotificationNow,
  undraftNotification,
};

export default notificationsActions;
