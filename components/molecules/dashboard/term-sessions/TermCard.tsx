'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import Input from '@/components/atoms/form/Input';
import { Checkbox } from '@/components/ui/checkbox';
import { AdditionIcon, DeleteIcon } from '@/components/atoms/icons/Icons';
import SelectComp from '@/components/atoms/form/Select';
import { Loader2 } from 'lucide-react';

import {
  AcademicHoliday,
  AcademicTerm,
} from '@/app/lib/types/academicYear.types';
import { fetchHolidaysBetween } from '@/app/lib/actions/holiday.actions';
import { deleteTermSession } from '@/app/lib/actions/term-session.actions';

interface TermCardProps {
  term: AcademicTerm;
  terms: AcademicTerm[];
  countryCode: string;

  updateTerm: (
    id: string,
    field: keyof AcademicTerm,
    value: string | boolean
  ) => void;
  removeTerm: (id: string) => void;

  addHoliday: (termId: string) => void;
  removeHoliday: (termId: string, holidayId: string | number) => void;
  updateHoliday: (
    termId: string,
    holidayId: string | number,
    field: keyof AcademicHoliday,
    value: string
  ) => void;

  setTerms: React.Dispatch<React.SetStateAction<AcademicTerm[]>>;
  errors?: any;
}

/**
 * Unique key for holiday reconciliation
 */
const holidayKey = (h: { name: string; date: string }) =>
  `${h.name.toLowerCase()}-${h.date}`;

const TermCard: React.FC<TermCardProps> = ({
  term,
  terms,
  countryCode,
  updateTerm,
  removeTerm,
  addHoliday,
  removeHoliday,
  updateHoliday,
  setTerms,
  errors,
}) => {
  const termId = String(term._id || term.id);
  const hasReconciledRef = useRef(false);

  /**
   * ─────────────────────────────
   * Fetch public holidays by date range
   * ─────────────────────────────
   */
  const { data: fetchedHolidays, isLoading } = useSWR(
    term.startDate && term.endDate
      ? ['holidays', countryCode, term.startDate, term.endDate]
      : null,
    () => fetchHolidaysBetween(countryCode, term.startDate, term.endDate),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  /**
   * ─────────────────────────────
   * Reconcile public holidays ONCE when fetched
   * ─────────────────────────────
   */
  useEffect(() => {
    if (!Array.isArray(fetchedHolidays) || fetchedHolidays.length === 0) return;
    if (hasReconciledRef.current) return;

    hasReconciledRef.current = true;

    setTerms((prev) => {
      return prev.map((t) => {
        if (String(t._id || t.id) !== termId) return t;

        const existingHolidays = t.holidays || [];
        const schoolHolidays = existingHolidays.filter((h) => h.type === 'school');

        const existingPublicMap = new Map(
          existingHolidays
            .filter((h) => h.type === 'public')
            .map((h) => [holidayKey(h), h])
        );

        const reconciledPublic = fetchedHolidays.map((h) => {
          const key = holidayKey({ name: h.name, date: h.date.iso });
          return (
            existingPublicMap.get(key) || {
              id: crypto.randomUUID(),
              name: h.name,
              date: h.date.iso,
              type: 'public' as const,
            }
          );
        });

        const merged = [...schoolHolidays, ...reconciledPublic];

        // Only update if actually different
        if (
          merged.length === existingHolidays.length &&
          merged.every(
            (h, i) =>
              h.name === existingHolidays[i]?.name &&
              h.date === existingHolidays[i]?.date &&
              h.type === existingHolidays[i]?.type
          )
        ) {
          return t;
        }

        return { ...t, holidays: merged };
      });
    });
  }, [fetchedHolidays, termId, setTerms]);

  // Reset reconciliation flag when dates change
  useEffect(() => {
    hasReconciledRef.current = false;
  }, [term.startDate, term.endDate]);

  /**
   * ─────────────────────────────
   * Delete term
   * ─────────────────────────────
   */
  const handleDelete = async () => {
    if (term._id) await deleteTermSession(term._id);
    removeTerm(termId);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white space-y-4">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Term name"
          value={term.name}
          handleChange={(e) => updateTerm(termId, 'name', e.target.value)}
          errMsg={errors?.name}
        />

        {terms.length > 1 && (
          <button
            type="button"
            onClick={handleDelete}
            className="mt-6 text-red-500"
          >
            <DeleteIcon size={14} />
          </button>
        )}

        {isLoading && <Loader2 className="animate-spin w-4 h-4 mt-6" />}
      </div>

      {/* Date Range */}
      <div className="flex gap-4 items-center">
        <Input
          type="date"
          label="Start Date"
          value={term.startDate}
          handleChange={(e) => updateTerm(termId, 'startDate', e.target.value)}
          errMsg={errors?.startDate}
        />
        <span className="mt-6 text-gray-400">→</span>
        <Input
          type="date"
          label="End Date"
          value={term.endDate}
          handleChange={(e) => updateTerm(termId, 'endDate', e.target.value)}
          errMsg={errors?.endDate}
        />
      </div>

      {/* Active Toggle */}
      <div className="flex items-center justify-between">
        <span className={cn('text-sm', poppins_400.className)}>
          Set as Currently Active Term
        </span>
        <Checkbox
          checked={term.isCurrentlyActive || false}
          onCheckedChange={(checked) => {
            updateTerm(termId, 'isCurrentlyActive', checked === true);
          }}
        />
      </div>

      {/* Holidays */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">
            Holidays ({term.holidays?.length || 0})
            {isLoading && (
              <span className="ml-2 text-xs text-primary">
                loading public holidays…
              </span>
            )}
          </span>

          <button
            type="button"
            onClick={() => addHoliday(termId)}
            className="text-xs flex items-center gap-1 text-primary"
          >
            <AdditionIcon size={12} /> Add Holiday
          </button>
        </div>

        {term.holidays?.length ? (
          <div className="space-y-2">
            {term.holidays.map((holiday) => (
              <div
                key={holiday.id}
                className="flex gap-3 items-center bg-gray-50 p-2 rounded"
              >
                <Input
                  value={holiday.name}
                  handleChange={(e) =>
                    updateHoliday(termId, holiday.id!, 'name', e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={holiday.date}
                  handleChange={(e) =>
                    updateHoliday(termId, holiday.id!, 'date', e.target.value)
                  }
                />
                <SelectComp
                  value={holiday.type}
                  options={[
                    { name: 'School', id: 'school' },
                    { name: 'Public', id: 'public' },
                  ]}
                  onValueChange={(val) => {
                    updateHoliday(
                      termId,
                      holiday.id!,
                      'type',
                      val as 'school' | 'public'
                    );
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    removeHoliday(termId, holiday.id!);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <DeleteIcon size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {term.startDate && term.endDate
              ? 'No holidays yet.'
              : 'Set dates to load public holidays.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TermCard;