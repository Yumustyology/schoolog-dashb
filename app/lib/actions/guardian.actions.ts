import { postRequest, getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export interface CreateGuardianPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  secondaryPhoneNumber?: string;
  address?: string;
  relationship: string;
  wards?: string[];
  guardianSlugId?: string;
}

export const createGuardian = async (payload: CreateGuardianPayload): Promise<ResponseType<unknown>> => {
  return postRequest<unknown>('/guardians', payload);
};

export interface GuardianWard {
  _id: string;
  firstName: string;
  lastName: string;
  studentSlugId: string;
  classGrade: string;
  dob: string;
}

export interface GuardianSchool {
  _id: string;
  name: string;
  email: string;
  slug: string;
}

export interface Guardian {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber?: string;
  address?: string;
  guardianSlugId: string;
  slgId: string;
  schoolId: GuardianSchool;
  relationship: string;
  wards: (GuardianWard | string)[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  school: GuardianSchool;
  index: number;
}

export const fetchGuardians = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<Guardian[]>> => {
  return getRequest<Guardian[]>('/guardians', query);
};

export const fetchGuardianById = async (id: string): Promise<ResponseType<Guardian>> => {
  return getRequest<Guardian>(`/guardians/${id}`);
};
