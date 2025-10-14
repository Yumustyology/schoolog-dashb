'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { classes } from '@/app/constants';
import { OptionIcon, ArrangeIcon } from '@/components/atoms/icons/Icons';
// ...existing imports
// (options dropdown for subjects was previously imported here; not needed in class card)
import OptionsClassDropdown from '@/components/atoms/dashboard/classes/OptionsClassDropdown';
import Dot from '@/components/atoms/Dot';

type Class = (typeof classes)[number];

interface ClassCardProps {
  classData: Class;
  role: 'school' | 'student' | 'teacher';
  onArrange?: () => void;
  totalClasses?: number;
}

const ClassCard: React.FC<ClassCardProps> = ({
  classData,
  role,
  onArrange,
  totalClasses = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      key={classData.id}
      className="w-full flex flex-col gap-3 justify-between bg-white min-h-[125px] border border-gray-100 rounded-xl p-4 shadow-sm relative"
    >
      <div className="flex items-start justify-between">
        <h3 className={cn('text-base text-[#071E3B] ', poppins_500.className)}>
          {classData.className}
        </h3>
        {totalClasses >= 2 && (
          <button
            type="button"
            aria-label="Arrange class"
            onClick={(e) => {
              e.stopPropagation();
              onArrange?.();
            }}
            className="text-gray-300 text-xs cursor-pointer p-1 rounded"
          >
            <ArrangeIcon color="#CECECE" />
          </button>
        )}
      </div>

      <div className={cn('text-sm flex items-center text-gray-500', poppins_400.className)}>
        <span className="text-gray6 text-sm font-medium">
          {classData.number_of_student}
        </span>
        <span className="ml-1 text-gray3 text-sm"> students</span>
        <Dot />
        <span className="text-gray6 text-sm font-medium">
          {classData.number_of_male}
        </span>
        <span className="ml-1 text-gray3 text-sm"> Male</span>
        <Dot />
        <span className="text-gray6 text-sm font-medium">
          {classData.number_of_female}
        </span>
        <span className="ml-1 text-gray3 text-sm"> Female</span>
      </div>

      {/* teacher row */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1.5">
          {classData.teacherImg && (
            <Image
              src={classData.teacherImg}
              alt={classData.teacher}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}

          <div>
            <span
              className={cn(
                'text-[#333333] text-sm font-medium ',
                poppins_400.className
              )}
            >
              {classData.teacher}
            </span>
          </div>
        </div>

        {role === 'school' && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="More options"
              className="rounded-full hover:bg-gray-100 text-gray-500 p-2"
            >
              <OptionIcon />
            </button>
            <OptionsClassDropdown setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
