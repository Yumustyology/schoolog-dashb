'use client';

import React from 'react';
import useSWR from 'swr';
import { debounce } from 'lodash';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import NoClassCreated from '@/components/atoms/NoClassCreated';
import ClassCard from '@/components/molecules/dashboard/classes/classCard';
import Button from '@/components/atoms/form/Button';
import SearchInput from '@/components/atoms/form/SearchInput';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import ArrangeClassModal from '@/components/molecules/dashboard/classes/ArrangeClassModal';
import PaginationControl from '@/components/atoms/pagination/PaginationControl';
import { cn } from '@/app/lib/utils';
import {
  AdditionIcon,
  ArrangeIcon,
  ClassCategoryIcon,
  NoClassIcon,
} from '@/components/atoms/icons/Icons';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { ResponseType } from '@/app/lib/types/response';
import { ClassGrade, ClassGradeResponse } from '@/app/lib/types/class.types';

export default function ClassesPage() {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [search, setSearch] = React.useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>('');
  const [isArrangeModalOpen, setIsArrangeModalOpen] = React.useState(false);
  const [hasEverLoadedData, setHasEverLoadedData] = React.useState(false);

  const debouncedSetSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1); // Reset to first page on search
      }, 500),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  const swrKey = `/class-grades/school?page=${page}&limit=${pageSize}&search=${encodeURIComponent(
    debouncedSearch || ''
  )}`;

  const { data, isValidating, mutate } = useSWR(swrKey, () =>
    classGradeActions.fetchClassGradesPaginated({
      page,
      limit: pageSize,
      search: debouncedSearch,
    })
  );

  const resp = data as ResponseType<ClassGradeResponse> | undefined;
  const classItems: ClassGrade[] = (resp?.data?.data as ClassGrade[]) || [];
  const meta = (resp?.meta || {}) as NonNullable<ResponseType<ClassGradeResponse>['meta']>;

  const computedTotalPages = ((meta.totalPages ??
    Math.ceil((meta.count ?? 0) / pageSize)) ||
    1) as number;

  // Track if we've ever loaded data successfully
  React.useEffect(() => {
    if (data && classItems.length > 0) {
      setHasEverLoadedData(true);
    }
  }, [data, classItems.length]);

  const isSearching = debouncedSearch.trim().length > 0;
  const showNoResults = classItems.length === 0 && !isValidating && isSearching;
  const showNoClassCreated = classItems.length === 0 && !isValidating && !isSearching && !hasEverLoadedData;

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbBox
            crumbs={[{ label: 'Classes', isActive: true }]}
            className="mb-0"
          />
        </div>
        <div className={cn('flex item-center gap-4', Inter_500)}>
          {classItems.length > 1 && (
            <Button
              outlined
              onClick={() => setIsArrangeModalOpen(true)}
              className="bg-green-50 text-primary h-[44px] py-3 px-6 flex gap-2 items-center rounded-full"
            >
              <ArrangeIcon color="#21B55A" />
              <span className={cn('text-base ', Inter_500.className)}>
                Arrange class
              </span>
            </Button>
          )}

          {hasEverLoadedData && (
            <Button
              // onClick={() => setModalOpen(true)}
              outlined
              flat
              className="text-primary h-[44px] py-3 px-6 flex gap-2 border border-primary bg-transparent rounded-full"
            >
              <ClassCategoryIcon />
              <span className={cn('pl-2', Inter_500.className)}>
                Create class category
              </span>
            </Button>
          )}

          <Button
            to="/school/classes/create-new-class"
            round
            title={'Create class'}
            className={cn('h-[44px] py-3 px-6 flex gap-2')}
          >
            {' '}
            <AdditionIcon color={'white'} />
            <span className={cn('text-base ', Inter_500.className)}>
              Add new Class{' '}
            </span>
          </Button>
        </div>
      </div>

      <div className="bg-white min-h-[60dvh] p-6 rounded-xl mt-8">
        <div className="flex justify-between items-center mb-6 px-3">
          {(classItems.length > 0 || hasEverLoadedData) && (
            <div className="flex max-w-[42vw] gap-4">
              <SearchInput
                className="border-gray4 bg-white w-64 h-10 text-nowrap"
                placeholder="Search class or Teacher"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          )}
        </div>

        {isValidating && classItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={i}
                className="w-full p-4 rounded-xl border border-gray-100 bg-white animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : showNoResults ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <NoClassIcon />
            </div>
            <p className={cn('text-[#071E3B] text-lg font-semibold mb-2', Inter_500.className)}>
              No classes found for &quot;{debouncedSearch}&quot;
            </p>
            <p className={cn('text-[#667085] text-sm', poppins_400.className)}>
              Try adjusting your search terms
            </p>
          </div>
        ) : showNoClassCreated ? (
          <NoClassCreated />
        ) : classItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <NoClassIcon />
            </div>
            <p className={cn('text-[#071E3B] text-lg font-semibold', Inter_500.className)}>
              No classes available
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {classItems.map((c: ClassGrade) => {
                const classData: ClassGrade = {
                  _id: c._id,
                  name: c.name,
                  level: c.level || '-',
                  classTeacher: c.classTeacher
                    ? {
                        _id: c.classTeacher._id,
                        email: c.classTeacher.email,
                        firstName: c.classTeacher.firstName,
                        lastName: c.classTeacher.lastName,
                        image: c.classTeacher.image ?? undefined,
                      }
                    : null,
                  studentCount: c.studentCount,
                  studentMaleCount: c.studentMaleCount,
                  studentFemaleCount: c.studentFemaleCount,
                };

                return (
                  <ClassCard
                    key={c._id}
                    classData={classData}
                    role="school"
                    onArrange={() => setIsArrangeModalOpen(true)}
                    totalClasses={classItems.length}
                  />
                );
              })}
            </div>

            <div className="mt-6">
              <PaginationControl
                totalPages={computedTotalPages}
                currentPage={meta.page ?? page}
                setCurrentPage={(p) => setPage(p)}
                pageSize={pageSize}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
                hasNextPage={!!meta.hasNextPage}
                hasPrevPage={!!meta.hasPrevPage}
                recordLength={meta.count ?? classItems.length}
              />
            </div>
          </>
        )}
      </div>

      <ArrangeClassModal
        isOpen={isArrangeModalOpen}
        onClose={() => setIsArrangeModalOpen(false)}
        onReorder={() => {
          // Refetch the current SWR data to reflect the new order
          mutate();
          setPage(1);
        }}
      />
    </main>
  );
}
