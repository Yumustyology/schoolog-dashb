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
import { poppins_400 } from '@/app/lib/config/font.config';

export function DatePicker({
  className,
  calenderContainerClassName,
  placeholder,
}: {
  className?: string;
  placeholder?: string | React.ReactNode;
  calenderContainerClassName?: string | React.ReactNode;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild className="w-[180px] rounded-full">
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
            poppins_400.className
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span>{placeholder || 'Pick a date'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0', calenderContainerClassName)}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
