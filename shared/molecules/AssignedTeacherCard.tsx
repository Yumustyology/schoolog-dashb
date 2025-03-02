import { teacherImg2 } from '@/app/assets';
import Button from '@/app/components/atoms/form/Button';
import {
  AddTeacherIcon,
  ChangeTeacherIcon,
} from '@/app/components/atoms/icons/Icons';
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

function AssignedTeacherCard({
  role,
}: {
  role: 'school' | 'student' | 'parent';
}) {
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
            {role === 'student' && (
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Biology Teacher
              </p>
            )}

            {role === 'school' && (
              <div>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Assigned teacher
                </p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {role === 'student' && (
        <CardContent className="flex flex-col gap-6 w-full px-0 ">
          <section className="flex justify-between items-center w-full">
            <div>
              <h3 className={cn('text-sm text-black1', Inter_500.className)}>
                jimohjamiu200@gmail.com
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Email
              </p>
            </div>

            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                07045321256{' '}
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Phone number
              </p>
            </div>
          </section>

          <section className="flex justify-between items-center">
            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                Admin Office
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Office
              </p>
            </div>

            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
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
      )}

      {role === 'school' && (
        <CardContent className="flex flex-col gap-6 w-full px-0 ">
          <div className="flex justify-between">
            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                Monday - 22nd Nov, 2024
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Next class
              </p>
            </div>

            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                9:00am{' '}
              </h3>
              <p className={cn('text-sm text-gray', poppins_400.className)}>
                Next class time
              </p>
            </div>
          </div>

          <div>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Next class topic
            </p>
            <h3 className={cn('text-sm text-gray6', poppins_500.className)}>
              Teacher Professional Development and Student Outcomes
            </h3>
          </div>
        </CardContent>
      )}
      <CardFooter className="px-0 py-0 mt-6 w-full">
        {role === 'student' && (
          <Button wide round className="h-[45px]">
            <Message color="#FFFFFF" />
            <p className="ml-2">Message Teacher</p>
          </Button>
        )}

        {role === 'school' && (
          <div className="flex gap-4">
            <Button round className="h-[45px] px-8 ">
              <ChangeTeacherIcon />
              <p className="ml-2">Change Teacher</p>
            </Button>
            <Button round className="h-[45px] border px-8 bg-light">
              <AddTeacherIcon />
              <p className="ml-2 text-primary">Add another Teacher</p>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default AssignedTeacherCard;
