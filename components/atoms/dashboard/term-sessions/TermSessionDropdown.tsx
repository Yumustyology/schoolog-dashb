'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/app/lib/utils';
import useSWR from 'swr';
import termSessionActions from '@/app/lib/actions/term-session.actions';

interface TermSessionDropdownProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const TermSessionDropdown: React.FC<TermSessionDropdownProps> = ({
  value,
  onValueChange,
  placeholder = 'Select term session',
  className,
  disabled = false,
}) => {
  const { data: termSessionsResp, isLoading } = useSWR('/term-sessions', () =>
    termSessionActions.getAllTermSessions()
  );

  const terms = termSessionsResp?.data?.data || [];

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled || isLoading}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder={isLoading ? 'Loading...' : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {terms.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-gray-500">
            No term sessions found
          </div>
        ) : (
          terms.map((term) => (
            <SelectItem key={term._id} value={term._id}>
              {term.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};
