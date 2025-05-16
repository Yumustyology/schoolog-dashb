'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function LocationDropdown() {
  const [selectedlocaation, setSelectedlocaation] = useState('');
  const locations = [
    { value: 'online', label: 'Online' },
    { value: 'physical', label: 'Physical' },
  ];

  return (
    <>
      <Label className={cn('text-base text-gray6 mt-4', poppins_400.className)}>
        Location
      </Label>
      <Dropdown
        options={locations}
        selectedOption={selectedlocaation}
        onChange={setSelectedlocaation}
        placeholder="Select location"
      />
    </>
  );
}
