import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import PaginationBox from '@/app/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/app/components/atoms/dashboard/subjects/Select';
import Button from '@/app/components/atoms/form/Button';
import { AdditionIcon } from '@/app/components/atoms/icons/Icons';
import { Inter_500 } from '@/app/lib/config/font.config';
import { subjectsList } from '@/constants';
import { cn } from '@/lib/utils';
import SubjectCard from '@/shared/molecules/SubjectCard';
import React from 'react';

const breadcrumbs = [{ label: 'Subjects', isActive: true }];

function page() {
  const role = 'school';

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <div className="">
          <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        </div>
        <Button round className="h-[44px]  py-3 px-6 flex gap-2">
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
