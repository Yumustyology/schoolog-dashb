import {
  getRequest,
  postRequest,
  publicGetRequest,
  publicPostRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type StaffInviteStatus = 'pending' | 'used' | 'revoked' | 'expired';

export type StaffInvite = {
  _id: string;
  email?: string | null;
  role: string;
  classGradeIds: string[];
  expiresAt: string;
  status: StaffInviteStatus;
  usedAt?: string | null;
  createdAt: string;
  link: string;
};

export type CreateStaffInvitePayload = {
  email?: string;
  role?: string;
  classGradeIds?: string[];
  expiresInDays?: number;
  // When true and `email` is set, the backend emails the invite link directly
  // to that address in addition to returning it here.
  sendEmail?: boolean;
};

export type InvitePreview = {
  schoolName?: string;
  role: string;
  email?: string | null;
};

export type RegisterViaInvitePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export const createStaffInvite = async (
  payload: CreateStaffInvitePayload
): Promise<ResponseType<StaffInvite>> => {
  return postRequest<StaffInvite>('/staff-invites', payload);
};

export const listStaffInvites = async (): Promise<ResponseType<StaffInvite[]>> => {
  return getRequest<StaffInvite[]>('/staff-invites');
};

export const revokeStaffInvite = async (
  id: string
): Promise<ResponseType<StaffInvite>> => {
  return postRequest<StaffInvite>(`/staff-invites/${id}/revoke`, {});
};

export const validateStaffInvite = async (
  token: string
): Promise<ResponseType<InvitePreview>> => {
  return publicGetRequest<InvitePreview>(`/staff-invites/public/${token}`);
};

export const registerViaStaffInvite = async (
  token: string,
  payload: RegisterViaInvitePayload
): Promise<ResponseType<{ staffId: string; email: string }>> => {
  return publicPostRequest<{ staffId: string; email: string }>(
    `/staff-invites/public/${token}/register`,
    payload
  );
};

const staffInvitesActions = {
  createStaffInvite,
  listStaffInvites,
  revokeStaffInvite,
  validateStaffInvite,
  registerViaStaffInvite,
};

export default staffInvitesActions;
