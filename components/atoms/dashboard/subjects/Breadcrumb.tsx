import React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_700 } from '@/app/lib/config/font.config';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  isActive: boolean;
}

interface BreadcrumbBoxProps {
  crumbs: BreadcrumbItemType[];
  className?: string;
}

export default function BreadcrumbBox({
  crumbs,
  className,
}: BreadcrumbBoxProps) {
  return (
    <Breadcrumb className={cn('mb-8', className)}>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return isLast ? (
            <BreadcrumbItem
              className={cn('text-base font-normal', poppins_400.className)}
              key={index}
            >
              <BreadcrumbPage
                className={cn(
                  crumb.isActive ? 'text-primary' : `text-gray-600 font-bold`,
                  poppins_700.className
                )}
              >
                {crumb.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={cn('text-base font-normal', poppins_400.className)}
              >
                <BreadcrumbLink
                  asChild
                  className={crumb.isActive ? 'text-primary' : 'text-gray1'}
                >
                  <Link href={crumb.href || '#'}>{crumb.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
