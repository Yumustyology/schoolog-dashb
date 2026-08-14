'use client';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import {
  closeAddTeacherMenu,
  isAddTeacherMenuOpen,
  openUploadTeacherModal,
  openInviteTutorModal,
} from '@/app/lib/entities/staff.entity';
import {
  closeAddStudentsMenu,
  openUploadStudentModal,
} from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import ArrowRightIcon2 from '@/components/atoms/icons/ArrowRightIcon2';
import { ExportIcon, LinkIcon } from '@/components/atoms/icons/Icons';
import Cancel from '@/components/atoms/icons/ModalIcons/Cancel';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useEntity } from 'simpler-state';

export const AddTeacherMenu = () => {
  const isOpen = useEntity(isAddTeacherMenuOpen);
  const router = useRouter();
  const options = [
    {
      icon: <ExportIcon color="#828282" />,
      text: 'Upload bulk teachers',
      click: openUploadTeacherModal,
    },
    {
      icon: <StudentsIcon />,
      text: 'Add teachers manually',
      click: () => {
        router.push('/school/teaching-staffs/add-new-teacher');
      },
    },
    {
      icon: <LinkIcon />,
      text: 'Invite tutor via link',
      click: openInviteTutorModal,
    },
    {
      icon: <LinkIcon />,
      text: 'Manage invite links',
      click: () => {
        router.push('/school/teaching-staffs/invites');
      },
    },
  ];
  return (
    <div>
      {isOpen && (
        <div className="bg-white py-4 px-6 w-[416px] rounded-2xl absolute top-16 right-4 z-50 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className={cn('text-lg ', Inter_500.className)}>
              {' '}
              Select Option
            </h2>
            <button
              onClick={closeAddTeacherMenu}
              className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full"
            >
              <Cancel />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {options.map((option) => (
              <div
                key={option.text}
                className="flex justify-between items-center p-4 border border-gray4 rounded-3xl cursor-pointer"
                onClick={() => {
                  option.click?.();
                  closeAddStudentsMenu;
                }}
              >
                <div className="flex items-center gap-4">
                  <div>{option.icon}</div>
                  <p
                    className={cn('text-sm text-gray1', poppins_500.className)}
                  >
                    {option.text}
                  </p>
                </div>

                <ArrowRightIcon2 />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
