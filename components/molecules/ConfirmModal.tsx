'use client';
import React from 'react';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import Button from '../atoms/form/Button';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';

interface ConfirmModalProps {
  open: boolean;
  close?: () => void;
  title: string;
  body: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  close,
  title,
  body,
  icon,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmClassName = 'bg-r text-white',
  isLoading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full p-4">
      <div className="bg-white rounded-2xl tablet:w-[434px] xxs:w-full shadow-lg overflow-hidden">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={close}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>
        {icon && (
          <div className="flex items-center justify-center mb-4 [&_svg]:w-16 [&_svg]:h-16">{icon}</div>
        )}

        <main className="flex flex-col items-center justify-center text-center px-6">
          <h3
            className={cn('text-lg mb-2 text-black font-semibold', Inter_500.className)}
          >
            {title}
          </h3>
          <p
            className={cn(
              'text-sm text-gray-500 text-center px-4',
              Inter_400.className
            )}
          >
            {body}
          </p>
        </main>

        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-6">
          <Button
            onClick={close}
            disabled={isLoading}
            round
            className={cn(
              'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 text-base h-[44px] w-[185px]',
              Inter_500.className
            )}
          >
            {cancelText}
          </Button>
          <Button
            round
            disabled={isLoading}
            className={cn(
              'text-base h-[44px] w-[185px]',
              confirmClassName,
              Inter_500.className
            )}
            loading={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? 'Loading...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
