import React from 'react';
import CurriculumEditor from './CurriculumEditor';
import { getWaecCurriculum } from '@/app/lib/entities/curriculum.entity';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEffect } from 'react';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';

export default function WaecCurriculum({
  classId,
  selectedTerm,
}: {
  classId: string;
  selectedTerm: TermSessionType | null;
}) {
  useEffect(() => {
    const c = getWaecCurriculum();
    // map to createSubjectEntity minimal curriculum shape
    const mapped = c.terms.map((t) => ({ termId: t.id, topics: t.topics.map((tp) => ({ id: tp.id, title: tp.title, description: tp.description })) }));
    createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'waec' }));
  }, []);

  return (
    <div>
      <CurriculumEditor classId={classId} selectedTerm={selectedTerm} />
    </div>
  );
}
