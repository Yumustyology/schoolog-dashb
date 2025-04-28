'use client';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center p-6 justify-center z-50 w-full ">
      <div className="bg-white rounded-xl tablet:w-[434px] xxs:w-full shadow-lg">
        <div className="flex justify-between items-center pl-8 pr-4 py-4">
          <h2 className={cn('text-lg ', Inter_500.className)}> {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full"
          >
            <Cancel />
          </button>
        </div>
        <div className="border-b border-gray4"></div>
        <div className="p-6 max-h-[80vh] overflow-auto">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
