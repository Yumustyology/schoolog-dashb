'use client';

import React from 'react';
import Button from '@/components/atoms/form/Button';
import { DurationDropdown } from '@/components/atoms/form/DurationDropdown';
import SelectComp from '@/components/atoms/form/Select';
import Modal from '@/components/molecules/Modal';
import BorrowerSearchSelect, {
  Borrower,
} from '@/components/molecules/dashboard/library/BorrowerSearchSelect';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import showToast from '@/app/lib/utils/toast';
import libraryActions from '@/app/lib/actions/library.action';

const DURATION_TO_DAYS: Record<string, number> = {
  '2days': 2,
  '3days': 3,
  '5days': 5,
  '1week': 7,
  '2week': 14,
  '3week': 21,
};

export const GiveOutBookModal = ({
  isOpen,
  setIsOpen,
  onGivenOut,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onGivenOut?: () => void;
}) => {
  const [books, setBooks] = React.useState<{ id: string; name: string }[]>([]);
  const [bookId, setBookId] = React.useState('');
  const [borrower, setBorrower] = React.useState<Borrower | null>(null);
  const [duration, setDuration] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    libraryActions
      .listBooks({ format: 'physical', archived: 'false', limit: 100 })
      .then((res) => {
        const available = (res.data || []).filter((b) => b.copies > 0);
        setBooks(available.map((b) => ({ id: b._id, name: `${b.title} (${b.copies} left)` })));
      })
      .catch(() => setBooks([]));
  }, [isOpen]);

  const reset = () => {
    setBookId('');
    setBorrower(null);
    setDuration('');
  };

  const close = () => {
    if (submitting) return;
    reset();
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!bookId) {
      showToast('Select a book to give out', 'borrow-missing-book', { type: 'error' });
      return;
    }
    if (!borrower) {
      showToast('Select who is borrowing the book', 'borrow-missing-borrower', { type: 'error' });
      return;
    }
    const days = DURATION_TO_DAYS[duration];
    if (!days) {
      showToast('Select a borrow duration', 'borrow-missing-duration', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const returnDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await libraryActions.borrowBook({
        bookId,
        audienceId: borrower.id,
        audienceType: borrower.type,
        returnDate,
      });
      showToast('Book given out successfully', 'book-given-out', { type: 'success' });
      reset();
      setIsOpen(false);
      onGivenOut?.();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Give out book">
      <div className="flex flex-col gap-4">
        <SelectComp
          label="Book"
          value={bookId}
          onValueChange={setBookId}
          options={books}
          placeholder={books.length ? 'Select a book' : 'No available books'}
        />

        <div>
          <label className={cn('label text-gray2 mb-2 block text-sm', poppins_400.className)}>
            Borrower
          </label>
          <BorrowerSearchSelect value={borrower} onChange={setBorrower} />
        </div>

        <DurationDropdown value={duration} onChange={setDuration} />
      </div>

      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={handleSubmit}
        loading={submitting}
        disabled={submitting}
      >
        Give out book
      </Button>
    </Modal>
  );
};
