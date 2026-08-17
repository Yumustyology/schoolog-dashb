'use client';
import { biology1 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import Button from '@/components/atoms/form/Button';
import {
  ArchiveIcon,
  DeleteIcon,
  UnarchiveIcon,
} from '@/components/atoms/icons/Icons';
import Image from 'next/image';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import libraryActions from '@/app/lib/actions/library.action';
import showToast from '@/app/lib/utils/toast';

export const BookInfoPageHeader = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: bookResp } = useSWR(
    bookId ? ['book', bookId] : null,
    () => libraryActions.fetchBookById(bookId)
  );
  const book = bookResp?.data;

  const revalidateBook = () =>
    mutate((key) => Array.isArray(key) && key[0] === 'book' && key[1] === bookId);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await libraryActions.deleteBook(bookId);
      showToast('Book deleted successfully', 'book-deleted', {
        theme: 'light',
        type: 'success',
      });
      setDeleteModal(false);
      router.push('/school/library');
    } catch (error) {
      showToast('Failed to delete book', 'book-delete-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error deleting book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async () => {
    setIsSubmitting(true);
    try {
      await libraryActions.archiveBook(bookId);
      showToast('Book archived successfully', 'book-archived', {
        theme: 'light',
        type: 'success',
      });
      setArchiveModal(false);
      revalidateBook();
    } catch (error) {
      showToast('Failed to archive book', 'book-archive-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error archiving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnarchive = async () => {
    setIsSubmitting(true);
    try {
      await libraryActions.unarchiveBook(bookId);
      showToast('Book unarchived successfully', 'book-unarchived', {
        theme: 'light',
        type: 'success',
      });
      setUnarchiveModal(false);
      revalidateBook();
    } catch (error) {
      showToast('Failed to unarchive book', 'book-unarchive-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error unarchiving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 my-8 rounded-2xl flex justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Image src={biology1} alt="Book cover" />
          <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              {book?.title || 'Untitled'}
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              {book?.author || ''}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <BookDetailsTemplate text="Copies" value={String(book?.copies ?? 0)} />
        </div>
      </div>

      <div className=" flex flex-col justify-between">
        <p
          className={cn(
            'text-primary ml-auto rounded-full w-fit bg-light py-1.5 px-3'
          )}
        >
          {book?.isArchived ? 'Archived' : 'Available'}
        </p>

        <div className="flex gap-5 justify-between">
          <Button
            round
            flat
            className={cn('flex  text-r2 h-[48px] w-[191px] border border-r2')}
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon />
            <span className="text-r2">Delete Book</span>
          </Button>

          {book?.isArchived ? (
            <Button
              round
              className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
              onClick={() => setUnarchiveModal(true)}
            >
              <UnarchiveIcon color="#21B55A" />
              <span className="text-primary">Post book </span>
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
        body="Are you sure you want to delete this book? this book can’t be recovered"
        icon={<DeleteIcon size={24} />}
        onConfirm={handleDelete}
        confirmText="Delete"
        isLoading={isSubmitting}
      />
      <ConfirmModal
        open={archiveModal}
        close={() => setArchiveModal(false)}
        title="Archive book"
        body="Are you sure you want to archive this book? it won’t be visible to students and teachers again"
        icon={<ArchiveIcon size={24} />}
        onConfirm={handleArchive}
        confirmText="Archive"
        isLoading={isSubmitting}
      />
      <ConfirmModal
        open={unarchiveModal}
        close={() => setUnarchiveModal(false)}
        title="Post book"
        body="Are you sure you want to post this book? This will make it visible to students and teachers"
        icon={<UnarchiveIcon size={24} />}
        onConfirm={handleUnarchive}
        confirmText="Post book"
        isLoading={isSubmitting}
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
