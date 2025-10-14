'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';

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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
            stroke="#828282"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default AccountType;
