import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { poppins_400, poppins_700 } from '@/app/lib/config/font.config';


export interface BreadcrumbItemType {
  label: string;
  href?: string; 
  isActive: boolean;
}

interface BreadcrumbBoxProps {
  crumbs: BreadcrumbItemType[]; 
}

export default function BreadcrumbBox({ crumbs }: BreadcrumbBoxProps) {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <BreadcrumbItem
              className={cn('text-base font-normal', poppins_400.className)}
              key={index}
            >
              {isLast ? (
                <BreadcrumbPage
                  className={cn(
                    crumb.isActive ? 'text-primary' : `text-gray-600 font-bold`,
                    poppins_700.className
                  )}
                >
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    className={crumb.isActive ? 'text-primary' : 'text-gray1'}
                  >
                    <Link href={crumb.href || '#'}>{crumb.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
