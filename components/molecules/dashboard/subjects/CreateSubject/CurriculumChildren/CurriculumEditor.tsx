import React from 'react';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
import type { CurriculumEntry } from '@/app/lib/types/curriculum.types';
import { useEntity } from 'simpler-state';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import LocalCurriculumEditor from '@/components/molecules/dashboard/subjects/CreateSubject/CurriculumChildren/LocalCurriculumEditor';

export default function CurriculumEditor({ classId, selectedTerm }: { classId: string; selectedTerm: TermSessionType | null }) {
  const createSubject = useEntity(createSubjectEntity);

  // Supports both a plain value and a React-style updater function, since
  // LocalCurriculumEditor calls this both ways (e.g. `setCurriculum(arr)`
  // and `setCurriculum((prev) => ...)`).
  const setCurriculum: React.Dispatch<React.SetStateAction<CurriculumEntry[]>> = (c) => {
    createSubjectEntity.set((prev) => ({
      ...prev,
      curriculum:
        typeof c === 'function'
          ? (c as (prevCurriculum: CurriculumEntry[]) => CurriculumEntry[])(
              prev.curriculum || []
            )
          : c,
    }));
  };

  return (
    <div className="w-full mt-5">
      <LocalCurriculumEditor
        classId={classId}
        selectedTerm={selectedTerm}
        curriculum={createSubject.curriculum || []}
        setCurriculum={setCurriculum}
      />
    </div>
  );
}