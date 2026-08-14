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

function SubjectInfoCard({ role }: { role: 'school' | 'student' | 'parent' }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  // const archive = useEntity(isArchive);

  const { theme } = useSlgTheme();

  return (
    <Card className="bg-white py-6 h-[390px] pb-10 px-6 rounded-md col-span-2 border-none">
      <CardHeader className="w-full p-0">
        <div className="flex items-center gap-3 mb-8">
          <Image src={biology1} alt="Subject Image" />

          {role === 'student' && (
            <div>
              <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                Biology
              </h1>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                {' '}
                <span className="text-primary">4</span>/32 topics covered
              </p>
            </div>
          )}

          {role === 'school' && (
            <div>
              <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                Biology
              </h1>
              <p
                className={cn(
                  'text-sm text-gray mt-1.5',
                  poppins_500.className
                )}
              >
                SS1
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-8">
        <main className="flex justify-between items-center">
          {role == 'student' && (
            <div className="flex justify-between items-center w-full mt-10">
              <div>
                <h3
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  Monday - 22nd Nov, 2024
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Next class
                </p>
              </div>

              <div>
                <h3
                  className={cn('text-sm text-black1', poppins_500.className)}
                >
                  9:00am{' '}
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Next class time
                </p>
              </div>
            </div>
          )}

          {role == 'school' && (
            <section className="flex flex-col gap-6 w-full">
              <div className="flex  items-center">
                <div className="flex-1 ">
                  <h3
                    className={cn(
                      'text-sm text-black1 mb-1.5',
                      poppins_500.className
                    )}
                  >
                    150
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Total Students
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      'text-sm text-black1 items-end text-right mb-1.5',
                      poppins_500.className
                    )}
                  >
                    90%
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Average Performance
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1">
                  <h3
                    className={cn(
                      'text-sm text-black1 mb-1.5',
                      poppins_500.className
                    )}
                  >
                    80%
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Teacher attendance
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      'text-sm text-black1 text-right mb-1.5',
                      poppins_500.className
                    )}
                  >
                    90%
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Student attendance
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3
                    className={cn(
                      'text-sm text-black1 mb-1.5',
                      poppins_500.className
                    )}
                  >
                    52%
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Curriculum Covered
                  </p>
                </div>

                <div>
                  <h3
                    className={cn(
                      'text-sm text-black1 text-right',
                      poppins_500.className
                    )}
                  >
                    52
                  </h3>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Resources
                  </p>
                </div>
              </div>
            </section>
            // <SchoolStats/>
          )}
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
          <div className="flex justify-between">
            <Button
              round
              flat
              className={cn(
                'flex  text-r2 h-[48px] w-[191px] border border-r2'
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
                className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
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
                className={cn('flex  text-primary h-[48px] w-[191px] bg-light')}
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
