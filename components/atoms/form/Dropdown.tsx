'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options?: Option[];
  selectedOption: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Dropdown({
  options = [],
  selectedOption,
  onChange,
  placeholder = 'Select an option...',
  className = '',
}: DropdownProps) {
  
  const handleChange = (value: string) => {
    if (onChange) onChange(value);
  };

  return (
    <Select onValueChange={handleChange} value={selectedOption}>
      <SelectTrigger className={`w-full bg-white bg-opacity-55 text-sm text-gray h-11 ${className}`}>
        <SelectValue placeholder={placeholder} />
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
