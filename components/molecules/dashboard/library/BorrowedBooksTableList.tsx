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
import { mathTextbook, teacherImg } from '@/app/assets';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';

type BooksListType = {
  bookImage: string;
  bookName: string;
  studentImage: string;
  studnetName: string;
  borrowedDate: string;
  dueDate: string;
  fine: number;
  status: 'Pending' | 'Due';
}[];

const columnHelper = createColumnHelper<BooksListType[number]>();

function BorrowedBooksTableList() {
  const borrowedBookList: BooksListType = [
    {
      bookImage: '',
      bookName: 'General Mathematics',
      studentImage: '',
      studnetName: 'Jamiu Muhammad',
      borrowedDate: '2/3/2025',
      dueDate: '3/4/2025',
      fine: 4,
      status: 'Pending',
    },
    {
      bookImage: '',
      bookName: 'General Mathematics',
      studentImage: '',
      studnetName: 'Jamiu Muhammad',
      borrowedDate: '2/3/2025',
      dueDate: '3/4/2025',
      fine: 4,
      status: 'Pending',
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
  ];

  const columns = [
    columnHelper.accessor('bookName', {
      header: 'Book',
      cell: (info) => (
        <div className="flex gap-2 items-center text-sm">
          <Image src={mathTextbook} alt="" width={40} height={40} />
          {info.getValue()}
        </div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('studnetName', {
      header: 'Student',
      cell: (info) => (
        <div className="flex gap-2 items-center text-sm">
          <Image src={teacherImg} alt="" />
          {info.getValue()}
        </div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('borrowedDate', {
      header: 'Borrowed date ',
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due date',
    }),
    columnHelper.accessor('fine', {
      header: 'Fine',
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              status === 'Pending'
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
      {borrowedBookList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoBooksIcon />}
            title="No bporrowed book yet"
            description="You have not yet uploaded any book. Click the button below to upload a book"
            buttonText="+ Add Book"
          />
        </div>
      ) : (
        <DataTable
          data={borrowedBookList}
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

export default BorrowedBooksTableList;
