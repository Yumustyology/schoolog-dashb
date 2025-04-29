'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function SalaryCategoryDropdownList() {

  const [selectedGrade, setSelectedGrade] = useState('');
  const salaryGrades = [
    { value: 'grade1', label: 'Grade 1' },
    { value: 'grade2', label: 'Grade 2' },
    { value: 'grae3', label: 'Grade 3' },
    
  ]

  return (
    <>
      <Dropdown label='Salary category' options={salaryGrades} selectedOption={selectedGrade} onChange={setSelectedGrade} placeholder="Select option" />
    </>
  );
}
