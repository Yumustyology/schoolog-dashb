import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import {
  AcademicTerm,
  CreateTermSessionPayload,
  UpdateTermSessionPayload,
} from '../types/academicYear.types';

export const getAllTermSessions = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<AcademicTerm[]>> => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }

  const url = params.toString()
    ? `/term-sessions?${params.toString()}`
    : '/term-sessions';
  return getRequest<AcademicTerm[]>(url);
};

export const getTermSessionById = async (
  id: string
): Promise<ResponseType<AcademicTerm>> => {
  return getRequest<AcademicTerm>('/term-sessions', id);
};

export const createTermSession = async (
  payload: CreateTermSessionPayload
): Promise<ResponseType<AcademicTerm>> => {
  return postRequest<AcademicTerm>('/term-sessions', payload);
};

export const updateTermSession = async (
  id: string,
  payload: UpdateTermSessionPayload
): Promise<ResponseType<AcademicTerm>> => {
  return patchRequest<AcademicTerm>(
    `/term-sessions/${id}`,
    payload
  );
};

export const deleteTermSession = async (
  id: string
): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/term-sessions', id);
};

export const toggleTermSessionActive = async (
  id: string
): Promise<ResponseType<AcademicTerm>> => {
  return patchRequest<AcademicTerm>(
    `/term-sessions/${id}/toggle-active`,
    {}
  );
};
