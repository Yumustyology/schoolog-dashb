'use client';
import React, { useState } from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { poppins_500 } from '@/app/lib/config/font.config';
import { SelectSubject } from '@/components/atoms/dashboard/materials/SelectSubject';
import BorrowBooksList from '@/components/molecules/dashboard/library/BorrowBooksList';
import AvailableBooks from '@/components/organisms/dashboard/students/AvailableBooks';
import { cn } from '@/app/lib/utils';

function Library() {
  const todayClassesTabs = [
    {
      label: 'Available books',
      value: 'activities',
      content: <AvailableBooks />,
    },
    {
      label: 'Borrowed books',
      value: 'your_activities',
      content: <BorrowBooksList />,
    },
  ];

  const [activeBooksTab, setActiveBooksTab] = useState('activities');

  const handleBooksTabClick = (tabValue: string) => {
    setActiveBooksTab(tabValue);
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
      <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
        <Tabs value={activeBooksTab}>
          <div className="flex justify-between items-center">
            <div className="flex gap-6 ">
              <div className="flex justify-start gap-3 bg-[#F7F7F7] border border-gray4 rounded-[100px] mb-6 p-2 h-[38px] w-[250px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http:/ /www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="#828282"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="#828282"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  type="search"
                  placeholder="Search books"
                  className="-ml-1 placeholder-poppins outline-none w-full text-gray1 bg-transparent"
                />
              </div>

              <SelectSubject />
            </div>

            <TabsHeader
              className="transition-all text-sm px-2 py-2 mb-6 w-[434px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {todayClassesTabs.map(({ label, value }) => (
                <Tab
                  onClick={() => handleBooksTabClick(value)}
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

export default Library;
