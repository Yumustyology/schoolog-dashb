'use client';
import {
  closeAddTeamMenu,
  isAddTeamMenuOpen,
  openUploadTeacherModal,
} from '@/app/lib/entities/staff.entity';
import { ExportIcon } from '@/components/atoms/icons/Icons';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import { OptionsMenu } from '@/components/molecules/OptionsMenu';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useEntity } from 'simpler-state';

export const AddTeamMenu = () => {
  const isOpen = useEntity(isAddTeamMenuOpen);
  const router = useRouter();

  const options = [
    {
      icon: <ExportIcon color="#828282" />,
      text: 'Upload bulk staff',
      onClick: openUploadTeacherModal,
    },
    {
      icon: <StudentsIcon />,
      text: 'Add staff manually',
      onClick: () => {
        router.push('/school/non-teaching-staffs/add-new-team');
      },
    },
  ];

  return (
    <OptionsMenu isOpen={isOpen} onClose={closeAddTeamMenu} options={options} />
  );
};
