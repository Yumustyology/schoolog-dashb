import ArrowUpIcon from '@/app/components/atoms/icons/ArrowUpIcon';
import { Inter_400, Inter_500, Inter_800, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

const GradesAnalytics = () => {
  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="text-[#101828] flex gap-1 items-end">
          <h2 className={cn(Inter_800.className, 'text-3xl')}>90</h2>
          <span className={Inter_400.className}>/</span>
          <span className={cn(Inter_400.className, 'text-gray3')}>
            average grade
          </span>
        </p>
        <div
          className={cn(
            'px-1.5 py-1 text-[#079455] rounded-full bg-[#21B55A1F] flex gap-1 items-center w-min h-[28px] text-sm',
            poppins_500.className
          )}
        >
         <span className='flex-shrink-0'><ArrowUpIcon /></span>
          <span>40%</span>
        </div>
      </div>
    </div>
  );
};

export default GradesAnalytics;
