import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import { PaymentTable } from '@/app/components/molecules/dashboard/payment/PaymentTable';
import React from 'react';

function page() {
  return (
    <>
      <BreadcrumbBox
        crumbs={[
          {
            label: "Payments",
            isActive: true,
          },
        ]}
      />
      <PaymentTable />
    </>
  );
}

export default page;
