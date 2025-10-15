import { getRequest, postRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { AxiosResponse } from 'axios';

export type TermSession = {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  school_id: string;
  is_deleted: boolean;
  is_currently_active?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TermSessionsResponse = {
  status: 'success' | 'fail';
  message: string;
  data: TermSession[];
  statusCode: number;
  meta?: {
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type SingleTermSessionResponse = {
  status: 'success' | 'fail';
  message: string;
  data: TermSession;
  statusCode: number;
};

export type CreateTermSessionPayload = {
  name: string;
  start_date: string;
  end_date: string;
  is_currently_active?: boolean;
};

export type UpdateTermSessionPayload = {
  name?: string;
  start_date?: string;
  end_date?: string;
  is_currently_active?: boolean;
};

export type DeleteTermSessionResponse = {
  status: 'success' | 'fail';
  message: string;
  statusCode: number;
};

/**
 * Get all term sessions for the authenticated school
 * @param query - Optional query parameters for search and pagination
 */
export const getAllTermSessions = async (query?: Record<string, string | number | boolean>): Promise<AxiosResponse<TermSessionsResponse> | void> => {
  const params = new URLSearchParams();
  
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }
  
  const url = params.toString() ? `/term-sessions?${params.toString()}` : '/term-sessions';
  return getRequest<TermSessionsResponse>(url);
};

/**
 * Get a single term session by ID
 * @param id - Term session ID
 */
export const getTermSessionById = async (id: string): Promise<AxiosResponse<SingleTermSessionResponse> | void> => {
  return getRequest<SingleTermSessionResponse>('/term-sessions', id);
};

/**
 * Create a new term session
 * @param payload - Term session data
 */
export const createTermSession = async (
  payload: CreateTermSessionPayload
): Promise<AxiosResponse<SingleTermSessionResponse> | void> => {
  return postRequest<SingleTermSessionResponse>('/term-sessions', payload);
};

/**
 * Update an existing term session
 * @param id - Term session ID
 * @param payload - Updated term session data
 */
export const updateTermSession = async (
  id: string,
  payload: UpdateTermSessionPayload
): Promise<AxiosResponse<SingleTermSessionResponse> | void> => {
  return patchRequest<SingleTermSessionResponse>(`/term-sessions/${id}`, payload);
};

/**
 * Delete (soft delete) a term session
 * @param id - Term session ID
 */
export const deleteTermSession = async (id: string): Promise<AxiosResponse<DeleteTermSessionResponse> | void> => {
  return deleteRequest<DeleteTermSessionResponse>('/term-sessions', id);
};

/**
 * Toggle active status of a term session
 * @param id - Term session ID
 */
export const toggleTermSessionActive = async (id: string): Promise<AxiosResponse<SingleTermSessionResponse> | void> => {
  return patchRequest<SingleTermSessionResponse>(`/term-sessions/${id}/toggle-active`, {});
};

const termSessionActions = {
  getAllTermSessions,
  getTermSessionById,
  createTermSession,
  updateTermSession,
  deleteTermSession,
};

export default termSessionActions;
