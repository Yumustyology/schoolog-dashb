import { getRequest, postRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type { ChatHistoryResponse, ChatMessage } from '@/app/lib/types/message.types';

export const fetchClassMessages = async (
  classGradeId: string,
  query?: { page?: number; limit?: number }
): Promise<ResponseType<ChatHistoryResponse>> => {
  return getRequest<ChatHistoryResponse>(`/messages/class/${classGradeId}`, query);
};

export const postClassMessage = async (
  classGradeId: string,
  body: string
): Promise<ResponseType<ChatMessage>> => {
  return postRequest<ChatMessage>(`/messages/class/${classGradeId}`, { body });
};

export const fetchSubjectMessages = async (
  subjectId: string,
  query?: { page?: number; limit?: number }
): Promise<ResponseType<ChatHistoryResponse>> => {
  return getRequest<ChatHistoryResponse>(`/messages/subject/${subjectId}`, query);
};

export const postSubjectMessage = async (
  subjectId: string,
  body: string
): Promise<ResponseType<ChatMessage>> => {
  return postRequest<ChatMessage>(`/messages/subject/${subjectId}`, { body });
};

const messageActions = {
  fetchClassMessages,
  postClassMessage,
  fetchSubjectMessages,
  postSubjectMessage,
};

export default messageActions;
