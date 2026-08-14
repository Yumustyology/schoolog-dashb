import React from 'react';
import useSWR from 'swr';
import Modal from '@/components/molecules/Modal';
import curriculumActions from '@/app/lib/actions/curriculum.actions';
import showToast from '@/app/lib/utils/toast';
import { patchCurriculumForClassSubject } from '@/app/lib/actions/curriculum.actions';
import LocalCurriculumEditor from '@/components/molecules/dashboard/subjects/CreateSubject/CurriculumChildren/LocalCurriculumEditor';
import TermSessionDropdown from '@/components/molecules/dashboard/term-sessions/TermSessionDropdown';
import Button from '@/components/atoms/form/Button';
import { cn } from '../utils';
import {
  normalizeCurriculumData,
  transformCurriculumForSave,
} from '../utils/curriculumParser';

export function useEditCurriculum() {
  const [open, setOpen] = React.useState(false);
  const [classGradeId, setClassGradeId] = React.useState<string | null>(null);
  const [subjectId, setSubjectId] = React.useState<string | null>(null);
  const [localCurriculum, setLocalCurriculum] = React.useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = React.useState<any | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const swrKey = React.useMemo(() => {
    if (!open || !classGradeId || !subjectId) return null;
    return `/curriculum/class/${classGradeId}/subject/${subjectId}`;
  }, [open, classGradeId, subjectId]);

  const { data, isLoading, mutate } = useSWR(
    swrKey,
    () =>
      curriculumActions.getCurriculumForClassSubject(
        classGradeId as string,
        subjectId as string
      ),
    { revalidateOnFocus: false }
  );

  React.useEffect(() => {
    if (!data?.data) return;

    const normalized = normalizeCurriculumData(data.data, classGradeId);
    setLocalCurriculum(normalized);

    if (normalized.length > 0 && normalized[0].termSession) {
      setSelectedTerm(normalized[0].termSession);
    }
  }, [data, classGradeId]);

  const openEditor = (cgId: string, sId: string) => {
    setClassGradeId(cgId);
    setSubjectId(sId);
    setLocalCurriculum([]);
    setSelectedTerm(null);
    setOpen(true);
  };

  const closeEditor = () => {
    setOpen(false);
    setClassGradeId(null);
    setSubjectId(null);
    setLocalCurriculum([]);
    setSelectedTerm(null);
  };

  const handleSave = async () => {
    if (!classGradeId || !subjectId) return;

    setIsSaving(true);
    try {
      const transformed = transformCurriculumForSave(
        localCurriculum,
        classGradeId
      );
      const payload = { curriculum: transformed };

      await patchCurriculumForClassSubject(classGradeId, subjectId, payload);
      showToast('Curriculum updated', `curriculum-updated-${classGradeId}`, {
        type: 'success',
      });
      await mutate();
      closeEditor();
    } catch (e: any) {
      showToast(
        e?.message || 'Unable to update curriculum',
        `curriculum-update-error-${classGradeId}`,
        { type: 'error' }
      );
    } finally {
      setIsSaving(false);
    }
  };

  const EditCurriculumModal = (
    <Modal
      isOpen={open}
      onClose={closeEditor}
      title="Edit Curriculum"
      minHeight="420px"
      className="min-w-[600px]"
      footer={
        <div className="flex justify-between items-center gap-3">
          <Button
            className={cn('h-[44px] py-3 px-6 flex gap-2')}
            onClick={closeEditor}
            flat
            outlined
            round
          >
            Cancel
          </Button>
          <Button
            className={cn('h-[44px] py-3 px-6 flex gap-2')}
            onClick={handleSave}
            round
            loading={isSaving}
          >
            Save changes
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {isLoading && <div>Loading curriculum…</div>}
        {!isLoading && (
          <div>
            <TermSessionDropdown
              selectedTerm={selectedTerm}
              onTermSelect={setSelectedTerm}
              className="mb-4"
            />
            <LocalCurriculumEditor
              classId={classGradeId as string}
              selectedTerm={selectedTerm}
              curriculum={localCurriculum}
              setCurriculum={setLocalCurriculum}
            />
          </div>
        )}
      </div>
    </Modal>
  );

  return {
    openEditor,
    closeEditor,
    EditCurriculumModal,
    isOpen: open,
    isLoading,
  };
}

export default useEditCurriculum;
