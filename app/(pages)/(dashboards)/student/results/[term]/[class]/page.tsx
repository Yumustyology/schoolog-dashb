'use client';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import { ResultTable } from '@/app/components/molecules/dashboard/results/ResultTable';
import { Card } from '@material-tailwind/react';
import React from 'react';

function page() {
  return (
    <>
      <BreadcrumbBox
        crumbs={[
          {
            label: "Results",
            isActive: false,
            href: "/student/results",
          },
          {
            label: "SSS1 first term result",
            isActive: true,
          },
        ]}
      />
      <Card className="min-h-[75dvh] shadow-none w-full overflow-scroll p-6 mt-8">
        <ResultTable />
      </Card>
    </>
  );
}

export default page;
