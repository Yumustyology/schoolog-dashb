'use client';
import { useState } from 'react';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';
import Topics from '@/components/organisms/dashboard/students/Topics';
import Assignments from '@/components/organisms/dashboard/students/Assignments';
import SearchInput from '@/components/atoms/form/SearchInput';
import SubjectInfoCard from '@/components/molecules/dashboard/subjects/SubjectInfoCard';
import AssignedTeacherCard from '@/components/molecules/dashboard/AssignedTeacherCard';

function Page({ subject }: { subject: string }) {
  const todayClassesTabs = [
    {
      label: 'Topics',
      value: 'topics',
      content: <Topics />,
    },
    {
      label: 'Assignments',
      value: 'assignments',
      content: <Assignments />,
    },
  ];

  const [activeTopicAssignmtentTab, setActiveTopicAssignmentTab] =
    useState('topics');

  const handleTopicAssignmentTabClick = (tabValue: string) => {
    setActiveTopicAssignmentTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };

  return (
    <main className="">
      <div>
        <BreadcrumbBox
          crumbs={[
            {
              label: 'Subjects',
              isActive: false,
              href: '/student/subjects',
            },
            {
              label: 'Biology',
              isActive: true,
            },
          ]}
        />

        <div className="flex space-x-3 mt-4">
          <div className="w-[446px]">
            <SubjectInfoCard role={'student'} />
          </div>
          <div className="flex-1 ">
            <AssignedTeacherCard role={'student'} />
          </div>
        </div>

        <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
          <Tabs value={activeTopicAssignmtentTab}>
            <div className="flex justify-between items-center">
              <SearchInput
                placeholder="search"
                className="bg-[#F7F7F7] border border-gray4 rounded-[100px] mb-6 p-2 h-[38px] max-w-[327px]"
              />

              <TabsHeader
                className="transition-all text-sm px-2 py-2 mb-6 w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {todayClassesTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleTopicAssignmentTabClick(value)}
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
        <section></section>
      </div>
    </main>
  );
}

export default Page;
