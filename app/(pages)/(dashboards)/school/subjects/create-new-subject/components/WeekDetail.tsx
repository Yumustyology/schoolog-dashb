import Button from '@/app/components/atoms/form/Button'
import { CloseIcon, DragIcon, EditIcon } from '@/app/components/atoms/icons/Icons'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/lib/utils'
import React from 'react'
// { state }: { state: {}[] }

interface WeekProps {
    week: {
        id: number;
        week: number;
        topic: string;
        brief: string;
    };
    handleRemoveWeek: (id: number) => void; // Accept the delete function
    handleEditWeek: (week: { id: number; week: number; topic: string; brief: string }) => void;
}

function WeekDetail({ week, handleRemoveWeek, handleEditWeek }: WeekProps) {
    console.log(week)
    return (
        <div className='flex items-center gap-4 w-full pr-4'>
            <div className='bg-[#f8f8f8] border border-gray4 rounded-[8px] my-4 p-3 w-full flex items-center gap-2'>
                <Button className='bg-transparent p-2'>
                    <DragIcon />
                </Button>
                <div>
                    <h3 className={cn('text-sm mb-1', poppins_500.className)}>
                        {week.topic}
                        {/* Atomic nature and its fundamentals */}
                    </h3>
                    <p className={cn('text-xs text-gray', poppins_400.className)}>
                        Week {week.week}
                    </p>
                </div>
            </div>

            <div className='flex gap-2'>
                <Button className='bg-gray10 bg-opacity-10 rounded-full p-1.5' onClick={() => handleEditWeek(week)} >
                    <EditIcon color='#001F3F' size={14} />
                </Button>

                <Button className='bg-[#EB57570F] bg-opacity-5 rounded-full p-1.5' onClick={() => handleRemoveWeek(week.id)}>
                    <CloseIcon />
                </Button>
            </div>
        </div>
    )
}

export default WeekDetail

