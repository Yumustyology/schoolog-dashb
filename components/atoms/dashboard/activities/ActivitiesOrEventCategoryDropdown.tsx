'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function ActivitiesOrEventsCategoryDropdown() {

  const [selectCategory, setSelectedCategory] = useState('all');
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'teachers', label: 'Teachers' },
    { value: 'non-teaching', label: 'Non-teaching staff' },
    { value: 'student', label: 'Students' },
    { value: 'parents', label: 'Parents' },
  ]

  return (
    <>
      <Label className={cn('text-base text-gray6 mt-4', poppins_400.className)}>
        Category
      </Label>
      <Dropdown options={categories} selectedOption={selectCategory} onChange={setSelectedCategory} placeholder="Select category" />
      
    </>
  );
}
