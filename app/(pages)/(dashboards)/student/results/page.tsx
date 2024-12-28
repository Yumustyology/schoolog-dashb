'use client'

import Button from '@/app/components/atoms/form/Button'
import Input from '@/app/components/atoms/form/Input'
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon'
import FormModal from '@/app/components/molecules/dashboard/FormModal'
import PerformanceMetrics from '@/app/components/molecules/dashboard/analytics/PerformanceMetrics'
import { ResultLists } from '@/app/components/molecules/dashboard/results/ResultLists'
import { OverAllBestSubjectsList } from '@/app/components/molecules/dashboard/student/OverAllBestSubjects'

import { Inter_400, Inter_500, Inter_600, poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'

function page() {
    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const onClose = () => setIsModalOpen(false);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h3 className={cn('text-primary text-[16px]', poppins_600.className)}> Results</h3>
                <Button round className={cn('text-white text-[16px]  flex gap-4 pt-3 px-8 bg-primary ', Inter_600.className)}> <DownloadIcon size='20' color='#ffffff' /> <span>Download all results</span></Button>
            </div>
            <div className='flex gap-10'>
                <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[398px] flex-1">
                    <div className='flex justify-between items-center'>
                        <p className={cn('text-gray6 text-[16px]', poppins_500.className)}>Attendance metrics</p>
                        <div
                            className={cn(
                                'text-xs cursor-pointer text-gray6 2 text-center w-[101px] border-gray4 bg-[#F7F7F8] flex justify-between rounded-full h-[30px] items-center px-3 py-1.5',
                                poppins_400.className
                            )}

                        >
                            SS1
                        </div>
                    </div>
                    <PerformanceMetrics />
                </div>
                <div className="bg-white px-8 py-6 mt-6 rounded-lg h-[398px] ">

                    <OverAllBestSubjectsList />
                </div>
            </div>

            <section>


                <ResultLists />
                {isModalOpen && <FormModal isOpen={true} onClose={onClose} title='Check result' >
                    <div>
                        <div>
                            <h2 className={cn('text-2xl text-gray1 ', Inter_600.className)}>
                                Input  <span className='text-primary'>  result code </span>
                            </h2>
                            <p className={cn('text-sm text-gray mt-1', Inter_400.className)}>Input the 5 unique code issued to your parents after purchasing the report card pass</p>
                        </div>


                        <div className='mt-12'>
                            <Label className='text-gray1 text-[16px] mb-2'> Report card code </Label>
                            <Input placeholder='Input code' className='h-[56px] mt-6 border border-gray2 rounded-md' />
                        </div>



                    </div>
                </FormModal>
                }

            </section>

        </div>
    )
}

export default page