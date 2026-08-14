'use client';

import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
// import { Label } from '@/components/ui/label';
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
  label?: string;
};

export function Dropdown({
  options = [],
  selectedOption,
  onChange,
  placeholder = 'Select an option...',
  className = '',
  label,
}: DropdownProps) {
  const handleChange = (value: string) => {
    if (onChange) onChange(value);
  };

  return (
    <div>
      <label
        className={cn(
          'block text-left w-full font-nunito text-base mb-2',
          poppins_400.className
        )}
      >
        {label}
      </label>

      <Select onValueChange={handleChange} value={selectedOption}>
        <SelectTrigger
          className={cn(
            `w-full !shadow-none bg-white bg-opacity-55 text-sm text-gray h-11`,
            poppins_400.className,
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                className={cn(poppins_400.className)}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
