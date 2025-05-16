'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function ClassDropdownList() {
  const [selectedClass, setSelectedClass] = useState('');
  const gender = [
    { value: 'jss1', label: 'JSS1' },
    { value: 'jss2', label: 'JSS2' },
    { value: 'jss3', label: 'JSS3' },
    { value: 'ss1', label: 'SS1' },
    { value: 'ss2', label: 'SS2' },
    { value: 'ss3', label: 'SS3' },
  ];

  return (
    <>
      <Dropdown
        label="Class"
        options={gender}
        selectedOption={selectedClass}
        onChange={setSelectedClass}
        placeholder="Select Class"
      />
    </>
  );
}
