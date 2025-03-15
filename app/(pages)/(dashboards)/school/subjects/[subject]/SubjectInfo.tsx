'use client';
import { useState } from 'react';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';
import Topics from '@/components/organisms/dashboard/students/Topics';
import Assignments from '@/components/organisms/dashboard/students/Assignments';
import SearchInput from '@/components/atoms/form/SearchInput';
import SubjectInfoCard from '@/components/molecules/dashboard/subjects/SubjectInfoCard';
import Button from '@/components/atoms/form/Button';
import { EditIcon, UploadIcon } from '@/components/atoms/icons/Icons';
import FolderIcon from '@/components/atoms/icons/dashboard/materials/Folder';
import PdfIcon from '@/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/components/atoms/icons/dashboard/materials/Word';
import ExcelIcon from '@/components/atoms/icons/dashboard/materials/Excel';
import MediumIcon from '@/components/atoms/icons/dashboard/materials/Medium';
import ImageIcon from '@/components/atoms/icons/dashboard/materials/Image';
import { MaterialType } from '@/types';
import AssignedTeacherCard from '@/components/molecules/dashboard/AssignedTeacherCard';

export const materials: MaterialType = [
  {
    type: 'folder',
    icon: <FolderIcon />,
    name: 'Indices and its equations folder',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <FolderIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <PdfIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <WordIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <MediumIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ImageIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <PdfIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <WordIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <MediumIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    type: 'material',
    icon: <ImageIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
];

function SubjectInfoPage({ subject }: { subject: string }) {
  const role = 'school';
  const todayClassesTabs = [
    {
      label: 'Topics',
      value: 'topics',
      content: <Topics />,
    },
    {
      label: 'Assignments',
      value: 'assignments',
      content: <Assignments />,
    },
  ];

  const [activeTopicAssignmtentTab, setActiveTopicAssignmentTab] =
    useState('topics');

  const handleTopicAssignmentTabClick = (tabValue: string) => {
    setActiveTopicAssignmentTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };

  return (
    <main className="">
      <div>
        <div className="flex justify-between items-center">
          <BreadcrumbBox
            className="mb-0"
            crumbs={[
              {
                label: 'Subjects',
                isActive: false,
                href: '/student/subjects',
              },
              {
                label: 'Biology',
                isActive: true,
              },
            ]}
          />

          <div>
            <Button round className="h-[48px]  py-3 px-8 flex gap-2">
              {' '}
              <EditIcon color="#FFFFFF" />
              <span className={cn('text-base ', Inter_500.className)}>
                {' '}
                Edit Curriculum{' '}
              </span>
            </Button>

            <Button
              round
              flat
              className="h-[48px] border border-primary ml-4  py-3 px-8 flex gap-2"
            >
              {' '}
              <UploadIcon />
              <span className={cn('text-base ', Inter_500.className)}>
                Upload Resources{' '}
              </span>
            </Button>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <div className="w-[446px]">
            <SubjectInfoCard role={role} />
          </div>
          <div className="flex-1 ">
            <AssignedTeacherCard role={role} />
          </div>
        </div>

        <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
          <Tabs value={activeTopicAssignmtentTab}>
            <div className="flex justify-between items-center">
              <SearchInput
                placeholder="search"
                className="bg-[#F7F7F7] border border-gray4 rounded-[100px] mb-6 p-2 h-[38px] max-w-[327px]"
              />

              <TabsHeader
                className="transition-all text-sm px-2 py-2 mb-6 w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {todayClassesTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleTopicAssignmentTabClick(value)}
                    className={cn('text-sm text-center', poppins_500.className)}
                    activeClassName="rounded-full text-white bg-[#21B55A]"
                    key={value}
                    value={value}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </div>

            <TabsBody className="w-full p-0">
              {todayClassesTabs.map(({ value, content }) => (
                <TabPanel key={value} value={value} className="p-0">
                  {content}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        <section></section>
      </div>
    </main>
  );
}

export default SubjectInfoPage;
