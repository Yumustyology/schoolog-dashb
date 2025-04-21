import { Inter_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { SuggestionCategoryDropdown } from '@/components/atoms/dashboard/suggestions/SuggestionCategoryDropdown';
import Button from '@/components/atoms/form/Button';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import SearchInput from '@/components/atoms/form/SearchInput';
import { AnnouncementIcon } from '@/components/atoms/icons/Icon2';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import AnnoucementsList from '@/components/molecules/dashboard/announcement/AnnoucementsList';
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
                                label: 'Announcement',
                            },
                        ]}
                    />
                </div>

                <div>

                    <Button
                        // onClick={openAddStudentsMenu}
                        round
                        className="h-[44px]  py-3 px-6"
                    >
                        {' '}
                        <AnnouncementIcon />
                        <span className={cn('text-base ', Inter_500.className)}>
                            New annoucement
                        </span>
                    </Button>
                </div>

            </div>


            <div className='bg-white p-4 min-h-[100vh]'>
                <div className='flex gap-6 mb-6'>
                    <SearchInput
                        placeholder="Search title or keyword"
                        className="w-[245px] h-[38px] rounded-full  bg-[#F7F7F7] border border-gray4"
                    />

                    <SuggestionCategoryDropdown />
                    <DatePicker className='w-54' />
                </div>


                <div className='h-full' >
                    <AnnoucementsList />

                </div>

            </div>


        </div >
    )
}

export default page