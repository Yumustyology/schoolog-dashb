'use client';
// components/Modal.tsx
import React from 'react';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import { OrangeCheckBadgeIcon } from '../atoms/icons/Icons';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '../atoms/form/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title: string;
  submit: () => void;
  body: string;
}

const YNmodal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  submit,
  body,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center  justify-center z-50 w-full ">
      <div className="bg-white rounded-lg tablet:w-[434px]   xxs:w-full shadow-lg">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8 "
          >
            <Cancel />
          </Button>
        </div>

        <main className="flex flex-col items-center justify-center text-center px-6 ">
          <div className="mb-4">
            <OrangeCheckBadgeIcon />
          </div>
          <h4 className={cn('text-base text-black mb-3 ', Inter_500.className)}>
            {' '}
            {title}
          </h4>
          <p className={cn('text-sm text-[#434343] mx-8', Inter_400.className)}>
            {body}
          </p>
        </main>
        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 ">
          <Button
            onClick={onClose}
            round
            className={cn(
              'bg-transparent border text-primary text-base border-primary h-[44px] w-[185px]',
              Inter_500.className
            )}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            round
            className={cn(
              'text-base bg-primary text-white h-[44px] w-[185px]',
              Inter_500.className
            )}
          >
            {' '}
            Submit{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YNmodal;
