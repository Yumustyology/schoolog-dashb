import React from 'react';
import Button from '@/app/components/atoms/form/Button';
import { Upload_Icon2 } from '@/app/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { CurriculumType } from './CurriculumType';
import ProgressPageNumber from '@/app/components/molecules/auth/PageNumber';
import { DaySelector } from '@/shared/molecules/DaySelector';
import { PeriodSelector } from '@/shared/molecules/PeriodSelector';

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
