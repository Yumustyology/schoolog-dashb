'use client';
import { Inter_500, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { SuggestionCategoryDropdown } from '@/components/atoms/dashboard/suggestions/SuggestionCategoryDropdown';
import Button from '@/components/atoms/form/Button';
import SearchInput from '@/components/atoms/form/SearchInput';
import { EditIcon, ExportIcon } from '@/components/atoms/icons/Icons';
import EventApplicantsList from '@/components/molecules/dashboard/activities/EventApplicantsList';
import { EventDetailCard } from '@/components/molecules/dashboard/activities/EventDetailsCard';
import { EventMoreDetailCard } from '@/components/molecules/dashboard/activities/EventMoreDetailCard';
import { ParentInfoCard } from '@/components/molecules/dashboard/parents/ParentInfoCard';
import { WardsInfoCard } from '@/components/molecules/dashboard/parents/WardsInfoCard';
import { PaymentTable } from '@/components/molecules/dashboard/payment/PaymentTable';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <BreadcrumbBox
                    className="mb-0"
                    crumbs={[
                        {
                            label: 'Activities',
                            isActive: false,
                            href: '/school/activities',
                        },
                        {
                            label: "ASS1",
                            isActive: true,
                        },
                    ]}
                />

                <div className=" flex gap-4">
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
                        <EventDetailCard />
                    </div>
                    <div className="flex-1 ">
                        <EventMoreDetailCard />
                    </div>
                </div>


                <div className='bg-white p-4 min-h-[100vh]'>
                    <div className='flex justify-between items-center'>
                        <h2 className={cn('text-base text-black1', poppins_500.className)}> 82 registered</h2>

                        <div className='flex gap-6'>
                            <SearchInput
                                placeholder="Search title or keyword"
                                className="w-[245px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
                            />

                            <SuggestionCategoryDropdown />
                        </div>
                    </div>

                    <EventApplicantsList />
                </div>


            </div>
        </div>
    );
};

export default page;
