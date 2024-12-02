import { poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'

export const Button = ({ name }: { name: string }) => {
    return (
        <div className={cn('w-full text-center bg-primary py-3 rounded-full', poppins_500.className)}>
            <button className='text-white' >{name}</button>
        </div>
    )
}
