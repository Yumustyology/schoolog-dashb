import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/app/lib/service/apiRequests';
import type { ResponseType } from '../types/api-response.types';
import {
  AcademicYear,
  CreateAcademicYearPayload,
} from '../types/academicYear.types';

export async function getAcademicYears(): Promise<ResponseType<AcademicYear[]>> {
  return getRequest<AcademicYear[]>('/year-calendar');
}

export async function createAcademicYear(
  payload: CreateAcademicYearPayload
): Promise<ResponseType<AcademicYear>> {
  return postRequest<AcademicYear>('/year-calendar', payload);
}

export async function getAcademicYearById(id: string): Promise<ResponseType<AcademicYear>> {
  return getRequest<AcademicYear>(`/year-calendar/${id}`);
}

export async function deleteAcademicYearById(
  id: string
): Promise<ResponseType<null>> {
  return deleteRequest<null>('/year-calendar', id);
}

export async function updateAcademicYear(
  id: string,
  payload: Partial<CreateAcademicYearPayload>
): Promise<ResponseType<AcademicYear>> {
  return patchRequest<AcademicYear>(`/year-calendar/${id}`, payload);
}
