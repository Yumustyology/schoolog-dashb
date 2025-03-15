'use client';

import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { PaymentTable } from '@/components/molecules/dashboard/payment/PaymentTable';
import React from 'react';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from '@material-tailwind/react';
import Button from '@/components/atoms/form/Button';
import CardPosIcon from '@/components/atoms/icons/dashboard/CardPosIcon';
import ExportIcon from '@/components/atoms/icons/dashboard/ExportIcon';
import { DuePaymentTable } from '@/components/molecules/dashboard/finance/DuePaymentTable';
import { openPayForStudentModal } from '@/app/lib/entities/paymentCategory.entity';

function Page() {
  const tablesTabs = [
    {
      label: 'Payments',
      value: 'payments',
      content: <PaymentTable type="school" />,
    },
    {
      label: 'Due Payments',
      value: 'due-payments',
      content: <DuePaymentTable />,
    },
  ];

  const { activeTab, handleTabClick } = useActiveTab('tables', tablesTabs);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <BreadcrumbBox
          crumbs={[
            {
              label: 'Finance',
              isActive: false,
              href: '/school/finance',
            },
            {
              label: 'Payments histories',
              isActive: true,
            },
          ]}
        />
        <div className="flex gap-4 mb-8">
          <Button
            flat
            outlined
            round
            className="bg-transparent gap-2 px-6 h-[44px] rounded-full"
          >
            <ExportIcon />
            <span>Export list</span>
          </Button>
          <Button onClick={openPayForStudentModal} round className="gap-2 px-6 h-[44px] rounded-full">
            <CardPosIcon />
            <span>Pay for student</span>
          </Button>
        </div>
      </div>
      <div className="p-5 bg-white rounded-lg">
        <Tabs value={activeTab}>
          <div className="flex items-center gap-10 justify-between mb-6 w-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <SearchInput
                  className="bg-gray4"
                  placeholder="Search payment history"
                />
                <SelectComp
                  placeholder="All type"
                  triggerClasses={cn(
                    poppins_400.className,
                    'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4  flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
                  )}
                  value=""
                  onValueChange={console.log}
                  options={[
                    {
                      id: 'all',
                      name: 'All',
                    },
                    {
                      id: 'jss2',
                      name: 'JSS2',
                    },
                    {
                      id: 'jss3',
                      name: 'JSS3',
                    },
                  ]}
                />
                <DatePicker
                  calenderContainerClassName={cn('mr-10')}
                  className={cn(
                    'text-xs cursor-pointer text-gray6 2 w-[180px] border border-gray4 flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                    poppins_400.className
                  )}
                  placeholder={'Pick date'}
                />
              </div>
            </div>

            <TabsHeader
              className="transition-all text-sm px-2 py-2 min-w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {tablesTabs.map(({ label, value }) => (
                <Tab
                  onClick={() => handleTabClick(value)}
                  className={cn('text-sm text-center', poppins_500.className)}
                  activeClassName="rounded-full text-white bg-[#21B55A]"
                  key={value}
                  value={value}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </div>

          <TabsBody>
            {tablesTabs.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
}

export default Page;
