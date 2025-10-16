import React from 'react';
import CurriculumEditor from './CurriculumEditor';
import { useEntity } from 'simpler-state';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ClassGrade } from '@/app/lib/types/class.types';

export default function ManualCurriculum() {
  const createSubject = useEntity(createSubjectEntity);
  // Assume classGrades is array of class grade IDs
  const selectedGrades = createSubject.classGrades || [];
  // For display, you may want to fetch class grade names from API or context
  // Here, we just show the ID for simplicity

  if (selectedGrades.length === 0) {
    return <div className="text-gray-500 text-sm">No class grades selected.</div>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {selectedGrades.map((gradeId) => (
        <AccordionItem key={gradeId} value={gradeId}>
          <AccordionTrigger>
            Class Grade: {gradeId}
          </AccordionTrigger>
          <AccordionContent>
            <CurriculumEditor />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
