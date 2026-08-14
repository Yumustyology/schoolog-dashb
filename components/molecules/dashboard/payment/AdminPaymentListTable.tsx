'use client';
import { teacherImg2 } from '@/app/assets';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import { JSX } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/molecules/DataTable';

export type TableRow = {
  subject: string;
  studentId: string;
  guardian: string;
  amount: number;
  total: number;
  classGrade: string;
  paid?: boolean;
  dueDate: string;
  title: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: 'Bello Sambo',
    amount: 60,
    total: 90,
    title: 'School fee',
    classGrade: 'JSS1',
    dueDate: '30/12/2024',
    status: 'Pass',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: 'Bello Sambo',
    amount: 55,
    total: 85,
    title: 'School fee',
    classGrade: 'JSS2',
    dueDate: '30/12/2024',
    status: 'Fair',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: 'Bello Sambo',
    amount: 62,
    total: 97,
    classGrade: 'SS1',
    title: 'School fee',
    dueDate: '30/12/2024',
    status: 'Fail',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: 'Bello Sambo',
    amount: 60,
    total: 95,
    title: 'School fee',
    classGrade: 'SS3',
    dueDate: '30/12/2024',
    status: 'Good',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: 'Bello Sambo',
    amount: 58,
    total: 90,
    classGrade: 'JSS3',
    dueDate: '30/12/2024',
    status: 'Pass',
    title: 'School fee',
  },
];

const columnHelper = createColumnHelper<TableRow>();

const statusClasses = (status: TableRow['status']) =>
  status === 'Pass'
    ? 'text-lightSuccess bg-success'
    : status === 'Good'
      ? 'text-[#F2994A] bg-[#F2994A14]'
      : status === 'Fair'
        ? 'text-[#F2994A] bg-[#F2994A14]'
        : status === 'Fail'
          ? 'text-[#EB5757] bg-[#EB575714]'
          : 'text-gray-600 bg-gray-200';

const columns = [
  columnHelper.accessor('subject', {
    header: 'Student name',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Image src={teacherImg2} alt="teacher-image" />
        {info.getValue()}
      </div>
    ),
    meta: { useTypography: false },
  }),
  columnHelper.accessor('guardian', {
    header: 'Guardian name',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Image src={teacherImg2} alt="teacher-image" />
        {info.getValue()}
      </div>
    ),
    meta: { useTypography: false },
  }),
  columnHelper.accessor('studentId', {
    header: 'Student ID',
  }),
  columnHelper.accessor('classGrade', {
    header: 'Class',
  }),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('total', {
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const row = info.row.original;
      return (
        <span className={cn('font-normal rounded-full w-[92px] py-1.5 px-8', statusClasses(row.status))}>
          {info.getValue()}%
        </span>
      );
    },
    meta: { useTypography: false },
  }),
  columnHelper.accessor('dueDate', {
    header: 'Due date',
  }),
];

export function AdminPaymentListTable(): JSX.Element {
  return (
    <div>
      <DataTable
        data={TABLE_ROWS}
        columns={columns}
        isLoading={false}
        theadClassName=""
        thClassName={cn('bg-[#FBFBFB] p-4 font-normal text-sm text-gray1 leading-none opacity-70', poppins_400.className)}
        tdClassName={cn('border-gray4 text-sm font-normal text-gray1', poppins_400.className)}
        tableClassName="w-full min-w-max table-auto text-left"
        useCardWrapper={false}
        wrapCellsInTypography={false}
        wrapHeadersInTypography={false}
        enableSorting={false}
        enableFiltering={false}
      />
      <footer
        className={cn(
          'w-full mt-6 flex justify-between items-center',
          poppins_500.className
        )}
      >
        <div className="flex gap-4 items-center">
          <h5> Showing </h5>
          <SelectBox />
        </div>

        <div>
          <PaginationBox />
        </div>
      </footer>
    </div>
  );
}
