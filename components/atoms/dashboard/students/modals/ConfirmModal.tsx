'use client';
import React from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Cancel from '@/components/atoms/icons/ModalIcons/Cancel';

const ConfirmModal = ({
  open,
  close,
  title,
  content,
  btnText,
  icon,
}: {
  open: boolean;
  close?: () => void;
  title: string;
  content: string;
  btnText: string;
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

        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-6">
          <Button
            onClick={close}
            round
            className={cn(
              'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 text-base h-[44px] w-[185px]',
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
          >
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
