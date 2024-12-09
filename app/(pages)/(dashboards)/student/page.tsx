'use client';
import React, { useEffect, useState } from 'react';
import AssignmentIcon from '@/app/components/atoms/icons/dashboard/AssignmentIcon';
import EventsIcon from '@/app/components/atoms/icons/dashboard/EventsIcon';
import SubjectIcon from '@/app/components/atoms/icons/dashboard/SubjectIcon';
import SchoolBoy from '@/app/components/atoms/images/SchoolBoy';
import { AssignmentList } from '@/app/components/molecules/dashboard/AssignmentList';
import { BestPerformingSubjectsList } from '@/app/components/molecules/dashboard/BestPerformingSubjectsList';
import DashboardLinkBox from '@/app/components/molecules/dashboard/DashboardLinkBox';
import DashboardWelcomeCard from '@/app/components/molecules/dashboard/DashboardWelcomeCard';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import TodayClassesList from '@/app/components/molecules/dashboard/TodayClassesList';
import UpcomingEventLists from '@/app/components/molecules/dashboard/UpcomingEventsList';
import Timetable from '@/app/components/atoms/icons/dashboard/SideBar/Timetable';
import GradesAnalytics from '@/app/components/molecules/dashboard/analytics/GradesAnalytics';
import AssignmentAnalytics from '@/app/components/molecules/dashboard/analytics/AssignmentAnalytics';
import AttendanceAnalytics from '@/app/components/molecules/dashboard/analytics/AttendanceAnalytics';

function StudentDashboard() {
  const todayClassesTabs = [
    {
      label: "Today's classes",
      value: 'todays-classes',
      content: <TodayClassesList />,
    },
    {
      label: 'Upcoming events',
      value: 'upcoming-events',
      content: <UpcomingEventLists />,
    },
  ];

  const analyticsTabs = [
    {
      label: 'Grades',
      value: 'grades',
      content: <GradesAnalytics />,
    },
    {
      label: 'Attendance',
      value: 'attendance',
      content: <AttendanceAnalytics />,
    },
    {
      label: 'Assignment',
      value: 'assignment',
      content: <AssignmentAnalytics />,
    },
  ];

  const [activeTodayClassesTab, setActiveTodayClassesTab] =
    useState('todays-classes');
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('grades');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const todaysClassesTabFromUrl = urlParams.get('tab');
    const analyticsTabFromUrl = urlParams.get('analytics-tab');

    if (
      todaysClassesTabFromUrl &&
      todayClassesTabs.some((item) => item.value === todaysClassesTabFromUrl)
    ) {
      setActiveTodayClassesTab(todaysClassesTabFromUrl);
    } else {
      setActiveTodayClassesTab('todays-classes');
    }

    if (
      analyticsTabFromUrl &&
      todayClassesTabs.some((item) => item.value === analyticsTabFromUrl)
    ) {
      setActiveAnalyticsTab(analyticsTabFromUrl);
    } else {
      setActiveAnalyticsTab('todays-classes');
    }
  }, []);

  const handleTodayClassTabClick = (tabValue: string) => {
    setActiveTodayClassesTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };

  const handleAnalyticsTabClick = (tabValue: string) => {
    setActiveAnalyticsTab(tabValue);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('analytic-tab', tabValue);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams}`
    );
  };

  return (
    <div>
      <div className={cn('flex w-full space-x-6')}>
        <div className="flex-1 top-24 tablet:top-16 z-[2] xs:left-auto">
          <DashboardWelcomeCard className="overflow-hidden relative w-full mb-6">
            <>
              <div className="max-w-[340px]">
                <p
                  className={cn(
                    'text-xl text-white font-semibold mb-1',
                    poppins_600.className
                  )}
                >
                  Hi <span className="capitalize">Yusuf</span> 👋 How is your
                  learning going?
                </p>
                <p
                  className={cn(
                    'text-sm text-white font-semibold mb-2',
                    poppins_400.className
                  )}
                >
                  You have completed{' '}
                  <span className={cn(poppins_600.className)}>85%</span> of your
                  assignments and have{' '}
                  <span className={cn(poppins_600.className)}>95%</span> so far
                  this term
                </p>
              </div>
              <SchoolBoy className="absolute right-0 -mb-3 ml-auto" />
            </>
          </DashboardWelcomeCard>
          <div className="grid grid-cols-3 gap-4 h-[134px]">
            <DashboardLinkBox
              title="Total subjects"
              count={'16'}
              to="/students/subjects"
              icon={<SubjectIcon />}
              iconBgColor="bg-[#21B55A1F]"
            />
            <DashboardLinkBox
              title="Assignments"
              count={'26/42'}
              to="/students/assignments"
              icon={<AssignmentIcon />}
              iconBgColor="bg-[#3365E31F]"
            />
            <DashboardLinkBox
              title="Event"
              count={'3/8'}
              to="/students/events"
              icon={<EventsIcon />}
              iconBgColor="bg-[#EB57571F]"
            />
          </div>
          <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[430px]">
            <Tabs value={activeAnalyticsTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsHeader
                  className="transition-all text-sm px-2 py-2 w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
                  indicatorProps={{
                    className: 'bg-transparent rounded-full shadow-none',
                  }}
                >
                  {analyticsTabs.map(({ label, value }) => (
                    <Tab
                      onClick={() => handleAnalyticsTabClick(value)}
                      className={cn(
                        'text-sm text-center',
                        poppins_500.className
                      )}
                      activeClassName="rounded-full text-white bg-[#21B55A]"
                      key={value}
                      value={value}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <div
                  className={cn(
                    'text-xs cursor-pointer text-gray6 2 w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[30px] items-center px-3 py-1.5',
                    poppins_400.className
                  )}
                >
                  Pick date <Timetable height="16" width="16" />
                </div>
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
        </div>

        <div className="flex-shrink-0 grid grid-cols-1 gap-6">
          <BestPerformingSubjectsList />
          <AssignmentList />
        </div>
      </div>
      <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
        <Tabs value={activeTodayClassesTab}>
          <div className="flex items-center justify-between">
            <TabsHeader
              className="transition-all text-sm px-2 py-2 mb-6 w-[340px] bg-[#F1F1F1] h-[53px] rounded-full"
              indicatorProps={{
                className: 'bg-transparent rounded-full shadow-none',
              }}
            >
              {todayClassesTabs.map(({ label, value }) => (
                <Tab
                  onClick={() => handleTodayClassTabClick(value)}
                  className={cn('text-sm text-center', poppins_500.className)}
                  activeClassName="rounded-full text-white bg-[#21B55A]"
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
            {todayClassesTabs.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default StudentDashboard;
