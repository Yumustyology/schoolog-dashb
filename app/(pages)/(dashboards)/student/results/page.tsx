'use client';

import Button from '@/app/components/atoms/form/Button';
import SelectComp from '@/app/components/atoms/form/Select';
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon';
import PerformanceMetrics from '@/app/components/molecules/dashboard/analytics/PerformanceMetrics';
import { ResultLists } from '@/app/components/molecules/dashboard/results/ResultLists';
import { OverAllBestSubjectsList } from '@/app/components/molecules/dashboard/student/OverAllBestSubjects';
import {
  Inter_600,
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

function page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className={cn('text-primary text-[16px]', poppins_600.className)}>
          Results
        </h3>
        <Button
          round
          className={cn(
            'text-white text-[16px]  flex gap-4 pt-3 px-8 bg-primary ',
            Inter_600.className
          )}
        >
          <DownloadIcon size="20" color="#ffffff" />
          <span>Download all results</span>
        </Button>
      </div>
      <div className="flex gap-10">
        <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[398px] flex-1">
          <div className="flex justify-between items-center">
            <p className={cn('text-gray6 text-[16px]', poppins_500.className)}>
              Results
            </p>

            <SelectComp
              placeholder="SS1"
              triggerClasses={cn(
                poppins_400.className,
                'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
              )}
              value=""
              onValueChange={console.log}
              options={[
                {
                  id: 'jss1',
                  name: 'JSS1',
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
          </div>
          <PerformanceMetrics />
        </div>
        <div className="mt-6 h-[398px] ">
          <OverAllBestSubjectsList />
        </div>
      </div>

      <section>
        <ResultLists />
      </section>
    </div>
  );
}

export default page;
