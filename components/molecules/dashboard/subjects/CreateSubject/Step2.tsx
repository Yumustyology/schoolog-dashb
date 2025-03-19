import React from 'react';
import Button from '@/components/atoms/form/Button';
import { Upload_Icon2 } from '@/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { CurriculumType } from './CurriculumType';
import { TermAccordion } from './CurriculumDetails';
import { selectedCurriculumType } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';

function Step2() {
  const selectedCurriculum = useEntity(selectedCurriculumType);
  return (
    <div>
      <div className="mb-12 mt-6">
        <h2 className={cn('text-xl text-gray1 mb-1', poppins_500.className)}>
          Create Curriculum{' '}
        </h2>
        <p className={cn('text-sm text-gray3', poppins_400.className)}>
          Enter details of each topics in the curriculum{' '}
        </p>
      </div>
      <div>
        <CurriculumType />
      </div>

      {selectedCurriculum === 'waec' && <div></div>}

      {selectedCurriculum === 'upload' && (
        <div className="">
          <p
            className={cn('text-base text-center my-5', poppins_500.className)}
          >
            Upload the curriculum document you <br /> want teachers to be using
          </p>

          <div className="mx-auto mb-4 mt-4 text-center bg-primary bg-opacity-5 border border-primary rounded-xl border-opacity-15 w-full py-7 px-10">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary bg-opacity-5  border border-primary border-opacity-15  mx-auto mb-3">
              <Upload_Icon2 />
            </div>
            <p className={cn('text-sm text-primary', poppins_400.className)}>
              {' '}
              Upload file{' '}
            </p>
            <p className={cn('mt-2 text-gray', poppins_400.className)}>
              This upload supports <br /> .csv format
            </p>
          </div>

          <Button round wide className="bg-primary h-12 flex items-center mb-6">
            <span className={cn('text-base text-white', poppins_500.className)}>
              Upload Curriculum
            </span>
          </Button>
        </div>
      )}

      {selectedCurriculum === 'manual' && (
        <div>
          <TermAccordion />
        </div>
      )}
    </div>
  );
}

export default Step2;
