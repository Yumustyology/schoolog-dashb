import { biology1 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function SubjectSchedule() {
  return (
    <Card className="bg-white py-6 px-6 rounded-md col-span-2 border-none">
      <CardHeader className="w-full p-0 mb-10">
        <div className="flex  gap-3">
          <Image src={biology1} alt="Subject Image" />
          <div>
            <h1 className={cn('text-sm text-[#101828]', poppins_500.className)}>
              Biology
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              {' '}
              <span className="text-primary">4</span>/32 topics covered
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-8 pb-[59px]">
        <main className="flex justify-between items-center">
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
        <div>
          <p className={cn('text-sm text-gray', poppins_400.className)}>
            Next class topic
          </p>
          <h3 className={cn('text-sm text-gray6', poppins_500.className)}>
            Teacher Professional Development and Student Outcomes
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubjectSchedule;
