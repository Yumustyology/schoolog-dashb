import Button from '@/app/components/atoms/form/Button';
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon';
import { PaymentTable } from '@/app/components/molecules/dashboard/payment/PaymentTable';
import { Inter_600, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

function page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className={cn('text-primary text-[16px]', poppins_600.className)}>
          {' '}
          Payments{' '}
        </h3>
        <Button
          round
          className={cn(
            'text-white text-[16px]  flex gap-4 pt-3 px-8 bg-primary ',
            Inter_600.className
          )}
        >
          {' '}
          <DownloadIcon size="20" color="#ffffff" />{' '}
          <span>Download all results</span>
        </Button>
      </div>
      <PaymentTable />
    </div>
  );
}

export default page;
