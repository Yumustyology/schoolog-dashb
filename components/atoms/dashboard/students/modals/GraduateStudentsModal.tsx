'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import { Label } from '@/components/ui/label';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import { SelectedStudents } from '../SelectedStudents';
import studentActions from '@/app/lib/actions/student.actions';
import showToast from '@/app/lib/utils/toast';
import type { BulkActionSummary } from '@/app/lib/types/bulk-action.types';

type GraduateStudentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const options = [
  { value: 'wholeClass', label: 'Whole Class' },
  { value: 'selectedClass', label: 'Selected Students' },
];

export const GraduateStudentsModal = ({
  isOpen,
  onClose,
}: GraduateStudentsModalProps) => {
  const [mode, setMode] = useState<string>('wholeClass');
  const [classGradeId, setClassGradeId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: classStudentsResp } = useSWR(
    mode === 'wholeClass' && classGradeId
      ? ['students-in-class', classGradeId]
      : null,
    () => studentActions.fetchStudents({ classGradeId, limit: -1 })
  );

  const resetState = () => {
    setMode('wholeClass');
    setClassGradeId('');
    setSelectedStudentIds([]);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async () => {
    const studentIds =
      mode === 'wholeClass'
        ? (classStudentsResp?.data || []).map((s) => String(s._id))
        : selectedStudentIds;

    if (studentIds.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await studentActions.bulkGraduateStudents(studentIds);
      const summary = response.data as BulkActionSummary | undefined;
      showToast(
        summary
          ? `${summary.successCount} student(s) graduated, ${summary.failureCount} failed`
          : 'Students graduated successfully',
        'graduate-students-result',
        {
          theme: 'light',
          type: summary && summary.failureCount > 0 ? 'warning' : 'success',
        }
      );
      mutate((key) => Array.isArray(key) && key[0] === 'students');
      handleClose();
    } catch (error) {
      showToast('Failed to graduate students', 'graduate-students-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error graduating students:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    mode === 'wholeClass' ? !!classGradeId : selectedStudentIds.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Graduate">
      <div>
        <RadioOptionType
          options={options}
          selectedOption={mode}
          setSelectedOption={setMode}
        />

        {mode === 'wholeClass' ? (
          <div className="mt-8">
            <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
              Select Class
            </Label>
            <ClassGradeDropdown
              value={classGradeId}
              onValueChange={(v) => setClassGradeId(Array.isArray(v) ? v[0] : v)}
              placeholder="Select class"
              className="w-full"
            />
          </div>
        ) : (
          <SelectedStudents
            selectedStudentIds={selectedStudentIds}
            onChange={setSelectedStudentIds}
          />
        )}
      </div>
      <Button
        wide
        round
        className="h-12 mt-8"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        loading={isSubmitting}
      >
        Graduate
      </Button>
    </Modal>
  );
};
