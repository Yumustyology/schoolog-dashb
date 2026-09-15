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
}: {
  role: 'school' | 'student' | 'parent';
  subjectTitle?: string;
  classGradeName?: string;
  coverImage?: string;
  totalStudents?: number;
  curriculumCoveredPct?: number;
  totalResources?: number;
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  // const archive = useEntity(isArchive);

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
    <Card className="bg-white py-6 h-full min-h-[360px] pb-6 sm:pb-8 px-4 sm:px-6 rounded-md border-none flex flex-col justify-between">
      <CardHeader className="w-full p-0">
        <div className="flex items-center gap-3 mb-4">
          {hasCoverImage ? (
            <Image
              src={coverImage || ''}
              alt={subjectTitle}
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
              unoptimized={isBase64Image}
            />
          ) : (
            renderCoverPlaceholder()
          )}

          {role === 'student' && (
            <div>
              <h1 className={cn('text-base text-black1 font-semibold', poppins_500.className)}>
                {subjectTitle}
              </h1>
              <p className={cn('text-xs text-gray', poppins_400.className)}>
                <span className="text-primary font-semibold">{curriculumCoveredPct}%</span> curriculum covered
              </p>
            </div>
          )}

          {role === 'school' && (
            <div>
              <h1 className={cn('text-base text-black1 font-semibold', poppins_500.className)}>
                {subjectTitle}
              </h1>
              {classGradeName && (
                <p
                  className={cn(
                    'text-xs text-gray-500 mt-1',
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

      <CardContent className="flex flex-col p-0 gap-6 flex-grow justify-between">
        <main className="w-full">
          <section className="grid grid-cols-3 gap-3 w-full my-2 bg-[#F9FAFB] p-4 rounded-xl border border-gray-100">
            <div className="text-center">
              <h3 className={cn('text-base sm:text-lg font-bold text-black1 mb-0.5', poppins_500.className)}>
                {totalStudents}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Total Students
              </p>
            </div>

            <div className="text-center border-x border-gray-200 px-1">
              <h3 className={cn('text-base sm:text-lg font-bold text-primary mb-0.5', poppins_500.className)}>
                {curriculumCoveredPct}%
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Curriculum
              </p>
            </div>

            <div className="text-center">
              <h3 className={cn('text-base sm:text-lg font-bold text-black1 mb-0.5', poppins_500.className)}>
                {totalResources}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Resources
              </p>
            </div>
          </section>
        </main>

        {role === 'student' && (
          <div className="mt-10">
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Next class topic
            </p>
            <h3 className={cn('text-sm text-gray6', poppins_500.className)}>
              Teacher Professional Development and Student Outcomes
            </h3>
          </div>
        )}

        {role === 'school' && (
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              round
              flat
              className={cn(
                'flex text-r2 h-[48px] w-full sm:w-[191px] border border-r2 justify-center'
              )}
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <DeleteIcon />
              <span className="text-r2">Delete Subject</span>
            </Button>

            {isArchive ? (
              <Button
                round
                className={cn('flex text-primary h-[48px] w-full sm:w-[191px] bg-light justify-center')}
                onClick={() => {
                  setUnarchiveModal(true);
                }}
              >
                <UnarchiveIcon color={theme.primary} />
                <span className="text-primary">Post Subject</span>
              </Button>
            ) : (
              <Button
                round
                className={cn('flex text-primary h-[48px] w-full sm:w-[191px] bg-light justify-center')}
                onClick={() => {
                  setArchiveModal(true);
                }}
              >
                <ArchiveIcon color={theme.primary} />
                <span className="text-primary">Archive</span>
              </Button>
            )}
          </div>
        )}
      </CardContent>
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
        icon={<ArchiveModalIcon color={theme.primary} />}
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
