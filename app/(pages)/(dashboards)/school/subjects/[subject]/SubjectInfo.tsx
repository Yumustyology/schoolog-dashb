'use client';
// import { useState } from 'react';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDateTime } from '@/app/lib/utils/dateUtils';
import React from 'react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import Topics from '@/components/organisms/dashboard/students/Topics';
import useSWR from 'swr';
import curriculumActions from '@/app/lib/actions/curriculum.actions';
import subjectsActions from '@/app/lib/actions/subjects.action';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import Discussion from '@/components/organisms/Discussion';
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

import studentActions from '@/app/lib/actions/student.actions';
import resourcesActions from '@/app/lib/actions/resources.action';
import timetableActions from '@/app/lib/actions/timetable.action';
import { StudentsListTable } from '@/components/molecules/dashboard/student/StudentsListTable';

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

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('classGrade') || undefined;
      setClassGradeId(v ?? undefined);
    } catch {
      setClassGradeId(undefined);
    }
  }, []);

  // 1. Fetch single class grade by ID (if not in classGrades filter list)
  const { data: classGradeDetailResp } = useSWR(
    classGradeId ? ['class-grade-detail', classGradeId] : null,
    () => classGradeActions.fetchClassGradeById(classGradeId!).catch(() => undefined),
    { revalidateOnFocus: false }
  );

  const fetchedClassGradeObj =
    (classGradeDetailResp?.data as any)?.data?.classGrade ||
    (classGradeDetailResp?.data as any)?.classGrade ||
    (classGradeDetailResp?.data as any)?.data;
  const fetchedClassName = fetchedClassGradeObj?.name;
  const classGradeNameFromFilter = getClassGradeName(
    classGradeId,
    classGrades,
    undefined
  );
  const classGradeLabel =
    classGradeNameFromFilter ||
    fetchedClassName ||
    (classGradeIsLoading ? 'Loading…' : undefined);

  // 2. Fetch subjects list / single subject to resolve subject title
  const { data: allSubjectsResp } = useSWR(
    '/subjects/school',
    () => subjectsActions.getSchoolSubjects({ limit: 100 }).catch(() => undefined),
    { revalidateOnFocus: false }
  );

  const { data: subjectResp } = useSWR(
    subject ? `/subjects/${subject}` : null,
    () => subjectsActions.getSubjectById(subject).catch(() => undefined),
    { revalidateOnFocus: false }
  );

  // fetch curriculum for selected class + subject
  const curriculumKey = classGradeId && subject ? `/curriculum/class/${classGradeId}/subject/${subject}` : null;
  const { data: curriculumResp, isLoading: curriculumLoading } = useSWR(
    curriculumKey,
    () => curriculumActions.getCurriculumForClassSubject(classGradeId as string, subject),
    { revalidateOnFocus: false }
  );

  // Fetch students for stats and Students tab
  const { data: studentsResp } = useSWR(
    classGradeId ? ['/students/classGrade', classGradeId] : '/students/all',
    () => studentActions.fetchStudents(classGradeId ? { classGrade: classGradeId } : undefined),
    { revalidateOnFocus: false }
  );
  const studentsList = (studentsResp?.data as any[]) || [];
  const totalStudentsCount = studentsList.length;

  // Fetch resources count
  const { data: resourcesResp } = useSWR(
    ['/resources/list', classGradeId, subject],
    () => resourcesActions.listResources({ classGradeId, subjectId: subject }).catch(() => undefined),
    { revalidateOnFocus: false }
  );
  const totalResourcesCount = (resourcesResp?.data as any[])?.length || 0;

  // Fetch timetable for class schedule
  const { data: timetableResp } = useSWR(
    classGradeId ? ['/timetable/class', classGradeId] : null,
    () => timetableActions.fetchClassTimetable(classGradeId!).catch(() => undefined),
    { revalidateOnFocus: false }
  );

  const matchedSubject = (allSubjectsResp?.data as any[])?.find(
    (s) => String(s._id) === String(subject)
  );

  const subjectData = (subjectResp as any)?.data;
  const curriculumSubjectName =
    (curriculumResp?.data as any[])?.[0]?.subject?.name ||
    (curriculumResp?.data as any[])?.[0]?.subjectName;

  const subjectTitle =
    matchedSubject?.name ||
    subjectData?.name ||
    (subjectData?.title as string) ||
    curriculumSubjectName ||
    'Subject Details';

  // Map backend curriculum entries into Topics list shape
  const topicsForDisplay = React.useMemo(() => {
    const items: any[] = [];
    const entries = curriculumResp?.data || [];

    entries.forEach((entry: any) => {
      const weekFromEntry = entry.week;
      (entry.topics || []).forEach((t: any) => {
        items.push({
          id: t._id || t.id,
          isMarked: !!t.covered,
          topic: t.topic || t.title || '',
          week: typeof t.week === 'number' ? t.week : weekFromEntry ?? 0,
          date: formatDateTime(t.updatedAt || t.createdAt || entry.updatedAt || entry.createdAt || ''),
          view: <></>,
          status: t.covered ? 'Completed' : undefined,
          details: t.description || '',
          subtopics: undefined,
          arrangeOrder: typeof t.arrangeOrder === 'number' ? t.arrangeOrder : (typeof t.index === 'number' ? t.index : 0),
        });
      });
    });

    // sort by arrangeOrder ascending
    items.sort((a, b) => (a.arrangeOrder ?? 0) - (b.arrangeOrder ?? 0));

    return items;
  }, [curriculumResp]);

  const curriculumCoveredPct = React.useMemo(() => {
    if (topicsForDisplay.length === 0) return 0;
    const completedCount = topicsForDisplay.filter((t) => t.isMarked).length;
    return Math.round((completedCount / topicsForDisplay.length) * 100);
  }, [topicsForDisplay]);

  const nextTopic = React.useMemo(() => {
    const uncompleted = topicsForDisplay.find((t) => !t.isMarked);
    return uncompleted?.topic || (topicsForDisplay.length > 0 ? 'All topics completed' : 'No topics added yet');
  }, [topicsForDisplay]);

  const timetableEntries = (timetableResp?.data as any[]) || [];
  const subjectTimetable = timetableEntries.filter(
    (t) =>
      String(t.subject?._id || t.subject) === String(subject) ||
      (t.subject as any)?.name?.toLowerCase() === subjectTitle?.toLowerCase()
  );

  const nextClassSchedule = React.useMemo(() => {
    if (subjectTimetable.length === 0) return 'To be scheduled';
    const entry = subjectTimetable[0];
    return `${entry.day || 'Scheduled'} (Period ${entry.period || 1})`;
  }, [subjectTimetable]);

  const todayClassesTabs = [
    {
      label: 'Curriculum',
      value: 'topics',
      content: <Topics items={topicsForDisplay} isLoading={curriculumLoading} />,
    },
    {
      label: 'Students',
      value: 'student_list',
      content: <StudentsListTable classGradeId={classGradeId} students={studentsList} />,
    },
    {
      label: 'Resources',
      value: 'resources',
      content: <MaterialsList classId={classGradeId} />,
    },
    {
      label: 'Discussions',
      value: 'discussions',
      content: (
        <Discussion
          subjectId={subject}
          classGradeId={classGradeId}
          subjectTitle={subjectTitle}
        />
      ),
    },
  ];

  const { activeTab: activeTopicAssignmtentTab, handleTabClick: handleTopicAssignmentTabClick } =
    useActiveTab('subject-info', todayClassesTabs);

  // 4. Fetch subject links to resolve real assigned tutors/teachers for this class grade
  const { data: subjectLinksResp, mutate: revalidateSubjectLinks } = useSWR(
    subject ? ['/subjects', subject, 'links'] : null,
    () => subjectsActions.getSubjectLinks(subject).catch(() => undefined),
    { revalidateOnFocus: false }
  );

  const realAssignedTeachers = React.useMemo(() => {
    const links = (subjectLinksResp?.data as any[]) || [];
    const currentLink = classGradeId
      ? links.find(
          (l) =>
            String(l.classGradeId?._id || l.classGradeId) === String(classGradeId)
        )
      : links[0];

    const rawTeachers = currentLink?.teacherIds || currentLink?.teachers || [];
    return rawTeachers.map((t: any) => {
      if (typeof t === 'string') return { _id: t };
      return {
        _id: t._id,
        firstName: t.firstName,
        lastName: t.lastName,
        name: `${t.firstName || ''} ${t.lastName || ''}`.trim(),
        email: t.email,
        phone: t.phone,
        image: t.image || t.avatar,
        subjectAssignedTo: subjectTitle,
      };
    });
  }, [subjectLinksResp, classGradeId, subjectTitle]);

  const primaryTeacher = realAssignedTeachers[0] || null;

  const coverImage =
    matchedSubject?.coverImage ||
    subjectData?.coverImage ||
    '';

  const crumbs = [
    { label: 'Subjects', isActive: false, href: '/school/subjects' },
    {
      label: subjectTitle,
      isActive: !classGradeId,
      href: `/school/subjects/${subject}${classGradeId ? `?classGrade=${classGradeId}` : ''}`,
    },
  ];

  if (classGradeId) {
    crumbs.push({
      label: classGradeLabel || 'Loading…',
      isActive: true,
      href: `/school/subjects?classGrade=${encodeURIComponent(classGradeId)}`,
    });
  }

  return (
    <main className="">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">
          <BreadcrumbBox
            className="mb-0 flex-1"
            crumbs={crumbs}
          />

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <EditCurriculumLauncher
              classGradeId={classGradeId!}
              subjectId={subject}
            />

            <Button
              round
              flat
              className="h-[42px] border border-primary py-2 px-5 sm:px-6 flex gap-2 justify-center items-center whitespace-nowrap flex-shrink-0"
              onClick={() => {
                setIsResourceModalOpen(true);
              }}
            >
              <UploadIcon color={theme.primary} />
              <span className={cn('text-sm whitespace-nowrap font-medium', Inter_500.className)}>
                Upload Resources
              </span>
            </Button>
          </div>
          <UploadResourcesModal
            isOpen={isUploadResourceModalOpen}
            setIsOpen={closeResourceModal}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-stretch">
          <SubjectInfoCard
            role={role}
            subjectTitle={subjectTitle}
            classGradeName={classGradeLabel}
            coverImage={coverImage}
            totalStudents={totalStudentsCount}
            curriculumCoveredPct={curriculumCoveredPct}
            totalResources={totalResourcesCount}
            isArchived={matchedSubject?.archived ?? subjectData?.archived}
          />
          <AssignedTeacherCard
            role={role}
            page="subjectInfo"
            teacher={primaryTeacher}
            allTeachers={realAssignedTeachers}
            subjectTitle={subjectTitle}
            subjectId={subject}
            classGradeId={classGradeId}
            onAssignSuccess={revalidateSubjectLinks}
            nextClassSchedule={nextClassSchedule}
            nextTopic={nextTopic}
          />
        </div>

        <div className="bg-white w-full p-4 sm:p-6 mt-6 rounded-lg min-h-[398px] h-auto">
          <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
            <SearchInput
              placeholder="search"
              className="bg-[#F7F7F7] border border-gray4 rounded-[100px] p-2 h-[42px] w-full lg:max-w-[300px]"
            />

            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F1F1F1] rounded-2xl sm:rounded-full">
              {todayClassesTabs.map(({ label, value }) => {
                const isActive = activeTopicAssignmtentTab === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTopicAssignmentTabClick(value)}
                    className={cn(
                      'px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 cursor-pointer',
                      poppins_500.className,
                      isActive
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full">
            {todayClassesTabs.map(({ value, content }) => {
              if (activeTopicAssignmtentTab !== value) return null;
              return (
                <div key={value} className="w-full animate-fadeIn">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SubjectInfoPage;
