'use client';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import AttendanceMetrics from '@/components/molecules/dashboard/analytics/AttendanceMetrics';
import AttendanceList from '@/components/molecules/dashboard/attendance/AttendanceList';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';
import DoughnutChart from '@/components/molecules/DoughnutChart';

function page() {
  return (
    <div>
      <div className="flex gap-10">
        <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[398px] flex-1">
          <div className="flex justify-between items-center">
            <p className={cn('text-gray6 text-[16px]', poppins_500.className)}>
              Attendance metrics
            </p>
            <DatePicker
              className={cn(
                'text-xs cursor-pointer text-gray6 2 w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                poppins_400.className
              )}
              placeholder={'Pick date'}
            />
          </div>
          <AttendanceMetrics />
        </div>
        <div className="bg-white px-6 py-6 mt-6 rounded-lg h-[398px]">
          <p className={cn('text-gray6 text-[16px]', poppins_500.className)}>
            Summary
          </p>
          <div className="mt-8">
            <DoughnutChart />
          </div>
        </div>
      </div>

      <div className="bg-white mt-8 rounded-4 p-8">
        <div className="flex w-[600px] gap-6">
          <DateRangePicker />
        </div>
        <div className='my-8'>
          <AttendanceList />
        </div>
        <footer className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h5> Showing </h5>
            <SelectBox />
          </div>

          <div>
            <PaginationBox />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default page;
