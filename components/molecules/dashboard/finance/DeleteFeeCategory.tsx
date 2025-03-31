'use client';
import React from 'react';
import { cn } from '@/app/lib/utils'; // Import the 'cn' utility function if it's defined elsewhere
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import { DeleteIcon } from '@/components/atoms/icons/Icons';
import Button from '@/components/atoms/form/Button';
import Cancel from '@/components/atoms/icons/ModalIcons/Cancel';
import { useEntity } from 'simpler-state';
import {
  closeDeleteFeeCategoryModal,
  deleteFeeCategoryOpenState,
} from '@/app/lib/entities/payment.entity';
import { BsTrash3 } from 'react-icons/bs';

const DeleteFeeModal = () => {
  const deleteFeeCategoryOpen = useEntity(deleteFeeCategoryOpenState);

  if (!deleteFeeCategoryOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg tablet:w-[434px] xxs:w-full shadow-lg">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={closeDeleteFeeCategoryModal}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>
        <div className="bg-[#EB57570F] h-[48px] w-[48px] rounded-full m-auto flex items-center justify-center mb-4">
          <BsTrash3 color="#EB5757" size={23} />
        </div>

        <main className="flex flex-col items-center justify-center text-center px-6">
          {/* Add modal content here */}
          <h3 className="text-xl mb-4 ">Delete Grade 1 fee?</h3>
          <p
            className={cn(
              'text-sm text-gray9 text-center px-[34px]',
              Inter_400.className
            )}
          >
            Are you sure you want to delete this fee? all students under this
            category will no longer be under any fee category
          </p>
        </main>

        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
          <Button
            onClick={closeDeleteFeeCategoryModal}
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
              'text-base bg-red border bg-r2 text-white h-[44px] w-[185px]',
              Inter_500.className
            )}
          >
            Delete category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeeModal;
