import React from 'react';
import LockedIcon from '../../icons/dashboard/LockedIcon';
import { cn } from '@/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';

function Locked() {
  return (
    <div className="bg-[#f4f4f4] w-[104px] h-[36px] rounded-3xl flex justify-between p-3 items-center ">
      <LockedIcon />
      <p className={cn('text-sm text-gray', poppins_500.className)}>Locked</p>
    </div>
  );
}

export default Locked;
