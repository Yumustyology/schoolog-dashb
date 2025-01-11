import Dot from '@/app/components/atoms/dashboard/subjects/Dot'
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon'
import WordIcon from '@/app/components/atoms/icons/dashboard/materials/Word'
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'
type MaterialsProps = {
    type: string,
    icon: React.ReactNode,
    name: string,
    size: string,
    date: string,
  }

function Materials({...material}: MaterialsProps) {
    return (
        <div className='w-[180px] p-3 rounded-[12px] bg-white flex flex-col justify-center gap-4 relative'>
            { material.type === 'material' &&
                <div className='absolute top-2 right-3 h-[30px] w-[30px] flex justify-center items-center bg-[#F5F5F5]  rounded-full'>
                <DownloadIcon />
            </div>
            }
            <div className='mx-auto'>
                {material.icon}
                {/* <WordIcon /> */}
            </div>
            <div className={cn('text-black1 text-center text-sm ', Inter_500.className)}>
               <h3> {material.name} </h3>
                {/* <h3> Indices and its equations folder </h3> */}
            </div>
            <p className={cn('text-gray mx-auto text-xs flex items-center gap-4 mb-0', poppins_400.className)}> 706KB <Dot size={1} /> 28/03/2024</p>
        </div>
    )
}

export default Materials