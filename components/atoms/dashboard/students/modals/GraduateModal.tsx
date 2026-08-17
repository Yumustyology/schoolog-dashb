'use client';
import React from 'react';
import { useEntity } from 'simpler-state';
import { closeGraduateModal, graduateModal } from '@/app/lib/entities/student.entity';
import { GraduateStudentsModal } from './GraduateStudentsModal';

export const GraduateModal = () => {
  const isOpen = useEntity(graduateModal);

  return <GraduateStudentsModal isOpen={isOpen} onClose={closeGraduateModal} />;
};
