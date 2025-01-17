'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import SearchInput from '../../atoms/form/SearchInput'
import NotificationIcon from '../../atoms/icons/dashboard/NotificationIcon'
// import {
//     Tab,
//     TabPanel,
//     Tabs,
//     TabsBody,
//     TabsHeader,
//     Typography,
//   } from '@material-tailwind/react';

function Header() {
    return (
        <div className='flex items-center justify-between'>
            <div className="flex  items-center w-2/4">
                <SidebarTrigger />
                <SearchInput placeholder="Search projects, users and resources" />

            </div>
            <div className='flex items-center gap-6 mr-4'>
               <Notifications/>


                <div>


                    <ProfileMenu />
                </div>
            </div>
        </div>
    )
}

export default Header


import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { cn } from '@/lib/utils'
import { Inter_500, Inter_600 } from '@/app/lib/config/font.config'
import DownArrow from '../../atoms/icons/dashboard/DownArrow'
import ProfileIcon from '../../atoms/icons/dashboard/ProfileIcon'
import Logout from '../../atoms/icons/dashboard/SideBar/Logout'
import Notifications from './Notifications'

export function ProfileMenu() {
    return (
        <Menu placement='bottom-start'>

            <div className='flex items-center  gap-3 rounded-[90px] bg-[#F7F7F8] p-2'>
                <div>

                    <Avatar
                        variant="circular"
                        alt="tania andrew"
                        className="cursor-pointer"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <h3 className={cn('text-gray1 text-sm ', Inter_600.className)}>
                        Muhammad Jamiu
                    </h3>
                    <p className={cn('text-gray text-xs', Inter_600.className)}>Admin</p>
                </div>


                <MenuHandler>

                    <button>
                        <DownArrow />

                    </button>
                </MenuHandler>
            </div>
            <MenuList className='w-[300px] h-[200px] mt-9'>
                <MenuItem>
                    <div className='flex items-center  gap-3'>
                        <div>
                            <Avatar
                                variant="circular"
                                alt="tania andrew"
                                className="cursor-pointer"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h3 className={cn('text-gray1 text-sm ', Inter_600.className)}>
                                Muhammad Jamiu
                            </h3>
                            <p className={cn('text-gray text-xs', Inter_600.className)}>Admin</p>
                        </div>

                    </div>

                </MenuItem>

                <hr className="my-2 border-blue-gray-50" />

                <MenuItem className="flex items-center gap-2">
                    <ProfileIcon />

                    <Typography variant="small" className="font-medium">
                        View Profile
                    </Typography>
                </MenuItem>
         

                <MenuItem className="flex items-center gap-2 ">
                    <Logout/>
                    <Typography variant="small" className="font-medium text-[#EB5757]">
                        Logout
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}