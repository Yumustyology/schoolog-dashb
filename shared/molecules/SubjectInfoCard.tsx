import { biology1 } from '@/app/assets';
import Button from '@/app/components/atoms/form/Button';
import { ArchiveIcon, DeleteIcon } from '@/app/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
// import SchoolStats from '../atoms/SchoolStat';

function SubjectInfoCard({ role }: { role: 'school' | 'student' | 'parent' }) {
  return (
    <Card className="bg-white py-6 min-h-[360px] pb-10 px-6 rounded-md col-span-2 border-none">
      <CardHeader className="w-full p-0">
        <div className="flex items-center gap-3">
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
            <div className='flex justify-between items-center w-full mt-10'>
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
          <div className='mt-10'>
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
            >
              <DeleteIcon />
              <span className="text-r2">Delete Subject</span>
            </Button>

            <Button
              round
              className={cn('flex  text-r2 h-[48px] w-[191px] bg-yellow-800')}
            >
              <ArchiveIcon />
              <span className="text-r2">Archive</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SubjectInfoCard;
