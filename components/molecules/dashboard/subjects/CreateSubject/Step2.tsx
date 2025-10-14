import React from 'react';
import { CurriculumType } from './CurriculumType';
// child components handle details
import UploadCurriculum from './CurriculumChildren/UploadCurriculum';
import WaecCurriculum from './CurriculumChildren/WaecCurriculum';
import ManualCurriculum from './CurriculumChildren/ManualCurriculum';
import { selectedCurriculumType } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';
import { getWaecCurriculum, getNecoCurriculum, getSubebCurriculum, getUbeCurriculum } from '@/app/lib/entities/curriculum.entity';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEffect } from 'react';
import FormSectionHeader from './FormSectionHeader';

function Step2() {
  const selectedCurriculum = useEntity(selectedCurriculumType);
  useEffect(() => {
    if (selectedCurriculum === 'waec') {
      const c = getWaecCurriculum();
      const mapped = c.terms.map((t) => ({ termId: t.id, topics: t.topics.map((tp) => ({ id: tp.id, title: tp.title, description: tp.description })) }));
      createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'waec' }));
    }
    if (selectedCurriculum === 'neco') {
      const c = getNecoCurriculum();
      const mapped = c.terms.map((t) => ({ termId: t.id, topics: t.topics.map((tp) => ({ id: tp.id, title: tp.title, description: tp.description })) }));
      createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'neco' }));
    }
    if (selectedCurriculum === 'subeb') {
      const c = getSubebCurriculum();
      const mapped = c.terms.map((t) => ({ termId: t.id, topics: t.topics.map((tp) => ({ id: tp.id, title: tp.title, description: tp.description })) }));
      createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'subeb' }));
    }
    if (selectedCurriculum === 'ube') {
      const c = getUbeCurriculum();
      const mapped = c.terms.map((t) => ({ termId: t.id, topics: t.topics.map((tp) => ({ id: tp.id, title: tp.title, description: tp.description })) }));
      createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'ube' }));
    }
  }, [selectedCurriculum]);
  return (
    <div>
      <FormSectionHeader
        title={"Create Curriculum"}
        description={"Enter details of each topics in the curriculum"}
      />
      <div>
        <CurriculumType />
      </div>

      {selectedCurriculum === 'waec' && <WaecCurriculum />}

      {selectedCurriculum === 'upload' && (
        <UploadCurriculum
          onParsed={(mapped) => {
            // parent handles updating the shared entity state so UploadCurriculum remains reusable
            createSubjectEntity.set((prev) => ({ ...prev, curriculum: mapped, curriculumSource: 'upload' }));
          }}
        />
      )}

      {selectedCurriculum === 'manual' && <ManualCurriculum />}
    </div>
  );
}

export default Step2;
