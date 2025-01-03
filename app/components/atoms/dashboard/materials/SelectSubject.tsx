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

export function SelectSubject() {
  return (
    <Select>
      <SelectTrigger className="rounded-full w-[300px]">
        <SelectValue placeholder="Select subjects" />
      </SelectTrigger>
      <SelectContent>
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
