export type MessageSenderModel = 'Admin' | 'Staff' | 'Student';

export type ChatMessage = {
  _id: string;
  schoolId: string;
  conversationId: string;
  senderId: string;
  senderModel: MessageSenderModel;
  senderName: string;
  body: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ConversationScope = 'class' | 'subject';

export type Conversation = {
  _id: string;
  schoolId: string;
  scope: ConversationScope;
  classGradeId?: string | null;
  cohortVersion?: number | null;
  subjectId?: string | null;
  lastMessageAt: string;
};

export type ChatHistoryResponse = {
  conversation: Conversation;
  messages: ChatMessage[];
};
