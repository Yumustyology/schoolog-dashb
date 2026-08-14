import React from 'react';
import useEditCurriculum from '@/app/lib/hooks/useEditCurriculum';
import Button from '@/components/atoms/form/Button';
import { Inter_500 } from '@/app/lib/config/font.config';
import { EditIcon } from '@/components/atoms/icons/Icons';
import { cn } from '@/app/lib/utils';


export default function EditCurriculumLauncher({
  classGradeId,
  subjectId,
}: {
  classGradeId: string | undefined;
  subjectId: string;
}) {
  const { openEditor, EditCurriculumModal } = useEditCurriculum();

  return (
    <div className="">
      <Button
        onClick={() => {
          if (!classGradeId) return;
          openEditor(classGradeId, subjectId);
        }}
        round
        className="h-[48px]  py-3 px-8 flex gap-2"
      >
        <EditIcon color="#FFFFFF" />
        <span className={cn('text-base ', Inter_500.className)}>
          {' '}
          Edit Curriculum{' '}
        </span>
      </Button>

      {EditCurriculumModal}
    </div>
  );
}
