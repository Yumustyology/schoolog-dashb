'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { LiveClassesList } from '@/components/molecules/dashboard/live-classes/LiveClassesList';

const Page = () => {
  const breadcrumbs = [{ label: 'Live Classes', isActive: true }];

  return (
    <main>
      <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />

      <div className="bg-white p-6 my-6 min-h-screen">
        <LiveClassesList />
      </div>
    </main>
  );
};

export default Page;
