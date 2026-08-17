'use client';
import React from 'react';
import { useEntity } from 'simpler-state';
import { closeDemoteModal, demoteModal } from '@/app/lib/entities/student.entity';
import { MoveClassModal } from './MoveClassModal';

export const DemoteModal = () => {
  const isOpen = useEntity(demoteModal);

  return (
    <MoveClassModal
      isOpen={isOpen}
      onClose={closeDemoteModal}
      title="Demote"
      submitLabel="Demote"
    />
  );
};
