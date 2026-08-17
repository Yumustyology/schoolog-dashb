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

type MoveClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
};

const options = [
  { value: 'wholeClass', label: 'Whole Class' },
  { value: 'selectedClass', label: 'Selected Students' },
];

export const MoveClassModal = ({
  isOpen,
  onClose,
  title,
  submitLabel,
}: MoveClassModalProps) => {
  const [mode, setMode] = useState<string>('wholeClass');
  const [fromClassGradeId, setFromClassGradeId] = useState('');
  const [toClassGradeId, setToClassGradeId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: fromClassStudentsResp } = useSWR(
    mode === 'wholeClass' && fromClassGradeId
      ? ['students-in-class', fromClassGradeId]
      : null,
    () => studentActions.fetchStudents({ classGradeId: fromClassGradeId, limit: -1 })
  );

  const resetState = () => {
    setMode('wholeClass');
    setFromClassGradeId('');
    setToClassGradeId('');
    setSelectedStudentIds([]);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async () => {
    if (!toClassGradeId) return;

    const studentIds =
      mode === 'wholeClass'
        ? (fromClassStudentsResp?.data || []).map((s) => String(s._id))
        : selectedStudentIds;

    if (studentIds.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await studentActions.bulkMoveClass({
        studentIds,
        nextClassGradeId: toClassGradeId,
      });
      const summary = response.data as BulkActionSummary | undefined;
      showToast(
        summary
          ? `${summary.successCount} student(s) moved, ${summary.failureCount} failed`
          : 'Students moved successfully',
        'move-class-result',
        {
          theme: 'light',
          type: summary && summary.failureCount > 0 ? 'warning' : 'success',
        }
      );
      mutate((key) => Array.isArray(key) && key[0] === 'students');
      handleClose();
    } catch (error) {
      showToast('Failed to move students', 'move-class-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error moving students:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    !!toClassGradeId &&
    (mode === 'wholeClass' ? !!fromClassGradeId : selectedStudentIds.length > 0);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div>
        <RadioOptionType
          options={options}
          selectedOption={mode}
          setSelectedOption={setMode}
        />

        {mode === 'wholeClass' ? (
          <div className="mt-8">
            <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
              From class
            </Label>
            <ClassGradeDropdown
              value={fromClassGradeId}
              onValueChange={(v) => setFromClassGradeId(Array.isArray(v) ? v[0] : v)}
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

        <div className="mt-8">
          <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
            To class
          </Label>
          <ClassGradeDropdown
            value={toClassGradeId}
            onValueChange={(v) => setToClassGradeId(Array.isArray(v) ? v[0] : v)}
            placeholder="Select class"
            className="w-full"
          />
        </div>
      </div>
      <Button
        wide
        round
        className="h-12 mt-8"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        loading={isSubmitting}
      >
        {submitLabel}
      </Button>
    </Modal>
  );
};
