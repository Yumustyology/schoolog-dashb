'use client';
import {
  selectedCurriculumType,
  setSelectedCurriculumType,
} from '@/app/lib/entities/subject.entity';
import { Dropdown } from '@/components/atoms/form/Dropdown';
import { useState } from 'react';
import { useEntity } from 'simpler-state';

export function CurriculumType() {
  const selectedCurriculum = useEntity(selectedCurriculumType);
  console.log(selectedCurriculum);

  const curriculums = [
    { value: 'upload', label: 'Upload .xlsx and .csv file format' },
    { value: 'manual', label: 'Manual Input' },
    { value: 'waec', label: 'Waec Standard Curriculum' },
    { value: 'neco', label: 'Neco Standard Curriculum' },
    { value: 'ube', label: ' UBE Curriculum' },
    { value: 'subeb', label: 'SUBEB Curriculum' },
  ];

  return (
    <Dropdown
      options={curriculums}
      selectedOption={selectedCurriculum}
      onChange={setSelectedCurriculumType}
      placeholder="Select Curriculum"
    />
  );
}
