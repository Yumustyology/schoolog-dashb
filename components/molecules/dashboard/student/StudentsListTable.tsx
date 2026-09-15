'use client';
import useSWR from 'swr';
import studentActions from '@/app/lib/actions/student.actions';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import TextAvatar from '@/components/atoms/TextAvatar';
import AvatarIcon from '@/components/atoms/AvatarIcon';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/molecules/DataTable';

export type StudentTableRow = {
  sn: number;
  id: string;
  name: string;
  studentCode: string;
  gender: string;
  image?: string;
  firstName?: string;
  lastName?: string;
};

const columnHelper = createColumnHelper<StudentTableRow>();

const columns = [
  columnHelper.accessor('sn', {
    header: 'S/N',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Student Name',
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200">
            {row.image ? (
              <Image
                src={row.image}
                alt={row.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : row.firstName || row.lastName ? (
              <TextAvatar
                firstName={row.firstName || ''}
                lastName={row.lastName || ''}
                size={32}
              />
            ) : (
              <AvatarIcon size={32} />
            )}
          </div>
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      );
    },
    meta: { useTypography: false },
  }),
  columnHelper.accessor('studentCode', {
    header: 'Student ID',
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => (
      <span className="capitalize text-gray-700">{info.getValue() || '-'}</span>
    ),
  }),
];

export function StudentsListTable({
  classGradeId,
  students: passedStudents,
}: {
  classGradeId?: string;
  students?: any[];
}): JSX.Element {
  const { data: fetchResp, isLoading } = useSWR(
    !passedStudents && classGradeId ? ['/students/classGrade', classGradeId] : null,
    () => studentActions.fetchStudents({ classGrade: classGradeId }),
    { revalidateOnFocus: false }
  );

  const rawList = passedStudents || (fetchResp?.data as any[]) || [];

  const tableData: StudentTableRow[] = rawList.map((st: any, idx: number) => {
    const fn = st.firstName || st.user?.firstName || '';
    const ln = st.lastName || st.user?.lastName || '';
    const fullName = `${fn} ${ln}`.trim() || st.name || st.email || 'Student';
    const code = st.studentId || st.admissionNumber || st.regNo || st._id?.slice(-6) || '-';

    return {
      sn: idx + 1,
      id: st._id || String(idx),
      name: fullName,
      studentCode: code,
      gender: st.gender || st.user?.gender || '-',
      image: st.image || st.avatar || st.user?.avatar,
      firstName: fn,
      lastName: ln,
    };
  });

  if (!isLoading && tableData.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className={cn('text-sm', poppins_400.className)}>
          No students enrolled in this class grade yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        theadClassName=""
        thClassName={cn(
          'bg-[#FBFBFB] p-4 font-normal text-sm text-gray1 leading-none opacity-70',
          poppins_400.className
        )}
        tdClassName={cn('border-gray4 text-sm font-normal text-gray1', poppins_400.className)}
        tableClassName="w-full min-w-max table-auto text-left"
        useCardWrapper={false}
        wrapCellsInTypography={false}
        wrapHeadersInTypography={false}
        enableSorting={false}
        enableFiltering={false}
      />
    </div>
  );
}

