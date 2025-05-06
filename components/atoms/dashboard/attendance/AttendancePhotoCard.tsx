import { poppins_400, poppins_600 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'

const AttendancePhotoCard = ({type}: {type: string}) => {
    return (
        <div className='bg-[#FAFAFA] border border-gray4 text-center flex flex-col gap-6 p-6'>
            <Image src='/student.png' alt='' width={100} height={100} className='mx-auto'/>
            <div className='flex flex-col gap-2'>
                <h4 className={cn('text-black text-xl', poppins_600.className)}>Muhammad Jamiu</h4>
                { type === 'teacher' 
                ? <p  className={cn('text-gray6 text-base', poppins_400.className)}>Mathmatics / Assigned to SSS1</p>
                : <p  className={cn('text-gray6 text-base', poppins_400.className)}>SS1 / jimohjamiu2000@gmail.com</p>
            }
            </div>
        </div>
    )
}

export default AttendancePhotoCard