'use client';
import React, { useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import termSessionActions from '@/app/lib/actions/term-session.actions';
import { addTermSession } from '@/app/lib/entities/term-session.entity';
import Input from '@/components/atoms/form/Input';
import Modal from '@/components/molecules/Modal';
import { DatePicker } from '@/components/atoms/form/DatePicker';

interface CreateTermModalProps {
  open: boolean;
  close: () => void;
  onSuccess?: () => void;
}

const CreateTermModal: React.FC<CreateTermModalProps> = ({ open, close, onSuccess }) => {
  const [termName, setTermName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const response = await termSessionActions.createTermSession({
        name: termName.trim(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        is_currently_active: isActive,
      });

      if (response?.data?.status === 'success') {
        toast.success(response.data.message || 'Term session created successfully');
        addTermSession(response.data.data);
        setTermName('');
        setStartDate(undefined);
        setEndDate(undefined);
        setIsActive(false);
        close();
        if (onSuccess) onSuccess();
      } else {
        toast.error(response?.data?.message || 'Failed to create term session');
      }
    } catch (error: unknown) {
      console.error('Error creating term session:', error);
      let errorMessage = 'An error occurred while creating the term session';
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
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
    <Modal isOpen={open} onClose={handleClose} title="Create Term Session" footer={footer}>
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
          calenderContainerClassName='w-fit'
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

export default CreateTermModal;
