import React from 'react';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import ArrowRightIcon2 from '@/components/atoms/icons/ArrowRightIcon2';
import Cancel from '@/components/atoms/icons/ModalIcons/Cancel';

export type OptionsMenuOption = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

type OptionsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  options: OptionsMenuOption[];
  title?: string;
};

/** Small dropdown-style options popup (e.g. "Select Option" action menus) anchored top-right of its trigger. */
export const OptionsMenu = ({
  isOpen,
  onClose,
  options,
  title = 'Select Option',
}: OptionsMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white py-4 px-6 w-[416px] rounded-2xl absolute top-16 right-4 z-50 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h2 className={cn('text-lg ', Inter_500.className)}> {title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full"
        >
          <Cancel />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {options.map((option) => (
          <div
            key={option.text}
            className="flex justify-between items-center p-4 border border-gray4 rounded-3xl cursor-pointer"
            onClick={() => {
              option.onClick();
              onClose();
            }}
          >
            <div className="flex items-center gap-4">
              <div>{option.icon}</div>
              <p className={cn('text-sm text-gray1', poppins_500.className)}>
                {option.text}
              </p>
            </div>

            <ArrowRightIcon2 />
          </div>
        ))}
      </div>
    </div>
  );
};
