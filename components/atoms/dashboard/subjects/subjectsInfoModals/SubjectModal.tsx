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
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg tablet:w-[434px] xxs:w-full shadow-lg">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={close}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>
        <div className="flex items-center justify-center mb-4">{icon}</div>

        <main className="flex flex-col items-center justify-center text-center px-6">
          {/* Add modal content here */}
          <h3 className={cn('text-base mb-4 text-black', Inter_500.className)}>
            {title}
          </h3>
          <p
            className={cn(
              'text-sm text-gray9 text-center px-9',
              Inter_400.className
            )}
          >
            {content}
          </p>
        </main>

        {type === 'delete' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
            <Button
              onClick={close}
              round
              className={cn(
                'bg-transparent border text-primary text-base border-primary h-[44px] w-[185px]',
                Inter_500.className
              )}
            >
              Cancel
            </Button>
            <Button
              round
              className={cn(
                'text-base bg-r text-white h-[44px] w-[185px]',
                Inter_500.className
              )}
            >
              Delete
            </Button>
          </div>
        )}

        {type === 'archive' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
            <Button
              onClick={close}
              round
              className={cn(
                'bg-transparent border text-primary text-base border-primary h-[44px] w-[185px]',
                Inter_500.className
              )}
            >
              Cancel
            </Button>
            <Button
              round
              className={cn(
                'text-base bg-r text-white h-[44px] w-[185px]',
                Inter_500.className
              )}
              onClick={() => {
                Archived;
              }}
            >
              Archive Subject
            </Button>
          </div>
        )}

        {type === 'unarchive' && (
          <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
            <Button
              onClick={close}
              round
              className={cn(
                'bg-transparent border text-primary text-base border-primary h-[44px] w-[185px]',
                Inter_500.className
              )}
            >
              Cancel
            </Button>
            <Button
              round
              className={cn(
                'text-base bg-primary text-white h-[44px] w-[185px]',
                Inter_500.className
              )}
              onClick={() => {
                Unarchived;
              }}
            >
              Unarchive
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectModal;
