'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function DaySelector() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
  ];

  return (
    <>
      <Label className={cn('text-base text-gray6 mb-2', poppins_400.className)}>
        Select day
      </Label>
      <Dropdown
        options={days}
        selectedOption={selectedDay}
        onChange={setSelectedDay}
        placeholder="Select day"
      />
    </>
  );
}
