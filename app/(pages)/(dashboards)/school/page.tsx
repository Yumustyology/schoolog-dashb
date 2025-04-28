'use client';
import React from 'react';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import AssignmentIcon from '@/components/atoms/icons/dashboard/AssignmentIcon';
import ParentIcon from '@/components/atoms/icons/dashboard/ParentIcon';
import SchoolAdminWelcomeSection from '@/components/atoms/icons/dashboard/SchoolAdminWelcomeSection';
import StaffsIcon from '@/components/atoms/icons/dashboard/StaffsIcon';
import StudentsIcon from '@/components/atoms/icons/SideBar/StudentsIcon';
import AssignmentAnalytics from '@/components/molecules/dashboard/analytics/AssignmentAnalytics';
import AttendanceAnalytics from '@/components/molecules/dashboard/analytics/AttendanceAnalytics';
import GradesAnalytics from '@/components/molecules/dashboard/analytics/GradesAnalytics';
import DashboardLinkBox from '@/components/molecules/dashboard/DashboardLinkBox';
import {
  poppins_500,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { cn } from '@/app/lib/utils';
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from '@material-tailwind/react';
import { Calendar } from '@/components/ui/calendar';
import { StudentsListTable } from '@/components/molecules/dashboard/student/StudentsListTable';
import { AdminPaymentListTable } from '@/components/molecules/dashboard/payment/AdminPaymentListTable';

const Page = () => {
  const [calenderDate, setCalenderDate] = React.useState<Date | undefined>();

  const analyticsTabs = [
    {
      label: 'Attendance',
      value: 'attendance',
      content: <AttendanceAnalytics />,
    },
    {
      label: 'Students',
      value: 'students',
      content: <GradesAnalytics />,
    },
    {
      label: 'Revenue',
      value: 'revenue',
      content: <AssignmentAnalytics />,
    },
  ];

  const tablesTabs = [
    {
      label: 'Best students',
      value: 'best-students',
      content: <StudentsListTable />,
    },
    {
      label: 'Best Teachers',
      value: 'best-teachers',
      content: <GradesAnalytics />,
    },
    {
      label: 'Due Payment',
      value: 'due-payment',
      content: <AdminPaymentListTable />,
    },
  ];

  const {
    activeTab: activeAnalyticsTab,
    handleTabClick: handleAnalyticsTabClick,
  } = useActiveTab('analytic', analyticsTabs);

  const { activeTab: activeTablesTab, handleTabClick: handleTablesTabClick } =
    useActiveTab('tables', tablesTabs);
  return (
    <div>
      <SchoolAdminWelcomeSection />

      <div className="grid grid-cols-4 gap-4 mb-8 h-[134px]">
        <DashboardLinkBox
          title="Total students"
          count={'12,250'}
          to="/student/subjects"
          icon={<StudentsIcon color="#3365E3" />}
          iconBgColor="bg-[#3365E31F]"
        />
        <DashboardLinkBox
          title="Total Teachers"
          count={'26'}
          baseText="120 Non teaching staff"
          to="/student/assignments"
          icon={<StaffsIcon color="#FEC53D" />}
          iconBgColor="bg-[#FEC53D1F]"
        />
        <DashboardLinkBox
          title="Parents"
          count={'38'}
          to="/student/events"
          icon={<ParentIcon color="#27AE60" />}
          iconBgColor="bg-[#27AE601F]"
        />
        <DashboardLinkBox
          title="Due payments"
          count={'8'}
          to="/student/events"
          icon={<AssignmentIcon color="#9B51E0" />}
          iconBgColor="bg-[#9B51E01F]"
        />
      </div>

      <div className="flex w-full grid-cols-2 gap-6">
        <div className="bg-white px-8 py-6 mt-6 rounded-lg w-full h-[430px]">
          <Tabs value={activeAnalyticsTab}>
            <div className="flex items-center justify-between mb-4 w-full">
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
                    activeClassName="rounded-full text-white bg-primary"
                    key={value}
                    value={value}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>

              <DatePicker
                className={cn(
                  'text-xs cursor-pointer text-gray6 2 w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                  poppins_400.className
                )}
                placeholder={'Pick date'}
              />
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
        <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[430px]">
          <h3
            className={cn(poppins_600.className, 'text-base text-black1 mb-6')}
          >
            School Calendar
          </h3>
          <Calendar
            mode="single"
            className="w-full"
            selected={calenderDate}
            onSelect={(date) => setCalenderDate(date)}
            initialFocus
          />
        </div>
      </div>

      <div className="flex w-full grid-cols-2 gap-6">
        <div className="bg-white px-8 py-6 mt-6 rounded-lg w-full">
          <Tabs value={activeTablesTab}>
            <div className="flex items-center justify-between mb-4 w-full">
              <TabsHeader
                className="transition-all text-sm px-2 py-2 min-w-[375px] bg-[#F1F1F1] h-[53px] rounded-full"
                indicatorProps={{
                  className: 'bg-transparent rounded-full shadow-none',
                }}
              >
                {tablesTabs.map(({ label, value }) => (
                  <Tab
                    onClick={() => handleTablesTabClick(value)}
                    className={cn('text-sm text-center', poppins_500.className)}
                    activeClassName="rounded-full text-white bg-primary"
                    key={value}
                    value={value}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>

              <p
                className={cn(
                  'text-lg text-primary cursor-pointer',
                  poppins_500.className
                )}
              >
                See all
              </p>
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
      </div>
    </div>
  );
};

export default Page;
