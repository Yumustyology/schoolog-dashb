'use client';
import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import {
  AdditionIcon,
  DemoteIcon,
  ExportIcon,
  FilterIcon,
  GraduateIcon,
  PromoteIcon,
} from '@/components/atoms/icons/Icons';
import React from 'react';
import Search from '@/components/atoms/form/SearchInput';
import { ClassDropdown } from '@/components/atoms/dashboard/students/ClassDropdown';
import { StatusDropdown } from '@/components/atoms/dashboard/students/StatusDropdown';
import { StatusButton } from '@/components/atoms/dashboard/students/StatusButton';
import StudentsTableList from '@/components/atoms/dashboard/students/StudentsTableLists';
import { FilterModal } from '@/components/atoms/dashboard/students/FilterModal';
import {
  OpenDemoteModal,
  OpenGraduateModal,
  OpenPromoteModal,
  OpenStudentFilterModal,
  openAddStudentsMenu,
} from '@/app/lib/entities/student.entity';
import { GraduateModal } from '@/components/atoms/dashboard/students/modals/GraduateModal';
import { PromoteModal } from '@/components/atoms/dashboard/students/modals/PromoteModal';
import { DemoteModal } from '@/components/atoms/dashboard/students/modals/DemoteModal';
import { AddStudentMenu } from '@/components/atoms/dashboard/students/modals/AddStudentMenu';
import { UploadStudentsModal } from '@/components/atoms/dashboard/students/modals/UploadStudentsModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

const page = () => {
  const breadcrumbs = [{ label: 'Students', isActive: true }];
  const { theme } = useSlgTheme();
  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="">
          <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        </div>

        <div className="flex gap-4">
          <Button
            // to="/school/subjects/create-new-subject"
            flat
            round
            className="h-[44px]  py-3 px-6 flex gap-2 border border-primary"
          >
            {' '}
            <ExportIcon color={theme.primary} />
            <span className={cn('text-base ', Inter_500.className)}>
              Export lists
            </span>
          </Button>

          <div className="relative">
            <Button
              onClick={openAddStudentsMenu}
              round
              className="h-[44px]  py-3 px-6 flex gap-2"
            >
              {' '}
              <AdditionIcon />
              <span className={cn('text-base ', Inter_500.className)}>
                Add Student{' '}
              </span>
            </Button>
            <AddStudentMenu />
            <UploadStudentsModal />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 my-6 h-screen">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-4 items-center">
            <Search
              placeholder="Search student..."
              className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
            />

            <ClassDropdown />
            <StatusDropdown />
            <Button
              onClick={OpenStudentFilterModal}
              className={cn(
                'flex items-center bg-[#f8f8f8] border border-gray4 rounded-full'
              )}
            >
              <FilterIcon />
              <span
                className={cn('text-base text-gray1 ', Inter_500.className)}
              >
                Filter
              </span>
            </Button>
            <FilterModal />
            <GraduateModal />
            <PromoteModal />
            <DemoteModal />
          </div>

          <div className="flex gap-2 justify-end">
            <StatusButton
              text="Graduate"
              icon={<GraduateIcon />}
              OnclickFunc={OpenGraduateModal}
            />
            <StatusButton
              text="Promote"
              icon={<PromoteIcon />}
              OnclickFunc={OpenPromoteModal}
            />
            <StatusButton
              text="Demote"
              icon={<DemoteIcon />}
              OnclickFunc={OpenDemoteModal}
            />
          </div>
        </div>

        <div className="">
          <StudentsTableList />
        </div>
      </div>
    </main>
  );
};

export default page;
