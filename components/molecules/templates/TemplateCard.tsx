'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';

const TemplateCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 min-w-[300px] relative">
      <Link href={`/school/templates/1234`}>
        <div className="relative h-[216px] overflow-hidden rounded-lg">
          <Image
            className="w-full"
            src={'/assets/images/thumbnail.png'}
            alt={'thumbnail'}
            layout="fill"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        {/* <Link href={`/${role}/subjects/1234`}> */}
        <div className="flex justify-between items-center">
          <h3
            className={cn(
              'text-base text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            Eleganza custom website
          </h3>
        </div>
        {/* </Link> */}
        <p className={cn('text-base mt-3 text-gray6', poppins_500.className)}>
          ₦10,000{' '}
          <span className={cn(poppins_400.className, 'text-sm')}>/monthly</span>
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
