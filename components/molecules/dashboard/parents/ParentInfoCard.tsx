import { biology1 } from '@/app/assets'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { openMoveModal, openSuspendStudentModal } from '@/app/lib/entities/student.entity'
import { cn } from '@/app/lib/utils'
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo'
import MenuLists from '@/components/atoms/dashboard/students/MenuLists'
import { MoveStudentModal } from '@/components/atoms/dashboard/students/modals/MoveStudentModal'
import { SuspendStudentModal } from '@/components/atoms/dashboard/students/modals/SuspendStudentModal'
import Button from '@/components/atoms/form/Button'
import { GraduateIcon, OptionIcon, PromoteIcon, SuspendIcon } from '@/components/atoms/icons/Icons'
import Message from '@/components/atoms/icons/SideBar/Message'
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon'
import Image from 'next/image'
import React from 'react'


const menuItems = [
    { label: "Move", onClick: () => { openMoveModal }, icon: <PromoteIcon size='24' /> },
    { label: "Graduate", onClick: () => console.log("Profile clicked"), icon: <GraduateIcon /> },
    { label: "Suspend", onClick: () => console.log("More clicked"), icon: <SuspendIcon /> },
    { label: "Withdraw", onClick: () => console.log("Another clicked"), icon: <CancelIcon />, danger: true },
]

export const ParentInfoCard = () => {
    return (
        <div className='bg-white py-6 h-[390px] pb-10 px-6 rounded-md col-span-2 border-none'>

            <div className=" flex justify-between items-center">
                <div className='flex items-center gap-3'>
                    <div>
                        <h1 className={cn('text-sm text-black1', poppins_500.className)}>
                            Adewole Muhammad
                        </h1>
                        <p className={cn('text-sm text-gray3 mt-1.5', poppins_400.className)}>
                            Father
                        </p>
                    </div>
                </div>

                <div className='bg-light text-primary rounded-full py-1 px-6'>
                    Cleared
                </div>


            </div>

            <SingleInfo leftText='email' leftValue='jimohjamiu2000@gmail.com' rightText='Guardian contact' rightValue='08082116547'/>
            <SingleInfo leftText='Students' leftValue='1' rightText='Secondary Guardian' rightValue='Muhammad Jamiu' />
            <SingleInfo leftText='email' leftValue='jimohjamiu2000@gmail.com' rightText='Guardian contact' rightValue='08065076959' />

            <div className=' mt-4'>

                <Button wide round className="h-[45px] bg-light" onClick={openSuspendStudentModal} >
                    <Message color="#21B55A" />
                    <p className={cn("ml-2 text-primary text-base", poppins_500.className)}>Message</p>
                </Button>
                
            </div>
            

        </div>
    )
}


