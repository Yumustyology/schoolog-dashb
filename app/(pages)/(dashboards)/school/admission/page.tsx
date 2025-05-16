'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import React from 'react';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import Button from '@/components/atoms/form/Button';
import ExportIcon from '@/components/atoms/icons/dashboard/ExportIcon';
import PayForStudentModal from '@/components/molecules/dashboard/finance/PayForStudentModal';
import { AdmissionRegList } from '@/components/molecules/admission/AdmissionRegList';
import Settings from '@/components/atoms/icons/SideBar/Settings';
import ImportICon from '@/components/atoms/icons/dashboard/ImportICon';

function Page() {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <BreadcrumbBox
          crumbs={[
            {
              label: 'Admission',
              isActive: true,
            },
          ]}
        />
        <div className="flex gap-4 mb-8">
          <Button
            // onClick={openPayForStudentModal}
            round
            className="gap-2 px-6 h-[44px] rounded-full"
          >
            <Settings color="white" />
            <span>Admission settings</span>
          </Button>
        </div>
      </div>
      <div className="p-5 bg-white rounded-lg">
        <div className="flex items-center gap-10 justify-between mb-6 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-4 items-center">
              <SearchInput
                className="bg-gray4"
                placeholder="Search invoice history"
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
                  'text-xs cursor-pointer text-gray6 2 w-[180px] border border-gray4 flex --justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                  poppins_400.className
                )}
                placeholder={'Pick date'}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Button className="gap-2 px-6 h-[40px] rounded-full">
                <ImportICon color="white" /> <span>Admit applicants</span>
              </Button>
              <Button
                flat
                outlined
                round
                className="bg-transparent gap-2 px-6 h-[40px] rounded-full"
              >
                <ExportIcon size={20} />
                <span>Export list</span>
              </Button>
            </div>
          </div>
        </div>
        <AdmissionRegList />
      </div>
      <PayForStudentModal />
    </>
  );
}

export default Page;
