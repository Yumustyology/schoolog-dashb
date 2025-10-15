'use client';
import {
  selectedCurriculumType,
  setSelectedCurriculumType,
} from '@/app/lib/entities/subject.entity';
import { Dropdown } from '@/components/atoms/form/Dropdown';
import { useEntity } from 'simpler-state';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

export function CurriculumType() {
  const selectedCurriculum = useEntity(selectedCurriculumType);
  console.log(selectedCurriculum);

  const curriculums = [
    { value: 'upload', label: 'Upload .xlsx and .csv file format' },
    { value: 'manual', label: 'Manual Input' },
  ];

  return (
    <div>
      <label
        className={cn(
          'block text-left w-full font-nunito text-base mb-3',
          poppins_400.className
        )}
      >
        Curriculum Input Type
      </label>
      <Dropdown
        options={curriculums}
        selectedOption={selectedCurriculum}
        onChange={setSelectedCurriculumType}
        placeholder="Select Curriculum"
        label=""
      />
    </div>
  );
}
