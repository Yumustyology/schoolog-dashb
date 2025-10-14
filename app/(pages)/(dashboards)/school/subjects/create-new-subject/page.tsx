'use client';

import {
  createSubjectNextStep,
  createSubjectPreviousStep,
  createSubjectProgressState,
  createSubjectEntity,
  resetCreateSubjectEntity,
  CreateSubjectEntity,
} from '@/app/lib/entities/subject.entity';
import Button from '@/components/atoms/form/Button';
import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import Step1 from '@/components/molecules/dashboard/subjects/CreateSubject/Step1';
import Step2 from '@/components/molecules/dashboard/subjects/CreateSubject/Step2';
import subjectsActions from '@/app/lib/actions/subjects.action';
import { useEntity } from 'simpler-state';
import { useState } from 'react';
// Search and Select moved into the Classes page; not shown on create subject

export default function TopSteps() {
  const steps = [<Step1 key={1} />, <Step2 key={2} />];
  const currentStep = useEntity(createSubjectProgressState);
  const createSubject = useEntity(createSubjectEntity) as CreateSubjectEntity;
  const [submitting, setSubmitting] = useState(false);

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      // if coverImage is a File, convert to base64
      let coverImagePayload: string | null = null;
      if (createSubject.coverImage && typeof createSubject.coverImage !== 'string') {
        const file = createSubject.coverImage as File;
        coverImagePayload = await new Promise<string | null>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(typeof reader.result === 'string' ? reader.result : null);
          };
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        });
      } else if (typeof createSubject.coverImage === 'string') {
        coverImagePayload = createSubject.coverImage;
      }

      const payload = {
        name: createSubject.name,
        coverImage: coverImagePayload,
        curriculumSource: createSubject.curriculumSource,
        curriculum: createSubject.curriculum,
        classGrade: createSubject.classGrade,
      };

      const response = await subjectsActions.createSubject(payload);

      if (!response || response.data.status !== 'success') {
        console.error('Failed to create subject', response?.data);
        // TODO: surface error to user
        setSubmitting(false);
        return;
      }

      // success
      resetCreateSubjectEntity();
      createSubjectNextStep();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="w-[600px]-mx-auto">
        <div className="">
          <ProgressPageNumber />
          {steps[currentStep]}
        </div>
      </div>
      <div className="flex justify-end gap-6 mt-8">
        {currentStep > 0 && (
          <Button
            round
            onClick={createSubjectPreviousStep}
            className="w-[120px] h-[40px]  text-primary bg-white border border-primary"
          >
            Previous
          </Button>
        )}
        <Button
          round
          onClick={async () => {
            if (currentStep === steps.length - 1) {
              await handleFinalSubmit();
            } else {
              createSubjectNextStep();
            }
          }}
          disabled={submitting}
          loading={submitting}
          className={`w-[120px] h-[40px] bg-primary text-white ${
            currentStep === steps.length - 1
              ? 'cursor-pointer'
              : 'hover:bg-primary'
          }`}
        >
          {submitting ? 'Submitting...' : currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
