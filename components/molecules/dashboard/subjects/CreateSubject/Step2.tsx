import React, { useState } from 'react';
import { CurriculumType } from './CurriculumType';
// child components handle details
import UploadCurriculum from './CurriculumChildren/UploadCurriculum';
import WaecCurriculum from './CurriculumChildren/WaecCurriculum';
import ManualCurriculum from './CurriculumChildren/ManualCurriculum';
import { selectedCurriculumType } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';
import {
  getWaecCurriculum,
  getNecoCurriculum,
  getSubebCurriculum,
  getUbeCurriculum,
} from '@/app/lib/entities/curriculum.entity';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEffect } from 'react';
import FormSectionHeader from './FormSectionHeader';
import TermSessionDropdown from '@/components/molecules/dashboard/term-sessions/TermSessionDropdown';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
// import { useEntity } from 'simpler-state';
// import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import useSWR from 'swr';
import classGradeActions from '@/app/lib/actions/class-grade.actions';

function Step2() {
  const createSubject = useEntity(createSubjectEntity);
  const selectedGrades = createSubject.classGrades || [];
  const selectedCurriculum = useEntity(selectedCurriculumType);

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

  useEffect(() => {
    if (selectedCurriculum === 'waec') {
      const c = getWaecCurriculum();
      const mapped = c.terms.map((t) => ({
        termId: t.id,
        topics: t.topics.map((tp) => ({
          id: tp.id,
          title: tp.title,
          description: tp.description,
        })),
      }));
      createSubjectEntity.set((prev) => ({
        ...prev,
        curriculum: mapped,
        curriculumSource: 'waec',
      }));
    }
    if (selectedCurriculum === 'neco') {
      const c = getNecoCurriculum();
      const mapped = c.terms.map((t) => ({
        termId: t.id,
        topics: t.topics.map((tp) => ({
          id: tp.id,
          title: tp.title,
          description: tp.description,
        })),
      }));
      createSubjectEntity.set((prev) => ({
        ...prev,
        curriculum: mapped,
        curriculumSource: 'neco',
      }));
    }
    if (selectedCurriculum === 'subeb') {
      const c = getSubebCurriculum();
      const mapped = c.terms.map((t) => ({
        termId: t.id,
        topics: t.topics.map((tp) => ({
          id: tp.id,
          title: tp.title,
          description: tp.description,
        })),
      }));
      createSubjectEntity.set((prev) => ({
        ...prev,
        curriculum: mapped,
        curriculumSource: 'subeb',
      }));
    }
    if (selectedCurriculum === 'ube') {
      const c = getUbeCurriculum();
      const mapped = c.terms.map((t) => ({
        termId: t.id,
        topics: t.topics.map((tp) => ({
          id: tp.id,
          title: tp.title,
          description: tp.description,
        })),
      }));
      createSubjectEntity.set((prev) => ({
        ...prev,
        curriculum: mapped,
        curriculumSource: 'ube',
      }));
    }
  }, [selectedCurriculum]);

  const handleTermSelect = (term: TermSessionType | null, classId: string) => {
    createSubjectEntity.set((prev) => ({
      ...prev,
      selectedTerm: {
        ...(prev.selectedTerm || {}),
        [classId]: term,
      },
    }));
  };

  if (selectedGrades.length === 0) {
    return (
      <div className="text-gray-500 text-sm">No class grades selected.</div>
    );
  }

  return (
    <div>
      <FormSectionHeader
        title={'Create Curriculum'}
        description={'Enter details of each topics in the curriculum'}
      />

      <Accordion type="multiple" className="w-full">
        {selectedGrades.map((gradeId) => (
          <AccordionItem key={gradeId} value={gradeId}>
            <AccordionTrigger>
              Class Grade: {classGradeNames[gradeId] || gradeId}
            </AccordionTrigger>
            <AccordionContent>
              <>
                {/* Term Selection - Show for manual and upload curriculum creation */}
                {(selectedCurriculum === 'manual' ||
                  selectedCurriculum === 'upload') && (
                  <TermSessionDropdown
                    selectedTerm={createSubject.selectedTerm?.[gradeId] || null}
                    onTermSelect={(term) => handleTermSelect(term, gradeId)}
                    className="mb-6"
                  />
                )}

                <div>
                  <CurriculumType />
                </div>

                {selectedCurriculum === 'waec' && (
                  <WaecCurriculum
                    classId={gradeId}
                    selectedTerm={createSubject.selectedTerm?.[gradeId] || null}
                  />
                )}

                {selectedCurriculum === 'upload' && (
                  <UploadCurriculum
                    classId={gradeId}
                    selectedTerm={createSubject.selectedTerm?.[gradeId] || null}
                    onParsed={(mapped) => {
                      const convertedCurriculum = mapped.map((item, index) => ({
                        termId: `uploaded-term-${index + 1}`,
                        topics: item.topics.map((topic, topicIndex) => ({
                          id: `topic-${index + 1}-${topicIndex + 1}`,
                          title: topic,
                          description: '',
                        })),
                      }));
                      createSubjectEntity.set((prev) => ({
                        ...prev,
                        curriculum: convertedCurriculum,
                        curriculumSource: 'upload',
                      }));
                    }}
                  />
                )}

                {selectedCurriculum === 'manual' && (
                  <ManualCurriculum gradeId={gradeId} />
                )}
              </>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Step2;
