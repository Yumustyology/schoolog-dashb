'use client';
import { biology1 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import Button from '@/components/atoms/form/Button';
import {
  ArchiveIcon,
  ArchiveModalIcon,
  DeleteIcon,
  DeleteModalIcon,
  UnachiveModalIcon,
  UnarchiveIcon,
} from '@/components/atoms/icons/Icons';
import Image from 'next/image';
import React, { useState } from 'react';
import showToast from '@/app/lib/utils/toast';
import libraryActions from '@/app/lib/actions/library.action';
import type { Book } from '@/app/lib/types/library.types';
import useSWR from 'swr';

export const BookInfoPageHeader = ({
  book,
  onChanged,
  onDeleted,
}: {
  book: Book;
  onChanged?: () => void;
  onDeleted?: () => void;
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  const [isActing, setIsActing] = useState(false);

  const { data: readersData } = useSWR(
    book.format === 'online' ? ['library-book-readers-count', book._id] : null,
    () => libraryActions.getBookReaders(book._id, { limit: 1 })
  );
  const readerCount = readersData?.meta?.count ?? 0;

  const handleDelete = async () => {
    setIsActing(true);
    try {
      await libraryActions.deleteBook(book._id);
      showToast('Book deleted', 'book-deleted', { type: 'success' });
      setDeleteModal(false);
      onDeleted?.();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsActing(false);
    }
  };

  const handleArchive = async () => {
    setIsActing(true);
    try {
      await libraryActions.archiveBook(book._id);
      showToast('Book archived', 'book-archived', { type: 'success' });
      setArchiveModal(false);
      onChanged?.();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsActing(false);
    }
  };

  const handleUnarchive = async () => {
    setIsActing(true);
    try {
      await libraryActions.unarchiveBook(book._id);
      showToast('Book unarchived', 'book-unarchived', { type: 'success' });
      setUnarchiveModal(false);
      onChanged?.();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsActing(false);
    }
  };

  return (
    <div className="bg-white p-6 my-8 rounded-2xl flex justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Image src={biology1} alt="Book cover" />
          <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              {book.title}
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              {book.author}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {book.format === 'online' ? (
            <>
              <BookDetailsTemplate text="Format" value={(book.fileType || 'file').toUpperCase()} />
              <BookDetailsTemplate text="Readers" value={String(readerCount)} />
            </>
          ) : (
            <BookDetailsTemplate text="Copies available" value={String(book.copies)} />
          )}
        </div>
      </div>

      <div className=" flex flex-col justify-between">
        <p
          className={cn(
            'ml-auto rounded-full w-fit bg-light py-1.5 px-3',
            book.isArchived ? 'text-[#F2994A] bg-[#F2994A14]' : 'text-primary'
          )}
        >
          {book.isArchived ? 'Archived' : 'Available'}
        </p>

        <div className="flex gap-5 justify-between">
          <Button
            round
            flat
            className={cn('flex  text-r2 h-[48px] w-[191px] border border-r2')}
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon />
            <span className="text-r2">Delete book</span>
          </Button>

          {book.isArchived ? (
            <Button
              round
              className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
              onClick={() => setUnarchiveModal(true)}
            >
              <UnarchiveIcon color="#21B55A" />
              <span className="text-primary">Unarchive</span>
            </Button>
          ) : (
            <Button
              round
              className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
              onClick={() => setArchiveModal(true)}
            >
              <ArchiveIcon color="#21B55A" />
              <span className="text-primary">Archive</span>
            </Button>
          )}
        </div>
      </div>

      <ConfirmModal
        open={deleteModal}
        close={() => setDeleteModal(false)}
        title="Delete book"
        body={`Are you sure you want to delete "${book.title}"? This book can't be recovered.`}
        icon={<DeleteModalIcon />}
        isLoading={isActing}
        confirmText="Delete"
        confirmClassName="bg-r text-white"
        onConfirm={handleDelete}
      />
      <ConfirmModal
        open={archiveModal}
        close={() => setArchiveModal(false)}
        title="Archive book"
        body="Are you sure you want to archive this book? It won't be visible to students and staff."
        icon={<ArchiveModalIcon />}
        isLoading={isActing}
        confirmText="Archive"
        confirmClassName="bg-r text-white"
        onConfirm={handleArchive}
      />
      <ConfirmModal
        open={unarchiveModal}
        close={() => setUnarchiveModal(false)}
        title="Unarchive book"
        body="Are you sure you want to unarchive this book? This will make it visible to students and staff again."
        icon={<UnachiveModalIcon />}
        isLoading={isActing}
        confirmText="Unarchive"
        confirmClassName="bg-primary text-white"
        onConfirm={handleUnarchive}
      />
    </div>
  );
};

const BookDetailsTemplate = ({
  text,
  value,
}: {
  text: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className={cn('text-sm text-black1', poppins_500.className)}>
        {value}
      </p>
      <h5 className={cn('text-sm text-gray3', poppins_400.className)}>
        {text}
      </h5>
    </div>
  );
};
