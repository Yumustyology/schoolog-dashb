'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import {
  NoStudentIcon,
  PromoteIcon,
  SuspendIcon,
  ViewProfileEyeIcon,
} from '../../icons/Icons';
import MenuLists from './MenuLists';
import Message from '../../icons/SideBar/Message';
import CancelIcon from '../../icons/dashboard/CancelIcon';
import Empty from '@/components/molecules/empty/Empty';
import PaginationControl from '@/components/atoms/pagination/PaginationControl';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { getClassGradeName } from '@/app/lib/utils/classGradeUtils';
import type { Meta } from '@/app/lib/types/meta.types';
import studentActions from '@/app/lib/actions/student.actions';
import StudentListSkeleton from '@/components/atoms/skeleton/StudentListSkeleton';
import { getStatusClass } from '@/app/lib/constants/status';
import AvatarIcon from '@/components/atoms/AvatarIcon';
import DataTable from '@/components/molecules/DataTable';

type StudentRow = {
  id: string;
  firstName?: string;
  lastName?: string;
  studentSlugId?: string;
  index?: string | number;
  status?: string;
  classGrade?: string;
  classGrade_obj?: any;
  photo?: string | null;
};

type Props = {
  search: string;
  debouncedSearch: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  setPage: (n: number) => void;
  pageSize: number;
  setPageSize: (n: number) => void;
  hasEverLoadedData: boolean;
  setHasEverLoadedData: (v: boolean) => void;
  classId?: string | null;
};

export default function StudentsTableList({
  // search: _search,
  debouncedSearch,
  // handleSearchChange: _handleSearchChange,
  page,
  setPage,
  pageSize,
  setPageSize,
  hasEverLoadedData,
  setHasEverLoadedData,
  classId = null,
}: Props) {
  const { classGrades, classGradeIsLoading, selectedClassGrade } =
    useClassGradeFilter({
      disableUrlSync: !!classId,
    });

  const effectiveClassId = classId ?? selectedClassGrade ?? '';

  const swrKey = [
    'students',
    debouncedSearch || '',
    effectiveClassId || '',
    page,
    pageSize,
  ];

  const { data: studentsResp, isLoading } = useSWR(swrKey, async () => {
    const q: Record<string, string | number | boolean> = {
      page,
      limit: pageSize,
    };
    if (debouncedSearch) q.search = debouncedSearch;
    if (effectiveClassId && effectiveClassId !== 'all')
      q.classGradeId = effectiveClassId;
    return studentActions.fetchStudents(q);
  });

  const students: StudentRow[] = Array.isArray(studentsResp?.data)
    ? (studentsResp?.data as StudentRow[])
    : [];
  const meta = (studentsResp?.meta as Meta) ?? ({ count: 0 } as Meta);
  const computedTotalPages = Math.max(
    1,
    Math.ceil((meta.count || 0) / pageSize)
  );

  useEffect(() => {
    if (typeof studentsResp !== 'undefined') setHasEverLoadedData(true);
  }, [studentsResp, setHasEverLoadedData]);

  const menuItems = [
    {
      label: 'View Profile',
      onClick: () => console.log('Profile'),
      icon: <ViewProfileEyeIcon />,
    },
    {
      label: 'Message',
      onClick: () => console.log('Message'),
      icon: <Message size="24" />,
    },
    {
      label: 'Move',
      onClick: () => console.log('Move'),
      icon: <PromoteIcon size="24" />,
    },
    {
      label: 'Suspend',
      onClick: () => console.log('Suspend'),
      icon: <SuspendIcon />,
    },
    {
      label: 'Withdraw',
      onClick: () => console.log('Withdraw'),
      icon: <CancelIcon />,
      danger: true,
    },
  ];

  const isSearching =
    (debouncedSearch || '').toString().trim().length > 0 ||
    !!selectedClassGrade;
  const loading = (classGradeIsLoading && !selectedClassGrade) || isLoading;
  const showNoResults = students.length === 0 && !loading && isSearching;
  const showNoStudentCreated =
    students.length === 0 && !loading && !isSearching && hasEverLoadedData;

  const selectedClassLabel =
    selectedClassGrade === 'all'
      ? 'All'
      : classGradeIsLoading && (!classGrades || classGrades.length === 0)
        ? 'Loading…'
        : getClassGradeName(selectedClassGrade ?? undefined, classGrades, '');

  const columnHelper = createColumnHelper<StudentRow>();

  const columns = [
    columnHelper.accessor('firstName', {
      header: 'Student Name',
      cell: (info) => {
        const student = info.row.original;
        return (
          <div className="flex gap-2 items-center text-sm">
            <AvatarIcon size={40} src={student.photo} />
            <span className="ml-2">
              {student.firstName} {student.lastName}
            </span>
          </div>
        );
      },
      meta: { useTypography: false },
    }),
    columnHelper.accessor('studentSlugId', {
      header: 'ID',
      cell: (info) => info.getValue() || info.row.original.id,
    }),
    ...(selectedClassGrade === 'all'
      ? [
          columnHelper.accessor('classGrade_obj', {
            header: 'Grade',
            cell: (info: any) => (
              <span className="text-sm">
                {info.getValue()?.name ??
                  getClassGradeName(
                    info.row.original.classGrade ?? undefined,
                    classGrades,
                    'All'
                  )}
              </span>
            ),
          }),
        ]
      : []),
    columnHelper.display({
      id: 'attendance',
      header: 'Attendance',
      cell: () => '-',
    }),
    columnHelper.accessor('index', {
      header: 'Rank',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              getStatusClass(status)
            )}
          >
            {String(status || '')
              .replace(/_/g, ' ')
              .replace(/(^|\s)\S/g, (t) => t.toUpperCase())}
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

  const loadingComponent = (
    <StudentListSkeleton selectedClassGrade={selectedClassGrade} />
  );

  return (
    <div className="my-8">
      {classGrades.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoStudentIcon />}
            title="No student added"
            description="You have not yet added any student, Click the button below to add student"
            buttonText="+ Add students"
          />
        </div>
      ) : (
        <>
          {loading ? (
            loadingComponent
          ) : showNoStudentCreated ? (
            <div className="col-span-full p-6 text-center">
              <div className="w-full flex justify-center">
                <NoStudentIcon />
              </div>
              <h3
                className={cn(
                  'text-lg font-semibold text-black1 mt-8',
                  Inter_500.className
                )}
              >
                No students found
              </h3>
            </div>
          ) : showNoResults ? (
            selectedClassGrade && !(debouncedSearch || '').trim().length ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6">
                  <NoStudentIcon />
                </div>
                <p
                  className={cn(
                    'text-[#071E3B] text-lg font-semibold mb-2',
                    Inter_500.className
                  )}
                >
                  No students found in {selectedClassLabel || 'selected class'}
                </p>
                <p className={cn('text-[#667085] text-sm')}>
                  Try adjusting your search terms or filters
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6">
                  <NoStudentIcon />
                </div>
                <p
                  className={cn(
                    'text-[#071E3B] text-lg font-semibold mb-2',
                    Inter_500.className
                  )}
                >
                  No students found for &quot;{debouncedSearch}&quot;
                </p>
                <p className={cn('text-[#667085] text-sm')}>
                  Try adjusting your search terms or filters
                </p>
              </div>
            )
          ) : (
            <>
              <DataTable
                data={students}
                columns={columns}
                isLoading={false}
                theadClassName={cn('bg-[#FBFBFB]', Inter_500.className)}
                tbodyClassName=""
                thClassName="p-4"
                tdClassName="p-4"
                rowClassName={cn('border-b border-gray4', Inter_400.className)}
                tableClassName="text-sm text-black-500 font-nunito w-full min-w-max font-medium table-auto text-left"
                useCardWrapper={false}
                wrapCellsInTypography={true}
                wrapHeadersInTypography={true}
                enableSorting={false}
                enableFiltering={false}
              />
              <div className="mt-6">
                <PaginationControl
                  totalPages={computedTotalPages}
                  currentPage={page}
                  setCurrentPage={setPage}
                  pageSize={pageSize}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                  hasNextPage={page < computedTotalPages}
                  hasPrevPage={page > 1}
                  recordLength={meta.count || students.length}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
