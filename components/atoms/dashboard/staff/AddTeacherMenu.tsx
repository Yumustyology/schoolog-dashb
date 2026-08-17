'use client';
import {
  closeAddTeacherMenu,
  isAddTeacherMenuOpen,
  openUploadTeacherModal,
  openInviteTutorModal,
} from '@/app/lib/entities/staff.entity';
import { ExportIcon, LinkIcon } from '@/components/atoms/icons/Icons';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import { OptionsMenu } from '@/components/molecules/OptionsMenu';
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
      onClick: openUploadTeacherModal,
    },
    {
      icon: <StudentsIcon />,
      text: 'Add teachers manually',
      onClick: () => {
        router.push('/school/teaching-staffs/add-new-teacher');
      },
    },
    {
      icon: <LinkIcon />,
      text: 'Invite tutor via link',
      onClick: openInviteTutorModal,
    },
    {
      icon: <LinkIcon />,
      text: 'Manage invite links',
      onClick: () => {
        router.push('/school/teaching-staffs/invites');
      },
    },
  ];

  return (
    <OptionsMenu
      isOpen={isOpen}
      onClose={closeAddTeacherMenu}
      options={options}
    />
  );
};
