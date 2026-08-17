'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import type { Socket } from 'socket.io-client';
import { appConfig } from '@/app/lib/config/app.config';
import messageActions from '@/app/lib/actions/message.action';
import type { ChatMessage, ConversationScope } from '@/app/lib/types/message.types';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { formatDateTime } from '@/app/lib/utils/dateUtils';
import Button from '@/components/atoms/form/Button';
import showToast from '@/app/lib/utils/toast';

// Decode the JWT payload client-side purely to read `sub` (the sender's own
// audienceId) for "is this my message" styling — never used for auth
// decisions, the server independently verifies the token on every request.
function decodeJwtSub(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload?.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}

type ChatThreadProps = {
  scope: ConversationScope;
  classGradeId?: string;
  subjectId?: string;
  emptyLabel?: string;
};

export default function ChatThread({
  scope,
  classGradeId,
  subjectId,
  emptyLabel = 'No messages yet — say hello!',
}: ChatThreadProps) {
  const socketRef = useRef<Socket | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const swrKey =
    scope === 'class' && classGradeId
      ? ['class-messages', classGradeId]
      : scope === 'subject' && subjectId
        ? ['subject-messages', subjectId]
        : null;

  const { data: historyResp, isLoading } = useSWR(swrKey, () =>
    scope === 'class'
      ? messageActions.fetchClassMessages(classGradeId as string)
      : messageActions.fetchSubjectMessages(subjectId as string)
  );

  const history = historyResp?.data?.messages || [];
  const messages = [...history, ...liveMessages];

  useEffect(() => {
    setLiveMessages([]);
  }, [scope, classGradeId, subjectId]);

  useEffect(() => {
    let active = true;
    let socket: Socket | null = null;

    (async () => {
      const lfModule = await import('localforage');
      const lf = lfModule.default;
      const token = await lf.getItem<string>('accessToken');
      if (!token || !active) return;
      setCurrentUserId(decodeJwtSub(token));

      const { io } = await import('socket.io-client');
      socket = io(`${appConfig.socketBaseUrl}/ws/messages`, {
        auth: { token },
        transports: ['websocket'],
      });
      socketRef.current = socket;

      socket.on('connect', () => active && setConnected(true));
      socket.on('disconnect', () => active && setConnected(false));

      socket.on('message.created', (msg: ChatMessage) => {
        if (!active) return;
        if (msg.conversationId !== conversationIdRef.current) return;
        setLiveMessages((prev) => [...prev, msg]);
      });

      socket.emit(
        'conversation.join',
        { scope, classGradeId, subjectId },
        (res: { status: string; data?: { conversationId: string } }) => {
          if (res?.status === 'success' && res.data) {
            conversationIdRef.current = res.data.conversationId;
          }
        }
      );
    })();

    return () => {
      active = false;
      socket?.disconnect();
      socketRef.current = null;
      conversationIdRef.current = null;
    };
  }, [scope, classGradeId, subjectId]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async () => {
    const body = draft.trim();
    if (!body) return;

    setSending(true);
    try {
      const socket = socketRef.current;
      if (socket && conversationIdRef.current) {
        socket.emit('message.post', { conversationId: conversationIdRef.current, body });
      } else if (scope === 'class' && classGradeId) {
        const resp = await messageActions.postClassMessage(classGradeId, body);
        if (resp?.data) setLiveMessages((prev) => [...prev, resp.data as ChatMessage]);
      } else if (scope === 'subject' && subjectId) {
        const resp = await messageActions.postSubjectMessage(subjectId, body);
        if (resp?.data) setLiveMessages((prev) => [...prev, resp.data as ChatMessage]);
      }
      setDraft('');
    } catch {
      showToast('Message could not be sent', 'message-send-error', { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-3">
        {isLoading ? (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className={cn('text-sm text-gray6 text-center mt-10', poppins_400.className)}>
            {emptyLabel}
          </p>
        ) : (
          messages.map((m) => {
            const isMine = !!currentUserId && m.senderId === currentUserId;
            return (
              <div
                key={m._id}
                className={cn('max-w-[75%] rounded-2xl px-4 py-2', isMine ? 'self-end bg-primary text-white' : 'self-start bg-gray4 text-black1')}
              >
                {!isMine && (
                  <p className={cn('text-xs mb-0.5 opacity-70', poppins_500.className)}>
                    {m.senderName}
                  </p>
                )}
                <p className={cn('text-sm break-words', poppins_400.className)}>{m.body}</p>
                <p className={cn('text-[10px] mt-1 opacity-60', poppins_400.className)}>
                  {formatDateTime(m.createdAt)}
                </p>
              </div>
            );
          })
        )}
        <div ref={listEndRef} />
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={connected ? 'Type a message…' : 'Connecting…'}
          className="flex-1 border border-gray4 rounded-full px-4 py-2 text-sm"
        />
        <Button round className="h-[40px] px-6" onClick={handleSend} disabled={sending || !draft.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}
