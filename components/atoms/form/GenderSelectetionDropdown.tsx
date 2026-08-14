'use client';
import { useEffect, useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

type Props = {
  value?: string | null;
  onChange?: (v: string | null) => void;
};

export function GenderSelectionDropdown({ value, onChange }: Props) {
  const [selectedGender, setSelectedGender] = useState<string>(value || '');
  const gender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  useEffect(() => {
    // when controlled externally, keep local state in sync
    setSelectedGender(value || '');
  }, [value]);

  const handleChange = (v: string) => {
    setSelectedGender(v);
    onChange?.(v || null);
  };

  return (
    <>
      <Dropdown
        label="Gender"
        options={gender}
        selectedOption={selectedGender}
        onChange={handleChange}
        placeholder="Select Gender"
      />
    </>
  );
}
