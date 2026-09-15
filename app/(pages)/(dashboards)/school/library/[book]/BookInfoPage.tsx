'use client';

import { poppins_700 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { BookInfoPageHeader } from '@/components/molecules/dashboard/library/BookInfoPageHeader';
import BorrowersTableList from '@/components/molecules/dashboard/library/BorrowersTableList';
import BookReadersList from '@/components/molecules/dashboard/library/BookReadersList';
import libraryActions from '@/app/lib/actions/library.action';
import type { Book } from '@/app/lib/types/library.types';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

export const BookInfoPage = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR(['library-book', bookId], () =>
    libraryActions.getBook(bookId)
  );
  const book = data?.data as Book | undefined;

  if (isLoading) {
    return <div className="p-12 text-center text-sm text-gray6">Loading book...</div>;
  }

  if (!book) {
    return (
      <div className="p-12 text-center text-sm text-gray6">
        Book not found.
      </div>
    );
  }

  return (
    <div className="">
      <BreadcrumbBox
        className="mb-0"
        crumbs={[
          { label: 'Library', isActive: false, href: '/school/library' },
          { label: book.title, isActive: true },
        ]}
      />

      <main className="">
        <BookInfoPageHeader
          book={book}
          onChanged={() => mutate()}
          onDeleted={() => router.replace('/school/library')}
        />

        <div className="bg-white p-6 mt-6 rounded-2xl">
          <h2 className={cn('text-base text-black1 mb-4', poppins_700.className)}>
            {book.format === 'online' ? 'Readers' : 'Borrowers list'}
          </h2>

          {book.format === 'online' ? (
            <BookReadersList bookId={book._id} />
          ) : (
            <BorrowersTableList bookId={book._id} />
          )}
        </div>
      </main>
    </div>
  );
};

export default BookInfoPage;
