'use client';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { JSX } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/molecules/DataTable';

export type TableRow = {
  serialnumber: string;
  subject: string;
  firstCA: number;
  secondCA: number;
  examScore: number;
  total: number;
  paid?: boolean;
  grade: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    serialnumber: '01',
    subject: 'Mathematics',
    firstCA: 16,
    secondCA: 18,
    examScore: 60,
    total: 90,
    grade: 'A',
    status: 'Pass',
  },
  {
    serialnumber: '02',
    subject: 'English',
    firstCA: 14,
    secondCA: 16,
    examScore: 55,
    total: 85,
    grade: 'B',
    status: 'Fair',
  },
  {
    serialnumber: '03',
    subject: 'Physics',
    firstCA: 18,
    secondCA: 17,
    examScore: 62,
    total: 97,
    grade: 'A',
    status: 'Fail',
  },
  {
    serialnumber: '04',
    subject: 'Chemistry',
    firstCA: 16,
    secondCA: 19,
    examScore: 60,
    total: 95,
    grade: 'A',
    status: 'Good',
  },
  {
    serialnumber: '05',
    subject: 'Biology',
    firstCA: 15,
    secondCA: 17,
    examScore: 58,
    total: 90,
    grade: 'B',
    status: 'Pass',
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
  columnHelper.accessor('serialnumber', {
    header: 'S/N',
  }),
  columnHelper.accessor('subject', {
    header: 'Subject',
  }),
  columnHelper.accessor('firstCA', {
    header: 'First CA',
  }),
  columnHelper.accessor('secondCA', {
    header: 'Second CA',
  }),
  columnHelper.accessor('examScore', {
    header: 'Exam',
  }),
  columnHelper.accessor('total', {
    header: 'Total',
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span className={cn('font-normal rounded-full w-[92px] py-1.5 px-8', statusClasses(info.getValue()))}>
        {info.getValue()}
      </span>
    ),
    meta: { useTypography: false },
  }),
];

export function ResultTable(): JSX.Element {
  return (
    <DataTable
      data={TABLE_ROWS}
      columns={columns}
      isLoading={false}
      theadClassName=""
      thClassName={cn('bg-[#FBFBFB] p-4 font-normal text-sm text-gray1 leading-none opacity-70', poppins_400.className)}
      tdClassName={cn('border-gray4 font-normal text-gray1', poppins_400.className)}
      tableClassName="w-full min-w-max table-auto text-left"
      useCardWrapper={false}
      wrapCellsInTypography={false}
      wrapHeadersInTypography={false}
      enableSorting={false}
      enableFiltering={false}
    />
  );
}
