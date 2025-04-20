import { teacherImg2 } from '@/app/assets'
import { Inter_400 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'

function ImageOptionBox({name, img, role}: {name: string, img?: string, role?: string}) {
    return (
        <div className='flex gap-4 w-full'>
            <Image className='w-9 h-9' src={teacherImg2} alt='teacher' />
            <div className=''>
                <h1 className={cn('text-base text-gray1', Inter_400.className)}>{name}</h1>
                {role ? <p className={cn('text-xs text-gray3 ', Inter_400.className)}>Assigned to {role}</p>
                    : <p className={cn('text-xs text-gray3 ', Inter_400.className)}> No assigned subject </p>
                }
            </div>
        </div>
    )
}
export default ImageOptionBox