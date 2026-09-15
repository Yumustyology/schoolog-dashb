'use client';
import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';
import { ArchiveIcon, DeleteIcon, LinkIcon, UnarchiveIcon, VIsibilityIcon } from '@/components/atoms/icons/Icons';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import useArchiveSubject from '@/app/lib/hooks/useArchiveSubject';
import useUnarchiveSubject from '@/app/lib/hooks/useUnarchiveSubject';
import useDeleteSubject from '@/app/lib/hooks/useDeleteSubject';
import subjectsActions from '@/app/lib/actions/subjects.action';
import departmentsActions from '@/app/lib/actions/departments.action';
import showToast from '@/app/lib/utils/toast';
import type { Department } from '@/app/lib/types/department.types';
import { SubjectType } from '@/app/lib/types/subject.types';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Layers, Users } from 'lucide-react';

interface SubjectCardProps {
  subject: SubjectType;
  classGradeId?: string;
  role: 'school' | 'student' | 'teacher';
  onDeleteSuccess?: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  classGradeId,
  role,
  onDeleteSuccess,
}) => {
  const router = useRouter();
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);
  const [selectedClassGrade, setSelectedClassGrade] = React.useState<string>(classGradeId || '');
  const [selectedLinkMode, setSelectedLinkMode] = React.useState<'general' | 'departmental' | 'elective'>('general');
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('');
  const [isSavingLink, setIsSavingLink] = React.useState(false);

  const { data: departmentResponse } = useSWR('/departments', () => departmentsActions.fetchDepartments());
  const departmentOptions: Array<{ id: string; label: string }> = React.useMemo(() => {
    const departments = (departmentResponse?.data as Department[] | undefined) || [];
    if (departments.length > 0) {
      return departments.map((department) => ({
        id: department._id,
        label: department.name,
      }));
    }

    return [
      { id: 'science', label: 'Science' },
      { id: 'arts', label: 'Arts' },
      { id: 'commerce', label: 'Commerce' },
    ];
  }, [departmentResponse]);

  // Check if the image is a base64 string
  const isBase64Image = subject.coverImage?.startsWith('data:image');
  const hasCoverImage = !!subject.coverImage;
  const idForHooks = subject._id || '';
  const archiveHook = useArchiveSubject(idForHooks) as ReturnType<typeof useArchiveSubject>;
  const unarchiveHook = useUnarchiveSubject(idForHooks) as ReturnType<typeof useUnarchiveSubject>;
  const deleteHook = useDeleteSubject(idForHooks, {
    onSuccess: onDeleteSuccess,
  }) as ReturnType<typeof useDeleteSubject>;

  const menuItems = [
    {
      label: 'View Details',
      onClick: () =>
        router.push(
          `/${role}/subjects/${subject._id}${classGradeId ? `?classGrade=${classGradeId}` : ''}`
        ),
      icon: <VIsibilityIcon />,
    },
    {
      label: 'Link Class',
      onClick: () => setIsLinkModalOpen(true),
      icon: <LinkIcon size={24} />,
    },
    {
      label: subject.archived ? 'Unarchive' : 'Archive',
      onClick: subject.archived ? unarchiveHook.openUnarchive : archiveHook.openArchive,
      icon: subject.archived ? <UnarchiveIcon /> : <ArchiveIcon />,
    },
    {
      label: 'Delete',
      onClick: deleteHook.openDelete,
      icon: <DeleteIcon />,
      danger: true,
    },
  ];

  const linkModes: Array<{
    id: 'general' | 'departmental' | 'elective';
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'general',
      label: 'General',
      description: 'Link this subject for all students in the selected class grade.',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      id: 'departmental',
      label: 'Departmental',
      description: 'Restrict this subject link to a department inside the selected class grade.',
      icon: <Layers className="h-5 w-5 text-primary" />,
    },
    {
      id: 'elective',
      label: 'Elective',
      description: 'Offer this subject as an elective for the selected class grade.',
      icon: <Users className="h-5 w-5 text-primary" />,
    },
  ];

  const handleLinkModeSelect = (mode: 'general' | 'departmental' | 'elective') => {
    setSelectedLinkMode(mode);
  };

  const getColorForString = (s?: string) => {
    const colors = [
      { bg: 'bg-emerald-600', text: 'text-white' },
      { bg: 'bg-indigo-600', text: 'text-white' },
      { bg: 'bg-rose-600', text: 'text-white' },
      { bg: 'bg-amber-500', text: 'text-gray-900' },
      { bg: 'bg-sky-600', text: 'text-white' },
      { bg: 'bg-violet-600', text: 'text-white' },
      { bg: 'bg-fuchsia-600', text: 'text-white' },
      { bg: 'bg-teal-600', text: 'text-white' },
      { bg: 'bg-orange-600', text: 'text-white' },
      { bg: 'bg-pink-600', text: 'text-white' },
      { bg: 'bg-cyan-600', text: 'text-white' },
      { bg: 'bg-purple-600', text: 'text-white' },
    ];

    if (!s) return colors[0];

    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  const renderCoverPlaceholder = () => {
    const text = (subject.name || 'SUBJECT').toUpperCase();
    const short = text.length > 20 ? text.slice(0, 19) + '…' : text;
    const colorScheme = getColorForString(subject.name || subject._id);

    return (
      <div
        className={cn(
          'w-full h-[180px] flex items-center justify-center font-semibold',
          colorScheme.bg
        )}
        aria-hidden
      >
        <span
          className={cn(
            'text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] font-bold px-4 text-center',
            colorScheme.text,
            poppins_500.className
          )}
        >
          {short}
        </span>
      </div>
    );
  };

  const handleSaveLink = async () => {
    if (!selectedClassGrade && !classGradeId) {
      showToast('Please select a class grade', 'link-validation', { type: 'error' });
      return;
    }

    if (selectedLinkMode === 'departmental' && !selectedDepartment) {
      showToast('Please select a department for departmental links', 'link-validation', {
        type: 'error',
      });
      return;
    }

    setIsSavingLink(true);

    try {
      const payload = {
        classGradeId: selectedClassGrade || classGradeId || '',
        linkMode: selectedLinkMode,
        departmentId: selectedLinkMode === 'departmental' ? selectedDepartment : undefined,
      };

      const response = await subjectsActions.linkSubjectToClass(subject._id, payload);
      if (response?.status === 'success') {
        showToast(response.message || 'Subject linked successfully', 'subject-linked', {
          type: 'success',
        });
      } else {
        showToast('Subject link could not be created', 'subject-link-failed', {
          type: 'error',
        });
      }

      const departmentParam =
        selectedLinkMode === 'departmental' && selectedDepartment
          ? `department=${selectedDepartment}`
          : '';
      const targetClassGrade = selectedClassGrade || classGradeId;
      const classGradeParam = targetClassGrade ? `classGrade=${targetClassGrade}` : '';
      const linkModeParam = `linkMode=${selectedLinkMode}`;
      const queryStr = [classGradeParam, linkModeParam, departmentParam].filter(Boolean).join('&');

      router.push(
        `/${role}/subjects/${subject._id}${queryStr ? `?${queryStr}` : ''}`
      );
      setIsLinkModalOpen(false);
    } catch {
      showToast('An error occurred while linking the subject', 'subject-link-error', {
        type: 'error',
      });
    } finally {
      setIsSavingLink(false);
    }
  };

  return (
    <div
      key={subject._id}
      className="flex flex-col w-full min-w-0 relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <Link
        href={`/${role}/subjects/${subject._id}${classGradeId ? `?classGrade=${classGradeId}` : ''}`}
      >
        {!hasCoverImage ? (
          renderCoverPlaceholder()
        ) : (
          <Image
            className="w-full h-[180px] object-cover"
            src={subject.coverImage || ''}
            alt={subject.name || ''}
            width={300}
            height={180}
            unoptimized={isBase64Image}
          />
        )}
      </Link>
      <div className="flex flex-col gap-3 p-4">
        {/* <Link href={`/${role}/subjects/1234`}> */}
        <div className="flex justify-between items-center">
          <h3
            className={cn(
              'text-base text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            {subject.name}
          </h3>
          {role === 'school' && (
            <MenuLists
              label="Options"
              items={menuItems}
              placement="bottom-start"
              maxHeight="none"
            />
          )}
        </div>
        {/* </Link> */}
        <p className={cn('text-sm text-gray6', poppins_400.className)}>
          {subject.currentTopic}
        </p>
        <p className={cn(poppins_400.className)}>
          Classes:{' '}
          {subject.classGrades && subject.classGrades.length > 0
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              subject.classGrades.map((cg: any) => `${cg.name}`).join(', ')
            : 'No classes assigned'}
        </p>
        <div
          className={cn(
            'flex-- items-center gap-2 text-gray6',
            poppins_400.className
          )}
        >
          <div className="flex items-center gap-2">
            {subject.teacher?.teacherImg &&
              (subject.teacher.teacherImg.startsWith('data:image') ? (
                <Image
                  src={subject.teacher.teacherImg}
                  alt={subject.teacher?.name || 'Teacher'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={subject.teacher.teacherImg}
                  alt={subject.teacher?.name || 'Teacher'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ))}
            <span>{subject?.teacher?.name || 'No assigned teacher'}</span>
          </div>
          {/* <div className="h-2 w-2 rounded-full bg-gray2"></div> */}
          <p className="text-sm">
            <span className="font-semibold">
              {subject.numberOfTopicsCovered}{' '}
            </span>
            /{subject.numberOfTopics} topics covered
          </p>
        </div>
      </div>

      {deleteHook.DeleteConfirmModal}
      {archiveHook.ArchiveConfirmModal}
      {unarchiveHook.UnarchiveConfirmModal}

      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="w-[92vw] max-w-2xl sm:max-w-2xl p-6 sm:p-7 rounded-3xl">
          <DialogHeader className="mb-1">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Link {subject.name} to Class
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Choose a class grade and pick how this subject should be linked.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Class grade</label>
              <ClassGradeDropdown
                value={selectedClassGrade}
                onValueChange={(value) => setSelectedClassGrade(String(value))}
                placeholder="Select class grade"
                className="w-full h-11"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-sm font-medium text-gray-700">Link mode</label>
              <div className="grid gap-3.5 sm:grid-cols-3">
                {linkModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleLinkModeSelect(mode.id)}
                    className={`group rounded-2xl border p-4 sm:p-5 text-left transition-all duration-200 flex flex-col justify-between min-h-[160px] hover:border-primary hover:shadow-md ${
                      selectedLinkMode === mode.id
                        ? 'border-2 border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 flex-shrink-0">
                      {mode.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{mode.label}</p>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        {mode.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedLinkMode === 'departmental' && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Select department</label>
              <Select value={selectedDepartment} onValueChange={(value) => setSelectedDepartment(value)}>
                <SelectTrigger className="w-full rounded-2xl h-11">
                  <SelectValue placeholder="Choose a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {departmentOptions.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              onClick={() => setIsLinkModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
              onClick={handleSaveLink}
              disabled={isSavingLink}
            >
              {isSavingLink ? 'Linking...' : 'Link subject'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectCard;
