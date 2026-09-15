'use client';

import React from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import SearchInput from '@/components/atoms/form/SearchInput';
import { SelectDropdown } from '@/components/atoms/dashboard/students/SelectDropdown';
import { Inter_400, Inter_500, poppins_700 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import libraryActions from '@/app/lib/actions/library.action';
import staffActions from '@/app/lib/actions/staff.action';
import type { BookFormat } from '@/app/lib/types/library.types';

const ALL_FORMATS = 'all';

const FORMAT_OPTIONS = [
  { value: ALL_FORMATS, label: 'All formats' },
  { value: 'physical', label: 'Physical' },
  { value: 'online', label: 'Online' },
];

const TeacherLibraryPage = () => {
  const [search, setSearch] = React.useState('');
  const [format, setFormat] = React.useState<BookFormat | typeof ALL_FORMATS>(ALL_FORMATS);

  const { data: profileResp } = useSWR(['staff-me'], () =>
    staffActions.fetchMyStaffProfile()
  );
  const staffId = profileResp?.data?._id;

  const { data: booksResp, isLoading } = useSWR(
    ['teacher-library-books', search, format],
    () =>
      libraryActions.listBooks({
        search: search || undefined,
        format: format === ALL_FORMATS ? undefined : format,
        archived: 'false',
        limit: 50,
      })
  );
  const books = booksResp?.data || [];

  const { data: myBorrowsResp } = useSWR(
    staffId ? ['my-borrows', staffId] : null,
    () => libraryActions.listBorrows({ audienceId: staffId, isReturned: 'false', limit: 20 })
  );
  const myBorrows = myBorrowsResp?.data || [];

  const openBook = async (bookId: string) => {
    const res = await libraryActions.openBook(bookId);
    if (res.data?.fileUrl) window.open(res.data.fileUrl, '_blank');
  };

  return (
    <div>
      <BreadcrumbBox className="mb-6" crumbs={[{ label: 'Library', isActive: true }]} />

      {myBorrows.length > 0 && (
        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className={cn('text-base text-black1 mb-4', poppins_700.className)}>
            My borrowed books
          </h2>
          <div className="flex flex-col gap-2">
            {myBorrows.map((b) => (
              <div
                key={b._id}
                className="flex items-center justify-between py-2 border-b border-gray4 last:border-b-0"
              >
                <span className={cn('text-sm text-gray1', Inter_500.className)}>
                  {b.bookTitle || 'Unknown book'}
                </span>
                <span className={cn('text-xs text-gray6', Inter_400.className)}>
                  Due {new Date(b.expecteReturnDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        <div className="flex gap-4 mb-6">
          <SearchInput
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[231px] h-[38px] rounded-full bg-[#F7F7F7] border border-gray4"
          />
          <SelectDropdown
            options={FORMAT_OPTIONS}
            value={format}
            onChange={(v) => setFormat(v as BookFormat | typeof ALL_FORMATS)}
            placeholder="Format"
            width={150}
          />
        </div>

        {!isLoading && books.length === 0 ? (
          <p className={cn('text-sm text-gray6 text-center py-12', Inter_400.className)}>
            No books available yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {books.map((book) => (
              <div
                key={book._id}
                className="flex items-center justify-between py-3 border-b border-gray4 last:border-b-0"
              >
                <div>
                  <p className={cn('text-sm text-black1', Inter_500.className)}>{book.title}</p>
                  <p className={cn('text-xs text-gray6', Inter_400.className)}>{book.author}</p>
                </div>
                {book.format === 'online' ? (
                  <button
                    type="button"
                    onClick={() => openBook(book._id)}
                    className={cn(
                      'text-xs px-4 py-1.5 rounded-full bg-primary text-white',
                      Inter_500.className
                    )}
                  >
                    Open
                  </button>
                ) : (
                  <span className={cn('text-xs text-gray6', Inter_400.className)}>
                    {book.copies} {book.copies === 1 ? 'copy' : 'copies'} available
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLibraryPage;
