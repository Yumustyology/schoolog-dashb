import { Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import NotificationBigIcon from '@/components/atoms/icons/ModalIcons/NotificationBigIcon';
import { DrawerSide } from '@/components/molecules/dashboard/DrawerSide';
import React from 'react';
import useSWR from 'swr';
import { AssignedTeacherDetail } from '../AssignedTeacherDetail';
import Button from '@/components/atoms/form/Button';
import classGradeActions from '@/app/lib/actions/class-grade.actions';

type Teacher = {
  _id: string;
  firstName?: string;
  lastName?: string;
};

export const TeachersListDrawer = ({
  isTeacherListOpen,
  setIsTeacherListOpen,
  subjectId,
  classGradeId,
  subjectName,
}: {
  isTeacherListOpen: boolean;
  setIsTeacherListOpen: (open: boolean) => void;
  subjectId?: string;
  classGradeId?: string;
  subjectName?: string;
}) => {
  const { data, isLoading, mutate } = useSWR(
    subjectId && classGradeId
      ? ['class-subject-teachers', subjectId, classGradeId]
      : null,
    () => classGradeActions.getClassSubjectForSubjectAndClass(subjectId as string, classGradeId as string)
  );

  const classSubjectId = data?.data?.classSubject?._id as string | undefined;
  const teachers: Teacher[] = data?.data?.classSubject?.teacherIds || [];

  return (
    <DrawerSide
      open={isTeacherListOpen}
      close={() => setIsTeacherListOpen(false)}
      title={`${teachers.length} assigned teacher${teachers.length === 1 ? '' : 's'}`}
      className="w-[472px]"
    >
      <div className="p-6 overflow-y-auto sidebar-scroll max-h-[calc(100vh-140px)]">
        {isLoading ? null : teachers.length > 0 ? (
          <div className="">
            {teachers.map((teacher) => (
              <AssignedTeacherDetail
                key={teacher._id}
                teacherId={teacher._id}
                classSubjectId={classSubjectId || ''}
                name={`${teacher.firstName || ''} ${teacher.lastName || ''}`.trim()}
                subjectAssignedTo={subjectName || 'this subject'}
                onRemoved={() => mutate()}
              />
            ))}
            <Button wide round className="bg-light text-primary py-3 mt-14">
              {' '}
              Add teacher{' '}
            </Button>
          </div>
        ) : (
          <div className="flex w-full h-[25rem]">
            <div className="flex flex-col justify-center items-center text-center mx-auto h-full my-auto">
              <NotificationBigIcon />
              <h1
                className={cn(
                  'mt-8 mb-3 text-xl text-gray1',
                  Inter_600.className
                )}
              >
                No Teacher Assigned Yet
              </h1>
              <p className={cn('text-sm text-gray', Inter_500.className)}>
                Add a new teacher here
              </p>
            </div>
          </div>
        )}
      </div>
    </DrawerSide>
  );
};
