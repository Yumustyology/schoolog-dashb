import Button from '@/components/atoms/form/Button';
import Message from '@/components/atoms/icons/SideBar/Message';
import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/app/lib/utils';

import Image from 'next/image';
import AvatarIcon from '@/components/atoms/AvatarIcon';
import TextAvatar from '@/components/atoms/TextAvatar';
import React from 'react';
import {
  AddTeacherIcon,
  ChangeTeacherIcon,
} from '@/components/atoms/icons/Icons';
// import Modal from '../Modal';
// import DropdownSearch from '@/components/atoms/form/DropdownSearch';
// import ImageOptionBox from '@/components/atoms/form/ImageOptionBox';
import ChangeTeacherModal from '@/components/atoms/dashboard/subjects/subjectsInfoModals/ChangeTeacherModal';
import {
  openAddTeacherModal,
  openChangeTeacherModal,
} from '@/app/lib/entities/subject.entity';
import { TeachersListDrawer } from '@/components/atoms/dashboard/subjects/SubjectsDrawer/TeachersListDrawer';
import AddTeacherModal from '@/components/atoms/dashboard/subjects/subjectsInfoModals/AddTeacherModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

import { TeacherDrawerItem } from '@/components/atoms/dashboard/subjects/SubjectsDrawer/TeachersListDrawer';

function AssignedTeacherCard({
  role,
  page,
  className,
  teacher,
  allTeachers = [],
  subjectTitle,
  subjectId,
  classGradeId,
  departmentId,
  onAssignSuccess,
  nextClassSchedule,
  nextTopic,
}: {
  role: 'school' | 'student' | 'parent' | 'school';
  page?: 'classInfo' | 'subjectInfo';
  className?: string;
  teacher?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    image?: string;
  } | null;
  allTeachers?: TeacherDrawerItem[];
  subjectTitle?: string;
  subjectId?: string;
  classGradeId?: string;
  departmentId?: string;
  onAssignSuccess?: () => void;
  nextClassSchedule?: string;
  nextTopic?: string;
}) {
  const { theme } = useSlgTheme();

  // const [assignTeacherModal, setAssignTeacherModal] = React.useState(true);
  const [isTeachersListOpen, setIsTeacherListOpen] = React.useState(false);
  return (
    <Card
      className={cn(
        'bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full min-h-[340px]',
        className
      )}
    >
      <div>
        {page === 'classInfo' ? (
          <CardHeader className="bg-transparent p-0 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                {teacher && teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt="teacher-image"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                ) : teacher ? (
                  <TextAvatar
                    firstName={teacher.firstName}
                    lastName={teacher.lastName}
                    email={teacher.email}
                    size={56}
                  />
                ) : (
                  <AvatarIcon size={56} />
                )}
              </div>
              <div>
                <h3
                  className={cn(
                    'text-base text-gray-900 font-semibold mb-0.5',
                    poppins_500.className
                  )}
                >
                  {teacher
                    ? `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.email || 'Assigned Teacher'
                    : 'No assigned teacher'}
                </h3>
                <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                  Class Teacher
                </p>
              </div>
            </div>
          </CardHeader>
        ) : (
          <CardHeader className="bg-transparent p-0 mb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                  {teacher && teacher.image ? (
                    <Image
                      src={teacher.image}
                      alt={teacher.firstName || 'Teacher'}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : teacher ? (
                    <TextAvatar
                      firstName={teacher.firstName}
                      lastName={teacher.lastName}
                      email={teacher.email}
                      size={56}
                    />
                  ) : (
                    <AvatarIcon size={56} />
                  )}
                </div>
                <div>
                  <h3
                    className={cn(
                      'text-base text-gray-900 font-semibold mb-0.5',
                      poppins_500.className
                    )}
                  >
                    {teacher
                      ? `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.email || 'Assigned Teacher'
                      : 'No assigned teacher'}
                  </h3>
                  <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                    Assigned teacher
                  </p>
                </div>
              </div>

              {role === 'school' && (
                <button
                  type="button"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setIsTeacherListOpen(true)}
                >
                  View all
                </button>
              )}
            </div>
          </CardHeader>
        )}

        {role === 'student' && (
          <CardContent className="flex flex-col gap-4 w-full px-0 my-3">
            <section className="flex justify-between items-center w-full">
              <div>
                <h3 className={cn('text-sm text-gray-900 font-medium', Inter_500.className)}>
                  {teacher?.email || 'No email available'}
                </h3>
                <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                  Email
                </p>
              </div>

              <div>
                <h3
                  className={cn('text-sm text-gray-900 font-medium', poppins_500.className)}
                >
                  {teacher?.phone || 'No phone available'}
                </h3>
                <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                  Phone number
                </p>
              </div>
            </section>
          </CardContent>
        )}
      </div>

      {role === 'school' && page === 'subjectInfo' && (
        <CardContent className="flex flex-col p-0 my-3 flex-grow justify-center">
          <div className="bg-primary/[0.04] p-4 rounded-xl border border-primary/10 flex flex-col gap-3">
            <div>
              <h3 className={cn('text-sm font-semibold text-gray-900', poppins_500.className)}>
                {nextClassSchedule || 'To be scheduled'}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Next class schedule
              </p>
            </div>

            <div className="pt-2 border-t border-primary/15">
              <p className={cn('text-xs text-gray-500 mb-0.5', poppins_400.className)}>
                Next topic
              </p>
              <h3 className={cn('text-sm font-medium text-gray-800 line-clamp-2', poppins_500.className)}>
                {nextTopic || 'No topics added yet'}
              </h3>
            </div>
          </div>
        </CardContent>
      )}

      {page === 'classInfo' && (
        <CardContent className="flex flex-col gap-4 w-full px-0 my-3">
          <section className="flex justify-between items-center w-full">
            <div>
              <h3 className={cn('text-sm text-gray-900 font-medium', poppins_500.className)}>
                {teacher ? teacher.email : 'No email available'}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Email
              </p>
            </div>

            <div>
              <h3 className={cn('text-sm text-gray-900 font-medium', poppins_500.className)}>
                {teacher ? (teacher.phone ?? '-') : 'No phone available'}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Phone number
              </p>
            </div>
          </section>
        </CardContent>
      )}

      <CardFooter className="p-0 pt-2 w-full">
        {role === 'student' && page !== 'classInfo' && (
          <Button wide round className="h-11 rounded-xl">
            <Message color="#FFFFFF" />
            <p className="ml-2">Message Teacher</p>
          </Button>
        )}

        {role === 'school' && (
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-11 w-full rounded-full border border-primary text-primary hover:bg-primary/5 font-medium text-sm transition-colors px-6 py-2 cursor-pointer shadow-sm"
              onClick={openChangeTeacherModal}
            >
              <ChangeTeacherIcon color={theme.primary} />
              <span className="whitespace-nowrap font-medium text-sm">
                {teacher ? 'Change Teacher' : 'Assign Teacher'}
              </span>
            </button>
          </div>
        )}
      </CardFooter>

      <AddTeacherModal />
      <ChangeTeacherModal
        subjectId={subjectId}
        classGradeId={classGradeId}
        departmentId={departmentId}
        onSuccess={onAssignSuccess}
      />
      <TeachersListDrawer
        isTeacherListOpen={isTeachersListOpen}
        setIsTeacherListOpen={setIsTeacherListOpen}
        teachers={allTeachers}
        subjectTitle={subjectTitle}
      />
    </Card>
  );
}

export default AssignedTeacherCard;
