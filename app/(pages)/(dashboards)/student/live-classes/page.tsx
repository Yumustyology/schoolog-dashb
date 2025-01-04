'use client';
import BreadcrumbBox from '@/app/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/app/components/atoms/form/Button';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import Input from '@/app/components/atoms/form/Input';

const page = () => {
  const data = [
    {
      label: 'Upcoming lives',
      value: 'upcoming-lives',
      content: <LiveClassBox image />,
    },
    {
      label: 'Live classes',
      value: 'live-classes',
      content: <LiveClassBox prev image />,
    },
  ];

  const { activeTab, handleTabClick } = useActiveTab('live-classes', data);

  return (
    <main className="">
      <div>
        <BreadcrumbBox />
      </div>
      <div className="bg-white p-6 rounded-xl mt-3">
        <Tabs value={activeTab}>
          <div className="p-2 flex items-center justify-between  w-full mb-4">
            <Input
              placeholder="Search class"
              className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-[#F2F2F2]"
            />
            <TabsHeader
              className="transition-all text-sm px-2 py-2 w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {data.map(({ label, value }) => (
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
            {data.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                <div className="bg-white">
                  <section className="grid grid-cols-3 gap-6">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, key) => content)}
                  </section>
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </main>
  );
};

export default page;

const LiveClassBox = ({ image, prev }: { prev?: boolean; image?: boolean }) => {
  return (
    <div
      className={cn(
        'p-3 border border-gray5 rounded-lg min-w-[365px]--max-w-[355px] flex flex-col justify-between'
      )}
    >
      <div className="flex gap-[14px]">
        {image && (
          <Image
            alt="cover-image"
            src={'/assets/images/cover-subject.png'}
            height={54}
            width={70}
          />
        )}
        <div>
          <p
            className={cn(
              'flex-shrink-0 text-gray1 text-base mb-3',
              poppins_500.className
            )}
          >
            Biology
          </p>
          <p className={cn('text-sm text-gray3', poppins_400.className)}>
            Introduction to state of matter
          </p>
        </div>
      </div>
      <div
        className={cn(
          'text-sm text-gray3 flex gap-2 mt-3.5 items-center',
          poppins_400.className
        )}
      >
        <Image
          alt="avatar"
          src={'/assets/images/avatar.png'}
          height={24}
          width={24}
        />
        <p className="text-gray6">Esther Ezike</p>
        <div className="bg-[#D9D9D9] h-1 w-1 rounded-full" />
        <p className="text-xs text-gray3">Nov 12, 2024 - 9am</p>
      </div>
      {prev ? (
        <Button wide className="mt-4 rounded-full">
          Watch class recording
        </Button>
      ) : (
        <Button wide className="mt-4 rounded-full">
          Join class
        </Button>
      )}
    </div>
  );
};
