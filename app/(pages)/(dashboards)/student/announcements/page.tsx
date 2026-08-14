'use client';
import Search from '@/components/atoms/form/SearchInput';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import React from 'react';

import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import AnnoucementsList from '@/components/molecules/dashboard/announcement/AnnoucementsList';

function Page() {
  return (
    <div className="bg-white w-full p-6 mt-6 rounded-lg  h-auto">
      <div className="flex items-center mb-8 gap-4 w-1/2">
        <Search placeholder="Search Title and keywords" />
        <DatePicker className="w-max" />
      </div>

      <AnnoucementsList />

      <footer className="mt-6 flex justify-between items-center">
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

export default Page;
