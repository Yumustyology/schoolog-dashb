export type LiveClassStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';

export type LiveClass = {
  _id: string;
  title: string;
  classGradeId?: { _id: string; name: string; level?: number } | string | null;
  subjectId?: { _id: string; name: string; code?: string } | string | null;
  hostId: { _id: string; firstName: string; lastName: string; email: string } | string;
  scheduledStart: string;
  durationMinutes: number;
  status: LiveClassStatus;
};

export type LiveClassJoinInfo = {
  meetingId: string;
  authToken: string;
};
