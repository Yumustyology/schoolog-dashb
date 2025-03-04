import React from 'react';
import Button from '@/components/atoms/form/Button';
import { Upload_Icon2 } from '@/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { CurriculumType } from './CurriculumType';
import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import { DaySelector } from '@/components/molecules/dashboard/timetable/DaySelector';
import { PeriodSelector } from '@/components/molecules/dashboard/timetable/PeriodSelector';

function Step3() {
  const [curriculumType, setCurriculumType] = React.useState('upload_xls');
  return (
    <div>
      <ProgressPageNumber activeStep={3} totalSteps={3} />
      <div className="mb-12 mt-6">
        <h2 className={cn('text-xltext-gray1 mb-1', poppins_500.className)}>
          Timetable{' '}
        </h2>
        <p className={cn('text-sm text-gray3', poppins_400.className)}>
          {' '}
          Select the day and time for your subject{' '}
        </p>
      </div>

      <div className="flex gap-8 w-full">
        <div className="w-full">
          <DaySelector />
        </div>

        <div className="w-full">
          <PeriodSelector />
        </div>
      </div>

      <div className="flex gap-8 w-full mt-6">
        <div className="w-full">
          <DaySelector />
        </div>

        <div className="w-full">
          <PeriodSelector />
        </div>
      </div>
    </div>
  );
}

export default Step3;
