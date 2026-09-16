'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Empty from '@/components/molecules/empty/Empty';
import Message from '@/components/atoms/icons/SideBar/Message';
import Button from '@/components/atoms/form/Button';
import UserAvatar from '@/components/atoms/UserAvatar';
import Modal from '@/components/molecules/Modal';
import { cn, formatFileSize } from '@/app/lib/utils';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import {
  Send,
  MessageSquare,
  CornerDownRight,
  Smile,
  Trash2,
  Paperclip,
  Mic,
  Square,
  Play,
  Pause,
  FileText,
  Download,
  X,
  RotateCcw,
  Film,
  Volume2,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import { AdditionIcon, DeleteModalIcon } from '@/components/atoms/icons/Icons';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { profileState } from '@/app/lib/entities/profile.entity';
import { uploadToCloudinary } from '@/app/lib/utils/cloudinary';
import discussionActions, {
  DiscussionThread,
  DiscussionReply,
  DiscussionAttachment,
  DiscussionVoiceNote,
} from '@/app/lib/actions/discussion.action';

export interface DiscussionProps {
  subjectId?: string;
  classGradeId?: string;
  subjectTitle?: string;
  searchQuery?: string;
}

const EMOJI_OPTIONS = ['👍', '❤️', '💡', '😂', '🎉', '🔥'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB Cap

const isImageAttachment = (att: { type?: string; name?: string; url?: string }) => {
  if (!att) return false;
  const name = att.name || '';
  const type = att.type || '';
  const url = att.url || '';
  return (
    type.toLowerCase().startsWith('image/') ||
    /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(name) ||
    url.startsWith('data:image/') ||
    (url.includes('cloudinary') && /\.(png|jpg|jpeg|webp|gif)/i.test(url))
  );
};

const SAMPLE_THREADS: DiscussionThread[] = [
  {
    id: 'thread-sample-1',
    title: 'Hey guys',
    content: 'wassup all',
    authorName: 'Demo Admin',
    authorRole: 'School Admin',
    createdAt: 'Sep 16, 12:07 AM',
    reactions: {
      '👍': ['Demo Admin', 'Mahmud Yussuf'],
      '❤️': ['Joke Aderonke'],
    },
    replies: [
      {
        id: 'reply-sample-1',
        authorName: 'Demo Admin',
        authorRole: 'School Admin',
        content: 'hi',
        createdAt: 'Sep 16, 12:07 AM',
        reactions: {
          '💡': ['Mahmud Yussuf'],
        },
      },
      {
        id: 'reply-sample-2',
        authorName: 'Demo Admin',
        authorRole: 'School Admin',
        content: 'hi',
        createdAt: 'Sep 16, 12:11 AM',
      },
      {
        id: 'reply-sample-3',
        authorName: 'Demo Admin',
        authorRole: 'School Admin',
        content: 'yo',
        createdAt: 'Sep 16, 12:11 AM',
      },
    ],
  },
];

type PendingDeletion = {
  threadId: string;
  replyId?: string;
  itemType: 'thread' | 'reply';
  previousState: DiscussionThread[];
  countdown: number;
};

export default function Discussion({
  subjectId,
  classGradeId,
  subjectTitle,
  searchQuery = '',
}: DiscussionProps) {
  const { theme } = useSlgTheme();
  const profile = profileState.use();

  const currentUserId = profile?.slgId || profile?.slugId || profile?.email || 'user-admin';
  const currentAuthorName =
    `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() ||
    profile?.email ||
    'Demo Admin';
  const currentAuthorRole = profile?.audience || 'School Admin';
  const isSchoolAdmin =
    !profile?.audience ||
    profile?.audience === 'school' ||
    profile?.audience === 'admin' ||
    currentAuthorRole.toLowerCase().includes('admin');

  const storageKey = `schoolog:discussions:${subjectId || 'default'}:${classGradeId || 'default'}`;

  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(null);

  // Pre-Send Attachment States
  const [pendingAttachments, setPendingAttachments] = useState<DiscussionAttachment[]>([]);
  const [pendingVoiceNote, setPendingVoiceNote] = useState<DiscussionVoiceNote | null>(null);

  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio Playback Preview State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lightbox Image Preview State
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);

  // Delete Confirmation Modal State
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    threadId: string;
    replyId?: string;
    type: 'thread' | 'reply';
    isOwner: boolean;
  } | null>(null);

  // Resilient API Retry & Rollback State
  const [syncStatusToast, setSyncStatusToast] = useState<{
    id: string;
    message: string;
    type: 'retry' | 'error' | 'success';
    countdown?: number;
    attempt?: number;
    maxAttempts?: number;
  } | null>(null);

  const runResilientOperation = async (
    operationName: string,
    apiFn: () => Promise<any>,
    onRollback: () => void,
    maxAttempts = 3
  ) => {
    let attempt = 1;

    while (attempt <= maxAttempts) {
      try {
        const res = await apiFn();
        if (
          res?.status === 'success' ||
          (res && !res.statusCode) ||
          res?.statusCode === 200 ||
          res?.statusCode === 201
        ) {
          setSyncStatusToast(null);
          return true;
        }

        // If backend route is not created/registered yet (404), gracefully operate in local mode
        const msg = String(res?.message || '');
        if (
          res?.statusCode === 404 ||
          msg.includes('Cannot POST') ||
          msg.includes('Cannot DELETE') ||
          msg.includes('Cannot GET')
        ) {
          console.warn(`[Discussion Sync] Backend route not found (${msg}). Retaining local UI state.`);
          setSyncStatusToast(null);
          return true;
        }

        throw new Error(res?.message || `HTTP ${res?.statusCode || 500}`);
      } catch (err: any) {
        const statusCode = err?.statusCode || err?.status || err?.response?.status;
        const msg = String(err?.message || '');

        // 404 Not Found fallback for missing backend endpoints
        if (
          statusCode === 404 ||
          msg.includes('Cannot POST') ||
          msg.includes('Cannot DELETE') ||
          msg.includes('Cannot GET') ||
          msg.includes('404')
        ) {
          console.warn(`[Discussion Sync] Backend 404 route (${msg}). Retaining local UI state.`);
          setSyncStatusToast(null);
          return true;
        }

        if (attempt < maxAttempts) {
          for (let sec = 3; sec > 0; sec--) {
            setSyncStatusToast({
              id: `${operationName}-${attempt}`,
              message: `${operationName} failed (${err?.message || 'Server error'}). Retrying in ${sec}s...`,
              type: 'retry',
              countdown: sec,
              attempt,
              maxAttempts,
            });
            await new Promise((r) => setTimeout(r, 1000));
          }
          attempt++;
        } else {
          setSyncStatusToast({
            id: `${operationName}-failed`,
            message: `Sync Failed: ${err?.message || 'Server error'}. Reverting changes on UI.`,
            type: 'error',
          });

          setTimeout(() => {
            onRollback();
            setSyncStatusToast(null);
          }, 3500);

          return false;
        }
      }
    }
    return false;
  };

  // Timed Undo Toast State
  const [pendingUndo, setPendingUndo] = useState<PendingDeletion | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Media Drawer State
  const [isMediaDrawerOpen, setIsMediaDrawerOpen] = useState(false);

  // Load discussions from backend API / sessionStorage / localStorage
  useEffect(() => {
    let isMounted = true;
    discussionActions
      .fetchDiscussionThreads(subjectId, classGradeId)
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setThreads(res.data);
          return;
        }
      })
      .catch(() => undefined);

    try {
      // Check sessionStorage for current tab first, then localStorage
      const sessionSaved = sessionStorage.getItem(storageKey);
      const localSaved = localStorage.getItem(storageKey);
      const saved = sessionSaved || localSaved;
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed = parsed.map((t: DiscussionThread) => ({
            ...t,
            authorName: t.authorName === 'School Administrator' ? 'Demo Admin' : t.authorName,
            replies: (t.replies || []).map((r: DiscussionReply) => ({
              ...r,
              authorName: r.authorName === 'School Administrator' ? 'Demo Admin' : r.authorName,
            })),
          }));
          if (isMounted) setThreads(parsed);
          return;
        }
      }
    } catch {
      // fallback
    }

    if (isMounted) setThreads(SAMPLE_THREADS);

    return () => {
      isMounted = false;
    };
  }, [storageKey, subjectId, classGradeId]);

  // Lightweight Persist Strategy to prevent LocalStorage Quota Bloat
  const saveThreads = (updated: DiscussionThread[]) => {
    setThreads(updated);
    try {
      // 1. Store active session data in sessionStorage
      sessionStorage.setItem(storageKey, JSON.stringify(updated.slice(0, 30)));

      // 2. Prune heavy base64 strings (>30KB) and limit items to 15 for persistent localStorage
      const lightweight = updated.slice(0, 15).map((t) => ({
        ...t,
        attachments: t.attachments?.map((a) => ({
          ...a,
          url: a.url.startsWith('data:') && a.url.length > 30000 ? '' : a.url,
        })),
        replies: t.replies?.map((r) => ({
          ...r,
          attachments: r.attachments?.map((a) => ({
            ...a,
            url: a.url.startsWith('data:') && a.url.length > 30000 ? '' : a.url,
          })),
        })),
      }));

      localStorage.setItem(storageKey, JSON.stringify(lightweight));
    } catch {
      // Ignore storage quota errors
    }
  };

  // Timed Undo Countdown Timer
  useEffect(() => {
    if (!pendingUndo) return;

    undoTimerRef.current = setInterval(() => {
      setPendingUndo((prev) => {
        if (!prev) return null;
        if (prev.countdown <= 1) {
          clearInterval(undoTimerRef.current!);
          return null;
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    return () => {
      if (undoTimerRef.current) clearInterval(undoTimerRef.current);
    };
  }, [pendingUndo?.threadId, pendingUndo?.replyId]);

  const handleExecuteUndo = () => {
    if (!pendingUndo) return;
    saveThreads(pendingUndo.previousState);
    if (pendingUndo.itemType === 'thread') {
      discussionActions.undoDeleteDiscussionThread(pendingUndo.threadId).catch(() => undefined);
    } else if (pendingUndo.replyId) {
      discussionActions
        .undoDeleteDiscussionReply(pendingUndo.threadId, pendingUndo.replyId)
        .catch(() => undefined);
    }
    setPendingUndo(null);
  };

  // Audio Recording Handlers (with Cloudinary auto-upload)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const localAudioUrl = URL.createObjectURL(audioBlob);
        const vnId = `vn-${Date.now()}`;
        const duration = recordingDuration || 3;

        setPendingVoiceNote({
          id: vnId,
          url: localAudioUrl,
          durationSeconds: duration,
          isUploading: true,
        });

        stream.getTracks().forEach((track) => track.stop());

        // Upload voice note directly to Cloudinary
        const res = await uploadToCloudinary(audioBlob, `${vnId}.webm`, 'schoolog_discussions/voicenotes');
        if (res?.url) {
          setPendingVoiceNote({
            id: vnId,
            url: res.url,
            durationSeconds: duration,
            isUploading: false,
          });
        } else {
          setPendingVoiceNote((prev) => (prev ? { ...prev, isUploading: false } : null));
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch {
      alert('Microphone access denied or unsupported on this browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  // File Upload Handlers (with 10MB limit validation & Cloudinary auto-upload)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(
          `File "${file.name}" exceeds the maximum size limit of 10MB (${formatFileSize(file.size)}). Please attach a smaller file.`
        );
        return;
      }

      const fileId = `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const localUrl = URL.createObjectURL(file);

      const newAttachment: DiscussionAttachment = {
        id: fileId,
        name: file.name,
        url: localUrl,
        size: file.size,
        type: file.type || 'application/octet-stream',
        isUploading: true,
      };

      setPendingAttachments((prev) => [...prev, newAttachment]);

      // Upload file directly to Cloudinary
      const res = await uploadToCloudinary(file, file.name, 'schoolog_discussions/attachments');
      if (res?.url) {
        setPendingAttachments((prev) =>
          prev.map((a) => (a.id === fileId ? { ...a, url: res.url, isUploading: false } : a))
        );
      } else {
        setPendingAttachments((prev) =>
          prev.map((a) => (a.id === fileId ? { ...a, isUploading: false } : a))
        );
      }
    });
    e.target.value = '';
  };

  const removePendingAttachment = (id: string) => {
    setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Creation Handlers with Resilient Sync & UI Rollback
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const previousState = JSON.parse(JSON.stringify(threads));

    const newThread: DiscussionThread = {
      id: `thread-${Date.now()}`,
      authorId: currentUserId,
      subjectId,
      classGradeId,
      title: newTitle.trim(),
      content: newContent.trim(),
      authorName: currentAuthorName,
      authorRole: currentAuthorRole,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      attachments: pendingAttachments.length > 0 ? pendingAttachments : undefined,
      voiceNote: pendingVoiceNote || undefined,
      replies: [],
      reactions: {},
    };

    saveThreads([newThread, ...threads]);

    runResilientOperation(
      'Posting topic',
      async () => {
        const res = await discussionActions.createDiscussionThread({
          id: newThread.id,
          subjectId,
          classGradeId,
          title: newTitle.trim(),
          content: newContent.trim(),
          attachments: pendingAttachments,
          voiceNote: pendingVoiceNote || undefined,
        });
        const returnedThread = res?.data;
        if (returnedThread?.id && returnedThread.id !== newThread.id) {
          const targetId = returnedThread.id;
          setThreads((prev) =>
            prev.map((t) => (t.id === newThread.id ? { ...t, id: targetId } : t))
          );
        }
        return res;
      },
      () => saveThreads(previousState)
    );

    setNewTitle('');
    setNewContent('');
    setPendingAttachments([]);
    setPendingVoiceNote(null);
    setIsModalOpen(false);
  };

  const handleAddReply = (threadId: string) => {
    if (!replyText.trim() && pendingAttachments.length === 0 && !pendingVoiceNote) return;

    const previousState = JSON.parse(JSON.stringify(threads));

    const reply: DiscussionReply = {
      id: `reply-${Date.now()}`,
      authorId: currentUserId,
      authorName: currentAuthorName,
      authorRole: currentAuthorRole,
      content: replyText.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      attachments: pendingAttachments.length > 0 ? pendingAttachments : undefined,
      voiceNote: pendingVoiceNote || undefined,
      reactions: {},
    };

    const updated = threads.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [...t.replies, reply],
        };
      }
      return t;
    });

    saveThreads(updated);

    runResilientOperation(
      'Posting reply',
      async () => {
        const res = await discussionActions.createDiscussionReply(threadId, {
          id: reply.id,
          content: replyText.trim(),
          attachments: pendingAttachments,
          voiceNote: pendingVoiceNote || undefined,
        });
        const returnedReply = res?.data;
        if (returnedReply?.id && returnedReply.id !== reply.id) {
          const targetReplyId = returnedReply.id;
          setThreads((prev) =>
            prev.map((t) => {
              if (t.id === threadId) {
                return {
                  ...t,
                  replies: t.replies.map((r) => (r.id === reply.id ? { ...r, id: targetReplyId } : r)),
                };
              }
              return t;
            })
          );
        }
        return res;
      },
      () => saveThreads(previousState)
    );

    setReplyText('');
    setPendingAttachments([]);
    setPendingVoiceNote(null);
  };

  // Confirmed Delete Handlers with Resilient Sync & UI Rollback
  const confirmDeletion = () => {
    if (!deleteConfirmTarget) return;

    const { threadId, replyId, type, isOwner } = deleteConfirmTarget;
    const roleText: 'owner' | 'admin' = isOwner ? 'owner' : 'admin';
    const previousState = JSON.parse(JSON.stringify(threads));

    if (type === 'thread') {
      const updated = threads.map((t) => {
        if (t.id === threadId) {
          return { ...t, isDeleted: true, deletedByRole: roleText };
        }
        return t;
      });
      saveThreads(updated);

      setPendingUndo({
        threadId,
        itemType: 'thread',
        previousState,
        countdown: 6,
      });

      runResilientOperation(
        'Topic deletion',
        () => discussionActions.deleteDiscussionThread(threadId),
        () => saveThreads(previousState)
      );
    } else if (replyId) {
      const updated = threads.map((t) => {
        if (t.id === threadId) {
          const updatedReplies = t.replies.map((r) => {
            if (r.id === replyId) {
              return { ...r, isDeleted: true, deletedByRole: roleText };
            }
            return r;
          });
          return { ...t, replies: updatedReplies };
        }
        return t;
      });
      saveThreads(updated);

      setPendingUndo({
        threadId,
        replyId,
        itemType: 'reply',
        previousState,
        countdown: 6,
      });

      runResilientOperation(
        'Message deletion',
        () => discussionActions.deleteDiscussionReply(threadId, replyId),
        () => saveThreads(previousState)
      );
    }

    setDeleteConfirmTarget(null);
  };

  // Toggle Reactions
  const handleToggleReaction = (threadId: string, replyId: string | null, emoji: string) => {
    const updated = threads.map((t) => {
      if (t.id === threadId) {
        if (!replyId) {
          const currentReactions = { ...(t.reactions || {}) };
          const users = currentReactions[emoji] || [];
          const hasReacted = users.includes(currentAuthorName);
          const newUsers = hasReacted
            ? users.filter((u) => u !== currentAuthorName)
            : [...users, currentAuthorName];

          if (newUsers.length === 0) {
            delete currentReactions[emoji];
          } else {
            currentReactions[emoji] = newUsers;
          }

          return { ...t, reactions: currentReactions };
        } else {
          const updatedReplies = t.replies.map((r) => {
            if (r.id === replyId) {
              const currentReactions = { ...(r.reactions || {}) };
              const users = currentReactions[emoji] || [];
              const hasReacted = users.includes(currentAuthorName);
              const newUsers = hasReacted
                ? users.filter((u) => u !== currentAuthorName)
                : [...users, currentAuthorName];

              if (newUsers.length === 0) {
                delete currentReactions[emoji];
              } else {
                currentReactions[emoji] = newUsers;
              }

              return { ...r, reactions: currentReactions };
            }
            return r;
          });
          return { ...t, replies: updatedReplies };
        }
      }
      return t;
    });

    saveThreads(updated);
    discussionActions.toggleDiscussionReaction(threadId, replyId, emoji).catch(() => undefined);
    setActiveEmojiPicker(null);
  };

  // Toggle Audio Playback
  const togglePlayAudio = (id: string, url: string) => {
    if (playingAudioId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play().catch(() => undefined);
      setPlayingAudioId(id);
      audio.onended = () => setPlayingAudioId(null);
    }
  };

  // Gather Media & Files for Quick Media Drawer
  const allMediaItems = React.useMemo(() => {
    const items: {
      id: string;
      title: string;
      type: 'audio' | 'file';
      url: string;
      author: string;
      createdAt: string;
      size?: number;
    }[] = [];

    threads.forEach((t) => {
      if (t.isDeleted) return;
      if (t.voiceNote) {
        items.push({
          id: t.voiceNote.id,
          title: `Voice Note (${t.voiceNote.durationSeconds}s)`,
          type: 'audio',
          url: t.voiceNote.url,
          author: t.authorName,
          createdAt: t.createdAt,
        });
      }
      (t.attachments || []).forEach((att) => {
        items.push({
          id: att.id,
          title: att.name,
          type: 'file',
          url: att.url,
          author: t.authorName,
          createdAt: t.createdAt,
          size: att.size,
        });
      });

      (t.replies || []).forEach((r) => {
        if (r.isDeleted) return;
        if (r.voiceNote) {
          items.push({
            id: r.voiceNote.id,
            title: `Voice Note (${r.voiceNote.durationSeconds}s)`,
            type: 'audio',
            url: r.voiceNote.url,
            author: r.authorName,
            createdAt: r.createdAt,
          });
        }
        (r.attachments || []).forEach((att) => {
          items.push({
            id: att.id,
            title: att.name,
            type: 'file',
            url: att.url,
            author: r.authorName,
            createdAt: r.createdAt,
            size: att.size,
          });
        });
      });
    });

    return items;
  }, [threads]);

  const filteredThreads = threads.filter(
    (t) =>
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pre-Send Attachment Preview Component
  const renderPreSendPreviewBox = () => {
    if (pendingAttachments.length === 0 && !pendingVoiceNote && !isRecording) return null;

    return (
      <div className="p-3 bg-gray-50/90 border border-gray-200/80 rounded-2xl space-y-3 shadow-xs">
        {/* Animated Recording Waveform Bar */}
        {isRecording && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping flex-shrink-0" />
              {/* Equalizer Wave Bars */}
              <div className="flex items-center gap-1 h-5">
                <span className="w-1 bg-red-500 rounded-full h-3 animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-1 bg-red-500 rounded-full h-5 animate-[pulse_0.4s_ease-in-out_infinite]" />
                <span className="w-1 bg-red-500 rounded-full h-2.5 animate-[pulse_0.7s_ease-in-out_infinite]" />
                <span className="w-1 bg-red-500 rounded-full h-4 animate-[pulse_0.5s_ease-in-out_infinite]" />
                <span className="w-1 bg-red-500 rounded-full h-3 animate-[pulse_0.8s_ease-in-out_infinite]" />
              </div>
              <span className="font-semibold text-xs">Recording Voice Note... ({recordingDuration}s)</span>
            </div>
            <button
              type="button"
              onClick={stopRecording}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          </div>
        )}

        {/* Pre-Send Voice Note Preview Player */}
        {pendingVoiceNote && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => togglePlayAudio('pending-vn', pendingVoiceNote.url)}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
              >
                {playingAudioId === 'pending-vn' ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Waveform Equalizer visualizer */}
              <div className="flex items-center gap-1 h-5 px-1">
                <span
                  className={cn(
                    'w-0.5 bg-primary/70 rounded-full transition-all',
                    playingAudioId === 'pending-vn' ? 'h-4 animate-pulse' : 'h-2'
                  )}
                />
                <span
                  className={cn(
                    'w-0.5 bg-primary/70 rounded-full transition-all',
                    playingAudioId === 'pending-vn' ? 'h-5 animate-pulse' : 'h-4'
                  )}
                />
                <span
                  className={cn(
                    'w-0.5 bg-primary/70 rounded-full transition-all',
                    playingAudioId === 'pending-vn' ? 'h-3 animate-pulse' : 'h-1.5'
                  )}
                />
                <span
                  className={cn(
                    'w-0.5 bg-primary/70 rounded-full transition-all',
                    playingAudioId === 'pending-vn' ? 'h-4.5 animate-pulse' : 'h-3'
                  )}
                />
              </div>

              <div>
                <span className="font-semibold text-gray-900 block">Voice Note Recorded</span>
                <span className="text-[11px] text-gray-500">Duration: {pendingVoiceNote.durationSeconds}s</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPendingVoiceNote(null)}
              className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove voice note"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pre-Send File Attachment Cards Grid */}
        {pendingAttachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pendingAttachments.map((att) => {
              const isImg = isImageAttachment(att);
              return (
                <div
                  key={att.id}
                  className="relative p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isImg ? (
                      <div className="relative group/thumb">
                        <img
                          src={att.url}
                          alt={att.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setLightboxImageUrl(att.url)}
                        />
                        <div
                          onClick={() => setLightboxImageUrl(att.url)}
                          className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate" title={att.name}>
                        {att.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {formatFileSize(att.size)} <span className="text-gray-300">&bull;</span>{' '}
                        <span className="text-emerald-600 font-medium">Max 10MB</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removePendingAttachment(att.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                    title="Remove attachment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render Attachments List for Posted Messages (Threads & Replies)
  const renderPostedAttachments = (attachments?: DiscussionAttachment[]) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-3">
        {attachments.map((att) => {
          const isImg = isImageAttachment(att);
          if (isImg) {
            return (
              <div
                key={att.id}
                className="group relative inline-block rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xs transition-all hover:shadow-md max-w-xs"
              >
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setLightboxImageUrl(att.url)}>
                  <img
                    src={att.url}
                    alt={att.name}
                    className="max-h-48 w-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs gap-1.5">
                    <Maximize2 className="w-4 h-4" />
                    <span>Expand</span>
                  </div>
                </div>
                <div className="p-2 bg-white border-t border-gray-100 flex items-center justify-between text-xs gap-2">
                  <span className="truncate text-gray-700 font-medium text-[11px]" title={att.name}>
                    {att.name}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] text-gray-400">{formatFileSize(att.size)}</span>
                    <a
                      href={att.url}
                      download={att.name}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-gray-400 hover:text-primary rounded transition-colors"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <a
              key={att.id}
              href={att.url}
              target="_blank"
              download={att.name}
              rel="noreferrer"
              className="inline-flex items-center gap-2 p-2.5 px-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all shadow-2xs"
            >
              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="truncate max-w-[160px] font-semibold">{att.name}</span>
              <span className="text-gray-400 text-[11px]">({formatFileSize(att.size)})</span>
              <Download className="w-3.5 h-3.5 text-gray-400 hover:text-primary ml-1" />
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full relative">
      {/* Header bar when threads exist */}
      {threads.length > 0 && (
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className={cn('text-base text-gray-900 font-semibold', poppins_600.className)}>
              Discussion Topics ({filteredThreads.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {allMediaItems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsMediaDrawerOpen(true)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-primary" />
                <span>Media & Files ({allMediaItems.length})</span>
              </button>
            )}

            <Button
              type="button"
              round
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-sm flex items-center gap-2"
            >
              <AdditionIcon color="currentColor" className="w-4 h-4" />
              Start Discussion
            </Button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Empty
            icon={<Message color={theme.primary} size="64" />}
            title="No discussions started yet"
            description="Start a topic or ask a question to begin a discussion with students and teachers."
          />
          <Button
            type="button"
            round
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3 rounded-full flex items-center gap-2"
          >
            <AdditionIcon color="currentColor" className="w-4 h-4" />
            Start a Discussion
          </Button>
        </div>
      ) : filteredThreads.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p className={cn('text-sm', poppins_400.className)}>
            No discussion topics found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      ) : (
        /* Threads List */
        <div className="space-y-4">
          {filteredThreads.map((thread) => {
            const isExpanded = activeThreadId === thread.id;
            const isThreadOwner =
              thread.authorId === currentUserId ||
              thread.authorName === currentAuthorName;
            const canDeleteThread = isThreadOwner || isSchoolAdmin;

            // Render Deleted Thread Tombstone
            if (thread.isDeleted) {
              const deletedLabel =
                thread.deletedByRole === 'owner'
                  ? 'owner deleted the thread'
                  : 'admin deleted thread';

              return (
                <div
                  key={thread.id}
                  className="bg-gray-50/80 border border-dashed border-gray-300 rounded-2xl p-4 text-center text-xs text-gray-500 italic shadow-xs flex items-center justify-between"
                >
                  <span className="font-medium">{deletedLabel}</span>
                  <span className="text-[11px] text-gray-400 not-italic">{thread.createdAt}</span>
                </div>
              );
            }

            return (
              <div
                key={thread.id}
                className="bg-white border border-gray-200/80 hover:border-primary/30 rounded-2xl p-5 transition-all shadow-xs"
              >
                {/* Thread Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <UserAvatar name={thread.authorName} size={42} />
                    <div>
                      <h4 className={cn('text-base text-gray-900 font-semibold', poppins_600.className)}>
                        {thread.title}
                      </h4>
                      <p className={cn('text-xs text-gray-500 mt-0.5', poppins_400.className)}>
                        By <span className="font-medium text-gray-700">{thread.authorName}</span> &bull; {thread.createdAt}
                      </p>
                    </div>
                  </div>

                  {canDeleteThread && (
                    <button
                      type="button"
                      title={isThreadOwner ? 'Delete your thread' : 'Admin delete thread'}
                      onClick={() =>
                        setDeleteConfirmTarget({
                          threadId: thread.id,
                          type: 'thread',
                          isOwner: isThreadOwner,
                        })
                      }
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Thread Content */}
                <p className={cn('text-sm text-gray-700 mt-3 whitespace-pre-wrap', poppins_400.className)}>
                  {thread.content}
                </p>

                {/* Thread Posted Attachments */}
                {renderPostedAttachments(thread.attachments)}

                {/* Thread Voice Note */}
                {thread.voiceNote && (
                  <div className="mt-3 inline-flex items-center gap-3 p-2.5 px-4 rounded-full bg-primary/5 border border-primary/20 text-xs text-gray-800 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => togglePlayAudio(thread.voiceNote!.id, thread.voiceNote!.url)}
                      className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      {playingAudioId === thread.voiceNote.id ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                    <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                    <span className="font-semibold text-gray-900">Voice Note</span>
                    <span className="text-gray-500">({thread.voiceNote.durationSeconds}s)</span>
                  </div>
                )}

                {/* Thread Reactions Bar */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setActiveThreadId(isExpanded ? null : thread.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer mr-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {thread.replies.length === 0
                          ? 'Reply'
                          : `${thread.replies.length} ${thread.replies.length === 1 ? 'Reply' : 'Replies'}`}
                      </span>
                    </button>

                    {/* Active Emoji Reaction Badges */}
                    {Object.entries(thread.reactions || {}).map(([emoji, users]) => {
                      if (!users || users.length === 0) return null;
                      const hasReacted = users.includes(currentAuthorName);
                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleToggleReaction(thread.id, null, emoji)}
                          className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border cursor-pointer',
                            hasReacted
                              ? 'bg-primary/10 border-primary/30 text-primary font-semibold'
                              : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                          )}
                          title={`${users.join(', ')} reacted`}
                        >
                          <span>{emoji}</span>
                          <span>{users.length}</span>
                        </button>
                      );
                    })}

                    {/* Reaction Picker Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveEmojiPicker(
                            activeEmojiPicker === `thread-${thread.id}`
                              ? null
                              : `thread-${thread.id}`
                          )
                        }
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        title="Add reaction"
                      >
                        <Smile className="w-4 h-4" />
                      </button>

                      {/* Emoji Selector Popover */}
                      {activeEmojiPicker === `thread-${thread.id}` && (
                        <div className="absolute left-0 bottom-7 z-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-lg flex items-center gap-1 animate-fadeIn">
                          {EMOJI_OPTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleToggleReaction(thread.id, null, emoji)}
                              className="w-7 h-7 flex items-center justify-center text-base hover:bg-gray-100 rounded-full transition-transform hover:scale-125 cursor-pointer"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Replies Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 bg-gray-50/60 p-4 rounded-xl">
                    {thread.replies.map((reply) => {
                      const isReplyOwner =
                        reply.authorId === currentUserId ||
                        reply.authorName === currentAuthorName;
                      const canDeleteReply = isReplyOwner || isSchoolAdmin;

                      // Render Deleted Reply Tombstone
                      if (reply.isDeleted) {
                        const deletedReplyLabel =
                          reply.deletedByRole === 'owner'
                            ? 'owner deleted the message'
                            : 'admin deleted message';

                        return (
                          <div
                            key={reply.id}
                            className="flex gap-3 items-center ml-7 bg-gray-100/70 border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 italic"
                          >
                            <CornerDownRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="font-medium">{deletedReplyLabel}</span>
                            <span className="ml-auto text-[11px] text-gray-400 not-italic">{reply.createdAt}</span>
                          </div>
                        );
                      }

                      return (
                        <div key={reply.id} className="flex gap-3 items-start group">
                          <CornerDownRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                          <UserAvatar name={reply.authorName} size={32} />
                          <div className="bg-white border border-gray-200/60 rounded-xl p-3 flex-1 text-sm shadow-2xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-gray-900 text-xs">{reply.authorName}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-400">{reply.createdAt}</span>
                                {canDeleteReply && (
                                  <button
                                    type="button"
                                    title={isReplyOwner ? 'Delete your message' : 'Admin delete message'}
                                    onClick={() =>
                                      setDeleteConfirmTarget({
                                        threadId: thread.id,
                                        replyId: reply.id,
                                        type: 'reply',
                                        isOwner: isReplyOwner,
                                      })
                                    }
                                    className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {reply.content && <p className="text-gray-700 text-xs">{reply.content}</p>}

                            {/* Reply Posted Attachments */}
                            {renderPostedAttachments(reply.attachments)}

                            {/* Reply Voice Note */}
                            {reply.voiceNote && (
                              <div className="mt-2 inline-flex items-center gap-2.5 p-1.5 px-3 rounded-full bg-primary/5 border border-primary/20 text-xs text-gray-800 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => togglePlayAudio(reply.voiceNote!.id, reply.voiceNote!.url)}
                                  className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
                                >
                                  {playingAudioId === reply.voiceNote.id ? (
                                    <Pause className="w-3 h-3 fill-current" />
                                  ) : (
                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                  )}
                                </button>
                                <span className="font-medium text-[11px] text-gray-900">Voice Note ({reply.voiceNote.durationSeconds}s)</span>
                              </div>
                            )}

                            {/* Reply Reactions */}
                            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                              {Object.entries(reply.reactions || {}).map(([emoji, users]) => {
                                if (!users || users.length === 0) return null;
                                const hasReacted = users.includes(currentAuthorName);
                                return (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => handleToggleReaction(thread.id, reply.id, emoji)}
                                    className={cn(
                                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors border cursor-pointer',
                                      hasReacted
                                        ? 'bg-primary/10 border-primary/30 text-primary font-semibold'
                                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                                    )}
                                    title={`${users.join(', ')} reacted`}
                                  >
                                    <span>{emoji}</span>
                                    <span>{users.length}</span>
                                  </button>
                                );
                              })}

                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveEmojiPicker(
                                      activeEmojiPicker === `reply-${reply.id}`
                                        ? null
                                        : `reply-${reply.id}`
                                    )
                                  }
                                  className="p-0.5 text-gray-400 hover:text-gray-600 rounded-full transition-colors cursor-pointer"
                                  title="Add reaction"
                                >
                                  <Smile className="w-3.5 h-3.5" />
                                </button>

                                {activeEmojiPicker === `reply-${reply.id}` && (
                                  <div className="absolute left-0 bottom-6 z-20 bg-white border border-gray-200 rounded-full p-1 shadow-lg flex items-center gap-1 animate-fadeIn">
                                    {EMOJI_OPTIONS.map((emoji) => (
                                      <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => handleToggleReaction(thread.id, reply.id, emoji)}
                                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-100 rounded-full transition-transform hover:scale-125 cursor-pointer"
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Pre-Send Previews inside Reply Box */}
                    {renderPreSendPreviewBox()}

                    {/* Reply Input Form */}
                    <div className="flex gap-2 items-center mt-3 pt-2">
                      <label title="Attach file (Max 10MB)" className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                        <Paperclip className="w-4 h-4" />
                        <input type="file" multiple className="hidden" onChange={handleFileSelect} />
                      </label>

                      <button
                        type="button"
                        title={isRecording ? 'Stop Recording' : 'Record Voice Note'}
                        onClick={isRecording ? stopRecording : startRecording}
                        className={cn(
                          'p-2 rounded-full transition-colors cursor-pointer',
                          isRecording ? 'text-red-600 bg-red-50 animate-pulse' : 'text-gray-400 hover:text-primary hover:bg-gray-100'
                        )}
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(thread.id);
                        }}
                        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                      <Button
                        type="button"
                        round
                        onClick={() => handleAddReply(thread.id)}
                        className="px-4 py-2 rounded-full text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Timed Undo Toast */}
      {pendingUndo && (
        <div
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-fadeIn border border-gray-700/50"
          style={{ backgroundColor: '#1E293B' }}
        >
          <span className="text-xs sm:text-sm font-semibold text-white">
            {pendingUndo.itemType === 'thread' ? 'Topic deleted' : 'Message deleted'} ({pendingUndo.countdown}s)
          </span>
          <button
            type="button"
            onClick={handleExecuteUndo}
            className="px-3.5 py-1.5 bg-primary text-white rounded-full text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border border-white/20 hover:scale-105"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Undo</span>
          </button>
        </div>
      )}

      {/* Resilient Sync Status Toast with Retry Countdown & Rollback Alert */}
      {syncStatusToast && (
        <div
          className={cn(
            'fixed bottom-6 left-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border text-xs sm:text-sm font-semibold transition-all',
            syncStatusToast.type === 'error'
              ? 'bg-red-950 border-red-700 text-red-100'
              : 'bg-slate-900 border-slate-700 text-white'
          )}
        >
          {syncStatusToast.type === 'retry' ? (
            <RotateCcw className="w-4 h-4 text-amber-400 animate-spin flex-shrink-0" />
          ) : (
            <X className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
          <span>{syncStatusToast.message}</span>
          {syncStatusToast.attempt && (
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-normal text-gray-300 flex-shrink-0">
              Attempt {syncStatusToast.attempt}/{syncStatusToast.maxAttempts}
            </span>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center space-y-4 animate-scaleUp">
            <div className="flex justify-center text-red-500">
              <DeleteModalIcon />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete {deleteConfirmTarget.type === 'thread' ? 'Discussion Topic' : 'Message'}?
              </h3>
              <p className="text-xs text-gray-500 mt-1.5">
                Are you sure you want to delete this {deleteConfirmTarget.type}? A placeholder tombstone will be shown.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-3 w-full">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="h-[44px] flex-1 min-w-[130px] rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletion}
                className="h-[44px] flex-1 min-w-[130px] rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full Image View */}
      {lightboxImageUrl &&
        typeof window !== 'undefined' &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setLightboxImageUrl(null)}
                className="absolute -top-12 right-0 p-2.5 text-white hover:text-gray-300 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                title="Close image preview"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={lightboxImageUrl}
                alt="Image Preview"
                className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>,
          document.body
        )}

      {/* Quick Media & Files Drawer */}
      {isMediaDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between animate-slideInRight">
            <div>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-gray-900">Discussion Media & Files</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMediaDrawerOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {allMediaItems.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-8">No shared files or voice notes yet.</p>
              ) : (
                <div className="space-y-3">
                  {allMediaItems.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.type === 'audio' ? (
                          <button
                            type="button"
                            onClick={() => togglePlayAudio(item.id, item.url)}
                            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 cursor-pointer"
                          >
                            {playingAudioId === item.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </button>
                        ) : (
                          <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                          <p className="text-[11px] text-gray-400">By {item.author} &bull; {item.createdAt}</p>
                        </div>
                      </div>

                      <a
                        href={item.url}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-lg transition-colors flex-shrink-0"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="button"
              round
              onClick={() => setIsMediaDrawerOpen(false)}
              className="mt-6 w-full py-2.5 text-xs"
            >
              Close Drawer
            </Button>
          </div>
        </div>
      )}

      {/* Start Discussion Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Start Discussion ${subjectTitle ? `- ${subjectTitle}` : ''}`}
      >
        <form onSubmit={handleCreateThread} className="space-y-4 py-2">
          <div>
            <label className={cn('block text-xs text-gray-700 font-medium mb-1.5', poppins_500.className)}>
              Topic Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Question on Chapter 2 Homework"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className={cn('block text-xs text-gray-700 font-medium mb-1.5', poppins_500.className)}>
              Discussion Details / Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide context or questions to discuss..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Attachments & Voice Note trigger buttons in Modal */}
          <div className="flex items-center gap-3 flex-wrap">
            <label title="Attach files (Max 10MB)" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Paperclip className="w-3.5 h-3.5 text-primary" />
              <span>Attach Files</span>
              <span className="text-[10px] text-gray-400 font-normal">(Max 10MB)</span>
              <input type="file" multiple className="hidden" onChange={handleFileSelect} />
            </label>

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer',
                isRecording ? 'border-red-500 text-red-600 bg-red-50 animate-pulse' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              )}
            >
              <Mic className="w-3.5 h-3.5 text-primary" />
              <span>{isRecording ? `Recording (${recordingDuration}s)...` : 'Record Voice Note'}</span>
            </button>
          </div>

          {/* Pending Previews in Modal */}
          {renderPreSendPreviewBox()}

          <div className="flex justify-end items-center gap-3 pt-4 w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="h-[44px] px-6 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <Button type="submit" round className="h-[44px] px-8 text-sm font-medium rounded-full">
              Post Discussion
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
