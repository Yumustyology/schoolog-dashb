'use client';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import SelectComp from '@/components/atoms/form/Select';
import TemplateCard from '@/components/molecules/templates/TemplateCard';
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from '@material-tailwind/react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import PurchasedTemplate from '@/components/molecules/templates/PurchasedTemplate';
import Button from '@/components/atoms/form/Button';
import { EditIcon } from '@/components/atoms/icons/Icons';
import EyeClose from '@/components/atoms/icons/EyeClose';

const TemplatesList = () => (
  <>
    <section className="grid grid-cols-1 lgTablet:grid-cols-2 laptop:grid-cols-3 xlgDesktop:grid-cols-4 gap-6">
      {[1,2,3,4,5,6,7,8,9,0].map((template: number) => {
        return (
          <TemplateCard  key={template} />
        );
      })}
    </section>

    <footer className="my-5 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <h5 className="text-r2"> Showing </h5>
        <SelectBox />
      </div>

      <div>
        <PaginationBox />
      </div>
    </footer>
  </>
);

function Page() {
  const breadcrumbs = [{ label: 'Templates', isActive: true }];

  const analyticsTabs = [
    {
      label: 'Landing Pages',
      value: 'landing-pages',
      content: <TemplatesList />,
    },
    {
      label: 'Purchased design',
      value: 'purchased-design',
      content: <PurchasedTemplate />,
    },
  ];

  const {
    activeTab: activeAnalyticsTab,
    handleTabClick: handleAnalyticsTabClick,
  } = useActiveTab('analytic', analyticsTabs);

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
      </div>

      <div className="bg-white p-6 rounded-xl mt-3">
        <div className="bg-white  rounded-lg w-full h-[430px]">
          <Tabs value={activeAnalyticsTab}>
            <div className="flex items-center justify-between mb-0 w-full">
              {activeAnalyticsTab != 'purchased-design' ? (
                <div className="flex items-center gap-3">
                  <SelectComp
                    placeholder="Price"
                    triggerClasses={cn(
                      poppins_400.className,
                      'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4  flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
                    )}
                    value=""
                    onValueChange={console.log}
                    options={[
                      {
                        id: '$1',
                        name: '$1',
                      },
                      {
                        id: '$2',
                        name: '$2',
                      },
                      {
                        id: '$3',
                        name: '$2',
                      },
                    ]}
                  />
                  <DatePicker
                    className={cn(
                      'text-xs cursor-pointer text-gray6 2 min-w-[101px] w-min border-gray4 --bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                      poppins_400.className
                    )}
                    placeholder={'Pick date'}
                  />
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button
                    flat
                    outlined
                    round
                    to="/school/templates/edit/1234"
                    className="bg-transparent gap-2 px-6 h-[44px] rounded-full"
                  >
                    <EditIcon color="#21B55A" size={18} />
                    <span>Edit website</span>
                  </Button>
                  <Button
                    // onClick={openMakePaymentModal}
                    round
                    className="gap-2 px-6 h-[44px] rounded-full"
                  >
                    <EyeClose color="white" />
                    <span>Preview website</span>
                  </Button>
                </div>
              )}

              <TabsHeader
                className="transition-all text-sm px-2 py-2 min-w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {analyticsTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleAnalyticsTabClick(value)}
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
              {analyticsTabs.map(({ value, content }) => (
                <TabPanel key={value} value={value}>
                  {content}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        {/* </section> */}
      </div>
    </main>
  );
}

export default Page;
