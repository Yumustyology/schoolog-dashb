import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

function SelectBox() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10 Entries" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">30 entries </SelectItem>
        <SelectItem value="dark">20 entries </SelectItem>
        <SelectItem value="system">10 entries </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SelectBox;
