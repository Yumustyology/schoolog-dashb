'use client';
import React from 'react';
import useSWR, { mutate } from 'swr';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Empty from '@/components/molecules/empty/Empty';
import {
  ArchiveIcon,
  NoBooksIcon,
  UnarchiveIcon,
  DeleteIcon,
} from '@/components/atoms/icons/Icons';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';
import SearchInput from '@/components/atoms/form/SearchInput';
import { SelectDropdown } from '@/components/atoms/dashboard/students/SelectDropdown';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import showToast from '@/app/lib/utils/toast';
import libraryActions from '@/app/lib/actions/library.action';
import type { Book, BookFormat } from '@/app/lib/types/library.types';
import Link from 'next/link';

const ALL_FORMATS = 'all';

const FORMAT_OPTIONS = [
  { value: ALL_FORMATS, label: 'All formats' },
  { value: 'physical', label: 'Physical' },
  { value: 'online', label: 'Online' },
];

const columnHelper = createColumnHelper<Book>();

const LIBRARY_BOOKS_KEY = 'library-books';

export const refreshLibraryBooks = () =>
  mutate((key: unknown) => Array.isArray(key) && key[0] === LIBRARY_BOOKS_KEY);

function AvailbelBooksTableList() {
  const [search, setSearch] = React.useState('');
  const [format, setFormat] = React.useState<BookFormat | typeof ALL_FORMATS>(ALL_FORMATS);
  const [pendingAction, setPendingAction] = React.useState<{
    book: Book;
    action: 'archive' | 'unarchive' | 'delete';
  } | null>(null);
  const [isActing, setIsActing] = React.useState(false);

  const { data, isLoading } = useSWR(
    [LIBRARY_BOOKS_KEY, search, format],
    () =>
      libraryActions.listBooks({
        search: search || undefined,
        format: format === ALL_FORMATS ? undefined : format,
        archived: 'false',
        limit: 50,
      })
  );

  const books = data?.data || [];

  const confirmAction = async () => {
    if (!pendingAction) return;
    setIsActing(true);
    try {
      const { book, action } = pendingAction;
      if (action === 'archive') {
        await libraryActions.archiveBook(book._id);
        showToast('Book archived', 'book-archived', { type: 'success' });
      } else if (action === 'unarchive') {
        await libraryActions.unarchiveBook(book._id);
        showToast('Book unarchived', 'book-unarchived', { type: 'success' });
      } else {
        await libraryActions.deleteBook(book._id);
        showToast('Book deleted', 'book-deleted', { type: 'success' });
      }
      setPendingAction(null);
      refreshLibraryBooks();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsActing(false);
    }
  };

  const columns = [
    columnHelper.accessor('title', {
      header: 'Book',
      cell: (info) => (
        <Link
          href={`/school/library/${info.row.original._id}`}
          className="flex gap-2 items-center text-sm text-black1 hover:underline"
        >
          {info.getValue()}
        </Link>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('author', { header: 'Author' }),
    columnHelper.accessor('format', {
      header: 'Format',
      cell: (info) => (
        <span
          className={cn(
            'font-normal rounded-full py-1.5 px-3 text-xs',
            info.getValue() === 'online'
              ? 'text-primary bg-primary1'
              : 'text-[#001F3F] bg-gray4'
          )}
        >
          {info.getValue() === 'online' ? 'Online' : 'Physical'}
        </span>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.display({
      id: 'copiesOrType',
      header: 'Copies / Type',
      cell: (info) => {
        const book = info.row.original;
        return book.format === 'online' ? (
          <span className="text-sm uppercase text-gray6">{book.fileType || 'file'}</span>
        ) : (
          <span className="text-sm">{book.copies}</span>
        );
      },
    }),
    columnHelper.display({
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const book = info.row.original;
        const status = book.isArchived
          ? 'Archived'
          : book.format === 'physical' && book.copies < 1
            ? 'Out of Stock'
            : 'Available';
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              status === 'Available'
                ? 'text-primary bg-primary1'
                : status === 'Out of Stock'
                  ? 'text-[#EB5757] bg-[#EB575714]'
                  : 'text-[#F2994A] bg-[#F2994A14]'
            )}
          >
            {status}
          </div>
        );
      },
      meta: { useTypography: false },
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => {
        const book = info.row.original;
        const menuItems = [
          ...(book.format === 'online'
            ? [
                {
                  label: 'Open',
                  onClick: () => window.open(book.fileUrl || '#', '_blank'),
                  icon: <NoBooksIcon />,
                },
              ]
            : []),
          book.isArchived
            ? {
                label: 'Unarchive',
                onClick: () => setPendingAction({ book, action: 'unarchive' }),
                icon: <UnarchiveIcon />,
              }
            : {
                label: 'Archive',
                onClick: () => setPendingAction({ book, action: 'archive' }),
                icon: <ArchiveIcon />,
              },
          {
            label: 'Delete',
            onClick: () => setPendingAction({ book, action: 'delete' }),
            icon: <DeleteIcon />,
          },
        ];
        return (
          <MenuLists
            label="Options"
            items={menuItems}
            placement="bottom-start"
            maxHeight="150px"
          />
        );
      },
    }),
  ];

  return (
    <div className="my-8">
      <div className="flex gap-4 mb-4">
        <SearchInput
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[231px] h-[38px] rounded-full bg-[#F7F7F7] border border-gray4"
        />
        <SelectDropdown
          options={FORMAT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={format}
          onChange={(v) => setFormat(v as BookFormat | typeof ALL_FORMATS)}
          placeholder="Format"
          width={150}
        />
      </div>

      {!isLoading && books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoBooksIcon />}
            title="No book yet"
            description="You have not yet uploaded any book. Click the button below to upload a book"
            buttonText="+ Add Book"
          />
        </div>
      ) : (
        <DataTable
          data={books}
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
        open={!!pendingAction}
        close={() => setPendingAction(null)}
        title={
          pendingAction?.action === 'delete'
            ? 'Delete book'
            : pendingAction?.action === 'archive'
              ? 'Archive book'
              : 'Unarchive book'
        }
        body={
          pendingAction?.action === 'delete'
            ? `Are you sure you want to delete "${pendingAction?.book.title}"? This action cannot be undone.`
            : pendingAction?.action === 'archive'
              ? `Archive "${pendingAction?.book.title}"? It won't be visible to students and staff.`
              : `Unarchive "${pendingAction?.book.title}"? It will become visible again.`
        }
        isLoading={isActing}
        confirmText={
          pendingAction?.action === 'delete'
            ? 'Delete'
            : pendingAction?.action === 'archive'
              ? 'Archive'
              : 'Unarchive'
        }
        confirmClassName={
          pendingAction?.action === 'unarchive' ? 'bg-primary text-white' : 'bg-r text-white'
        }
        onConfirm={confirmAction}
      />
    </div>
  );
}

export default AvailbelBooksTableList;
