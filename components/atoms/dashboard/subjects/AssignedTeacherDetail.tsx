import { teacherImg2 } from '@/app/assets'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import { CancelDrawerIcon, DeleteModalIcon } from '../../icons/Icons'

export const AssignedTeacherDetail = ({ name, img, subjectAssignedTo }: { name: string, img: any, subjectAssignedTo: string }) => {
    return (
        <div>
            <div className="bg-[#f8f8f8] rounded-sm py-3 px-2 mb-6">
                <div className="flex justify-between items-center gap-2">
                    <Image src={teacherImg2} alt="teacher-image" width={36} height={36} />
                    <div className='flex justify-between items-center w-full'>
                        <div>
                            <h3
                                className={cn('text-base text-gray1 ', poppins_500.className)}
                            >
                                {name}
                            </h3>
                            <p className={cn('text-xs text-gray3', poppins_400.className)}>
                                Assigned to {subjectAssignedTo}
                            </p>
                        </div>

                    </div>

                    <CancelDrawerIcon />

                </div>
            </div>
        </div>
    )
}
