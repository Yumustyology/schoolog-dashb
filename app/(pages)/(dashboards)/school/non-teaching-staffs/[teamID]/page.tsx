'use client';
import {
    Inter_500,
    poppins_400,
    poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { DateRangePicker } from '@/components/atoms/form/DateRangePicker';
import SelectComp from '@/components/atoms/form/Select';
import {
    EditIcon,
    ExportIcon,
} from '@/components/atoms/icons/Icons';
import AttendanceList from '@/components/molecules/dashboard/attendance/AttendanceList';
import { NonTeachingStaffOthersInfoCard } from '@/components/molecules/dashboard/staff/NonTeachingOtherInfoCard';
import { NonTeachingStaffInfoCard } from '@/components/molecules/dashboard/staff/NonTeachingStaffInfoCard';
import { TeacherInfoCard } from '@/components/molecules/dashboard/staff/TeacherInfoCard';
import { TeacherOthersInfoCard } from '@/components/molecules/dashboard/staff/TeacherOthersInfoCard';
import { GuardianInfoCard } from '@/components/molecules/dashboard/students/GuardianInfoCard';
import { StudentInfoCard } from '@/components/molecules/dashboard/students/StudentInfoCard';

import React from 'react';

const TeacherInfoPage = () => {

    return (
        <div>
            <div className="flex justify-between items-center">
                <BreadcrumbBox
                    className="mb-0"
                    crumbs={[
                        {
                            label: 'Teachers',
                            isActive: false,
                            href: '/teaching-staff',
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
                        <NonTeachingStaffInfoCard/>
                    </div>
                    <div className="flex-1 ">
                        <NonTeachingStaffOthersInfoCard/>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-xl mt-3">

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


                    </div>
                    <AttendanceList />

                </div>
            </div>
        </div>
    );
};

export default TeacherInfoPage;
