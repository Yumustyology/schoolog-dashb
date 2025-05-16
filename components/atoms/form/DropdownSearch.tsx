'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps {
  options: { value: string; label: string | React.ReactNode }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const DropdownSearch: React.FC<ComboboxProps> = ({
  options,
  placeholder = 'Select an option...',
  value,
  onChange,
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between h-14 rounded-lg border border-gray2 text-base text-gray3 p-4',
              className
            )}
          >
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder}
            <ChevronDown color="#676767" className="opacity-50 h-2 w-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-full p-0 rounded-lg', className)}>
          <Command className="px-3 border-white">
            <div className="w-full h-9 text-gray-700 bg-gray-100 border border-gray-300 rounded-full my-2 bg-[#F9FAFB]">
              <CommandInput
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                className="p-0 h-9 border-b-none"
              />
            </div>
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      if (onChange)
                        onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray4 transition-all"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default DropdownSearch;
