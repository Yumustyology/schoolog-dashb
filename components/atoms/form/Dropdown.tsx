import React, { useRef, useEffect, useState } from 'react';
import { useClickAway } from 'react-use';

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: React.ReactNode; // Allow children to be passed for custom content
}

export function Dropdown({ isOpen, setIsOpen, children }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 'auto',
    bottom: '100%',
  });

  useClickAway(dropdownRef, () => setIsOpen());

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceBelow < rect.height && spaceAbove >= rect.height) {
        setDropdownPosition({ top: 'auto', bottom: '100%' });
      } else {
        setDropdownPosition({ top: '100%', bottom: 'auto' });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute flex flex-col gap-3 right-0 -mt-4 min-w-[173px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 p-4"
      style={{ top: dropdownPosition.top, bottom: dropdownPosition.bottom }}
      role="menu"
    >
      {children}
    </div>
  );
}
