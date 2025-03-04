'use client';
import { useState } from 'react';

import Button from '@/components/atoms/form/Button';
import Step1 from '@/components/molecules/dashboard/subjects/CreateSubject/Step1';
import Step2 from '@/components/molecules/dashboard/subjects/CreateSubject/Step2';
import Step3 from '@/components/molecules/dashboard/subjects/CreateSubject/Step3';

export default function TopSteps() {
  const steps = [<Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />];
  const [currentStep, setCurrentStep] = useState(0);

  // const handleStepClick = (index: number) => {
  //   setCurrentStep(index);
  // };

  return (
    <div className="p-4 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="w-[600px] mx-auto">
        <div className="">{steps[currentStep]}</div>
      </div>

      <div className="mt-[20dvh--] flex justify-end gap-6">
        {currentStep > 0 && (
          <Button
            round
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
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
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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
