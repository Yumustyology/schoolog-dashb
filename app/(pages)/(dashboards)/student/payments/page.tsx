import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { PaymentTable } from '@/components/molecules/dashboard/payment/PaymentTable';
import React from 'react';

function page() {
  return (
    <>
      <BreadcrumbBox
        crumbs={[
          {
            label: 'Payments',
            isActive: true,
          },
        ]}
      />
      <PaymentTable />
    </>
  );
}

export default page;
