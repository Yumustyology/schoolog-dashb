import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { ReactNode } from 'react';
import ArrowRightIcon from '../../atoms/icons/ArrowRightIcon';
import Link from 'next/link';
import Image from 'next/image';

const DashboardLinkBox = ({
  title,
  baseText,
  count,
  to,
  icon,
  iconBgColor,
  className,
  titleClassName,
  countClassName,
  baseTextClassName,
}: {
  title?: string;
  baseText?: string | ReactNode;
  count: string | ReactNode;
  to?: string;
  icon: ReactNode;
  iconBgColor: string;
  className?: string;
  titleClassName?: string;
  countClassName?: string;
  baseTextClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg p-4 flex flex-col justify-between relative',
        className
      )}
    >
      <Image
        width={124.18072342603794}
        height={78.61740769415881}
        alt="watermark"
        src="/assets/images/watermark.png"
        className="absolute right-0 bottom-0"
      />
      <div className="justify-between flex">
        <div className="flex-grow">
          <p
            className={cn(
              'text-gray3 mb-3 text-sm font-normal flex-grow',
              poppins_400.className,
              titleClassName
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-gray1 mb-3 text-2xl font-semibold',
              poppins_600.className,
              countClassName
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
            poppins_400.className,
            baseTextClassName
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
