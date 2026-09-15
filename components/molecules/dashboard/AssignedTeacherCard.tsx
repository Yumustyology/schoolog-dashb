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
        'bg-white py-6 px-4 sm:px-6 flex flex-col justify-between h-auto min-h-[390px] rounded-md col-span-2 border-none',
        className
      )}
    >
      <div>
        {page === 'classInfo' ? (
          <CardHeader className="bg-transparent p-0 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                {teacher && teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt="teacher-image"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : teacher && (teacher.firstName || teacher.lastName) ? (
                  <TextAvatar
                    firstName={teacher.firstName || ''}
                    lastName={teacher.lastName || ''}
                    size={64}
                  />
                ) : (
                  <AvatarIcon size={64} />
                )}
              </div>
              <div>
                <h3
                  className={cn(
                    'text-sm text-gray6 mb-1',
                    poppins_500.className
                  )}
                >
                  {teacher
                    ? `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim()
                    : 'No assigned teacher'}
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Class Teacher
                </p>
              </div>
            </div>
          </CardHeader>
        ) : (
          <CardHeader className="bg-[#f8f8f8] rounded-2xl sm:rounded-full py-2 px-3 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100">
                {teacher && teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={teacher.firstName || 'Teacher'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : teacher && (teacher.firstName || teacher.lastName) ? (
                  <TextAvatar
                    firstName={teacher.firstName || ''}
                    lastName={teacher.lastName || ''}
                    size={48}
                  />
                ) : (
                  <AvatarIcon size={48} />
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
                <div>
                  <h3
                    className={cn(
                      'text-sm text-gray6 mb-1',
                      poppins_500.className
                    )}
                  >
                    {teacher
                      ? `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.email || 'Assigned Teacher'
                      : 'No assigned teacher'}
                  </h3>
                  {role === 'student' && (
                    <p
                      className={cn('text-sm text-gray', poppins_400.className)}
                    >
                      {subjectTitle ? `${subjectTitle} Teacher` : 'Subject Teacher'}
                    </p>
                  )}

                  {role === 'school' && (
                    <div>
                      <p
                        className={cn(
                          'text-sm text-gray',
                          poppins_400.className
                        )}
                      >
                        Assigned teacher
                      </p>
                    </div>
                  )}
                </div>
                {role === 'school' && (
                  <Button
                    round
                    className={cn(
                      'text-primary bg-light text-sm ',
                      poppins_400.className
                    )}
                    onClick={() => {
                      setIsTeacherListOpen(true);
                    }}
                  >
                    View all teachers
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        )}

        {role === 'student' && (
          <CardContent className="flex flex-col gap-6 w-full px-0 ">
            <section className="flex justify-between items-center w-full">
              <div>
                <h3 className={cn('text-sm text-black1', Inter_500.className)}>
                  {teacher?.email || 'No email available'}
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Email
                </p>
              </div>

              <div>
                <h3
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  {teacher?.phone || 'No phone available'}
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Phone number
                </p>
              </div>
            </section>

            <section className="flex justify-between items-center">
              <div>
                <h3
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  Admin Office
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Office
                </p>
              </div>

              <div>
                <h3
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  9:00am - 12:00pm
                </h3>
                <p
                  className={cn(
                    'text-sm text-gray text-right',
                    poppins_400.className
                  )}
                >
                  Time on seat
                </p>
              </div>
            </section>
          </CardContent>
        )}
      </div>

      {role === 'school' && page === 'subjectInfo' && (
        <CardContent className="flex flex-col gap-4 w-full px-0">
          <div className="bg-[#F9FAFB] p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className={cn('text-sm text-black1 font-semibold', poppins_500.className)}>
                  {nextClassSchedule || 'As per timetable'}
                </h3>
                <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                  Next class schedule
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <p className={cn('text-xs text-gray-500 mb-0.5', poppins_400.className)}>
                Next topic
              </p>
              <h3 className={cn('text-sm text-gray-800 font-medium', poppins_500.className)}>
                {nextTopic || 'No upcoming topic'}
              </h3>
            </div>
          </div>
        </CardContent>
      )}

      {page === 'classInfo' && (
        <CardContent className="flex flex-col gap-6 w-full px-0 ">
          <section className="flex justify-between items-center w-full">
            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                {teacher ? teacher.email : 'No email available'}
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Email
              </p>
            </div>

            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                {teacher ? (teacher.phone ?? '-') : 'No phone available'}
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Phone number
              </p>
            </div>
          </section>

          <section>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Role
            </p>
            <h3 className={cn('text-sm text-gray6', poppins_500.className)}>
              Class Teacher
            </h3>
          </section>
        </CardContent>
      )}

      <CardFooter className="px-0 py-0 --mt-6 w-full">
        {role === 'student' && page !== 'classInfo' && (
          <Button wide round className="h-[45px]">
            <Message color="#FFFFFF" />
            <p className="ml-2">Message Teacher</p>
          </Button>
        )}

        {role === 'school' && (
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-between">
            <Button
              round
              wide
              outlined
              className="h-[45px] px-4 sm:px-8 border border-primary w-full sm:w-auto"
              onClick={openChangeTeacherModal}
            >
              <ChangeTeacherIcon />
              <p className="ml-2">{teacher ? 'Change' : 'Assign'} Teacher</p>
            </Button>
            {teacher ? (
              <Button
                round
                flat
                className="h-[45px] border px-4 sm:px-8 bg-transparent border-primary w-full sm:w-auto"
                // onClick={}
              >
                <p className="text-primary text-center">
                  View Teacher Details
                </p>
              </Button>
            ) : null}
          </div>
        )}
      </CardFooter>
            {/* <Button
              round
              className="h-[45px] border px-8 bg-light"
              onClick={openAddTeacherModal}
            >
              <AddTeacherIcon color={theme.primary} />
              <p className="ml-2 text-primary">Add another Teacher</p>
            </Button> */}

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
