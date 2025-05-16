'use client';
import {
  createAnnoucementNextStep,
  createAnnoucementPreviousStep,
  createAnnoucementProgessState,
} from '@/app/lib/entities/annoucement.entity';
import Button from '@/components/atoms/form/Button';
import Step1 from '@/components/molecules/dashboard/announcement/Step1';
import Step2 from '@/components/molecules/dashboard/announcement/Step2';
import ProgressPageNumber from '@/components/molecules/dashboard/students/add-new-student/PageNumber';
import { useEntity } from 'simpler-state';

export default function TopSteps() {
  const steps = [<Step1 key={1} />, <Step2 key={2} />];
  const currentStep = useEntity(createAnnoucementProgessState);

  return (
    <div className="p-4 min-h-[100dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="w-[600px] mx-auto">
        <div className="">
          <ProgressPageNumber />
          {steps[currentStep]}
        </div>
      </div>
      <div className="mt-[20dvh--] flex justify-end gap-6">
        {currentStep > 0 && (
          <Button
            round
            onClick={createAnnoucementPreviousStep}
            className="w-[120px] h-[40px]  text-primary bg-white border border-primary"
          >
            Previous
          </Button>
        )}
        <Button
          round
          onClick={() => {
            if (currentStep === steps.length - 1) {
              console.log('Submitting form...');
            } else {
              createAnnoucementNextStep();
            }
          }}
          className={`w-[120px] h-[40px] bg-primary text-white ${
            currentStep === steps.length - 1
              ? 'cursor-pointer'
              : 'hover:bg-primary'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
