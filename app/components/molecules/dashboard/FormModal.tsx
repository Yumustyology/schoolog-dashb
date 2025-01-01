'use client';
// components/Modal.tsx
import React from 'react';

import { cn } from '@/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '../../atoms/form/Button';
import Cancel from '../../atoms/icons/ModalIcons/Cancel';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title: string;
  body?: string;
}

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  body,
}) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center  justify-center z-50 w-full ">
      <div className="bg-white rounded-lg tablet:w-[550px]   xxs:w-full shadow-lg">
        <div className="flex justify-between items-center mb-2 px-8 py-2">
          <h2 className={cn('text-lg ', Inter_500.className)}> {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full"
          >
            <Cancel />
          </button>
        </div>
        <div className="border-b border-gray4"></div>

        <main className="px-8 py-6 max-h-[400px] overflow-scroll">
          {children}
        </main>
        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4 px-8  ">
          <Button
            round
            wide
            className={cn(
              'bg-transparent border text-primary w-full text-xl border-primary h-[44px]',
              Inter_500.className
            )}
          >
            {' '}
            Back{' '}
          </Button>
          <Button
            round
            wide
            className={cn(
              'text-xl bg-primary text-white h-[44px] ',
              Inter_500.className
            )}
          >
            {' '}
            Proceed{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;

function Checked() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#F2994A" fillOpacity="0.08" />
      <path
        d="M28.708 22.208C28.801 22.115 28.8747 22.0046 28.925 21.8832C28.9754 21.7617 29.0013 21.6315 29.0013 21.5C29.0013 21.3685 28.9754 21.2383 28.925 21.1168C28.8747 20.9954 28.801 20.885 28.708 20.792C28.615 20.699 28.5046 20.6253 28.3832 20.575C28.2617 20.5246 28.1315 20.4987 28 20.4987C27.8685 20.4987 27.7383 20.5246 27.6168 20.575C27.4954 20.6253 27.385 20.699 27.292 20.792L23 25.086L20.708 22.792C20.615 22.699 20.5046 22.6253 20.3832 22.575C20.2617 22.5246 20.1315 22.4987 20 22.4987C19.8685 22.4987 19.7383 22.5246 19.6168 22.575C19.4954 22.6253 19.385 22.699 19.292 22.792C19.199 22.885 19.1253 22.9954 19.075 23.1168C19.0246 23.2383 18.9987 23.3685 18.9987 23.5C18.9987 23.6315 19.0246 23.7617 19.075 23.8832C19.1253 24.0046 19.199 24.115 19.292 24.208L22.292 27.208C22.3849 27.3011 22.4952 27.375 22.6167 27.4254C22.7382 27.4758 22.8685 27.5018 23 27.5018C23.1315 27.5018 23.2618 27.4758 23.3833 27.4254C23.5048 27.375 23.6151 27.3011 23.708 27.208L28.708 22.208ZM24 14C21.3478 14 18.8043 15.0536 16.9289 16.9289C15.0536 18.8043 14 21.3478 14 24C14 26.6522 15.0536 29.1957 16.9289 31.0711C18.8043 32.9464 21.3478 34 24 34C26.6522 34 29.1957 32.9464 31.0711 31.0711C32.9464 29.1957 34 26.6522 34 24C34 21.3478 32.9464 18.8043 31.0711 16.9289C29.1957 15.0536 26.6522 14 24 14ZM16 24C16 21.8783 16.8429 19.8434 18.3431 18.3431C19.8434 16.8429 21.8783 16 24 16C26.1217 16 28.1566 16.8429 29.6569 18.3431C31.1571 19.8434 32 21.8783 32 24C32 26.1217 31.1571 28.1566 29.6569 29.6569C28.1566 31.1571 26.1217 32 24 32C21.8783 32 19.8434 31.1571 18.3431 29.6569C16.8429 28.1566 16 26.1217 16 24Z"
        fill="#F2994A"
      />
    </svg>
  );
}
