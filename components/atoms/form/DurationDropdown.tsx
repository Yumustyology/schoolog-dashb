'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export const DURATION_OPTIONS = [
  { value: '2days', label: '2 days' },
  { value: '3days', label: '3 days' },
  { value: '5days', label: '5 days' },
  { value: '1week', label: '1 week' },
  { value: '2week', label: '2 weeks' },
  { value: '3week', label: '3 weeks' },
];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DurationDropdown({ value, onChange }: Props = {}) {
  const [internalDuration, setInternalDuration] = useState('');
  const selectedDuration = value ?? internalDuration;
  const setSelectedDuration = onChange ?? setInternalDuration;

  return (
    <>
      <Dropdown
        label="Duration"
        options={DURATION_OPTIONS}
        selectedOption={selectedDuration}
        onChange={setSelectedDuration}
        placeholder="Select duration"
      />
    </>
  );
}
