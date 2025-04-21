'use client';
import { Inter_500 } from '@/app/lib/config/font.config';
// import useActiveTab from '@/app/lib/hooks/useActiveTab';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
// import { DatePicker } from '@/components/atoms/form/DatePicker';
// import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';

// import SelectComp from '@/components/atoms/form/Select';
import { EditIcon, ExportIcon } from '@/components/atoms/icons/Icons';
// import AttendanceMetrics from '@/components/molecules/dashboard/analytics/AttendanceMetrics';
// import GradesAnalytics from '@/components/molecules/dashboard/analytics/GradesAnalytics';
// import AttendanceList from '@/components/molecules/dashboard/attendance/AttendanceList';
import { ParentInfoCard } from '@/components/molecules/dashboard/parents/ParentInfoCard';
import { WardsInfoCard } from '@/components/molecules/dashboard/parents/WardsInfoCard';
import { PaymentTable } from '@/components/molecules/dashboard/payment/PaymentTable';
// import { ResultLists } from '@/components/molecules/dashboard/results/ResultLists';
// import { AchievementsComments } from '@/components/molecules/dashboard/students/AchievementsComments';
// import { GuardianInfoCard } from '@/components/molecules/dashboard/students/GuardianInfoCard';
// import { StudentInfoCard } from '@/components/molecules/dashboard/students/StudentInfoCard';
// import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';

const ParentInfoPage = ({ parent }: { parent: string }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            {
              label: 'Parents',
              isActive: false,
              href: '/student/parents',
            },
            {
              label: parent,
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
              Export payments
            </span>
          </Button>

          <Link href="/school/parents/edit-parent-info">
            <Button round className="h-[48px]  py-3 px-8 flex gap-2">
              {' '}
              <EditIcon color="#FFFFFF" />
              <span className={cn('text-base ', Inter_500.className)}>
                {' '}
                Edit Details
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex space-x-3 mt-4 mb-9">
          <div className="w-[446px]">
            <ParentInfoCard />
          </div>
          <div className="flex-1 ">
            <WardsInfoCard />
          </div>
        </div>

        <PaymentTable type="school" />
      </div>
    </div>
  );
};

export default ParentInfoPage;
