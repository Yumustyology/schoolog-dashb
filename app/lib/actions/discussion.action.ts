import { getRequest, postRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type DiscussionAttachment = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  isUploading?: boolean;
};

export type DiscussionVoiceNote = {
  id: string;
  url: string;
  durationSeconds: number;
  isUploading?: boolean;
};

export type DiscussionReply = {
  id: string;
  authorId?: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  isDeleted?: boolean;
  deletedByRole?: 'owner' | 'admin';
  attachments?: DiscussionAttachment[];
  voiceNote?: DiscussionVoiceNote;
  reactions?: Record<string, string[]>;
};

export type DiscussionThread = {
  id: string;
  subjectId?: string;
  classGradeId?: string;
  authorId?: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  createdAt: string;
  isDeleted?: boolean;
  deletedByRole?: 'owner' | 'admin';
  attachments?: DiscussionAttachment[];
  voiceNote?: DiscussionVoiceNote;
  replies: DiscussionReply[];
  reactions?: Record<string, string[]>;
};

export type CreateThreadPayload = {
  id?: string;
  subjectId?: string;
  classGradeId?: string;
  title: string;
  content: string;
  attachments?: DiscussionAttachment[];
  voiceNote?: DiscussionVoiceNote;
};

export type CreateReplyPayload = {
  id?: string;
  content: string;
  attachments?: DiscussionAttachment[];
  voiceNote?: DiscussionVoiceNote;
};

export const fetchDiscussionThreads = async (
  subjectId?: string,
  classGradeId?: string
): Promise<ResponseType<DiscussionThread[]>> => {
  return getRequest<DiscussionThread[]>('/discussions', {
    ...(subjectId && { subjectId }),
    ...(classGradeId && { classGradeId }),
  });
};

const sanitizeAttachmentForApi = (att: DiscussionAttachment): DiscussionAttachment => {
  if (att.url.startsWith('data:')) {
    return {
      ...att,
      url: att.url.length > 1000 ? `attachment:${att.id}` : att.url,
    };
  }
  return att;
};

const sanitizeVoiceNoteForApi = (vn?: DiscussionVoiceNote): DiscussionVoiceNote | undefined => {
  if (!vn) return undefined;
  if (vn.url.startsWith('blob:')) {
    return {
      ...vn,
      url: `voicenote:${vn.id}`,
    };
  }
  return vn;
};

export const createDiscussionThread = async (
  payload: CreateThreadPayload
): Promise<ResponseType<DiscussionThread>> => {
  const sanitizedPayload: CreateThreadPayload = {
    ...payload,
    attachments: payload.attachments?.map(sanitizeAttachmentForApi),
    voiceNote: sanitizeVoiceNoteForApi(payload.voiceNote),
  };
  return postRequest<DiscussionThread>('/discussions', sanitizedPayload);
};

export const createDiscussionReply = async (
  threadId: string,
  payload: CreateReplyPayload
): Promise<ResponseType<DiscussionReply>> => {
  const sanitizedPayload: CreateReplyPayload = {
    ...payload,
    attachments: payload.attachments?.map(sanitizeAttachmentForApi),
    voiceNote: sanitizeVoiceNoteForApi(payload.voiceNote),
  };
  return postRequest<DiscussionReply>(`/discussions/${threadId}/replies`, sanitizedPayload);
};

export const deleteDiscussionThread = async (
  threadId: string
): Promise<ResponseType<{ id: string; isDeleted: boolean; deletedByRole: string }>> => {
  return deleteRequest<{ id: string; isDeleted: boolean; deletedByRole: string }>(
    `/discussions/${threadId}`
  );
};

export const undoDeleteDiscussionThread = async (
  threadId: string
): Promise<ResponseType<DiscussionThread>> => {
  return patchRequest<DiscussionThread>(`/discussions/${threadId}/restore`, {});
};

export const deleteDiscussionReply = async (
  threadId: string,
  replyId: string
): Promise<ResponseType<{ id: string; isDeleted: boolean; deletedByRole: string }>> => {
  return deleteRequest<{ id: string; isDeleted: boolean; deletedByRole: string }>(
    `/discussions/${threadId}/replies/${replyId}`
  );
};

export const undoDeleteDiscussionReply = async (
  threadId: string,
  replyId: string
): Promise<ResponseType<DiscussionReply>> => {
  return patchRequest<DiscussionReply>(`/discussions/${threadId}/replies/${replyId}/restore`, {});
};

export const toggleDiscussionReaction = async (
  threadId: string,
  replyId: string | null,
  emoji: string
): Promise<ResponseType<Record<string, string[]>>> => {
  return postRequest<Record<string, string[]>>(`/discussions/${threadId}/reactions`, {
    replyId,
    emoji,
  });
};

const discussionActions = {
  fetchDiscussionThreads,
  createDiscussionThread,
  createDiscussionReply,
  deleteDiscussionThread,
  undoDeleteDiscussionThread,
  deleteDiscussionReply,
  undoDeleteDiscussionReply,
  toggleDiscussionReaction,
};

export default discussionActions;
