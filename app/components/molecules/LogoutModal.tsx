'use client';
// components/Modal.tsx
import React, { useState } from 'react';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import Button from '../atoms/form/Button';
import { cn } from '@/lib/utils'; // Import the 'cn' utility function if it's defined elsewhere
import { Inter_500 } from '@/app/lib/config/font.config';

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false); // Close the modal when called
  };

  const submit = () => {
    // Handle the submit logic here (e.g., logging out the user)
    console.log('Submit clicked');
    setIsOpen(false); // Close the modal after submission
  };

  if (!isOpen) return null; // Hide the modal when `isOpen` is false

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg tablet:w-[434px] xxs:w-full shadow-lg">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>

        <main className="flex flex-col items-center justify-center text-center px-6">
          {/* Add modal content here */}
          <h3 className="text-xl mb-4">Are you sure you want to log out?</h3>
        </main>

        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
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
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
