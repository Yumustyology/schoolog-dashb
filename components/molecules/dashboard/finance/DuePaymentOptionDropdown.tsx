import { VIsibilityIcon } from '@/components/atoms/icons/Icons';
import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import Message from '@/components/atoms/icons/SideBar/Message';

function DuePaymentOptionDropdown({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute flex flex-col gap-3 right-0 mt-2 min-w-[173px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-4"
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
        View Profile
      </button>

      <button
        className={cn(
          'flex items-center gap-4 text-sm text-black1',
          Inter_500.className
        )}
        role="menuitem"
      >
        <Message />
        Message parent
      </button>

      <button
        className={cn(
          'flex items-center gap-4 text-sm text-black1',
          Inter_500.className
        )}
        role="menuitem"
      >
        <Message />
        Message student
      </button>
    </div>
  );
}

export default DuePaymentOptionDropdown;
