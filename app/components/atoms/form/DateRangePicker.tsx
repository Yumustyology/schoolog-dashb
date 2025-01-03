'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Inter_400 } from '@/app/lib/config/font.config';

export function DateRangePicker() {
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleSelectDate = (date: Date | undefined, isStartDate: boolean) => {
    if (!date) return;

    if (isStartDate) {
      if (dateRange.endDate && date > dateRange.endDate) {
        alert('Start date cannot be after end date.');
        return;
      }
      setDateRange((prev) => ({ ...prev, startDate: date }));
    } else {
      if (dateRange.startDate && date < dateRange.startDate) {
        alert('End date cannot be before start date.');
        return;
      }
      setDateRange((prev) => ({ ...prev, endDate: date }));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-min rounded-full justify-start text-left font-normal',
            !(dateRange.startDate && dateRange.endDate) &&
              'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2" />
          {dateRange.startDate && dateRange.endDate ? (
            <span>
              {format(dateRange.startDate, 'PPP')} -{' '}
              {format(dateRange.endDate, 'PPP')}
            </span>
          ) : (
            <span>Date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-32 min-w-max bg-white p-4">
        <div className="flex space-x-4">
          <div>
            <h4
              className={cn(
                'text-sm text-center font-medium mb-2',
                Inter_400.className
              )}
            >
              Start Date
            </h4>
            <Calendar
              mode="single"
              selected={dateRange.startDate}
              onSelect={(date) => handleSelectDate(date, true)}
              initialFocus
            />
          </div>
          <div>
            <h4
              className={cn(
                'text-sm text-center font-medium mb-2',
                Inter_400.className
              )}
            >
              End Date
            </h4>
            <Calendar
              mode="single"
              selected={dateRange.endDate}
              onSelect={(date) => handleSelectDate(date, false)}
              initialFocus
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
