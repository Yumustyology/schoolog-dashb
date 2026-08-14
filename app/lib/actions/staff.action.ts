import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type StaffClassAssignment = {
  classGradeId: { _id: string; name: string; level?: number } | string;
  isClassTeacher: boolean;
};

export type StaffProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  isTeachingStaff: boolean;
  staffSlugId: string;
  schoolId: string;
  classes: StaffClassAssignment[];
};

export const fetchMyStaffProfile = async (): Promise<ResponseType<StaffProfile>> => {
  return getRequest<StaffProfile>('/staff/me');
};

const staffActions = {
  fetchMyStaffProfile,
};

export default staffActions;
