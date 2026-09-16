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
  className?: string; // classes for the inner content container
  overlayClassName?: string; // classes for the overlay/backdrop
  footer?: React.ReactNode;
  minHeight?: string; // minimum height for the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, className, overlayClassName, footer, minHeight }) => {
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
    <div className={cn('fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center p-6 justify-center z-50 w-full', overlayClassName)}>
      <div 
        className={cn('bg-white rounded-2xl max-w-lg w-full shadow-xl flex flex-col max-h-[90vh] overflow-hidden', className)}
        style={minHeight ? { minHeight } : undefined}
      >
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

        {/* Body: scrollable */}
        <div className="p-6 overflow-auto flex-1">{children}</div>

        {/* Footer: optional, sticks to bottom */}
        {footer && (
          <div className="border-t border-gray4 p-4">{footer}</div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
