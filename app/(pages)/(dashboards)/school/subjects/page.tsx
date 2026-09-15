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
import React, { useEffect } from 'react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import useSWR from 'swr';
import subjectsActions from '@/app/lib/actions/subjects.action';
import SearchInput from '@/components/atoms/form/SearchInput';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { usePaginatedSearch } from '@/app/lib/hooks/usePaginatedSearch';
import SubjectsTableList from '@/components/atoms/dashboard/subjects/SubjectsTableList';

const breadcrumbs = [{ label: 'Subjects', isActive: true }];

function Page() {
  const { theme } = useSlgTheme();
  const {
    classGrades,
    selectedClassGrade,
    setSelectedClassGrade,
  } = useClassGradeFilter();

  const {
    search,
    debouncedSearch,
    handleSearchChange,
    page,
    setPage,
    pageSize,
    setPageSize,
    hasEverLoadedData,
    setHasEverLoadedData,
  } = usePaginatedSearch();

  const tabs = [
    { label: 'Active', value: 'active' },
    { label: 'Archived', value: 'archived' },
  ];

  const { activeTab, handleTabClick } = useActiveTab('subjects', tabs);

  const archivedCountKey = [
    'subjects/school',
    'archived-count',
    debouncedSearch || '',
    selectedClassGrade || '',
  ] as const;

  const { data: archivedResp } = useSWR(
    activeTab === 'active' ? archivedCountKey : null,
    (key) => {
      const [, , keySearch, keyClassGrade] = key as readonly [string, string, string, string];
      const q: Record<string, string | number | boolean> = {
        archived: true,
        page: 1,
        limit: 1,
      };
      if (keySearch) q.search = keySearch;
      if (keyClassGrade) q.classGrade = keyClassGrade;
      return subjectsActions.getSchoolSubjects(q);
    }
  );

  const archivedCount =
    (archivedResp?.meta as { count: number })?.count || 0;

  useEffect(() => {
    if (
      activeTab === 'archived' &&
      archivedCount === 0 &&
      typeof archivedResp !== 'undefined'
    ) {
      handleTabClick('active');
      setPage(1);
    }
  }, [activeTab, archivedCount, archivedResp, handleTabClick, setPage]);

  return (
    <main className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
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
            'h-[44px] py-3 px-6 flex gap-2 w-full sm:w-auto justify-center',
            classGrades.length === 0 && 'bg-disabled'
          )}
        >
          <AdditionIcon />
          <span className={cn('text-base', Inter_500.className)}>
            Add new Subject
          </span>
        </Button>
      </div>

      <div className="bg-white min-h-[60dvh] p-4 sm:p-6 rounded-xl mt-6 sm:mt-8">
        {classGrades.length > 0 && (
          <div className="w-full flex flex-col-reverse md:flex-row items-stretch md:items-center mb-6 justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <SearchInput
                className="border-gray4 bg-white w-full sm:w-60 h-10 text-nowrap"
                placeholder="Search subjects"
                value={search}
                onChange={handleSearchChange}
              />
              <ClassGradeDropdown
                className="w-full sm:w-[200px] shadow-none"
                value={selectedClassGrade}
                onValueChange={(v: string | string[]) => {
                  const id = Array.isArray(v) ? v[0] : v;
                  setSelectedClassGrade(id);
                  setPage(1);
                }}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              {archivedCount > 0 && (
                <Tabs value={activeTab} className="w-full sm:w-auto">
                  <TabsHeader
                    className="transition-all text-sm px-2 py-2 w-full sm:min-w-[280px] md:min-w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
                    indicatorProps={{
                      className: 'bg-transparent rounded-full shadow-none',
                    }}
                  >
                    {tabs.map(({ label, value }) => (
                      <Tab
                          key={value}
                          value={value}
                          onClick={() => {
                            handleTabClick(value);
                            setPage(1);
                          }}
                        className={cn(
                          'text-sm text-center',
                          Inter_500.className
                        )}
                        activeClassName="rounded-full text-white bg-primary"
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
              )}
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
                <span className={cn('text-base', Inter_500.className)}>
                  Create class
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <SubjectsTableList
            search={search}
            debouncedSearch={debouncedSearch}
            handleSearchChange={handleSearchChange}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            hasEverLoadedData={hasEverLoadedData}
            setHasEverLoadedData={setHasEverLoadedData}
            activeTab={activeTab as 'active' | 'archived'}
          />
        )}
      </div>
    </main>
  );
}

export default Page;
