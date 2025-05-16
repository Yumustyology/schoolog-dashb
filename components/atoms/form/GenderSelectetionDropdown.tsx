'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function GenderSelectionDropdown() {
  const [selectedGender, setSelectedGender] = useState('');
  const gender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <>
      <Dropdown
        label="Gender"
        options={gender}
        selectedOption={selectedGender}
        onChange={setSelectedGender}
        placeholder="Select Gender"
      />
    </>
  );
}
