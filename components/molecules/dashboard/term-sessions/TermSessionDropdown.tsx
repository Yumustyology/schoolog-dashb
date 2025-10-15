'use client';

import React from 'react';
import useSWR from 'swr';
import termSessionActions, { type TermSession } from '@/app/lib/actions/term-session.actions';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { formatDateRange } from '@/app/lib/utils/dateUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TermSessionDropdownProps {
  selectedTerm: TermSession | null;
  onTermSelect: (term: TermSession | null) => void;
  className?: string;
  placeholder?: string;
}

function TermSessionDropdown({ 
  selectedTerm, 
  onTermSelect, 
  className,
  placeholder = "Select a term session"
}: TermSessionDropdownProps) {
  const { data: response, error, isLoading } = useSWR(
    'termSessions',
    () => termSessionActions.getAllTermSessions()
  );

  const terms = response?.data?.data;

  if (isLoading) {
    return (
      <div className={className}>
        <label
          className={cn(
            'block text-left w-full font-nunito text-base mb-3',
            poppins_400.className
          )}
        >
          Select Term Session for Curriculum
        </label>
        <div className="h-11 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <label
          className={cn(
            'block text-left w-full font-nunito text-base mb-3',
            poppins_400.className
          )}
        >
          Select Term Session for Curriculum
        </label>
        <div className={cn('text-red-500 text-sm p-2 border border-red-200 rounded-lg h-11 flex items-center', poppins_400.className)}>
          Error loading term sessions
        </div>
      </div>
    );
  }

  if (!terms || terms.length === 0) {
    return (
      <div className={className}>
        <label
          className={cn(
            'block text-left w-full font-nunito text-base mb-3',
            poppins_400.className
          )}
        >
          Select Term Session for Curriculum
        </label>
        <div className={cn('text-gray-500 text-sm p-2 border border-gray-200 rounded-lg h-11 flex items-center', poppins_400.className)}>
          No term sessions available. Please create term sessions first.
        </div>
      </div>
    );
  }

  const handleValueChange = (value: string) => {
    if (value === "none") {
      onTermSelect(null);
    } else {
      const term = terms.find(t => t._id === value);
      onTermSelect(term || null);
    }
  };

  return (
    <div className={className}>
      <label
        className={cn(
          'block text-left w-full font-nunito text-base mb-3',
          poppins_400.className
        )}
      >
        Select Term Session for Curriculum
      </label>
      <Select 
        value={selectedTerm?._id || "none"} 
        onValueChange={handleValueChange}
      >
        <SelectTrigger className={cn('w-full !shadow-none bg-white bg-opacity-55 text-sm text-gray h-11', poppins_400.className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray">
          <SelectItem className={cn(poppins_400.className)} value="none">
            <span className="text-gray-500">None selected</span>
          </SelectItem>
          {terms.map((term) => {
            const dateRange = term.start_date && term.end_date 
              ? formatDateRange(term.start_date, term.end_date) 
              : null;

            return (
              <SelectItem className={cn(poppins_400.className)} key={term._id} value={term._id}>
                <div className="flex flex-col text-left w-full">
                  <span className="font-medium">
                    {term.name}{dateRange && ` - ${dateRange}`}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default TermSessionDropdown;