'use client';
import React from 'react';
import { useEntity } from 'simpler-state';
import { closePromoteModal, promoteModal } from '@/app/lib/entities/student.entity';
import { MoveClassModal } from './MoveClassModal';

export const PromoteModal = () => {
  const isOpen = useEntity(promoteModal);

  return (
    <MoveClassModal
      isOpen={isOpen}
      onClose={closePromoteModal}
      title="Promote"
      submitLabel="Promote"
    />
  );
};
