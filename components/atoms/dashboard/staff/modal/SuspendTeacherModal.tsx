'use client';
import { poppins_400 } from '@/app/lib/config/font.config';
import {
  closeSuspendTeacherModal,
  isSuspendTeacherModalOpen,
} from '@/app/lib/entities/staff.entity';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import staffActions from '@/app/lib/actions/staff.action';
import showToast from '@/app/lib/utils/toast';
import React from 'react';
import { useEntity } from 'simpler-state';

type SuspendTeacherModalProps = {
  staffId?: string;
  onSuccess?: () => void;
};

export const SuspendTeacherModal = ({ staffId, onSuccess }: SuspendTeacherModalProps) => {
  const suspendTeacherModalOpen = useEntity(isSuspendTeacherModalOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSuspend = async () => {
    if (!staffId) return;
    setIsSubmitting(true);
    try {
      await staffActions.updateStaffStatus(staffId, 'suspended');
      showToast('Staff member suspended', 'staff-suspended', { type: 'success' });
      onSuccess?.();
      closeSuspendTeacherModal();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={suspendTeacherModalOpen}
        onClose={closeSuspendTeacherModal}
        title="Suspend"
      >
        <p
          className={cn(
            'text-base text-center text-black1 mb-6',
            poppins_400.className
          )}
        >
          This staff member will be marked as suspended and lose access until
          reinstated.
        </p>

        <Button
          wide
          round
          className="h-12 mt-2 bg-red-500 text-white"
          onClick={handleSuspend}
          loading={isSubmitting}
          disabled={isSubmitting || !staffId}
        >
          Suspend staff
        </Button>
      </Modal>
    </div>
  );
};
