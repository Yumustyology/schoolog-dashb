import { postRequest } from '../service/apiRequests';

export type CreateClassPayload = {
  name: string;
  nextGrade?: string | null;
  level?: number | null;
  classTeacher?: string | null;
};

export const createClass = async (payload: CreateClassPayload) => {
  const endpoint = '/class-grades';
  const res = await postRequest(endpoint, payload);
  return res?.data;
};

const ClassEntity = { createClass };
export default ClassEntity;
