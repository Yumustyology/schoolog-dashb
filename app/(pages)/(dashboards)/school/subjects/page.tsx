'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon, NoSubjectIcon } from '@/components/atoms/icons/Icons';
import {
  Inter_500,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import subjectsActions from '@/app/lib/actions/subjects.action';
import SearchInput from '@/components/atoms/form/SearchInput';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import SubjectCard from '@/components/molecules/dashboard/subjects/SubjectCard';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import SubjectCardSkeleton from '@/components/atoms/skeleton/SubjectCardSkeleton';
import { debounce } from 'lodash';
import PaginationControl from '@/components/atoms/pagination/PaginationControl';
import NoSubjectCreated from '@/components/atoms/dashboard/subjects/NoSubjectCreated';

const breadcrumbs = [{ label: 'Subjects', isActive: true }];

function Page() {
  type SubjectFromApi = {
    _id: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
    classGrades?: string[];
  };

  const { theme } = useSlgTheme();

  const { data: classGradeResp } = useSWR('/class-grades/school-all', () =>
    classGradeActions.fetchClassGradesAll()
  );

  const classGrades = classGradeResp?.data?.data || [];

  // Search and class-grade filter state
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [hasEverLoadedData, setHasEverLoadedData] = useState(false);
  const [selectedClassGrade, setSelectedClassGrade] = useState<
    string | undefined
  >(undefined);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Debounced search
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  // Build a SWR key that depends on filters so cache updates when filters change
  const subjectsKey = `/subjects/school?search=${encodeURIComponent(debouncedSearch || '')}&classGrade=${encodeURIComponent(selectedClassGrade || '')}&page=${page}&limit=${pageSize}`;

  const { data: subjectsResp, isValidating } = useSWR(subjectsKey, () => {
    const q: Record<string, string | number | boolean> = {
      page,
      limit: pageSize,
    };
    if (debouncedSearch) q.search = debouncedSearch;
    if (selectedClassGrade) q.classGrade = selectedClassGrade;
    return subjectsActions.getSchoolSubjects(q);
  });

  const subjects = subjectsResp?.data?.data || [];
  const meta = subjectsResp?.data?.meta || { count: 0 };

  // Calculate total pages
  const computedTotalPages = Math.ceil((meta.count || 0) / pageSize);

  // Track if we've ever loaded data successfully
  useEffect(() => {
    if (subjectsResp && subjects.length > 0) {
      setHasEverLoadedData(true);
    }
  }, [subjectsResp, subjects.length]);

  const isSearching = debouncedSearch.trim().length > 0 || !!selectedClassGrade;
  const showNoResults = subjects.length === 0 && !isValidating && isSearching;
  const showNoSubjectCreated = subjects.length === 0 && !isValidating && !isSearching && !hasEverLoadedData;

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <div className="">
          <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        </div>
        <Button
          to="/school/subjects/create-new-subject"
          round
          disabled={classGrades.length === 0}
          title={
            classGrades.length === 0
              ? 'Please create a class grade first'
              : 'Create subject'
          }
          className={cn(
            'h-[44px]  py-3 px-6 flex gap-2',
            classGrades.length === 0 && 'bg-disabled'
          )}
        >
          {' '}
          <AdditionIcon />
          <span className={cn('text-base ', Inter_500.className)}>
            Add new Subject{' '}
          </span>
        </Button>
      </div>

      <div className="bg-white min-h-[60dvh] p-6 rounded-xl mt-8">
        {(subjects.length > 0 || hasEverLoadedData) && (
          <div className="w-full flex items-center mb-6">
            <div className="flex max-w-[42vw] gap-4">
              <SearchInput
                className="border-gray4 bg-white w-60 h-10 text-nowrap"
                placeholder="Search subjects"
                value={search}
                onChange={handleSearchChange}
              />
              <ClassGradeDropdown
                className="w-[200px] shadow-none"
                value={selectedClassGrade}
                onValueChange={(v: string) => setSelectedClassGrade(v)}
              />
            </div>
          </div>
        )}

        {classGrades.length === 0 ? (
          <div className="col-span-full p-6 text-center">
            <div className="w-full flex justify-center">
              <NoSubjectIcon />
            </div>
            <h3
              className={cn(
                'text-lg font-semibold text-black1 mt-8',
                poppins_600.className
              )}
            >
              No class grades found
            </h3>
            <p
              className={cn(
                'text-sm text-gray-600 mt-3',
                poppins_400.className
              )}
            >
              You need to create a class grade before adding subjects.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button
                round
                className="bg-white text-primary border border-primary h-[44px] py-3 px-6 flex gap-2"
                to="/school/classes/create-new-class"
              >
                <AdditionIcon color={theme.primary} />
                <span className={cn('text-base ', Inter_500.className)}>
                  Create class
                </span>
              </Button>
            </div>
          </div>
        ) : isValidating && subjects.length === 0 ? (
          <section className="mt-[6vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SubjectCardSkeleton key={`skeleton-${i}`} />
            ))}
          </section>
        ) : showNoResults ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <NoSubjectIcon />
            </div>
            <p className={cn('text-[#071E3B] text-lg font-semibold mb-2', Inter_500.className)}>
              No subjects found for &quot;{debouncedSearch}&quot;
            </p>
            <p className={cn('text-[#667085] text-sm', poppins_400.className)}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : showNoSubjectCreated ? (
          <NoSubjectCreated />
        ) : subjects.length === 0 ? (
          <NoSubjectCreated title="No subjects found!" />
        ) : (
          <>
            <section className="mt-[6vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subjects.map((s) => {
                const sub = s as SubjectFromApi;
                return (
                  <SubjectCard
                    key={String(sub._id)}
                    subject={{
                      id: sub._id,
                      subject: sub.name,
                      textbookImg: sub.coverImage || '',
                      currentTopic: sub.description || '',
                      teacherImg: '',
                      teacher: '',
                      number_of_topics_covered: 0,
                      number_of_topics: 0,
                      students: [],
                    }}
                    role={'school'}
                  />
                );
              })}
            </section>

            <div className="mt-6">
              <PaginationControl
                totalPages={computedTotalPages}
                currentPage={page}
                setCurrentPage={(p) => setPage(p)}
                pageSize={pageSize}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
                hasNextPage={page < computedTotalPages}
                hasPrevPage={page > 1}
                recordLength={meta.count || subjects.length}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Page;
