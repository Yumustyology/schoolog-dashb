'use client';
import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import {
  ButtonGroup,
  Button as ButtonMaterialUI,
} from '@material-tailwind/react';

export function FilterButtonGroup({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<string>('30 days');

  const handleButtonClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const active = 'bg-[#D0D5DD] text-gray1 border border-[#D0D5DD]';
  const inactive =
    'shadow-none text-sm border border-[#E5E5EA] text-gray6 bg-white py-3';

  return (
    <div className="flex w-max flex-col gap-4">
      <ButtonGroup className={cn('shadow-none text-sm')} variant="outlined">
        {['12 months', '30 days', '7 days', '24 hours'].map((filter, index) => (
          <ButtonMaterialUI
            key={filter}
            className={cn(
              inactive,
              Inter_500.className,
              { [active]: activeFilter === filter },
              { 'border-l-0': index !== 0 }
            )}
            onClick={() => handleButtonClick(filter)}
          >
            {filter}
          </ButtonMaterialUI>
        ))}
      </ButtonGroup>
    </div>
  );
}
