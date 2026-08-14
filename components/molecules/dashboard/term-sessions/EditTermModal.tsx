'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { updateTermSession } from '@/app/lib/actions/term-session.actions';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
import { updateTermSessionInList } from '@/app/lib/entities/term-session.entity';
import Input from '@/components/atoms/form/Input';
import { mutate } from 'swr';
import Modal from '@/components/molecules/Modal';
import { DatePicker } from '@/components/atoms/form/DatePicker';

interface EditTermModalProps {
  open: boolean;
  close: () => void;
  term: TermSessionType | null;
  onSuccess?: () => void;
}

const EditTermModal: React.FC<EditTermModalProps> = ({ open, close, term, onSuccess }) => {
  const [termName, setTermName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (term) {
      setTermName(term.name);
      setStartDate(term.startDate ? new Date(term.startDate) : undefined);
      setEndDate(term.endDate ? new Date(term.endDate) : undefined);
      setIsActive(term.isCurrentlyActive || false);
    }
  }, [term]);

  const handleSubmit = async () => {
    if (!termName.trim()) {
      toast.error('Please enter a term name');
      return;
    }

    if (!startDate) {
      toast.error('Please select a start date');
      return;
    }

    if (!endDate) {
      toast.error('Please select an end date');
      return;
    }

    if (endDate <= startDate) {
      toast.error('End date must be after start date');
      return;
    }

    if (!term?._id) return;

    setIsSubmitting(true);
    try {
      const response = await updateTermSession(term._id, {
        name: termName.trim(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        isCurrentlyActive: isActive,
      });

      if (response?.status === 'success') {
        toast.success(response.message || 'Term session updated successfully');
        if (response.data) updateTermSessionInList(term._id, response.data);
        mutate('/term-sessions');
        close();
        if (onSuccess) onSuccess();
      } else {
        toast.error(response?.message || 'Failed to update term session');
      }
    } catch (error: unknown) {
      console.error('Error updating term session:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating the term session';
      toast.error(errorMessage);
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

  const isFormValid = termName.trim() && startDate && endDate && endDate > startDate;

  const footer = (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={handleClose}
        disabled={isSubmitting}
        round
        flat
        outlined
        className={cn(
          'h-[44px] w-[185px]',
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
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </div>
  );

  if (!term) return null;

  return (
    <Modal isOpen={open} onClose={handleClose} title="Edit Term Session" footer={footer}>
      <p className={cn('text-sm text-gray9 mb-6', Inter_400.className)}>
        Update the term session details
      </p>

      <div className="w-full space-y-4">
        <Input
          type="text"
          value={termName}
          handleChange={(e) => setTermName(e.target.value)}
          placeholder="e.g., First Term 2024/2025"
          label="Term Name"
          className="w-full"
          disabled={isSubmitting}
          maxLength={100}
          required
        />

        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={startDate}
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
          <label className={cn('text-sm font-medium text-neutral-700', Inter_500.className)}>
            Set as Currently Active
          </label>
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            disabled={isSubmitting}
            className={cn(
              'h-5 w-5 rounded-sm border-2 transition-colors',
              'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white',
              'border-neutral-300 hover:border-primary/70',
              'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            // title="Check to set this term session as currently active"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditTermModal;
