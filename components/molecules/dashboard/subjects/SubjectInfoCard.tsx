import { biology1 } from '@/app/assets';
import Button from '@/components/atoms/form/Button';
import {
  ArchiveIcon,
  ArchiveModalIcon,
  DeleteIcon,
  DeleteModalIcon,
  UnachiveModalIcon,
  UnarchiveIcon,
} from '@/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { useEntity } from 'simpler-state';
import SubjectModal from '@/components/atoms/dashboard/subjects/subjectsInfoModals/SubjectModal';
import { isArchive } from '@/app/lib/entities/subject.entity';

import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

function SubjectInfoCard({
  role,
  subjectTitle = 'Subject Details',
  classGradeName,
  coverImage,
  totalStudents = 0,
  curriculumCoveredPct = 0,
  totalResources = 0,
  isArchived,
}: {
  role: 'school' | 'student' | 'parent';
  subjectTitle?: string;
  classGradeName?: string;
  coverImage?: string;
  totalStudents?: number;
  curriculumCoveredPct?: number;
  totalResources?: number;
  isArchived?: boolean;
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  const archivedEntityState = useEntity(isArchive);
  const isSubjectArchived = Boolean(isArchived || archivedEntityState);

  const { theme } = useSlgTheme();

  const isBase64Image = coverImage?.startsWith('data:image');
  const hasCoverImage = !!coverImage;

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
    const text = (subjectTitle || 'SUBJECT').toUpperCase();
    const short = text.length > 20 ? text.slice(0, 19) + '…' : text;
    const colorScheme = getColorForString(subjectTitle);

    return (
      <div
        className={cn(
          'w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center font-bold flex-shrink-0 shadow-sm',
          colorScheme.bg
        )}
        aria-hidden
      >
        <span
          className={cn(
            'text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] px-1 text-center font-bold uppercase truncate max-w-full',
            colorScheme.text,
            poppins_500.className
          )}
        >
          {short.slice(0, 4)}
        </span>
      </div>
    );
  };

  return (
    <Card className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full min-h-[340px]">
      <CardHeader className="w-full p-0">
        <div className="flex items-center gap-4">
          {hasCoverImage ? (
            <Image
              src={coverImage || ''}
              alt={subjectTitle}
              width={56}
              height={56}
              className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm"
              unoptimized={isBase64Image}
            />
          ) : (
            renderCoverPlaceholder()
          )}

          {role === 'student' && (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className={cn('text-lg text-gray-900 font-bold', poppins_500.className)}>
                  {subjectTitle}
                </h1>
                {isSubjectArchived && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200',
                      poppins_500.className
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Archived
                  </span>
                )}
              </div>
              <p className={cn('text-xs text-gray-500 mt-0.5', poppins_400.className)}>
                <span className="text-primary font-bold">{curriculumCoveredPct}%</span> curriculum covered
              </p>
            </div>
          )}

          {role === 'school' && (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className={cn('text-lg text-gray-900 font-bold leading-tight', poppins_500.className)}>
                  {subjectTitle}
                </h1>
                {isSubjectArchived && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200',
                      poppins_500.className
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Archived
                  </span>
                )}
              </div>
              {classGradeName && (
                <p
                  className={cn(
                    'text-xs font-medium text-primary mt-0.5',
                    poppins_500.className
                  )}
                >
                  {classGradeName}
                </p>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-4 my-4 flex-grow justify-center">
        <main className="w-full">
          <section className="grid grid-cols-3 gap-2 w-full bg-[#F9FAFB] p-4 rounded-xl border border-gray-100">
            <div className="text-center">
              <h3 className={cn('text-lg sm:text-xl font-bold text-gray-900 mb-0.5', poppins_500.className)}>
                {totalStudents}
              </h3>
              <p className={cn('text-xs text-gray-500 font-medium', poppins_400.className)}>
                Total Students
              </p>
            </div>

            <div className="text-center border-x border-gray-200 px-1">
              <h3 className={cn('text-lg sm:text-xl font-bold text-primary mb-0.5', poppins_500.className)}>
                {curriculumCoveredPct}%
              </h3>
              <p className={cn('text-xs text-gray-500 font-medium', poppins_400.className)}>
                Curriculum
              </p>
            </div>

            <div className="text-center">
              <h3 className={cn('text-lg sm:text-xl font-bold text-gray-900 mb-0.5', poppins_500.className)}>
                {totalResources}
              </h3>
              <p className={cn('text-xs text-gray-500 font-medium', poppins_400.className)}>
                Resources
              </p>
            </div>
          </section>
        </main>

        {role === 'student' && (
          <div className="mt-2">
            <p className={cn('text-xs text-gray-500', poppins_400.className)}>
              Next class topic
            </p>
            <h3 className={cn('text-sm text-gray-800 font-medium mt-0.5', poppins_500.className)}>
              Teacher Professional Development and Student Outcomes
            </h3>
          </div>
        )}
      </CardContent>

      {role === 'school' && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-11 w-full sm:w-1/2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm transition-colors px-4 py-2 cursor-pointer shadow-sm"
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            <DeleteIcon color="#DC2626" />
            <span className="whitespace-nowrap font-medium">Delete Subject</span>
          </button>

          {isSubjectArchived ? (
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-11 w-full sm:w-1/2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-medium text-sm transition-colors px-4 py-2 cursor-pointer shadow-sm"
              onClick={() => {
                setUnarchiveModal(true);
              }}
            >
              <UnarchiveIcon color={theme.primary} />
              <span className="whitespace-nowrap font-medium">Post Subject</span>
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-11 w-full sm:w-1/2 rounded-full bg-amber-50 text-[#F59E0B] hover:bg-amber-100/80 border border-[#F59E0B]/50 font-medium text-sm transition-colors px-4 py-2 cursor-pointer shadow-sm"
              onClick={() => {
                setArchiveModal(true);
              }}
            >
              <ArchiveModalIcon size={20} color="#F59E0B" showBg={false} />
              <span className="whitespace-nowrap font-medium">Archive</span>
            </button>
          )}
        </div>
      )}
      <SubjectModal
        type="delete"
        title="Delete Subject"
        content="Are you sure you want to delete this subject? this subject can’t be recovered"
        icon={<DeleteModalIcon />}
        open={deleteModal}
        close={() => setDeleteModal(false)}
      />
      <SubjectModal
        type="archive"
        title="Archive study"
        content="Are you sure you want to archive this subjest? it won’t be visible to students and teachers again"
        icon={<ArchiveModalIcon color="#F59E0B" />}
        open={archiveModal}
        close={() => setArchiveModal(false)}
      />
      <SubjectModal
        type="unarchive"
        title="Post Subject"
        content="Are you sure you want to post this subject? This will make it visible to students and teachers"
        icon={
          <UnachiveModalIcon
            color={{ light: theme.light, primary: theme.primary }}
          />
        }
        open={unarchiveModal}
        close={() => setUnarchiveModal(false)}
      />
    </Card>
  );
}

export default SubjectInfoCard;
