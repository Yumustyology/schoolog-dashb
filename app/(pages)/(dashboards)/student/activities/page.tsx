'use client'
import React, { useState } from 'react'
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
} from '@material-tailwind/react';
import { cn } from '@/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Assignments from '@/app/components/organisms/dashboard/students/Assignments';
import { SelectSubject } from '@/app/components/atoms/dashboard/materials/SelectSubject';
import { DatePicker } from '@/app/components/atoms/dashboard/materials/DatePicker';
import ActivitiesAndEvents from '@/app/components/organisms/dashboard/students/ActivitiesAndEvents';
import RegisteredActivitiesAndEvents from '@/app/components/organisms/dashboard/students/RegisteredActivitiesAndEvents';
import CalendarActivities from '@/app/components/organisms/dashboard/students/CalendarActivities';
import { DrawerSide } from '@/app/components/molecules/dashboard/DrawerSide';
import Image from 'next/image';
import { activities1 } from '@/app/assets';
import Dot from '@/app/components/atoms/dashboard/subjects/Dot';
import CalendarIcon from '@/app/components/atoms/icons/dashboard/CalendarIcon';
import CategoryIcon from '@/app/components/atoms/icons/dashboard/CategoryIcon';
import Button from '@/app/components/atoms/form/Button';

function page() {
    const todayClassesTabs = [
        {
            label: 'Activities & event',
            value: 'activities',
            content: <ActivitiesAndEvents />,
        },
        {
            label: 'Your activities',
            value: 'your_activities',
            content: <RegisteredActivitiesAndEvents />,
        },
        {
            label: 'Calender',
            value: 'calender',
            content: <CalendarActivities />,
        },
    ];

    const [activeActivitiestTab, setActiveActivitiesTab] =
        useState('activities');

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
            <DrawerSide title='Event Details'>
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]" >
                    <div className="relative h-[233px]">
                        <Image src={activities1} alt='activities' className="rounded-md object-cover h-[233px]" />
                        <p className={cn('border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ', poppins_500.className)}>N5,000</p>
                    </div>
                    <div className="mt-6">
                        <Typography>
                            <h2 className={cn('text-xl text-gray1 mb-2', poppins_500.className)}>Jet club student organization</h2>
                        </Typography>
                        <Typography>
                            <span className={cn('text-sm flex items-center text-gray6 gap-1.5', poppins_400.className)}>
                                Event <Dot /> Physical <CalendarIcon /> 16/03/2024 <CategoryIcon /> For all students
                            </span>
                        </Typography>
                        <Typography className='my-4'>
                            <span className={cn('text-sm flex items-center text-gray6 gap-1.5', poppins_400.className)}>
                                Registration ends on <span className="text-gray1"> 16/03/2024 </span>
                            </span>
                        </Typography>
                        <p className={cn('text-sm flex items-center text-gray gap-1.5 mb-3', poppins_400.className)}>About us</p>
                        <p className={cn('text-sm flex items-center text-[#071E3B] gap-1.5', poppins_400.className)}>
                            Agriculture is the cornerstone of food security, serving as the primary means of sustenance
                            and economic stability for nations worldwide. It encompasses the cultivation of crops and livestock,
                            which are essential for providing the food supply that suppor.

                        </p>

                    </div>
                </div>
                <div className="px-6 mt-6">
                    <Button round wide className="absolute bottom-3  left-0 right-0 w-full">Register</Button>
                </div>
            </DrawerSide>

            <div className="bg-white w-full p-6 mt-6 rounded-lg min-h-[398px] h-auto">
                <Tabs value={activeActivitiestTab}>
                    <div className="flex justify-between items-center">
                        <div className='flex gap-6 '>
                            <div className="flex justify-start gap-6 bg-[#F7F7F7] border border-[#F2f2f2] rounded-[100px] mb-6 p-2 h-[38px] w-[200px]">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
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
                                    placeholder="Search event and activity"
                                    className=" outline-none w-full text-gray1 bg-transparent"
                                />
                            </div>
                            <div className='flex w-[200px] gap-6'>
                                <SelectSubject />
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
                                    activeClassName="rounded-full text-white bg-[#21B55A]"
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
    )
}

export default page