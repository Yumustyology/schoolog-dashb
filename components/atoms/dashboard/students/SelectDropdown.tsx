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
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectDropdown({
  options,
  placeholder = 'Select an option',
  className,
  width = 'min-w-[130px]',
  value,
  onChange,
}: SelectDropdownProps) {
  const isTailwindClass = typeof width === 'string';

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'rounded-full border-gray4 text-gray1', // Keep it rounded
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
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-gray1 rounded-lg my-0.5 cursor-pointer focus:bg-light focus:text-primary data-[state=checked]:text-primary data-[state=checked]:font-medium"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
