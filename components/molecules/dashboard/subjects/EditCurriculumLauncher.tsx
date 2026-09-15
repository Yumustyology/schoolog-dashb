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
    <div className="flex-shrink-0">
      <Button
        onClick={() => {
          if (!classGradeId) return;
          openEditor(classGradeId, subjectId);
        }}
        round
        className="h-[42px] py-2 px-5 sm:px-6 flex gap-2 justify-center items-center whitespace-nowrap flex-shrink-0"
      >
        <EditIcon color="#FFFFFF" />
        <span className={cn('text-sm whitespace-nowrap font-medium', Inter_500.className)}>
          Edit Curriculum
        </span>
      </Button>

      {EditCurriculumModal}
    </div>
  );
}
