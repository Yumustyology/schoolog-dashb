'use client';

import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';

const Page = () => {
  return (
    <main>
      <BreadcrumbBox crumbs={[{ label: 'Dashboard', isActive: true }]} className="mb-0" />

      <div className="bg-white p-6 my-6 min-h-screen">
        <h1 className={cn('text-lg text-black1', poppins_500.className)}>
          Platform overview
        </h1>
        <p className="text-sm text-gray mt-2">
          Manage pricing plans, add-ons, and schools from here.
        </p>
      </div>
    </main>
  );
};

export default Page;
