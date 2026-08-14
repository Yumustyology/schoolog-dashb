'use client';
import TermCardSkeleton from '@/components/atoms/skeleton/TermCardSkeleton';
import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import {
  fetchHolidaysBetween,
  HolidayApiItem,
} from '@/app/lib/actions/holiday.actions';
import { getCountryCode } from '@/app/lib/utils/countryCode';
import { schoolState } from '@/app/lib/entities/school.entity';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { createTermSession } from '@/app/lib/actions/term-session.actions';
import { addTermSession } from '@/app/lib/entities/term-session.entity';
import Input from '@/components/atoms/form/Input';
import Modal from '@/components/molecules/Modal';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import showToast from '@/app/lib/utils/toast';

interface CreateTermModalProps {
  open: boolean;
  close: () => void;
  onSuccess?: () => void;
}

const CreateTermModal: React.FC<CreateTermModalProps> = ({
  open,
  close,
  onSuccess,
}) => {
  const [termName, setTermName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customHolidays, setCustomHolidays] = useState<HolidayApiItem[]>([]);
  const [customHolidayTitle, setCustomHolidayTitle] = useState('');
  const [customHolidayDate, setCustomHolidayDate] = useState<
    Date | undefined
  >();

  // Get country code from school state (default to 'ng')
  const school = schoolState.get();
  const countryCode = useMemo(
    () => getCountryCode(school?.country || '') || 'ng',
    [school]
  );

  // Fetch holidays for the selected date range
  const { data: fetchedHolidays, isLoading: holidaysLoading } = useSWR(
    startDate && endDate
      ? [
          'holidays',
          countryCode,
          startDate.toISOString(),
          endDate.toISOString(),
        ]
      : null,
    () =>
      fetchHolidaysBetween(
        countryCode,
        startDate!.toISOString(),
        endDate!.toISOString()
      )
  );

  // Merge fetched and custom holidays, dedupe by date
  const holidaysList = useMemo(() => {
    const customs = customHolidays;
    const publics = (fetchedHolidays || []) as HolidayApiItem[];
    const map = new Map<string, HolidayApiItem>();
    for (const h of [...publics, ...customs]) {
      map.set(h.date.iso, h);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.date.iso.localeCompare(b.date.iso)
    );
  }, [fetchedHolidays, customHolidays]);

  // Add a custom holiday
  const handleAddHoliday = () => {
    if (!customHolidayDate) {
      showToast('Please select a holiday date', 'input-holiday-date', { type: 'info' });
      return;
    }
    if (!startDate || !endDate) {
      showToast('Select term start and end dates first', 'input-start-date', { type: 'info' });
      return;
    }
    const iso = customHolidayDate.toISOString().slice(0, 10);
    if (
      iso < startDate.toISOString().slice(0, 10) ||
      iso > endDate.toISOString().slice(0, 10)
    ) {
      showToast('Holiday date must be within the term range', 'input-holiday-date', { type: 'info' });
      return;
    }
    setCustomHolidays((prev) => [
      ...prev.filter((h) => h.date.iso !== iso),
      {
        name: customHolidayTitle || 'Holiday',
        description: customHolidayTitle || 'Holiday',
        country: { id: countryCode, name: school?.country || 'Nigeria' },
        date: {
          iso,
          datetime: {
            year: customHolidayDate.getFullYear(),
            month: customHolidayDate.getMonth() + 1,
            day: customHolidayDate.getDate(),
          },
        },
        type: [],
        primaryType: '',
        canonicalUrl: '',
        urlId: '',
        locations: '',
        states: '',
      },
    ]);
    setCustomHolidayTitle('');
    setCustomHolidayDate(undefined);
  };

  // Remove a holiday (by iso date)
  const handleRemoveHoliday = (iso: string) => {
    setCustomHolidays((prev) => prev.filter((h) => h.date.iso !== iso));
  };

  const handleSubmit = async () => {
    if (!termName.trim()) {
      showToast('Please enter a term name', 'input-term-name', { type: 'info' });
      return;
    }

    if (!startDate) {
      showToast('Please select a start date', 'input-start-date', { type: 'info' });
      return;
    }

    if (!endDate) {
      showToast('Please select an end date', 'input-end-date', { type: 'info' });
      return;
    }

    if (endDate <= startDate) {
      showToast('End date must be after start date', 'input-end-date', { type: 'info' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createTermSession({
        name: termName.trim(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        isCurrentlyActive: isActive,
        holidays: holidaysList.map(h => h.date.iso),
      });

      if (response?.status === 'success') {
        showToast(
          response.message || 'Term session created successfully',
          'term-session-success',
          { type: 'success' }
        );
        if (response.data) addTermSession(response.data);
        setTermName('');
        setStartDate(undefined);
        setEndDate(undefined);
        setIsActive(false);
        close();
        if (onSuccess) onSuccess();
      } else {
        showToast(response?.message || 'Failed to create term session', 'term-session-fail', { type: 'error' });
      }
    } catch (error: unknown) {
      console.error('Error creating term session:', error);
      let errorMessage = 'An error occurred while creating the term session';
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (
          error as { response?: { data?: { message?: string } } }
        ).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      showToast(errorMessage, 'term-session-error', { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTermName('');
      setStartDate(undefined);
      setEndDate(undefined);
      setIsActive(false);
      close();
    }
  };

  const isFormValid =
    termName.trim() && startDate && endDate && endDate > startDate;

  const footer = (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={handleClose}
        disabled={isSubmitting}
        round
        flat
        outlined
        className={cn(
          'border  text-base h-[44px] w-[185px]',
          Inter_500.className
        )}
      >
        Cancel
      </Button>
      <Button
        round
        disabled={isSubmitting || !isFormValid}
        className={cn(
          'text-base h-[44px] w-[185px]',
          'text-white',
          Inter_500.className
        )}
        onClick={handleSubmit}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </div>
  );

  return (
    <Modal
      className="min-w-[600px] min-h-[85dvh]"
      isOpen={open}
      onClose={handleClose}
      title="Create Term Session"
      footer={footer}
    >
      <p className={cn('text-sm text-gray9 mb-6', Inter_400.className)}>
        Create a new academic term or session for your school
      </p>

      <div className="w-full space-y-4">
        <Input
          type="text"
          value={termName}
          handleChange={(e) => setTermName(e.target.value)}
          placeholder="e.g., First Term 2024/2025"
          className="w-full"
          label="Term Name"
          disabled={isSubmitting}
          maxLength={100}
          required
        />

        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={startDate}
          calenderContainerClassName="w-fit"
          onChange={setStartDate}
          disabled={isSubmitting}
          required
        />

        <DatePicker
          label="End Date"
          placeholder="Select end date"
          value={endDate}
          onChange={setEndDate}
          disabled={isSubmitting}
          required
        />

        <div className="flex items-center justify-between">
          <label
            className={cn(
              'text-base font-medium text-neutral-700',
              Inter_500.className
            )}
          >
            Set as Currently Active
          </label>
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isSubmitting}
            className={cn(
              'h-5 w-5 rounded-sm border-2 transition-colors',
              'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white',
              'border-neutral-300 hover:border-primary/70 border-black',
              'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
        </div>

    
        {(holidaysLoading || holidaysList.length > 0) && (
          <div className="space-y-3 mt-6">
            <div
              className={cn(
                'text-sm font-medium text-neutral-700',
                Inter_500.className
              )}
            >
              Holidays within term
            </div>
            {holidaysLoading ? (
              <div className="py-2"><TermCardSkeleton /></div>
            ) : holidaysList.length === 0 ? null : (
              <ul className="divide-y divide-neutral-200 rounded-md border border-neutral-200">
                {holidaysList.map((h) => (
                  <li
                    key={h.date.iso}
                    className="flex items-center justify-between px-3 py-2"
                  >
                    <div>
                      <span className={cn('font-medium', Inter_500.className)}>{h.name}</span>{' '}
                      <span className={cn('text-xs text-neutral-600', Inter_400.className)}>
                        {h.date.iso}
                      </span>
                    </div>
                    <Button
                      outlined
                      flat
                      onClick={() => handleRemoveHoliday(h.date.iso)}
                      disabled={isSubmitting}
                      className={cn(Inter_500.className)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <br/>
            <div className="flex items-center gap-2 mt-5">
              <Input
                type="text"
                value={customHolidayTitle}
                handleChange={(e) => setCustomHolidayTitle(e.target.value)}
                placeholder="Holiday title (optional)"
                label="Custom Holiday Title"
                disabled={isSubmitting}
                maxLength={80}
                labelClassName={cn('text-base', Inter_500.className)}
              />
              <DatePicker
                label="Custom Holiday Date"
                placeholder="Select date"
                value={customHolidayDate}
                onChange={setCustomHolidayDate}
                disabled={isSubmitting}
                labelClassName={cn('block text-left w-full text-base mb-3', Inter_500.className)}
              />
            </div>
            <Button
              onClick={handleAddHoliday}
              disabled={isSubmitting || !customHolidayDate}
              loading={isSubmitting && !!customHolidayDate}
              className={cn(Inter_500.className)}
            >
              Add holiday
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateTermModal;
