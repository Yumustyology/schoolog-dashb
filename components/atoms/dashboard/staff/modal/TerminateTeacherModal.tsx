'use client';
import { poppins_400 } from '@/app/lib/config/font.config';
import {
  closeTerminateTeacherModal,
  isTerminateTeacherModalOpen,
} from '@/app/lib/entities/staff.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import staffActions from '@/app/lib/actions/staff.action';
import showToast from '@/app/lib/utils/toast';
import React from 'react';
import { useEntity } from 'simpler-state';

type TerminateTeacherModalProps = {
  staffId?: string;
  onSuccess?: () => void;
};

export const TerminateTeacherModal = ({ staffId, onSuccess }: TerminateTeacherModalProps) => {
  const terminateTeacherModalOpen = useEntity(isTerminateTeacherModalOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleTerminate = async () => {
    if (!staffId) return;
    setIsSubmitting(true);
    try {
      await staffActions.updateStaffStatus(staffId, 'terminated');
      showToast('Staff member terminated', 'staff-terminated', { type: 'success' });
      onSuccess?.();
      closeTerminateTeacherModal();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={terminateTeacherModalOpen}
        onClose={closeTerminateTeacherModal}
        title="Terminate"
      >
        <p
          className={cn(
            'text-base text-center text-black1 mb-6',
            poppins_400.className
          )}
        >
          This will permanently terminate this staff member&apos;s employment
          record. This action cannot be undone from here.
        </p>

        <Button
          wide
          round
          className="h-12 mt-2 bg-red-500 text-white"
          onClick={handleTerminate}
          loading={isSubmitting}
          disabled={isSubmitting || !staffId}
        >
          Terminate staff
        </Button>
      </Modal>
    </div>
  );
};
