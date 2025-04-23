'use client'
import React from 'react'
import Button from '../../form/Button'
import { cn } from '@/app/lib/utils'
import { Inter_400, poppins_500 } from '@/app/lib/config/font.config'
import MenuLists from '../students/MenuLists'
import { DeleteIcon, EditIcon, ViewProfileEyeIcon } from '../../icons/Icons'
import AnnoucementSideDrawer from '@/components/molecules/dashboard/announcement/AnnoucementSideDrawer'


const menuItems = [
    { label: "View details", onClick: () => console.log("Profile clicked"), icon: <ViewProfileEyeIcon /> },
    { label: "Edit details", onClick: () => console.log("Profile clicked"), icon: <EditIcon /> },
    { label: "Delete", onClick: () => console.log("Settings clicked"), icon: <DeleteIcon /> },
]
const Announcement = ({ announcement, type }: { announcement: { headline: string, content: string, date: string }, type?: 'school' }) => {
    const [openAnnoucementDrawer, setopenAnnoucementDrawer] = React.useState(false)
    
    const handleOpenDrawer = () =>{
        setopenAnnoucementDrawer(true)
    }

    const handleCloseDrawer = ()=>{
        setopenAnnoucementDrawer(false)
        console.log(openAnnoucementDrawer)
    }
    return (
        <Button
            wide
            onClick={handleOpenDrawer}
            childrenClassName="w-full !justify-between items-start gap-8"
            className="!justify-start text-left items-start flex p-3 bg-[#F8F8F8] border border-[#E5E5EA] rounded-md"
            key={announcement.date}
        >
            <div>
                <h2 className={cn('text-sm text-gray1', poppins_500.className)}>
                    {announcement.headline}
                </h2>
                <p
                    className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}
                >
                    {announcement.content}
                </p>
            </div>
            <div className='flex flex-col justify-end  items-end'>
                <p
                    className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}
                >
                    {announcement.date}
                </p>
                {type === 'school' &&

                    <div className='mt-3'>
                        <MenuLists label="Options" items={menuItems} placement="bottom-start" maxHeight="150px" />
                    </div>
                }
            </div>
            <AnnoucementSideDrawer open={openAnnoucementDrawer} closeDrawer={handleCloseDrawer}/>
        </Button>
    )
}

export default Announcement