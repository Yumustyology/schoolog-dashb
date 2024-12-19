import { biology1, teacherImg, teacherImg2 } from '@/app/assets';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/app/components/atoms/form/Button';
import Message from '@/app/components/atoms/icons/dashboard/SideBar/Message';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function page() {
  return (
    <main className="">
      <div>
        <BreadcrumbBox />

        <div className="grid grid-cols-3 gap-6">
          <SubjectSchedule />
          <AssignedTeacher />
        </div>

        <section></section>
      </div>
    </main>
  );
}

export default page;

export const SubjectSchedule = () => {
  return (
    <div className="bg-white flex flex-col gap-6 py-6 px-5 rounded-md mt-4">
      <header className="flex gap-3 mb-4">
        <div>
          <Image src={biology1} alt="Subject Image" />
        </div>
        <div>
          <h1 className={cn('text-sm text-[#101828]', poppins_500.className)}>
            Biology
          </h1>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            {' '}
            <span className="text-primary">4</span>/32 topics covered
          </p>
        </div>
      </header>

      <main className="flex justify-between items-center mb-4">
        <div>
          <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
            Monday - 22nd Nov, 2024
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            Next class
          </p>
        </div>

        <div>
          <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
            9:00am{' '}
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            Next class time
          </p>
        </div>
      </main>

      <footer>
        <p className={cn('text-sm text-gray', poppins_400.className)}>
          Next class topic
        </p>
        <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
          Teacher Professional Development and Student Outcomes
        </h3>
      </footer>
    </div>
  );
};

export const AssignedTeacher = () => {
  return (
    <div className="bg-white flex flex-col gap-6 py-6 px-5 rounded-md mt-4 col-span-2">
      <header>
        <div className="bg-[#f8f8f8] rounded-full py-3 px-2 flex gap-5">
          <Image src={teacherImg2} alt="teacher-image" />
          <div>
            <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
              Jimoh Jamiu
            </h3>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              {' '}
              Biology Teacher
            </p>
          </div>
        </div>
      </header>
      <main className="flex justify-between items-center mb-4">
        <div>
          <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
            jimohjamiu200@gmail.com
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            Email
          </p>
        </div>

        <div>
          <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
            07045321256{' '}
          </h3>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            Phone number
          </p>
        </div>
      </main>
      <footer>
        <Button wide>
          <Message />
          <p className="ml-2">Message</p>
        </Button>
      </footer>
    </div>
  );
};
