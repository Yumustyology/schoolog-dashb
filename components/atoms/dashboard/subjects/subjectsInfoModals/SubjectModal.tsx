'use client';
import React from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Cancel from '@/components/atoms/icons/ModalIcons/Cancel';
import { Archived, Unarchived } from '@/app/lib/entities/subject.entity';

const SubjectModal = ({
  open,
  close,
  type,
  title,
  content,
  icon,
}: {
  open: boolean;
  close?: () => void;
  type: 'delete' | 'archive' | 'unarchive';
  title: string;
  content: string;
  icon: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full p-4">
      <div className="bg-white rounded-2xl tablet:w-[434px] xxs:w-full shadow-lg overflow-hidden">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={close}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>
        <div className="flex items-center justify-center mb-4 [&_svg]:w-16 [&_svg]:h-16">{icon}</div>

        <main className="flex flex-col items-center justify-center text-center px-6">
          <h3 className={cn('text-lg mb-2 text-black font-semibold', Inter_500.className)}>
            {title}
          </h3>
          <p
            className={cn(
              'text-sm text-gray-500 text-center px-4',
              Inter_400.className
            )}
          >
            {content}
          </p>
        </main>

        {type === 'delete' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-6">
            <button
              type="button"
              onClick={close}
              className={cn(
                'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer',
                Inter_500.className
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(
                'text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer shadow-sm',
                Inter_500.className
              )}
            >
              Delete
            </button>
          </div>
        )}

        {type === 'archive' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-6">
            <button
              type="button"
              onClick={close}
              className={cn(
                'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer',
                Inter_500.className
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(
                'text-sm font-semibold bg-[#F2994A] hover:bg-[#e0883b] text-white rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer shadow-sm',
                Inter_500.className
              )}
              onClick={() => {
                Archived;
              }}
            >
              Archive Subject
            </button>
          </div>
        )}

        {type === 'unarchive' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-6">
            <button
              type="button"
              onClick={close}
              className={cn(
                'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer',
                Inter_500.className
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(
                'text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-full h-[44px] flex-1 min-w-[140px] transition-colors cursor-pointer shadow-sm',
                Inter_500.className
              )}
              onClick={() => {
                Unarchived;
              }}
            >
              Unarchive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectModal;
