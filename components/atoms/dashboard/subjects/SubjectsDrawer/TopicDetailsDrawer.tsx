// import { teacherImg, teacherImg2 } from '@/app/assets'
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
// import NotificationBigIcon from '@/components/atoms/icons/ModalIcons/NotificationBigIcon'
import { DrawerSide } from '@/components/molecules/dashboard/DrawerSide';
import React from 'react';
// import { AssignedTeacherDetail } from '../AssignedTeacherDetail'
// import Button from '@/components/atoms/form/Button'
import Marked from '@/components/atoms/icons/dashboard/Marked';
import Unmarked from '@/components/atoms/icons/dashboard/Unmarked';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';

type TopicDetailsDrawerProp = {
  isTopicDetailsOpen: boolean;
  setIsTopicDetailsOpen: any;
  week: number;
  topic: string;
  status?: string;
  details?: string;
  subtopics?: {
    isMarked: boolean;
    subtopic: string;
  }[];
};

export const TopicDetailDrawer = ({
  isTopicDetailsOpen,
  setIsTopicDetailsOpen,
  topic,
  status,
  week,
  details,
  subtopics,
}: TopicDetailsDrawerProp) => {
   const {theme} = useSlgTheme()
  return (
    <DrawerSide
      open={isTopicDetailsOpen}
      close={() => setIsTopicDetailsOpen(false)}
      title={`Week ${week}`}
      className="w-[472px]"
    >
      <div className="p-6 overflow-y-auto sidebar-scroll max-h-[calc(100vh-140px)]">
        <div className="">
          <div className="flex gap-4 items-center mb-5">
            <h2 className={cn('text-sm text-gray6', poppins_600.className)}>
              {topic}
            </h2>
            <p
              className={cn(
                'py-2 px-3 bg-light text-primary text-xs rounded-full text-center',
                poppins_500.className
              )}
            >
              {status}
            </p>
          </div>

          <div>
            <p
              className={cn(
                'text-sm text-gray6 leading-6',
                poppins_400.className
              )}
            >
              {details}
            </p>
          </div>

          <div className="mt-8">
            <h5 className={cn('text-base text-gray6', poppins_400.className)}>
              {' '}
              Subtopics
            </h5>
            {subtopics?.map((subtopic, i) => (
              <div
                key={i}
                className="border-b border-gray5 py-7 flex items-center space-x-5"
              >
                <div>
                  {subtopic.isMarked ? (
                    <Marked color={theme.primary} />
                  ) : (
                    <Unmarked />
                  )}
                </div>
                <p className={cn('text-sm text-gray6', poppins_400.className)}>
                  {subtopic.subtopic}{' '}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DrawerSide>
  );
};
