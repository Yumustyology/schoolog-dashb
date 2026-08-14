'use client';
import { teacherImg2 } from '@/app/assets';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/molecules/DataTable';

export type TableRow = {
  subject: string;
  studentId: string;
  secondCA: number;
  examScore: number;
  total: number;
  rank: string;
  paid?: boolean;
  grade: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    subject: 'Mathematics',
    studentId: '172928739HD',
    secondCA: 18,
    examScore: 60,
    total: 90,
    grade: 'A',
    status: 'Pass',
    rank: 'First',
  },
  {
    subject: 'English',
    studentId: '172928739HD',
    secondCA: 16,
    examScore: 55,
    total: 85,
    rank: 'First',
    grade: 'B',
    status: 'Fair',
  },
  {
    subject: 'Physics',
    studentId: '172928739HD',
    rank: 'First',
    secondCA: 17,
    examScore: 62,
    total: 97,
    grade: 'A',
    status: 'Fail',
  },
  {
    subject: 'Chemistry',
    studentId: '172928739HD',
    secondCA: 19,
    examScore: 60,
    total: 95,
    grade: 'A',
    rank: 'First',
    status: 'Good',
  },
  {
    subject: 'Biology',
    studentId: '172928739HD',
    secondCA: 17,
    examScore: 58,
    total: 90,
    rank: 'First',
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
  columnHelper.accessor('subject', {
    header: 'S/N',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Image src={teacherImg2} alt="teacher-image" />
        {info.getValue()}
      </div>
    ),
    meta: { useTypography: false },
  }),
  columnHelper.accessor('studentId', {
    header: 'Student name',
  }),
  columnHelper.accessor('secondCA', {
    header: 'ID',
  }),
  columnHelper.accessor('examScore', {
    header: 'Class',
  }),
  columnHelper.accessor('total', {
    id: 'attendance',
    header: 'Attendance',
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
  columnHelper.accessor('grade', {
    header: 'Grade',
  }),
  columnHelper.accessor('rank', {
    header: 'Rank',
  }),
];

export function StudentsListTable(): JSX.Element {
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
