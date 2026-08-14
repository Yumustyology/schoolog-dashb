"use client";

import React, { useEffect, useState } from 'react';
import {
  createAddStudentNextStep,
  createAddStudentPreviousStep,
  createAddStudentProgressState,
} from '@/app/lib/entities/student.entity';
import Button from '@/components/atoms/form/Button';
import ProgressPageNumber from '@/components/molecules/dashboard/students/add-new-student/PageNumber';
import Step1 from '@/components/molecules/dashboard/students/add-new-student/Step1';
import Step2 from '@/components/molecules/dashboard/students/add-new-student/Step2';
import { useEntity } from 'simpler-state';
import { createStudentEntity, resetCreateStudentEntity } from '@/app/lib/entities/student.entity';
import { createStudent, CreateStudentPayload } from '@/app/lib/actions/student.actions';
import showToast from '@/app/lib/utils/toast';
import { fileToBase64 } from '@/app/lib/utils/formData';
import { useRouter } from 'next/navigation';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { getClassGradeName } from '@/app/lib/utils/classGradeUtils';

interface Props {
  showClassSelect?: boolean;
  initialClassId?: string | undefined;
}

export default function AddNewStudentTopSteps({ showClassSelect, initialClassId }: Props) {
  const steps = [<Step1 key={1} showClassSelect={showClassSelect} />, <Step2 key={2} />];
  const currentStep = useEntity(createAddStudentProgressState);
  const student = useEntity(createStudentEntity);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { classGrades } = useClassGradeFilter();

  useEffect(() => {
    if (initialClassId) {
      createStudentEntity.set((prev) => ({ ...prev, classGrade: initialClassId }));
    }
  }, [initialClassId]);

  const handleFinalSubmit = async () => {
    try {
      setSubmitting(true);
      const payloadEntity = student;

      const body: Record<string, unknown> = {
        firstName: payloadEntity.firstName,
        lastName: payloadEntity.lastName,
        email: payloadEntity.email,
        gender: payloadEntity.gender ?? null,
        dob: payloadEntity.dob ?? null,
        classGradeId: payloadEntity.classGrade ?? '',
      };

      if (payloadEntity.guardianId) {
        body.guardianId = payloadEntity.guardianId;
      } else if (payloadEntity.guardianName) {
        const parts = (payloadEntity.guardianName || '').trim().split(/\s+/);
        const firstName = parts.shift() || '';
        const lastName = parts.join(' ') || '';
        body.guardian = {
          firstName,
          lastName,
          email: payloadEntity.guardianEmail ?? undefined,
          phoneNumber: payloadEntity.guardianPhone ?? undefined,
          relationship: payloadEntity.guardianRelationship ?? undefined,
          address: payloadEntity.guardianAddress ?? undefined,
          
        };
      }

      if (payloadEntity.image) {
        try {
          const b64 = await fileToBase64(payloadEntity.image as File);
          body.imageBase64 = b64;
        } catch (e) {
          console.error('Failed to convert image to base64', e);
        }
      }

      const result = await createStudent(body as unknown as CreateStudentPayload);
      const message = result?.message || 'Student created';
      showToast(String(message), 'student-created', { type: 'success' });
      resetCreateStudentEntity();
      router.push('/school/students');
    } catch (err) {
      console.error('Failed creating student', err);
      showToast('Failed to create student', 'student-create-error', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // derive classGradeName for Step1 to show a read-only input when appropriate
  const classGradeName = ((): string | undefined => {
    const id = student.classGrade ?? initialClassId;
    return getClassGradeName(id ?? undefined, classGrades);
  })();

  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="w-[600px]-mx-auto">
        <div className="">
          <ProgressPageNumber />
          {React.cloneElement(steps[currentStep] as React.ReactElement, { classGradeName })}
        </div>
      </div>

      <div className="flex justify-end gap-6 mt-8">
        {currentStep > 0 && (
          <Button
            round
            onClick={createAddStudentPreviousStep}
            className="w-[120px] h-[40px]  text-primary bg-white border border-primary"
          >
            Previous
          </Button>
        )}
        <Button
          round
          onClick={() => {
            if (currentStep === steps.length - 1) {
              void handleFinalSubmit();
            } else {
              createAddStudentNextStep();
            }
          }}
          loading={submitting}
          disabled={submitting}
          className={`w-[120px] h-[40px] bg-primary text-white ${
            currentStep === steps.length - 1 ? 'cursor-pointer' : 'hover:bg-primary'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
