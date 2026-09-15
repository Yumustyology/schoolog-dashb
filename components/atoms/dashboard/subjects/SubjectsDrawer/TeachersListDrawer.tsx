import { teacherImg2 } from '@/app/assets';
import { Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import NotificationBigIcon from '@/components/atoms/icons/ModalIcons/NotificationBigIcon';
import { DrawerSide } from '@/components/molecules/dashboard/DrawerSide';
import React from 'react';
import { AssignedTeacherDetail } from '../AssignedTeacherDetail';
import Button from '@/components/atoms/form/Button';
import { openChangeTeacherModal } from '@/app/lib/entities/subject.entity';

export interface TeacherDrawerItem {
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  image?: string;
  subjectAssignedTo?: string;
}

export const TeachersListDrawer = ({
  isTeacherListOpen,
  setIsTeacherListOpen,
  teachers = [],
  subjectTitle,
}: {
  isTeacherListOpen: boolean;
  setIsTeacherListOpen: (v: boolean) => void;
  teachers?: TeacherDrawerItem[];
  subjectTitle?: string;
}) => {
  const count = teachers.length;
  const titleText = `${count} assigned teacher${count === 1 ? '' : 's'}`;

  return (
    <DrawerSide
      open={isTeacherListOpen}
      close={() => setIsTeacherListOpen(false)}
      title={titleText}
      className="w-[472px]"
    >
      <div className="p-6 overflow-y-auto sidebar-scroll max-h-[calc(100vh-140px)]">
        {teachers.length > 0 ? (
          <div className="">
            {teachers.map((teacher, index) => {
              const fullName =
                teacher.name ||
                `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() ||
                'Assigned Teacher';
              return (
                <AssignedTeacherDetail
                  key={teacher._id || index}
                  img={teacher.image || teacherImg2}
                  name={fullName}
                  subjectAssignedTo={teacher.subjectAssignedTo || subjectTitle || 'Subject'}
                  setIsTeacherListOpen={setIsTeacherListOpen}
                />
              );
            })}
            <Button
              wide
              round
              className="bg-light text-primary py-3 mt-14"
              onClick={() => {
                setIsTeacherListOpen(false);
                openChangeTeacherModal();
              }}
            >
              Assign Teacher
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
              <p className={cn('text-sm text-gray mb-6', Inter_500.className)}>
                Assign a teacher to this subject
              </p>
              <Button
                round
                className="bg-primary text-white px-6 py-2"
                onClick={() => {
                  setIsTeacherListOpen(false);
                  openChangeTeacherModal();
                }}
              >
                Assign Teacher
              </Button>
            </div>
          </div>
        )}
      </div>
    </DrawerSide>
  );
};
