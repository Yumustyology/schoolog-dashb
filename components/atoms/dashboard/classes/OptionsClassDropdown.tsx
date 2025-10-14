import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import {
  VIsibilityIcon,
  AddTeacherIcon,
  EditIcon,
  DeleteIcon,
} from '@/components/atoms/icons/Icons';

function OptionsClassDropdown({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickAway(dropdownRef, () => setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute flex flex-col gap-3 right-0 mt-2 min-w-[150px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-3"
      role="menu"
    >
      <button className={cn('flex items-center gap-3 text-sm text-black1', Inter_500.className)} role="menuitem">
        <VIsibilityIcon /> View details
      </button>

      <button className={cn('flex items-center gap-3 text-sm text-black1', Inter_500.className)} role="menuitem">
        <AddTeacherIcon size={24} color='#828282' /> Add student
      </button>

      <button className={cn('flex items-center gap-3 text-sm text-black1', Inter_500.className)} role="menuitem">
        <EditIcon /> Edit class
      </button>

      <button className={cn('flex items-center gap-3 text-sm text-r2', Inter_500.className)} role="menuitem">
        <DeleteIcon /> <span className="text-r2">Delete</span>
      </button>
    </div>
  );
}

export default OptionsClassDropdown;
