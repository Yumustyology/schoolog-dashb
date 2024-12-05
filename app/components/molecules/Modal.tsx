// components/Modal.tsx
import React from 'react';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import { cn } from '@/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center p-6 justify-center z-50 w-full ">
      <div className="bg-white p-6 rounded-lg desktop:w-1/3 tablet:w-2/3  xxs:w-full shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className={cn('text-lg', Inter_500.className)}> {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full"
          >
            <Cancel />
          </button>
        </div>
        <div className="border-b border-gray4"></div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
