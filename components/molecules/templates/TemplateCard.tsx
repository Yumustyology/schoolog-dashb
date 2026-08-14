'use client';
import React from 'react';
import Image from 'next/image';
import { cn, formatCurrency } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';
import { thumbnailImage } from '@/app/assets';
import type { Template } from '@/app/lib/actions/templates.action';

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => {
  return (
    <div className="flex flex-col gap-4 min-w-[300px] relative">
      <Link href={`/school/templates/${template._id}`}>
        <div className="relative h-[216px] overflow-hidden rounded-lg">
          <Image
            className="w-full"
            src={template.previewImages[0] || thumbnailImage}
            alt={template.name}
            layout="fill"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3
            className={cn(
              'text-base text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            {template.name}
          </h3>
        </div>
        <p className={cn('text-base mt-3 text-gray6', poppins_500.className)}>
          {formatCurrency(template.price, template.currency)}{' '}
          {template.billingInterval !== 'one_time' && (
            <span className={cn(poppins_400.className, 'text-sm')}>
              /{template.billingInterval === 'yearly' ? 'yearly' : 'monthly'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
