import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';

export function SelectSubject() {
  return (
    <Select>
      <SelectTrigger
        className={cn('rounded-full w-[170px]', Inter_400.className)}
      >
        <SelectValue placeholder="Select subjects" />
      </SelectTrigger>
      <SelectContent className={Inter_400.className}>
        <SelectGroup>
          <SelectItem value="biology">Biology</SelectItem>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="chemistry">Chemistry</SelectItem>
          <SelectItem value="mathematics">Mathematics</SelectItem>
          <SelectItem value="Yoruba">Yoruba</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
