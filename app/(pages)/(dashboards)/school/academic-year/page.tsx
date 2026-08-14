'use client';

import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import {
  AdditionIcon,
  ExportIcon,
  // FilterIcon,
} from '@/components/atoms/icons/Icons';
import React from 'react';
import Search from '@/components/atoms/form/SearchInput';
import { usePaginatedSearch } from '@/app/lib/hooks/usePaginatedSearch';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
// import { AcademicYearStatusDropdown } from '@/components/atoms/dashboard/academic-years/AcademicYearStatusDropdown';
// import { FilterModal } from '@/components/atoms/dashboard/students/FilterModal';
// import { CreateAcademicYearModal } from '@/components/atoms/dashboard/academic-years/CreateAcademicYearModal';
import { openCreateAcademicYearModal } from '@/app/lib/entities/academicYear.entity';
import AcademicYearsTableList from '@/components/molecules/acacamic-years/AcademicYearsTableList';
import { AcademicYearStatusDropdown } from '@/components/atoms/dashboard/academic-years/AcademicYearStatusDropdown';

const Page = () => {
  const breadcrumbs = [{ label: 'Academic Years', isActive: true }];
  const { theme } = useSlgTheme();

  
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

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />

        <div className="flex gap-4">
          <Button
            flat
            round
            className="h-[44px] py-3 px-6 flex gap-2 border border-primary"
          >
            <ExportIcon color={theme.primary} />
            <span className={cn('text-base', Inter_500.className)}>
              Export Academic Years
            </span>
          </Button>

          <Button
            round
            to="/school/academic-year/create"
            className="h-[44px] py-3 px-6 flex gap-2"
          >
            <AdditionIcon />
            <span className={cn('text-base', Inter_500.className)}>
              Create Academic Year
            </span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-6 my-6 h-screen">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <Search
              placeholder="Search academic year..."
              className="min-w-[361px] h-[38px] rounded-full bg-[#F7F7F7] border border-gray4"
              value={search}
              onChange={handleSearchChange}
            />

            <AcademicYearStatusDropdown />

            {/* <Button
              onClick={openAcademicYearFilterModal}
              className="flex items-center bg-[#f8f8f8] border border-gray4 rounded-full"
            >
              <FilterIcon />
              <span className={cn('text-base text-gray1', Inter_500.className)}>
                Filter
              </span>
            </Button> */}

            {/* <FilterModal /> */}
          </div>
        </div>

        <AcademicYearsTableList
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hasEverLoadedData={hasEverLoadedData}
          setHasEverLoadedData={setHasEverLoadedData}
        />
      </div>

      {/* <CreateAcademicYearModal /> */}
    </main>
  );
};

export default Page;
