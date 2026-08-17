import {
  closeAddStudentsMenu,
  isAddSudentsMenuOpen,
  openUploadStudentModal,
} from '@/app/lib/entities/student.entity';
import { ExportIcon } from '@/components/atoms/icons/Icons';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import { OptionsMenu } from '@/components/molecules/OptionsMenu';
import { useRouter } from 'next/navigation';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';

import React from 'react';
import { useEntity } from 'simpler-state';

export const AddStudentMenu = () => {
  const isOpen = useEntity(isAddSudentsMenuOpen);
  const router = useRouter();
  const { selectedClassGrade } = useClassGradeFilter();

  const options = [
    {
      icon: <ExportIcon color="#828282" />,
      text: 'Upload bulk students',
      onClick: openUploadStudentModal,
    },
    {
      icon: <StudentsIcon />,
      text: 'Add students manually',
      onClick: () => {
        if (selectedClassGrade === 'all' || !selectedClassGrade) {
          router.push('/school/students/add-new-student');
        } else {
          router.push(`/school/students/${selectedClassGrade}/add-new-student`);
        }
      },
    },
  ];

  return (
    <OptionsMenu
      isOpen={isOpen}
      onClose={closeAddStudentsMenu}
      options={options}
    />
  );
};
