'use client';

import React, { useState, useEffect } from 'react';
import Empty from '@/components/molecules/empty/Empty';
import Message from '@/components/atoms/icons/SideBar/Message';
import Button from '@/components/atoms/form/Button';
import UserAvatar from '@/components/atoms/UserAvatar';
import Modal from '@/components/molecules/Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { Send, MessageSquare, Plus, CornerDownRight } from 'lucide-react';
import { theme } from '@/app/lib/config/theme.config';

export type DiscussionReply = {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
};

export type DiscussionThread = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  createdAt: string;
  replies: DiscussionReply[];
};

export interface DiscussionProps {
  subjectId?: string;
  classGradeId?: string;
  subjectTitle?: string;
  searchQuery?: string;
}

export default function Discussion({
  subjectId,
  classGradeId,
  subjectTitle,
  searchQuery = '',
}: DiscussionProps) {
  const storageKey = `schoolog:discussions:${subjectId || 'default'}:${classGradeId || 'default'}`;

  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Load persisted discussions for this subject/class
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setThreads(JSON.parse(saved));
      } else {
        setThreads([]);
      }
    } catch {
      setThreads([]);
    }
  }, [storageKey]);

  // Persist discussions when updated
  const saveThreads = (updated: DiscussionThread[]) => {
    setThreads(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: DiscussionThread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      authorName: 'School Administrator',
      authorRole: 'Teacher / Staff',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      replies: [],
    };

    saveThreads([newThread, ...threads]);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
  };

  const handleAddReply = (threadId: string) => {
    if (!replyText.trim()) return;

    const updated = threads.map((t) => {
      if (t.id === threadId) {
        const reply: DiscussionReply = {
          id: `reply-${Date.now()}`,
          authorName: 'School Administrator',
          authorRole: 'Teacher',
          content: replyText.trim(),
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        return {
          ...t,
          replies: [...t.replies, reply],
        };
      }
      return t;
    });

    saveThreads(updated);
    setReplyText('');
  };

  const filteredThreads = threads.filter(
    (t) =>
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Action Header bar when threads exist */}
      {threads.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className={cn('text-base text-gray-900 font-semibold', poppins_600.className)}>
              Discussion Topics ({filteredThreads.length})
            </span>
          </div>
          <Button
            type="button"
            round
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-full text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Start Discussion
          </Button>
        </div>
      )}

      {/* Empty state */}
      {threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Empty
            icon={<Message color={theme.primary} size="72" />}
            title="No discussions started yet"
            description="Start a topic or ask a question to begin a discussion with students and teachers."
          />
          <Button
            type="button"
            round
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3 rounded-full flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
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
            return (
              <div
                key={thread.id}
                className="bg-white border border-gray-200/80 hover:border-primary/30 rounded-2xl p-5 transition-all shadow-xs"
              >
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
                </div>

                <p className={cn('text-sm text-gray-700 mt-3 whitespace-pre-wrap', poppins_400.className)}>
                  {thread.content}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveThreadId(isExpanded ? null : thread.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {thread.replies.length === 0
                        ? 'Reply'
                        : `${thread.replies.length} ${thread.replies.length === 1 ? 'Reply' : 'Replies'}`}
                    </span>
                  </button>
                </div>

                {/* Replies section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 bg-gray-50/60 p-4 rounded-xl">
                    {thread.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3 items-start">
                        <CornerDownRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <UserAvatar name={reply.authorName} size={32} />
                        <div className="bg-white border border-gray-200/60 rounded-xl p-3 flex-1 text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-900 text-xs">{reply.authorName}</span>
                            <span className="text-[11px] text-gray-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-gray-700 text-xs">{reply.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* Reply Input Form */}
                    <div className="flex gap-2 items-center mt-3 pt-2">
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

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              round
              flat
              outlined
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 text-sm rounded-full"
            >
              Cancel
            </Button>
            <Button type="submit" round className="px-6 py-2 text-sm rounded-full">
              Post Discussion
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
