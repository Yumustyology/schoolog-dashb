'use client';
import React from 'react';
import useSWR, { mutate } from 'swr';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Empty from '@/components/molecules/empty/Empty';
import { NoBooksIcon, SolidCheckIcon } from '@/components/atoms/icons/Icons';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';
import SearchInput from '@/components/atoms/form/SearchInput';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import showToast from '@/app/lib/utils/toast';
import libraryActions from '@/app/lib/actions/library.action';
import type { BorrowRecord } from '@/app/lib/types/library.types';
import { formatDate } from '@/app/lib/utils/dateUtils';

const columnHelper = createColumnHelper<BorrowRecord>();

export const LIBRARY_BORROWS_KEY = 'library-borrows';
export const refreshLibraryBorrows = () =>
  mutate((key: unknown) => Array.isArray(key) && key[0] === LIBRARY_BORROWS_KEY);

function BorrowedBooksTableList() {
  const [search, setSearch] = React.useState('');
  const [returningId, setReturningId] = React.useState<string | null>(null);
  const [isReturning, setIsReturning] = React.useState(false);

  const { data, isLoading } = useSWR([LIBRARY_BORROWS_KEY], () =>
    libraryActions.listBorrows({ isReturned: 'false', limit: 50 })
  );

  const allBorrows = data?.data || [];
  const term = search.trim().toLowerCase();
  const borrows = term
    ? allBorrows.filter(
        (b) =>
          b.bookTitle?.toLowerCase().includes(term) ||
          b.audienceName?.toLowerCase().includes(term)
      )
    : allBorrows;

  const confirmReturn = async () => {
    if (!returningId) return;
    setIsReturning(true);
    try {
      await libraryActions.returnBook(returningId);
      showToast('Book returned', 'book-returned', { type: 'success' });
      setReturningId(null);
      refreshLibraryBorrows();
      // returning a physical book restores its stock count
      mutate((key: unknown) => Array.isArray(key) && key[0] === 'library-books');
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsReturning(false);
    }
  };

  const columns = [
    columnHelper.accessor('bookTitle', {
      header: 'Book',
      cell: (info) => (
        <div className="flex gap-2 items-center text-sm">{info.getValue() || 'Unknown'}</div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('audienceName', {
      header: 'Borrower',
      cell: (info) => (
        <div className="flex flex-col text-sm">
          <span>{info.getValue() || 'Unknown'}</span>
          <span className="text-xs text-gray6">{info.row.original.audienceType}</span>
        </div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('borrowedDate', {
      header: 'Borrowed date',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('expecteReturnDate', {
      header: 'Due date',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.display({
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const isOverdue = new Date(info.row.original.expecteReturnDate) < new Date();
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              isOverdue ? 'text-[#EB5757] bg-[#EB575714]' : 'text-[#F2994A] bg-[#F2994A14]'
            )}
          >
            {isOverdue ? 'Overdue' : 'Pending'}
          </div>
        );
      },
      meta: { useTypography: false },
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => (
        <MenuLists
          label="Options"
          items={[
            {
              label: 'Mark returned',
              onClick: () => setReturningId(info.row.original._id),
              icon: <SolidCheckIcon />,
            },
          ]}
          placement="bottom-start"
          maxHeight="150px"
        />
      ),
    }),
  ];

  return (
    <div className="my-8 ">
      <div className="flex gap-6 mb-4">
        <SearchInput
          placeholder="Search book or borrower..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[231px] h-[38px] rounded-full bg-[#F7F7F7] border border-gray4"
        />
      </div>

      {!isLoading && borrows.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoBooksIcon />}
            title="No borrowed books"
            description="No books are currently checked out."
          />
        </div>
      ) : (
        <DataTable
          data={borrows}
          columns={columns}
          isLoading={isLoading}
          theadClassName={cn('bg-[#FBFBFB] border-none text-gray text-sm', Inter_500.className)}
          tdClassName="p-4"
          rowClassName={cn('border-b border-gray4 text-gray1 text-base items-center', Inter_400.className)}
          tableClassName="border-none bg-white w-full caption-bottom text-sm"
          useCardWrapper={false}
          wrapCellsInTypography={false}
          wrapHeadersInTypography={false}
          enableSorting={false}
          enableFiltering={false}
        />
      )}

      <ConfirmModal
        open={!!returningId}
        close={() => setReturningId(null)}
        title="Mark book as returned"
        body="Confirm that this book has been physically returned to the library."
        isLoading={isReturning}
        confirmText="Mark returned"
        confirmClassName="bg-primary text-white"
        onConfirm={confirmReturn}
      />
    </div>
  );
}

export default BorrowedBooksTableList;
