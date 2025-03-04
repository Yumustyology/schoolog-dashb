'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CurriculumType() {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'cls', label: 'Upload .cls file' },
    { value: 'manual', label: 'Manual Input' },
    { value: 'waec', label: 'Waec Standard Curriculum' },
    { value: 'neco', label: 'Neco Standard Curriculum' },
    { value: 'ube', label: ' UBE Curriculum' },
    { value: 'subeb', label: 'SUBEB Curriculum' },
  ];

  return (
    <Select onValueChange={setSelectedOption}>
      <SelectTrigger className="w-full bg-gray4 bg-opacity-55 text-sm text-gray">
        <SelectValue placeholder="Select Curriculum Type" />
      </SelectTrigger>
      <SelectContent className="bg-white text-gray">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
