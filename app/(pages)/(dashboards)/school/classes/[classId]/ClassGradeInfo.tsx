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
// import Assignments from '@/components/organisms/dashboard/students/Assignments';
import SearchInput from '@/components/atoms/form/SearchInput';
import ClassInfoCard from '@/components/molecules/dashboard/classes/ClassInfoCard';
import Button from '@/components/atoms/form/Button';
import { EditIcon, UploadIcon } from '@/components/atoms/icons/Icons';
import FolderIcon from '@/components/atoms/icons/dashboard/materials/Folder';
import PdfIcon from '@/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/components/atoms/icons/dashboard/materials/Word';
import ExcelIcon from '@/components/atoms/icons/dashboard/materials/Excel';
import MediumIcon from '@/components/atoms/icons/dashboard/materials/Medium';
import ImageIcon from '@/components/atoms/icons/dashboard/materials/Image';
// import { MaterialType } from '@/types';
import AssignedTeacherCard from '@/components/molecules/dashboard/AssignedTeacherCard';
// import { MaterialType } from '@/app/types';
import MaterialsList from '@/components/molecules/dashboard/materials/MaterialList';
import ChatThread from '@/components/molecules/dashboard/message/ChatThread';
import SubjectsTableList from '@/components/atoms/dashboard/subjects/SubjectsTableList';
import StudentsTableList from '@/components/atoms/dashboard/students/StudentsTableLists';
import { usePaginatedSearch } from '@/app/lib/hooks/usePaginatedSearch';
import { UploadResourcesModal } from '@/components/atoms/dashboard/subjects/subjectsInfoModals/UploadResourcesModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { getClassGradeName } from '@/app/lib/utils/classGradeUtils';
import useSWR from 'swr';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import type { ClassGradeDetail } from '@/app/lib/types/class.types';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { MaterialType } from '@/app/lib/types/materials.types';
import StudentsAttendanceList from '@/components/molecules/dashboard/attendance/StudentsAttendanceLists';

export const materials: MaterialType[] = [
  {
    id: 'folder-1',
    type: 'folder',
    icon: <FolderIcon />,
    name: 'Indices and its equations folder',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-1',
    type: 'material',
    icon: <FolderIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-2',
    type: 'material',
    icon: <PdfIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-3',
    type: 'material',
    icon: <WordIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-4',
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-5',
    type: 'material',
    icon: <MediumIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-6',
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-7',
    type: 'material',
    icon: <ImageIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-8',
    type: 'material',
    icon: <PdfIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-9',
    type: 'material',
    icon: <WordIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-10',
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-11',
    type: 'material',
    icon: <MediumIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-12',
    type: 'material',
    icon: <ExcelIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
  {
    id: 'material-13',
    type: 'material',
    icon: <ImageIcon />,
    name: 'File name goes here.extension',
    size: '760KB',
    date: '28/03/2024',
  },
];

function ClassGradeInfoPage({ classId }: { classId: string }) {
  const { classGrades, classGradeIsLoading } = useClassGradeFilter();
  const { theme } = useSlgTheme();
  const classGradeName = getClassGradeName(classId, classGrades, classId);
  const breadcrumbLabel =
    classGradeIsLoading && (!classGrades || classGrades.length === 0)
      ? 'Loading…'
      : classGradeName;
      
  const { data: classGradeResp } = useSWR<ClassGradeDetail | undefined>(
    classId ? ['class-grade-detail', classId] : null,
    async () => {
      const resp = await classGradeActions.fetchClassGradeById(classId);
      return resp?.data;
    }
  );
  const [isUploadResourceModalOpen, setIsResourceModalOpen] =
    React.useState(false);
  const closeResourceModal = () => {
    setIsResourceModalOpen(false);
  };
  const role = 'school';
  const {
    search,
    debouncedSearch,
    handleSearchChange,
    page,
    setPage,
    pageSize,
    setPageSize,
    hasEverLoadedData,
    setHasEverLoadedData,
  } = usePaginatedSearch();

  const [tabSearches, setTabSearches] = useState<Record<string, string>>(() => ({
    student_list: search || '',
  }));

  const todayClassesTabs = [
    {
      label: 'Students',
      value: 'student_list',
      content: (
        <StudentsTableList
          classId={classId}
          search={search}
          debouncedSearch={debouncedSearch}
          handleSearchChange={handleSearchChange}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hasEverLoadedData={hasEverLoadedData}
          setHasEverLoadedData={setHasEverLoadedData}
        />
      ),
    },
    {
      label: 'Subjects',
      value: 'subjects',
      content: (
        <SubjectsTableList
          classId={classId}
          search={search}
          debouncedSearch={debouncedSearch}
          handleSearchChange={handleSearchChange}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hasEverLoadedData={hasEverLoadedData}
          setHasEverLoadedData={setHasEverLoadedData}
        />
      ),
    },
    {
      label: 'Attendance',
      value: 'attendance',
      content: <StudentsAttendanceList />,
    },
     {
      label: 'Materials',
      value: 'materials',
      content: <MaterialsList classId={classId} />,
    },
    {
      label: 'Message',
      value: 'message',
      content: <ChatThread scope="class" classGradeId={classId} />,
    },
  ];

  const { activeTab: activeTopicAssignmtentTab, handleTabClick: handleTopicAssignmentTabClick } =
    useActiveTab('active', todayClassesTabs);

  const handleTabSwitch = (value: string) => {
    handleTopicAssignmentTabClick(value);
    if (value === 'student_list' || value === 'subjects') {
      const v = tabSearches[value] ?? '';
      const ev = { target: { value: v } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleSearchChange(ev);
    }
  };

  React.useEffect(() => {
    if (activeTopicAssignmtentTab === 'student_list' || activeTopicAssignmtentTab === 'subjects') {
      const v = tabSearches[activeTopicAssignmtentTab] ?? '';
      const ev = { target: { value: v } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleSearchChange(ev);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="">
      <div>
        <div className="flex justify-between items-center">
          <BreadcrumbBox
            className="mb-0"
            crumbs={[
              {
                label: 'Classes',
                isActive: false,
                href: '/school/classes',
              },
              {
                label: breadcrumbLabel || 'Class Details',
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
              onClick={() => {
                setIsResourceModalOpen(true);
              }}
            >
              {' '}
              <UploadIcon color={theme.primary} />
              <span className={cn('text-base ', Inter_500.className)}>
                Upload Resources{' '}
              </span>
            </Button>
          </div>

          <UploadResourcesModal
            isOpen={isUploadResourceModalOpen}
            setIsOpen={closeResourceModal}
          />
        </div>

        <div className="flex space-x-3 mt-4">
            <div className="w-[446px]">
            <ClassInfoCard
              classId={classId}
              classGradeName={breadcrumbLabel || ''}
              studentCounts={classGradeResp?.studentCounts ?? undefined}
              attendance={classGradeResp?.attendance ?? undefined}
              activeTerm={classGradeResp?.activeTerm ?? undefined}
              isArchived={classGradeResp?.classGrade?.isArchived}
            />
          </div>
          <div className="flex-1 ">
            <AssignedTeacherCard
              page="classInfo"
              className="h-[320px]"
              role={role}
              teacher={
                (classGradeResp && (classGradeResp.classGrade?.classTeacher)) || null
              }
            />
          </div>
        </div>

        <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
          <Tabs value={activeTopicAssignmtentTab}>
            <div className="flex justify-between items-center">
              <SearchInput
                value={tabSearches[activeTopicAssignmtentTab] ?? ''}
                onChange={(e) => {
                  const v = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.value;
                  setTabSearches((s) => ({ ...s, [activeTopicAssignmtentTab]: v }));
                  // Update the paginated search immediately for tabs that use it
                  if (
                    activeTopicAssignmtentTab === 'student_list' ||
                    activeTopicAssignmtentTab === 'subjects'
                  ) {
                    handleSearchChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
                placeholder={
                  activeTopicAssignmtentTab === 'student_list'
                    ? 'search students'
                    : activeTopicAssignmtentTab === 'subjects'
                    ? 'search subjects'
                    : activeTopicAssignmtentTab === 'attendance'
                    ? 'search attendance'
                    : activeTopicAssignmtentTab === 'discussions'
                    ? 'search discussions'
                    : 'search'
                }
                className="bg-[#F7F7F7] border border-gray4 rounded-[100px] mb-6 p-2 h-[38px] max-w-[327px]"
              />

              <TabsHeader
                className="transition-all text-sm px-2 py-2 mb-6 w-[500px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {todayClassesTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleTabSwitch(value)}
                    className={cn('text-sm text-center', poppins_500.className)}
                    activeClassName="rounded-full text-white bg-primary"
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
                  {value === activeTopicAssignmtentTab ? content : null}
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

export default ClassGradeInfoPage;
