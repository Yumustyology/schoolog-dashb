'use client';
import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Empty from '@/components/molecules/empty/Empty';
import {
  ArchiveIcon,
  EditIcon,
  NoBooksIcon,
  ViewProfileEyeIcon,
} from '@/components/atoms/icons/Icons';

import Image from 'next/image';
import { mathTextbook } from '@/app/assets';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';

type BooksListType = {
  bookImage: string;
  bookName: string;
  class: string;
  noOfUploadedBooks: number;
  numberOfLeftBooks: number;
  numberOfBorrowedBooks: number;
  status: 'Available' | 'Out of Stock' | 'Archived';
}[];

const columnHelper = createColumnHelper<BooksListType[number]>();

function AvailbelBooksTableList() {
  const availableBooksList: BooksListType = [
    {
      bookImage: '',
      bookName: 'General Mathematics',
      class: 'SS1',
      noOfUploadedBooks: 22,
      numberOfLeftBooks: 10,
      numberOfBorrowedBooks: 12,
      status: 'Available',
    },
  ];

  const menuItems = [
    {
      label: 'View details',
      onClick: () => console.log('Profile clicked'),
      icon: <ViewProfileEyeIcon />,
    },
    {
      label: 'Edit details',
      onClick: () => console.log('Settings clicked'),
      icon: <EditIcon size="24" />,
    },
    {
      label: 'Archive',
      onClick: () => console.log('Logout clicked'),
      icon: <ArchiveIcon />,
    },
  ];

  const columns = [
    columnHelper.accessor('bookName', {
      header: 'Books',
      cell: (info) => (
        <div className="flex gap-2 items-center text-sm">
          <Image src={mathTextbook} alt="" width={40} height={46} />
          {info.getValue()}
        </div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('class', {
      header: 'Class',
    }),
    columnHelper.accessor('noOfUploadedBooks', {
      header: 'Total uploaded',
    }),
    columnHelper.accessor('numberOfLeftBooks', {
      header: 'Total left',
    }),
    columnHelper.accessor('numberOfBorrowedBooks', {
      header: 'Total borrowed',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              status === 'Available'
                ? 'text-primary bg-primary1'
                : status === 'Out of Stock'
                  ? 'text-[#EB5757] bg-[#EB575714]'
                  : status === 'Archived'
                    ? 'text-[#F2994A] bg-[#F2994A14]'
                    : 'text-gray-600 bg-gray-200'
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
      cell: () => (
        <MenuLists
          label="Options"
          items={menuItems}
          placement="bottom-start"
          maxHeight="150px"
        />
      ),
    }),
  ];

  return (
    <div className="my-8 ">
      {availableBooksList.length === 0 ? (
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
          data={availableBooksList}
          columns={columns}
          isLoading={false}
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
    </div>
  );
}

export default AvailbelBooksTableList;
