import { teacherImg2 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { CancelDrawerIcon } from '../../icons/Icons';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import showToast from '@/app/lib/utils/toast';

export const AssignedTeacherDetail = ({
  teacherId,
  classSubjectId,
  name,
  subjectAssignedTo,
  onRemoved,
}: {
  teacherId: string;
  classSubjectId: string;
  name: string;
  subjectAssignedTo: string;
  onRemoved?: () => void;
}) => {
  const [isRemoveTeacherModalOpen, setIsRemoveTeacherModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await classGradeActions.removeTeacherFromClassSubject(
        classSubjectId,
        teacherId
      );
      showToast('Teacher removed successfully', 'teacher-removed', {
        theme: 'light',
        type: 'success',
      });
      setIsRemoveTeacherModal(false);
      onRemoved?.();
    } catch (error) {
      showToast('Failed to remove teacher', 'teacher-remove-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error removing teacher:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-[#f8f8f8] rounded-xl py-3 px-2 mb-6">
        <div className="flex justify-between items-center gap-2">
          <Image src={teacherImg2} alt="teacher-image" width={36} height={36} />
          <div className="flex justify-between items-center w-full">
            <div>
              <h3
                className={cn('text-base text-gray1 ', poppins_500.className)}
              >
                {name}
              </h3>
              <p className={cn('text-xs text-gray3', poppins_400.className)}>
                Assigned to {subjectAssignedTo}
              </p>
            </div>
          </div>

          <div
            onClick={() => setIsRemoveTeacherModal(true)}
            className="cursor-pointer"
          >
            <CancelDrawerIcon />
          </div>
        </div>
      </div>
      <ConfirmModal
        open={isRemoveTeacherModalOpen}
        close={() => setIsRemoveTeacherModal(false)}
        title="Remove Teacher"
        body={`Are you sure you want to remove ${name} from ${subjectAssignedTo} teachers?`}
        icon={<CancelDrawerIcon />}
        onConfirm={handleRemove}
        confirmText="Remove"
        isLoading={isSubmitting}
      />
    </div>
  );
};
