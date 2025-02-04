import { poppins_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import Timetable from '../../icons/SideBar/Timetable';
import DiscoverIcon from '../../icons/DiscoverIcon';

const UpcomingEventPillBox = ({ subject }: { subject?: any }) => {
  return (
    <div key={subject.subject} className="flex flex-col gap-4">
      <div>
        <Image src={subject.textbookImg} alt={subject.subject} />
      </div>
      <div className="flex flex-col gap-3">
        <h3
          className={cn(
            'text-base text-gray1 font-semibold',
            poppins_500.className
          )}
        >
          {subject.subject}
        </h3>
        <p className={cn('text-sm text-gray6', poppins_400.className)}>
          {/* <span className={cn(poppins_600.className,"text-sm text-gray6")}>₦5,000 </span>
            <span className={cn(poppins_400.className,"text-sm text-gray3")}>Event fee</span> */}
          <span className={cn(poppins_500.className, 'text-sm text-gray3')}>
            Sport activity
          </span>
        </p>
        <div
          className={cn(
            'flex items-center gap-2 text-gray6',
            poppins_400.className
          )}
        >
          <div className="flex items-center gap-2">
            <Timetable height="14" width="14" />
            <span className={cn(poppins_400.className, 'text-xs text-gray6')}>
              16/03/2024
            </span>
          </div>
          <DiscoverIcon />
          <p className="text-sm">For all students</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventPillBox;
