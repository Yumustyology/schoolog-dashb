import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
  downloadRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type {
  Department,
  DepartmentCreatePayload,
  DepartmentUpdatePayload,
} from '@/app/lib/types/department.types';

export const fetchDepartments = async (
  query?: Record<string, string | number | boolean>
): Promise<ResponseType<Department[]>> => {
  return getRequest<Department[]>('/departments', query);
};

export const getDepartmentById = async (
  id: string
): Promise<ResponseType<Department>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return getRequest<Department>(`/departments/${id}`);
};

export const createDepartment = async (
  payload: DepartmentCreatePayload
): Promise<ResponseType<Department>> => {
  return postRequest<Department>('/departments', payload);
};

export const updateDepartment = async (
  id: string,
  payload: DepartmentUpdatePayload
): Promise<ResponseType<Department>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return patchRequest<Department>(`/departments/${id}`, payload);
};

export const deleteDepartment = async (
  id: string
): Promise<ResponseType<null>> => {
  if (!id) return Promise.reject(new Error('ID is required'));
  return deleteRequest<null>('/departments', id);
};

export const exportDepartments = async (query?: { search?: string }): Promise<Blob> => {
  return downloadRequest('/departments/export', query);
};

const departmentsActions = {
  fetchDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  exportDepartments,
};

export default departmentsActions;
