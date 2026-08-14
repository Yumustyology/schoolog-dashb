import React, { useState } from 'react';
import CurriculumEditor from './CurriculumEditor';
import { useEntity } from 'simpler-state';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from '@/components/ui/accordion';
import useSWR from 'swr';
import classGradeActions from '@/app/lib/actions/class-grade.actions';

export default function ManualCurriculum({ gradeId }: { gradeId: string }) {
  const createSubject = useEntity(createSubjectEntity);
  const selectedGrades = createSubject.classGrades || [];
  const { data, isLoading } = useSWR('/class-grades/all', () =>
    classGradeActions.fetchClassGradesAll({ limit: -1 })
  );
  const classGrades = (data?.data || []) as Array<{
    _id: string;
    name: string;
  }>;
  // Map for quick lookup
  const classGradeNames: Record<string, string> = {};
  classGrades.forEach((cg) => {
    classGradeNames[cg._id] = cg.name;
  });

  // Local state for each collapsible (class grade)
  // const [gradeStates, setGradeStates] = useState<
  //   Record<
  //     string,
  //     {
  //       termSession: string | null;
  //       topics: Array<{ id: string; title: string; description?: string }>;
  //     }
  //   >
  // >({});

  // // Handler to update local state for a class grade
  // const updateGradeState = (
  //   gradeId: string,
  //   newState: Partial<{
  //     termSession: string | null;
  //     topics: Array<{ id: string; title: string; description?: string }>;
  //   }>
  // ) => {
  //   setGradeStates((prev) => ({
  //     ...prev,
  //     [gradeId]: {
  //       ...prev[gradeId],
  //       ...newState,
  //     },
  //   }));
  // };

  if (selectedGrades.length === 0) {
    return (
      <div className="text-gray-500 text-sm">No class grades selected.</div>
    );
  }

  return (
    <CurriculumEditor
      classId={gradeId}
      selectedTerm={createSubject.selectedTerm[gradeId] || null}
      // gradeState={gradeStates[gradeId] || { termSession: null, topics: [] }}
      // updateGradeState={updateGradeState}
    />
  );
}
