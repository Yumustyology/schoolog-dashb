import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import SubjectCard from '@/components/molecules/dashboard/subjects/SubjectCard';
import React from 'react';
import { subjectsList } from '@/app/constants';

const breadcrumbs = [{ label: 'Subjects', isActive: true }];

function page() {
  const role = 'school';

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <div className="">
          <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        </div>
        <Button
          to="/school/subjects/create-new-subject"
          round
          className="h-[44px]  py-3 px-6 flex gap-2"
        >
          {' '}
          <AdditionIcon />
          <span className={cn('text-base ', Inter_500.className)}>
            Add new Subject{' '}
          </span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl mt-3">
        <section className="grid grid-cols-1 lgTablet:grid-cols-2 laptop:grid-cols-3 xlgDesktop:grid-cols-4 gap-6">
          {subjectsList.map((subject: any) => {
            return (
              <SubjectCard subject={subject} role={role} key={subject.id} />
            );
          })}
        </section>

        <footer className="my-5 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h5 className="text-r2"> Showing </h5>
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
