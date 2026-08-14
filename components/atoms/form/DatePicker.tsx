'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Inter_500, Inter_400 } from '@/app/lib/config/font.config';

export function DatePicker({
  className,
  calenderContainerClassName,
  placeholder,
  onChange,
  label,
  required,
  value,
  disabled,
  error,
  labelClassName,
}: {
  className?: string;
  placeholder?: string | React.ReactNode;
  calenderContainerClassName?: string | React.ReactNode;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  required?: boolean;
  value?: Date;
  disabled?: boolean;
  error?: string;
  labelClassName?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  return (
    <div className="w-full">
      {label && (
        <label className={cn('block text-sm font-medium text-gray-700 mb-2', Inter_500.className, labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild className="w-full h-[47px]">
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal bg-white border border-gray-300 hover:border-primary focus:border-primary',
              !date && 'text-gray-500',
              error && 'border-red-500',
              className,
              Inter_400.className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span>{placeholder || 'Pick a date'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto  p-0', calenderContainerClassName)}>
          <Calendar
            mode="single"
            className=''
            selected={date}
            onSelect={handleDateChange}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className={cn('text-xs text-red-500 mt-1', Inter_400.className)}>
          {error}
        </p>
      )}
    </div>
  );
}
