'use client';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import Button from '../../form/Button';
import AddUserIcon from './AddUserIcon';
import { DatePicker } from '../../form/DatePicker';
import { FilterButtonGroup } from '../../FilterButton';

const SchoolAdminWelcomeSection = () => {
  const handleFilterChange = (filter: string) => {
    console.log('Selected filter:', filter);
  };

  return (
    <div className="flex justify-between mb-7">
      <div>
        <p className="mb-6">
          <h1 className={cn(poppins_600.className, 'text-3xl ')}>
            Hi{' '}
            <span className="bg-gradient-to-r from-[#21B55A] to-[#0E4F27] bg-clip-text text-transparent">
              Mohh_Jumah
            </span>
            👋 How is your day going
          </h1>
          <p
            className={cn(
              'mt-2 text-base text-[#475467]',
              poppins_400.className
            )}
          >
            Here is the summarry of what is presently happening at AL-Hassan
            College
          </p>
        </p>
        <FilterButtonGroup onFilterChange={handleFilterChange} />
      </div>
      <div className="h-full flex flex-col min-h-[135px] justify-between items-end">
        <Button round className="gap-2 px-8 h-[44px] rounded-full">
          <AddUserIcon />
          <span>Add new student</span>
        </Button>
        <DatePicker
          className="rounded-md w-fit"
          calenderContainerClassName="mr-3"
        />
      </div>
    </div>
  );
};

export default SchoolAdminWelcomeSection;
