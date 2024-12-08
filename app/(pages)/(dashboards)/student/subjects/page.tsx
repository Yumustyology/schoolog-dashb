import { teacherImg } from '@/app/assets';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import PaginationBox from '@/app/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/app/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Select } from '@/components/ui/select';
import { subjects } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function page() {
  return (
    <main className="">
      <div>
        <BreadcrumbBox />
      </div>

      <div className="bg-white p-6  rounded-xl mt-3">
        <section className="grid grid-cols-3 gap-6">
          {subjects.map((subject) => {
            return (
              <div key={subject.subject} className="flex flex-col gap-4">
                <div>
                  <Image src={subject.textbookImg} alt={subject.subject} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      'text-base text-gray1 font-semibold',
                      poppins_500
                    )}
                  >
                    {subject.subject}
                  </h3>
                  <p
                    className={cn('text-sm text-gray6', poppins_400.className)}
                  >
                    {subject.textbookName}
                  </p>
                  <div
                    className={cn(
                      'flex items-center gap-2 text-gray6',
                      poppins_400.className
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Image src={subject.teacherImg} alt={subject.teacher} />
                      <span> {subject.teacher}</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-gray2"></div>

                    <p className="text-sm">
                      {' '}
                      <span className="font-semibold">
                        {subject.number_of_topics_covered}{' '}
                      </span>{' '}
                      /{subject.number_of_topics} topics covered{' '}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <footer className="my-5 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h5> Showing </h5>
            <SelectBox />
          </div>

          <div>
            <PaginationBox />
          </div>
        </footer>
      </div>
    </main>
  );
}

export default page;
