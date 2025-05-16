'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function AnnouncementMediumDropdown() {
  const [selectedMedium, setSelectedMedium] = useState('inAppNotication');
  const mediums = [
    { value: 'inAppNotication', label: 'In app notification only' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
  ];

  return (
    <>
      <Label className={cn('text-base text-gray6 mt-4', poppins_400.className)}>
        Medium
      </Label>
      <Dropdown
        options={mediums}
        selectedOption={selectedMedium}
        onChange={setSelectedMedium}
        placeholder="Select medium"
      />
    </>
  );
}
