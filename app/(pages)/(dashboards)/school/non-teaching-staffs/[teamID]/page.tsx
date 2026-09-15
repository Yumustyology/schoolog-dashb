'use client';
import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import SelectComp from '@/components/atoms/form/Select';
import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';
import TeachersAttendanceList from '@/components/molecules/dashboard/attendance/TeachersAttendanceList';
import { NonTeachingStaffOthersInfoCard } from '@/components/molecules/dashboard/staff/NonTeachingOtherInfoCard';
import { NonTeachingStaffInfoCard } from '@/components/molecules/dashboard/staff/NonTeachingStaffInfoCard';
import staffActions from '@/app/lib/actions/staff.action';

const NonTeachingStaffInfoPage = () => {
  const params = useParams<{ teamID: string }>();
  const staffId = params?.teamID as string;

  const { data, isLoading, mutate } = useSWR(
    staffId ? `/staff/${staffId}` : null,
    () => staffActions.fetchStaffById(staffId)
  );

  const staff = data?.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            {
              label: 'Non-teaching',
              isActive: false,
              href: '/school/non-teaching-staffs',
            },
            {
              label: staff?.staffSlugId || staffId,
              isActive: true,
            },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="mt-4 h-[390px] rounded-md bg-white animate-pulse" />
      ) : !staff ? (
        <div className="mt-4 bg-white rounded-md p-10 text-center">
          <p className={cn('text-black1', poppins_500.className)}>
            Staff member not found
          </p>
        </div>
      ) : (
        <div>
          <div className="flex space-x-3 mt-4">
            <div className="w-[446px]">
              <NonTeachingStaffInfoCard staff={staff} onStatusChanged={() => mutate()} />
            </div>
            <div className="flex-1 ">
              <NonTeachingStaffOthersInfoCard staff={staff} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl w-full mt-3">
            <div className="p-2 flex items-center justify-between  w-full mb-4">
              <div>
                <h3 className={cn('text-black1 text-lg', poppins_500.className)}>
                  Attendance
                </h3>
              </div>
              <div className="flex gap-4 ">
                <SelectComp
                  placeholder="All type"
                  triggerClasses={cn(
                    poppins_400.className,
                    'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4  flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
                  )}
                  value=""
                  onValueChange={() => {}}
                  options={[{ id: 'all', name: 'All' }]}
                />

                <div className="flex w-[150px] gap-6">
                  <DateRangePicker />
                </div>
              </div>
            </div>
            <TeachersAttendanceList />
          </div>
        </div>
      )}
    </div>
  );
};

export default NonTeachingStaffInfoPage;
