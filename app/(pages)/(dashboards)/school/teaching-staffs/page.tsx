'use client'
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { openAddTeacherMenu } from '@/app/lib/entities/staff.entity';
import { cn } from '@/app/lib/utils';
import { AddTeacherMenu } from '@/components/atoms/dashboard/staff/AddTeacherMenu';
import { StaffStatusDropdown } from '@/components/atoms/dashboard/staff/StaffStatusDropdown';
import { UploadTeachersModal } from '@/components/atoms/dashboard/staff/modal/UploadTeachersModal';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import SearchInput from '@/components/atoms/form/SearchInput';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import ExportIcon from '@/components/atoms/icons/dashboard/ExportIcon';
import TeachersTableLists from '@/components/molecules/dashboard/staff/TeachersTableList';
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <BreadcrumbBox
                        className="mb-0"
                        crumbs={[
                            {
                                isActive: true,
                                label: 'Staff',
                            },
                        ]}
                    />
                </div>

                <div className='relative'>

                    <Button
                        onClick={openAddTeacherMenu}
                        round
                        className="h-[44px]  py-3 px-6"
                    >
                        {' '}
                        <AdditionIcon />
                        <span className={cn('text-base ', Inter_500.className)}>
                            Add new teacher
                        </span>
                    </Button>
                    <AddTeacherMenu/>
                    <UploadTeachersModal/>
                </div>

            </div>


            <div className='bg-white p-4 min-h-[100vh]'>
                <div className='flex gap-6 mb-6 justify-between'>
                    <div className='flex gap-6 '>

                        <SearchInput
                            placeholder="Search teachers name"
                            className="w-[245px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
                        />

                        <StaffStatusDropdown/>
                        <DatePicker className='w-54' />
                    </div>

                    <div>
                        <Button
                            flat
                            outlined
                            round
                            className="bg-[#EBEBEB] gap-2 px-6 border-none text-gray1 rounded-full"
                        >
                            <ExportIcon color='#828282' />
                            <span className={cn('text-gray1', poppins_400.className)}>Export list</span>
                        </Button>
                    </div>
                </div>


                <div className='h-full' >
                    <TeachersTableLists/>

                </div>

            </div>


        </div >
    )
}

export default page