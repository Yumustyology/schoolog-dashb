'use client';
import React from 'react';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
// ...existing code
import { ArrangeIcon } from '@/components/atoms/icons/Icons';

export interface ClassDataShape {
  id: number | string;
  className: string;
  teacherImg?: string | unknown;
  teacher?: string;
  number_of_student?: number;
  number_of_male?: number;
  number_of_female?: number;
}

interface ClassArrangeEntryProps {
  classData: ClassDataShape;
  // drag listeners and attributes passed from SortableItem so only the handle is draggable
  dragListeners?: DraggableSyntheticListeners;
  dragAttributes?: DraggableAttributes;
}

const ClassArrangeEntry: React.FC<ClassArrangeEntryProps> = ({ classData, dragListeners, dragAttributes }) => {
  return (
    <div className="w-full bg-white border-b border-gray4 h-[65px] p-4">
      <div className="flex items-center">
        <div className={cn('flex items-center gap-3 flex-1', poppins_400.className)}>
          <div
            className="text-gray-300 cursor-grab active:cursor-grabbing"
            {...(dragListeners as React.HTMLAttributes<HTMLDivElement>)}
            {...(dragAttributes as React.HTMLAttributes<HTMLDivElement>)}
          >
            <ArrangeIcon color="#CECECE" />
          </div>
          <span className={cn('text-sm text-[#071E3B] font-medium select-text', poppins_500.className)}>
            {classData.className}
          </span>
        </div>
        <div className={cn('text-sm text-gray1 font-normal', poppins_400.className)}>{classData.number_of_student ?? 0} students</div>
      </div>
    </div>
  );
};

export default ClassArrangeEntry;
