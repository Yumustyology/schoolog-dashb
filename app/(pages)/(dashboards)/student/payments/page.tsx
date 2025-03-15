'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { PaymentTable } from '@/components/molecules/dashboard/payment/PaymentTable';
import React from 'react';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import { DatePicker } from '@/components/atoms/form/DatePicker';

function page() {
  return (
    <>
      <BreadcrumbBox
        crumbs={[
          {
            label: 'Payments',
            isActive: true,
          },
        ]}
      />
      <div className="p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className={cn('text-gray1 text-xl mb-6', poppins_600.className)}>
            Payments histories
          </h3>
          <div className="flex gap-6 items-center mb-6">
            <SearchInput
              className="bg-gray4"
              placeholder="Search payment history"
            />
            <SelectComp
              placeholder="All type"
              triggerClasses={cn(
                poppins_400.className,
                'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4  flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
              )}
              value=""
              onValueChange={console.log}
              options={[
                {
                  id: 'all',
                  name: 'All',
                },
                {
                  id: 'jss2',
                  name: 'JSS2',
                },
                {
                  id: 'jss3',
                  name: 'JSS3',
                },
              ]}
            />
            <DatePicker
              calenderContainerClassName={cn('mr-10')}
              className={cn(
                'text-xs cursor-pointer text-gray6 2 w-[180px] border border-gray4 flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                poppins_400.className
              )}
              placeholder={'Pick date'}
            />
          </div>
        </div>
        <PaymentTable type="student" />
      </div>
    </>
  );
}

export default page;
