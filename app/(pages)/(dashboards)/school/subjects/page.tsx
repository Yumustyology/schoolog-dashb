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
import React, { useEffect, useState } from 'react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import useSWR, { useSWRConfig } from 'swr';
import subjectsActions from '@/app/lib/actions/subjects.action';
import SearchInput from '@/components/atoms/form/SearchInput';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { usePaginatedSearch } from '@/app/lib/hooks/usePaginatedSearch';
import SubjectsTableList from '@/components/atoms/dashboard/subjects/SubjectsTableList';
import CreateSubjectModal from '@/components/molecules/dashboard/subjects/CreateSubjectModal';

const breadcrumbs = [{ label: 'Subjects', isActive: true }];

function Page() {
  const { theme } = useSlgTheme();
  const { mutate } = useSWRConfig();
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false);
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
      <div className="flex justify-between items-center">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        <Button
          round
          onClick={() => setIsCreateSubjectOpen(true)}
          title="Create subject"
          className="h-[44px] py-3 px-6 flex gap-2"
        >
          <AdditionIcon />
          <span className={cn('text-base', Inter_500.className)}>
            Add new Subject
          </span>
        </Button>
      </div>

      <div className="bg-white min-h-[60dvh] p-6 rounded-xl mt-8">
        {classGrades.length > 0 && (
          <div className="w-full flex flex-row-reverse items-center mb-6 justify-between">
            <div className="flex items-center gap-4">
              {archivedCount > 0 && (
                <Tabs value={activeTab} className="">
                  <TabsHeader
                    className="transition-all text-sm px-2 py-2 min-w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
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
                onValueChange={(v: string | string[]) => {
                  const id = Array.isArray(v) ? v[0] : v;
                  setSelectedClassGrade(id);
                  setPage(1);
                }}
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

      <CreateSubjectModal
        isOpen={isCreateSubjectOpen}
        onClose={() => setIsCreateSubjectOpen(false)}
        onCreated={() => mutate((key) => Array.isArray(key) && key[0] === 'subjects')}
      />
    </main>
  );
}

export default Page;
