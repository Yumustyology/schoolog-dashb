'use client';
import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { OpenCheckInModal, OpenCheckOutModal, checkOutModal } from '@/app/lib/entities/attendance.entity';
import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { cn } from '@/app/lib/utils';
import { getChartConfig } from '@/app/lib/utils/getChartConfig';
import { AttendanceStatusDropdown } from '@/components/atoms/dashboard/attendance/AttendanceStatusDropdown';
import { CheckInModal } from '@/components/atoms/dashboard/attendance/modal/CheckInModal';
import { CheckOutModal } from '@/components/atoms/dashboard/attendance/modal/CheckOutModal';
import { ClassDropdown } from '@/components/atoms/dashboard/students/ClassDropdown';
import { StatusDropdown } from '@/components/atoms/dashboard/students/StatusDropdown';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';
import SearchInput from '@/components/atoms/form/SearchInput';
// import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import { CheckInIcon, CheckOutIcon } from '@/components/atoms/icons/Icon2';
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
import AttendanceList from '@/components/molecules/dashboard/attendance/AttendanceList';
import StudentsAttendanceList from '@/components/molecules/dashboard/attendance/StudentsAttendanceLists';
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

const page = () => {
  const data = [
    {
      label: 'Students',
      value: 'students',
      content: <StudentsAttendanceList />,
    },
    {
      label: 'Teachers',
      value: 'teachers',
      content: <AttendanceList />,
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
              label: 'Attendance',
              isActive: true,
              href: '/student/attendance',
            },
          ]}
        />

        <div className=" flex gap-4">
          <Button
            flat
            round
            className="h-[44px]  py-3 px-6 flex gap-2 border border-primary"
            onClick={OpenCheckOutModal}
          >
            {' '}
            <CheckOutIcon />
            <span className={cn('text-base ', Inter_500.className)}>
              Checkout
            </span>
          </Button>

          <Button round className="h-[48px]  py-3 px-8 flex gap-2" onClick={OpenCheckInModal}>
            {' '}
            <CheckInIcon />
            <span className={cn('text-base ', Inter_500.className)}>
              {' '}
              Checkin
            </span>
          </Button>
        </div>
        <CheckOutModal />
        <CheckInModal />
      </div>

      <div>
        <div className="bg-white p-6 rounded-xl mt-3">
          <Tabs value={activeTab}>
            <div className="flex items-center justify-between  w-full mb-4">
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Search student..."
                  className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
                />

                <ClassDropdown />
                <AttendanceStatusDropdown />
                <div className="flex w-[100px] gap-6">
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

export default page;
