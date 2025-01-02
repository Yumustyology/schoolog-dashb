import { teacherImg } from '@/app/assets';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import PaginationBox from '@/app/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/app/components/atoms/dashboard/subjects/Select';
import SubjectCard from '@/app/components/atoms/dashboard/subjects/SubjectCart';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Select } from '@/components/ui/select';
import { subjects } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const breadcrumbs = [
  { label: 'Home', href: '/student', isActive: false },
  { label: 'Subjects', isActive: true },
];
function page() {
  return (
    <main className="w-full">
      <BreadcrumbBox crumbs={breadcrumbs} />

      <div className="bg-white p-6 rounded-xl mt-3">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlgDesktop:grid-cols-4 gap-6">
          {subjects.map((subject: any) => {
            return <SubjectCard subject={subject} />;
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
