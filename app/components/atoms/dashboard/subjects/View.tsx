import React from 'react';
import EyeOpen from '../../icons/EyeOpen';
import { cn } from '@/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';

function View() {
  return (
    <div className="h-[36px] w-[92px] bg-[#EAEAEA] rounded-[24px] flex items-center justify-center gap-2">
      <EyeOpen />
      <p className={cn(' text-sm text-gray', poppins_500.className)}>View</p>
    </div>
  );
}

export default View;
