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

export function DaySelector() {
  const [selectedDay, setSelectedDay] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <>
      <Label className={cn('text-base text-gray6 mb-2', poppins_400.className)}>
        Select day
      </Label>

      <Select onValueChange={setSelectedDay}>
        <SelectTrigger className="w-full bg-gray4 bg-opacity-55 text-sm text-gray">
          <SelectValue placeholder="Select Day" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray">
          <SelectGroup>
            {days.map((day) => (
              <SelectItem key={day} value={day.toLowerCase()}>
                {day}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
