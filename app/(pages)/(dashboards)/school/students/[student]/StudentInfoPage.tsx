'use client';
import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { cn } from '@/app/lib/utils';
import { getChartConfig } from '@/app/lib/utils/getChartConfig';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';
// import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import {
  EditIcon,
  ExportIcon,
  //   UploadIcon,
} from '@/components/atoms/icons/Icons';
// import DoughnutChart from '@/components/molecules/DoughnutChart';
// import AssignmentAnalytics from '@/components/molecules/dashboard/analytics/AssignmentAnalytics';
// import AttendanceAnalytics from '@/components/molecules/dashboard/analytics/AttendanceAnalytics';
import AttendanceMetrics from '@/components/molecules/dashboard/analytics/AttendanceMetrics';
// import GradesAnalytics from '@/components/molecules/dashboard/analytics/GradesAnalytics';
import TeachersAttendanceList from '@/components/molecules/dashboard/attendance/TeachersAttendanceList';
import { ResultLists } from '@/components/molecules/dashboard/results/ResultLists';
import { AchievementsComments } from '@/components/molecules/dashboard/students/AchievementsComments';
import { GuardianInfoCard } from '@/components/molecules/dashboard/students/GuardianInfoCard';
import { StudentInfoCard } from '@/components/molecules/dashboard/students/StudentInfoCard';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';

const StudentInfoPage = ({ student }: { student: string }) => {
  const data = [
    {
      label: 'Attendance',
      value: 'attendance',
      content: <TeachersAttendanceList />,
    },
    {
      label: 'Results',
      value: 'results',
      content: <ResultLists />,
    },
  ];

  const { activeTab, handleTabClick } = useActiveTab('attendace-result', data);

  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            {
              label: 'Students',
              isActive: false,
              href: '/student/subjects',
            },
            {
              label: 'AS111',
              isActive: true,
            },
          ]}
        />

        <div className=" flex gap-4">
          <Button
            to="/school/subjects/create-new-subject"
            flat
            round
            className="h-[44px]  py-3 px-6 flex gap-2 border border-primary"
          >
            {' '}
            <ExportIcon />
            <span className={cn('text-base ', Inter_500.className)}>
              Export
            </span>
          </Button>

          <Button round className="h-[48px]  py-3 px-8 flex gap-2">
            {' '}
            <EditIcon color="#FFFFFF" />
            <span className={cn('text-base ', Inter_500.className)}>
              {' '}
              Edit Details
            </span>
          </Button>
        </div>
      </div>

      <div>
        <div className="flex space-x-3 mt-4">
          <div className="w-[446px]">
            <StudentInfoCard />
          </div>
          <div className="flex-1 ">
            <GuardianInfoCard />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[398px] flex-1">
            <div className="flex justify-between items-center">
              <p
                className={cn('text-gray6 text-[16px]', poppins_500.className)}
              >
                Attendance metrics
              </p>
              <DatePicker
                className={cn(
                  'text-xs cursor-pointer text-gray6 2 w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
                  poppins_400.className
                )}
                placeholder={'Pick date'}
              />
            </div>
            <AttendanceMetrics />
          </div>
          <div className="bg-white px-6 py-6 mt-6 rounded-lg h-[398px] w-[400px]">
            <AchievementsComments />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl mt-3">
          <Tabs value={activeTab}>
            <div className="p-2 flex items-center justify-between  w-full mb-4">
              <div className="flex gap-4">
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

                <div className="flex w-[600px] gap-6">
                  <DateRangePicker />
                </div>
              </div>

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
                    activeClassName="rounded-full text-white bg-primary"
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

export default StudentInfoPage;
