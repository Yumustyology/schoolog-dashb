'use client';

import React from 'react';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import Modal from '@/components/molecules/Modal';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import showToast from '@/app/lib/utils/toast';
import libraryActions from '@/app/lib/actions/library.action';

type Mode = 'physical' | 'online';

export const AddBookModal = ({
  isOpen,
  setIsOpen,
  onAdded,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded?: () => void;
}) => {
  const [mode, setMode] = React.useState<Mode>('physical');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [copies, setCopies] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const reset = () => {
    setTitle('');
    setAuthor('');
    setCopies('');
    setFile(null);
    setMode('physical');
  };

  const close = () => {
    if (submitting) return;
    reset();
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim()) {
      showToast('Title and author are required', 'book-missing-fields', { type: 'error' });
      return;
    }
    if (mode === 'physical' && (!copies || Number(copies) < 0)) {
      showToast('Enter a valid number of copies', 'book-missing-copies', { type: 'error' });
      return;
    }
    if (mode === 'online' && !file) {
      showToast('Select a file to upload', 'book-missing-file', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'physical') {
        await libraryActions.createBook({ title, author, copies: Number(copies) });
      } else {
        await libraryActions.uploadOnlineBook({ file: file as File, title, author });
      }
      showToast('Book added successfully', 'book-added', { type: 'success' });
      reset();
      setIsOpen(false);
      onAdded?.();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Add Book">
      <div className="flex gap-2 mb-5">
        {(['physical', 'online'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              'text-sm px-4 py-2 rounded-full border',
              poppins_400.className,
              mode === m
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray6 border-gray4'
            )}
          >
            {m === 'physical' ? 'Physical book' : 'Online (digital) book'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-7">
        <Input
          id="bookName"
          label="Book title"
          type="text"
          labelClassName="label text-gray2 mb-0"
          className="h-11 rounded-lg"
          name="title"
          placeholder="Input book title"
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />

        <Input
          id="bookAuthor"
          label="Author"
          type="text"
          labelClassName="label text-gray2 mb-0"
          className="h-11 rounded-lg"
          name="author"
          placeholder="Input author name"
          value={author}
          handleChange={(e) => setAuthor(e.target.value)}
        />

        {mode === 'physical' ? (
          <Input
            id="totalNumber"
            label="Total copies"
            type="number"
            labelClassName="label text-gray2 mb-0"
            className="h-11 rounded-lg"
            name="copies"
            placeholder="Input number of copies"
            value={copies}
            handleChange={(e) => setCopies(e.target.value)}
          />
        ) : (
          <div>
            <label className={cn('label text-gray2 mb-2 block text-sm', poppins_400.className)}>
              Book file (PDF, EPUB, audio, video, or image)
            </label>
            <input
              type="file"
              accept=".pdf,.epub,audio/*,video/*,image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm w-full border border-gray4 rounded-lg p-2.5"
            />
            {file && (
              <p className="text-xs text-gray6 mt-1 truncate">{file.name}</p>
            )}
          </div>
        )}
      </div>

      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={handleSubmit}
        loading={submitting}
        disabled={submitting}
      >
        Add book
      </Button>
    </Modal>
  );
};
