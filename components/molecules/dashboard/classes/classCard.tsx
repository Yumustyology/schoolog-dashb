'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { OptionIcon } from '@/components/atoms/icons/Icons';
import OptionsSubjectDropdown from '../../../atoms/dashboard/subjects/OptionsSubjectDropdown';

interface Class {
  id: number;
  className: string;
  teacherImg: string;
  teacher: string;
  number_of_male: number;
  number_of_female: number;
  number_of_student: number;
}

interface ClassCardProps {
  classData: Class;
  role: 'school' | 'student' | 'teacher';
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, role }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      key={classData.id}
      className="flex flex-col gap-3 m-3 p-5 border rounded-xl  min-w-[303px] relative"
    >
      <div className="flex justify-between items-center">
        <h3 className={cn('text-lg text-[#071E3B] ', poppins_500.className)}>
          {classData.className}
        </h3>
        {role === 'school' && (
          <div>
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="cursor-pointer"
            >
              <OptionIcon />
            </div>
            <OptionsSubjectDropdown setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>
          <span className="text-[#4F4F4F]">{classData.number_of_student} </span>
          <span className="text-[#828282] text-sm font-thin">Students</span>
        </span>

        <span className="block text-gray-500 text-sm">
          <span className="text-[#4F4F4F]">{classData.number_of_male} </span>
          <span className="text-[#828282] text-sm font-thin">Male</span>
        </span>

        <span className="block text-gray-500 text-sm gap-2">
          <span className="text-[#4F4F4F]">{classData.number_of_female} </span>
          <span className="text-[#828282] text-sm font-thin">Female</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={classData.teacherImg}
          alt={classData.teacher}
          width={50}
          height={50}
          className="rounded-full"
        />

        <div>
          <span
            className={cn('text-[#333333] font-medium ', poppins_400.className)}
          >
            {classData.teacher}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
