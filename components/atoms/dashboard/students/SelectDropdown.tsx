import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

interface SelectDropdownProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  width?: string | number; // Accepts both Tailwind width classes and pixel values
}

export function SelectDropdown({
  options,
  placeholder = 'Select an option',
  className,
  width = 'min-w-[130px]',
}: SelectDropdownProps) {
  const isTailwindClass = typeof width === 'string';

  return (
    <Select>
      <SelectTrigger
        className={cn(
          'rounded-full', // Keep it rounded
          isTailwindClass ? width : '', // Apply Tailwind width if it's a class
          Inter_400.className,
          className
        )}
        style={isTailwindClass ? {} : { width: `${width}px` }} // Apply pixel width if it's a number
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={Inter_400.className}>
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
