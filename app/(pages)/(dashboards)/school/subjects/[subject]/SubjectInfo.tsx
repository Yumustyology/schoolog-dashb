'use client';
// import { useState } from 'react';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDateTime } from '@/app/lib/utils/dateUtils';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import Topics from '@/components/organisms/dashboard/students/Topics';
import useSWR from 'swr';
import curriculumActions from '@/app/lib/actions/curriculum.actions';
// import Assignments from '@/components/organisms/dashboard/students/Assignments';
import SearchInput from '@/components/atoms/form/SearchInput';
import SubjectInfoCard from '@/components/molecules/dashboard/subjects/SubjectInfoCard';
import Button from '@/components/atoms/form/Button';
import { UploadIcon } from '@/components/atoms/icons/Icons';
import EditCurriculumLauncher from '@/components/molecules/dashboard/subjects/EditCurriculumLauncher';
import FolderIcon from '@/components/atoms/icons/dashboard/materials/Folder';
import PdfIcon from '@/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/components/atoms/icons/dashboard/materials/Word';
import ExcelIcon from '@/components/atoms/icons/dashboard/materials/Excel';
import MediumIcon from '@/components/atoms/icons/dashboard/materials/Medium';
import ImageIcon from '@/components/atoms/icons/dashboard/materials/Image';
import AssignedTeacherCard from '@/components/molecules/dashboard/AssignedTeacherCard';
import MaterialsList from '@/components/molecules/dashboard/materials/MaterialList';
import { UploadResourcesModal } from '@/components/atoms/dashboard/subjects/subjectsInfoModals/UploadResourcesModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';
import { getClassGradeName } from '@/app/lib/utils/classGradeUtils';
import { MaterialType } from '@/app/lib/types/materials.types';

export const materials: MaterialType[] = [
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
];

function SubjectInfoPage({ subject }: { subject: string }) {
  const { theme } = useSlgTheme();
  const [isUploadResourceModalOpen, setIsResourceModalOpen] =
    React.useState(false);
  const closeResourceModal = () => {
    setIsResourceModalOpen(false);
  };
  const role = 'school';
  const { classGrades, classGradeIsLoading } = useClassGradeFilter();

  const [classGradeId, setClassGradeId] = React.useState<string | undefined>(
    undefined
  );
  const [subjectTitle, setSubjectTitle] = React.useState<string | undefined>(
    undefined
  );
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('classGrade') || undefined;
      const title = params.get('title') || undefined;
      setClassGradeId(v ?? undefined);
      setSubjectTitle(title ?? undefined);
    } catch {
      setClassGradeId(undefined);
    }
  }, []);

  const classGradeLabel =
    classGradeId == null
      ? undefined
      : classGradeIsLoading && (!classGrades || classGrades.length === 0)
        ? 'Loading…'
        : getClassGradeName(classGradeId, classGrades, classGradeId);

  // fetch curriculum for selected class + subject
  const curriculumKey = classGradeId && subject ? `/curriculum/class/${classGradeId}/subject/${subject}` : null;
  const { data: curriculumResp, isLoading: curriculumLoading } = useSWR(
    curriculumKey,
    () => curriculumActions.getCurriculumForClassSubject(classGradeId as string, subject),
    { revalidateOnFocus: false }
  );

  // Map backend curriculum entries into Topics list shape
  const topicsForDisplay = React.useMemo(() => {
    const items: any[] = [];
    const entries = curriculumResp?.data || [];

    entries.forEach((entry: any) => {
      const weekFromEntry = entry.week;
      (entry.topics || []).forEach((t: any) => {
        items.push({
          isMarked: !!t.covered,
          topic: t.topic || t.title || '',
          week: typeof t.week === 'number' ? t.week : weekFromEntry ?? 0,
          date: formatDateTime(t.updatedAt || t.createdAt || entry.updatedAt || entry.createdAt || ''),
          view: <></>,
          status: t.covered ? 'Completed' : undefined,
          details: t.description || '',
          subtopics: undefined,
          arrange_order: typeof t.arrange_order === 'number' ? t.arrange_order : (typeof t.index === 'number' ? t.index : 0),
        });
      });
    });

    // sort by arrange_order ascending
    items.sort((a, b) => (a.arrange_order ?? 0) - (b.arrange_order ?? 0));

    return items;
  }, [curriculumResp]);

  const todayClassesTabs = [
    {
      label: 'Curriculum',
      value: 'topics',
      content: <Topics items={topicsForDisplay} isLoading={curriculumLoading} />,
    },
    // {
    //   label: 'Students',
    //   value: 'student_list',
    //   content: <StudentsList />,
    // },
    {
      label: 'Resources',
      value: 'resources',
      content: <MaterialsList classId={classGradeId} />,
    },
    {
      label: 'Discussions',
      value: 'discussions',
      content: <Topics />,
    },
  ];

  const { activeTab: activeTopicAssignmtentTab, handleTabClick: handleTopicAssignmentTabClick } =
    useActiveTab('subject-info', todayClassesTabs);

  return (
    <main className="">
      <div>
        <div className="flex justify-between items-center">
          <BreadcrumbBox
            className="mb-0"
            crumbs={[
              { label: 'Subjects', isActive: false, href: '/student/subjects' },
              {
                label: subjectTitle || 'Loading...',
                isActive: false,
                href: `/school/subjects/${subject}?title=${encodeURIComponent(
                  String(subjectTitle || '')
                )}&classGrade=${classGradeId}`,
              },
              {
                label: classGradeLabel || 'Loading...',
                isActive: true,
                href: `/school/subjects?classGrade=${encodeURIComponent(
                  classGradeId ?? ''
                )}`,
              },
            ]}
          />

          <div className="flex gap-2 items-center">
            <EditCurriculumLauncher
              classGradeId={classGradeId!}
              subjectId={subject}
            />

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
                className="transition-all text-sm px-2 py-2 mb-6 w-[500px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {todayClassesTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleTopicAssignmentTabClick(value)}
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
