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
import { Label } from '@/components/ui/label';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { MultiValue, SingleValue } from 'react-select';
import DropdownMultiSelect, {
  OptionType,
} from '@/components/atoms/form/DropdownMultiSelect';
// import  { OptionType } from '@/components/atoms/form/DropdownMultiSelect';

const periods = [
  { value: 'first_period', label: 'First ' },
  { value: 'second_period', label: 'Second ' },
  { value: 'third_period', label: 'Third' },
  { value: 'fourth_period', label: 'Fourth ' },
  { value: 'fifth_period', label: 'Fifth ' },
  { value: 'sixth_period', label: 'Sixth ' },
  { value: 'seventh_period', label: 'Seventh' },
];

export function PeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState<MultiValue<OptionType>>(
    []
  );

  return (
    <>
      <Label className={cn('text-base text-gray6 mb-2', poppins_400.className)}>
        Select Period
      </Label>
      {/* <Dropdown options={periods} value={selectedPeriod} onChange={setSelectedPeriod} placeholder="Select periods..." isMulti /> */}
      <DropdownMultiSelect
        options={periods}
        value={selectedPeriod}
        onChange={setSelectedPeriod}
        placeholder="Select periods..."
      />
    </>
  );
}
