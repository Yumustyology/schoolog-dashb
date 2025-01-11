import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/app/components/atoms/form/Button';
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon';
import { PaymentTable } from '@/app/components/molecules/dashboard/payment/PaymentTable';
import { Inter_600, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
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
