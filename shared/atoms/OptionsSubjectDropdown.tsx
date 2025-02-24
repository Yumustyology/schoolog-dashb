import {
  ArchiveIcon,
  DeleteIcon,
  EditIcon,
  VIsibilityIcon,
} from '@/app/components/atoms/icons/Icons';
import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

function OptionsSubjectDropdown({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute flex flex-col gap-3 right-0 mt-2 w-[173px] h-[164px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
      role="menu"
    >
      <button
        className={cn(
          'flex items-center gap-4 text-sm text-black1',
          Inter_500.className
        )}
        role="menuitem"
      >
        <VIsibilityIcon />
        View Details
      </button>

      <button
        className={cn(
          'flex items-center gap-4 text-sm text-black1',
          Inter_500.className
        )}
        role="menuitem"
      >
        <EditIcon />
        Edit Curriculum
      </button>

      <button
        className={cn(
          'flex items-center gap-4 text-sm text-black1',
          Inter_500.className
        )}
        role="menuitem"
      >
        <ArchiveIcon />
        Archive
      </button>
      <button
        className={cn(
          'flex items-center gap-4 text-sm text-r2 ',
          Inter_500.className
        )}
        role="menuitem"
      >
        <DeleteIcon />
        <span className="text-r2">Delete</span>
      </button>
    </div>
  );
}

export default OptionsSubjectDropdown;
