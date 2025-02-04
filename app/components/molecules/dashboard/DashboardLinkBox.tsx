import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import ArrowRightIcon from '../../atoms/icons/ArrowRightIcon';
import Link from 'next/link';

const DashboardLinkBox = ({
  title,
  baseText,
  count,
  to,
  icon,
  iconBgColor,
}: {
  title?: string;
  baseText?: string | ReactNode;
  count: string | ReactNode;
  to: string;
  icon: ReactNode;
  iconBgColor: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col justify-between">
      <div className="justify-between flex">
        <div className="flex-grow">
          <p
            className={cn(
              'text-gray3 mb-3 text-sm font-normal flex-grow',
              poppins_400.className
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-gray1 mb-3 text-2xl font-semibold',
              poppins_600.className
            )}
          >
            {count}
          </p>
        </div>
        <div
          className={cn(
            'flex items-center justify-center h-[42px] w-[42px] flex-shrink-0 rounded-full',
            iconBgColor
          )}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={cn(
            'text-gray6 text-sm font-normal',
            baseText && 'text-base text-gray1',
            poppins_400.className
          )}
        >
          {baseText || 'View all'}
        </p>
        {to ? (
          <Link href={to}>
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardLinkBox;
