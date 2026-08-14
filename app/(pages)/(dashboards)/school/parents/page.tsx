'use client';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import React from 'react';
import Search from '@/components/atoms/form/SearchInput';
import { PaymentStatusDropdownList } from '@/components/atoms/dashboard/parents/PaymentsStatusDropdown';
import ParentsTableLists from '@/components/atoms/dashboard/parents/ParentsTableLists';

import { useState } from 'react';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

const Page = () => {
  const [search, setSearch] = useState('');
  const breadcrumbs = [{ label: 'Parents', isActive: true }];
  return (
    <main>
      <div className="flex items-center justify-between mb-0">
        <BreadcrumbBox crumbs={breadcrumbs} />
        <Button
          to='/school/parents/add'
          className="ml-4 rounded-full px-4 py-2 h-10 bg-primary text-white font-medium hover:bg-primary/90 transition-all"
          type="button"
        >
          <AdditionIcon />
          <span className={cn('text-base ', Inter_500.className)}>
            Create Guardian
          </span>
        </Button>
      </div>

      <div className="bg-white p-6 my-6 h-screen">
        <div className="flex gap-4 items-center">
          <Search
            placeholder="Search parent..."
            className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <PaymentStatusDropdownList />
        </div>

        <div className="">
          <ParentsTableLists search={search} />
        </div>
      </div>
    </main>
  );
};

export default Page;
