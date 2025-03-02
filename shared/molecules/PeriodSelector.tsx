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
import { cn } from '@/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

export function PeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const periods = [
    'First Period',
    'Second Period',
    'Third Period',
    'Fourth Period',
    'Fifth Period',
    'Sixth Period',
    'Seventh Period',
  ];

  return (
    <>
      <Label className={cn('text-base text-gray6 mb-2', poppins_400.className)}>
        Select day
      </Label>
      <Select onValueChange={setSelectedPeriod}>
        <SelectTrigger className="w-full bg-gray4 bg-opacity-55 text-sm text-gray">
          <SelectValue placeholder="Class Period" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray">
          <SelectGroup>
            {periods.map((period, index) => (
              <SelectItem
                key={index}
                value={period.toLowerCase().replace(' ', '-')}
              >
                {period}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
