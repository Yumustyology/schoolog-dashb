'use client';
import React, { useState } from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { cn } from '@/app/lib/utils';
import { poppins_500 } from '@/app/lib/config/font.config';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import ActivitiesAndEvents from '@/components/organisms/dashboard/students/ActivitiesAndEvents';
import RegisteredActivitiesAndEvents from '@/components/organisms/dashboard/students/RegisteredActivitiesAndEvents';
import SelectComp from '@/components/atoms/form/Select';
import SearchInput from '@/components/atoms/form/SearchInput';
import { MyActivitiesCalendar } from '@/components/organisms/dashboard/MyActivitiesCalendar';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { ActivityIcon } from 'lucide-react';
import EventsIcon from '@/components/atoms/icons/dashboard/EventsIcon';

function Page() {
  const todayClassesTabs = [
    {
      label: 'Activities & event',
      value: 'activities',
      content: <ActivitiesAndEvents type="school" />,
    },
    {
      label: 'Calender',
      value: 'calender',
      content: <MyActivitiesCalendar />,
    },
  ];

  const [activeActivitiestTab, setActiveActivitiesTab] = useState('activities');

  const handleActivitiesTabClick = (tabValue: string) => {
    setActiveActivitiesTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <BreadcrumbBox
          crumbs={[
            {
              label: 'Admission',
              isActive: true,
            },
          ]}
        />
        <div className="flex gap-4 mb-8">
          <Button
            // onClick={openPayForStudentModal}
            round
            className="gap-2 px-6 h-[44px] rounded-full"
          >
            <EventsIcon color="#FFFFFF" />
            <span> Create new event </span>
          </Button>
        </div>
      </div>
      <div className="bg-white w-full p-6 rounded-lg min-h-[398px] h-auto">
        <Tabs value={activeActivitiestTab}>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <SearchInput
                placeholder="Search event and activity"
                className="text-gray-1 bg-[#F7F7F7] mb-6 p-2 h-[38px] w-[200px] lgDesktop:w-auto border border-gray4 rounded-[100px]"
              />

              <div className="flex max-w-[200px] gap-6">
                <SelectComp
                  value="sports"
                  triggerClasses="rounded-full h-[38px]"
                  onValueChange={console.log}
                  placeholder="Type"
                  options={[
                    {
                      id: 'sports',
                      name: 'Sports',
                    },
                  ]}
                />
                <DatePicker />
              </div>
            </div>

            <TabsHeader
              className="transition-all text-sm px-2 py-2 mb-6 w-[434px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {todayClassesTabs.map(({ label, value }) => (
                <Tab
                  onClick={() => handleActivitiesTabClick(value)}
                  className={cn('text-sm text-center', poppins_500.className)}
                  activeClassName="rounded-full text-white bg-primary"
                  key={value}
                  value={value}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </div>

          <TabsBody className="w-full p-0">
            {todayClassesTabs.map(({ value, content }) => (
              <TabPanel key={value} value={value} className="p-0">
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
