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
import TermSessionDropdown from '@/components/molecules/dashboard/term-sessions/TermSessionDropdown';
import { type TermSession } from '@/app/lib/actions/term-session.actions';

function Step2() {
  const selectedCurriculum = useEntity(selectedCurriculumType);
  const createSubject = useEntity(createSubjectEntity);

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

  const handleTermSelect = (term: TermSession | null) => {
    createSubjectEntity.set((prev) => ({
      ...prev,
      selectedTerm: term
    }));
  };

  return (
    <div>
      <FormSectionHeader
        title={"Create Curriculum"}
        description={"Enter details of each topics in the curriculum"}
      />
      
      {/* Term Selection - Show for manual and upload curriculum creation */}
      {(selectedCurriculum === 'manual' || selectedCurriculum === 'upload') && (
        <TermSessionDropdown
          selectedTerm={createSubject.selectedTerm}
          onTermSelect={handleTermSelect}
          className="mb-6"
        />
      )}

      <div>
        <CurriculumType />
      </div>

      {selectedCurriculum === 'waec' && <WaecCurriculum />}

      {selectedCurriculum === 'upload' && (
        <UploadCurriculum
          onParsed={(mapped) => {
            // Convert upload format to curriculum format
            const convertedCurriculum = mapped.map((item, index) => ({
              termId: `uploaded-term-${index + 1}`,
              topics: item.topics.map((topic, topicIndex) => ({
                id: `topic-${index + 1}-${topicIndex + 1}`,
                title: topic,
                description: ''
              }))
            }));
            createSubjectEntity.set((prev) => ({ 
              ...prev, 
              curriculum: convertedCurriculum, 
              curriculumSource: 'upload' 
            }));
          }}
        />
      )}

      {selectedCurriculum === 'manual' && <ManualCurriculum />}
    </div>
  );
}

export default Step2;
