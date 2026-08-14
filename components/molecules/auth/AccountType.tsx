'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { ChevronRightIcon } from '@/components/atoms/icons/Icons';

type AccountTypeProps = {
  Type: React.FC;
  name: string;
  description: string;
  func: () => void;
};

function AccountType({ Type, name, description, func }: AccountTypeProps) {
  const handleClick = () => {
    func();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className={cn(
        'min-h-[106px] border border-gray5 rounded-xl flex justify-between items-center py-4 px-4 gap-4 lxs:gap-2 hover:border-primary ease-in-out delay-100 cursor-pointer'
      )}
    >
      <div>
        <Type />
      </div>

      <div>
        <h3 className={cn('text-black1 text-base mb-2', poppins_500.className)}>
          {name}
        </h3>
        <p className={cn('text-gray3 text-sm', poppins_400.className)}>
          {description}
        </p>
      </div>

      <div>
        <ChevronRightIcon />
      </div>
    </div>
  );
}

export default AccountType;
