'use client'
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb'
import React from 'react'
import Search from '@/components/atoms/form/SearchInput';
import { PaymentStatusDropdownList } from '@/components/atoms/dashboard/parents/PaymentsStatusDropdown';
import ParentsTableLists from '@/components/atoms/dashboard/parents/ParentsTableLists';

const page = () => {
    const breadcrumbs = [{ label: 'Students', isActive: true }];
    return (
        <main>

            <div className="">
                <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
            </div>


            <div className='bg-white p-6 my-6 h-screen'>
                <div className='flex gap-4 items-center'>
                    <Search
                        placeholder="Search parent..."
                        className="w-[231px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
                    />

                    <PaymentStatusDropdownList />
                </div>



                <div className='' >
                    <ParentsTableLists/>
                </div>

            </div>



        </main>
    )
}

export default page