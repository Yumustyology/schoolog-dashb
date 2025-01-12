import { teacherImg2 } from '@/app/assets';
import Button from '@/app/components/atoms/form/Button';
import Message from '@/app/components/atoms/icons/SideBar/Message';
import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import React from 'react';

function AsignedTeacher() {
  return (
    <Card className="bg-white py-6 px-6 rounded-md col-span-2 border-none">
      <CardHeader className="bg-[#f8f8f8] rounded-full py-2 mb-6">
        <div className="flex gap-5">
          <Image src={teacherImg2} alt="teacher-image" />
          <div>
            <h3
              className={cn('text-sm text-gray6 mb-1', poppins_500.className)}
            >
              Jimoh Jamiu
            </h3>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              {' '}
              Biology Teacher
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 w-full px-0 ">
        <section className="flex justify-between items-center w-full">
          <div>
            <h3 className={cn('text-sm text-[#101828]', Inter_500.className)}>
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
        </section>

        <section className="flex justify-between items-center">
          <div>
            <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
              Admin Office
            </h3>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Office
            </p>
          </div>

          <div>
            <h3 className={cn('text-sm text-[#101828]', poppins_500.className)}>
              9:00am - 12:00pm
            </h3>
            <p
              className={cn(
                'text-sm text-gray text-right',
                poppins_400.className
              )}
            >
              Time on seat
            </p>
          </div>
        </section>
      </CardContent>

      <CardFooter className="px-0 py-0 mt-6 w-full">
        <Button wide round className="h-[45px]">
          <Message color="#FFFFFF" />
          <p className="ml-2">Message Teacher</p>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AsignedTeacher;
