'use client';

import React from 'react';
import useSWR from 'swr';
import termSessionActions, { type TermSession } from '@/app/lib/actions/term-session.actions';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { formatDateRange } from '@/app/lib/utils/dateUtils';

interface MultiTermSelectorProps {
  selectedTerms: TermSession[];
  onTermToggle: (term: TermSession) => void;
  className?: string;
}

function MultiTermSelector({ selectedTerms, onTermToggle, className }: MultiTermSelectorProps) {
  const { data: response, error, isLoading } = useSWR(
    'termSessions',
    () => termSessionActions.getAllTermSessions()
  );

  const terms = response?.data?.data;

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-red-500 text-sm', poppins_400.className, className)}>
        Error loading term sessions
      </div>
    );
  }

  if (!terms || terms.length === 0) {
    return (
      <div className={cn('text-gray-500 text-sm', poppins_400.className, className)}>
        No term sessions available. Please create term sessions first.
      </div>
    );
  }

  const isTermSelected = (termId: string) => 
    selectedTerms.some(term => term._id === termId);

  return (
    <div className={cn('space-y-3', className)}>
      <label className={cn('block text-sm font-medium text-gray-700 mb-3', poppins_500.className)}>
        Select Term Sessions for Curriculum
      </label>
      {terms.map((term) => {
        const isSelected = isTermSelected(term._id);
        const dateRange = term.start_date && term.end_date 
          ? formatDateRange(term.start_date, term.end_date) 
          : null;

        return (
          <button
            key={term._id}
            type="button"
            onClick={() => onTermToggle(term)}
            className={cn(
              'w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-300',
              isSelected 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:bg-gray-50'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className={cn('font-medium text-gray-900', poppins_500.className)}>
                  {term.name}
                </h3>
                {dateRange && (
                  <p className={cn('text-sm text-gray-600 mt-1', poppins_400.className)}>
                    {dateRange}
                  </p>
                )}
              </div>
              {isSelected && (
                <div className="flex-shrink-0 ml-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MultiTermSelector;