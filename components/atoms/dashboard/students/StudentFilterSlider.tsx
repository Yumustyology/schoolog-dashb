'use client';
import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import ReactSlider from 'react-slider';

export const StudentFilterSlider = ({ filtertype }: { filtertype: string }) => {
  return (
    <div className="w-full max-w-md mx-auto py-5">
      <p className={cn('text-base text-gray1 mb-3', poppins_500.className)}>
        {' '}
        {filtertype}
      </p>
      <ReactSlider
        className="relative w-full h-2 bg-gray-200 rounded-full"
        thumbClassName="w-6 h-6 bg-primary rounded-full shadow-md cursor-pointer flex items-center justify-center border-2 border-white"
        trackClassName="bg-primary h-2 rounded-full"
        defaultValue={[20, 80]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => (
          <div
            {...props}
            className="relative w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            <span className="absolute -top-3 w-7 h-7 bg-light border border-primary text-primary text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {state.valueNow}
            </span>
          </div>
        )}
        pearling
        minDistance={10}
      />
    </div>
  );
};
