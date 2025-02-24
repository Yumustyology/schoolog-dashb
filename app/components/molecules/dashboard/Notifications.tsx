// 'use client'
// import React, { useState } from 'react'
// import { DrawerSide } from './DrawerSide'
// import NotificationIcon from '../../atoms/icons/dashboard/NotificationIcon'
// import PaymentIcon from '../../atoms/icons/dashboard/SideBar/PaymentIcon'
// import TimeIcon from '../../atoms/icons/TimeIcon'
// import Link from 'next/link'
// import ArrowRightIcon from '../../atoms/icons/ArrowRightIcon'
// import ArrowRightIcon2 from '../../atoms/icons/ArrowRightIcon2'
// import { cn } from '@/lib/utils'
// import { Inter_500, poppins_400 } from '@/app/lib/config/font.config'

// type NotificationsProp = {
//     id: number,
//     title: string,
//     time: string,
//     link?: string

// }[]

// const notifications = [
//     {
//         id: 1,
//         title: '2024 School fees paid🎉',
//         time: 'Today 11:30 AM',
//         link: '/meeting-details/123',

//     },
//     {
//         id: 2,
//         title: 'Biology class is happening in 10 minutes’ time ',
//         time: 'Today 12:00 PM',
//         link: '/meeting-details/123',
//     },
//     {
//         id: 3,
//         title: 'Class Announcement',
//         time: '1:00 PM',
//         link: '/class-announcement/456',
//     },
//     {
//         id: 4,
//         title: 'Biology class is happening in 10 minutes’ time ',
//         time: 'Today 12:00 PM',
//         link: '/meeting-details/123',
//     },

// ]
// function Notifications() {
//     const [open, setOpen] = useState(false);
//     const [isNotifications, setIsNotifications] = useState(notifications)

//     const openDrawer = () => setOpen(true);
//     const closeDrawer = () => setOpen(false);
//     return (
//         <div>
//             <button className="h-10 w-10 rounded-full bg-[#F7F7F8] flex items-center justify-center relative" onClick={() => { setOpen(!open) }}>
//                 <span className="absolute animate-ping h-full w-full rounded-full bg-sky-400 opacity-75"></span>
//                 <NotificationIcon />
//             </button>

//             <DrawerSide open={open} close={closeDrawer} title="Notifications">
//             {
//               isNotifications ?
//                 {notifications.map((notification) => (
//                     <div key={notification.id} className='px-6 pt-4'>
//                         <div className='border-b flex items-center gap-4 pb-4'>
//                             <div className='bg-gray2 h-12 w-14 rounded-full flex justify-center items-center'>
//                                 <PaymentIcon />
//                             </div>
//                             <div className='flex justify-between items-center w-full'>

//                                 <div>
//                                     <h3 className={cn('text-sm text-gray1 mb-1.5', Inter_500.className )}>{notification.title}</h3>
//                                     <div className='flex items-center gap-1'>
//                                         <TimeIcon />
//                                         <span className={cn('text-xs text-gray6', poppins_400.className)}>{notification.time}</span>
//                                     </div>
//                                 </div>
//                                 <Link href='./'>
//                                     <ArrowRightIcon2/>
//                                 </Link>
//                             </div>
//                         </div>

//                     </div>
//                 ))}

//             :
//             }

//             </DrawerSide>

//         </div>
//     )
// }

// export default Notifications

'use client';
import React, { useState } from 'react';
import { DrawerSide } from './DrawerSide';
import NotificationIcon from '../../atoms/icons/dashboard/NotificationIcon';
import TimeIcon from '../../atoms/icons/TimeIcon';
import Link from 'next/link';
import ArrowRightIcon2 from '../../atoms/icons/ArrowRightIcon2';
import { cn } from '@/lib/utils';
import {
  Inter_500,
  Inter_600,
  poppins_400,
} from '@/app/lib/config/font.config';
import NotificationBigIcon from '../../atoms/icons/ModalIcons/NotificationBigIcon';
import PaymentIcon from '../../atoms/icons/SideBar/PaymentIcon';

type NotificationsProp = {
  id: number;
  title: string;
  time: string;
  link?: string;
}[];

const notifications: NotificationsProp = [
  {
    id: 1,
    title: '2024 School fees paid🎉',
    time: 'Today 11:30 AM',
    link: '/meeting-details/123',
  },
  {
    id: 2,
    title: 'Biology class is happening in 10 minutes’ time ',
    time: 'Today 12:00 PM',
    link: '/meeting-details/123',
  },
  {
    id: 3,
    title: 'Class Announcement',
    time: '1:00 PM',
    link: '/class-announcement/456',
  },
  {
    id: 4,
    title: 'Biology class is happening in 10 minutes’ time ',
    time: 'Today 12:00 PM',
    link: '/meeting-details/123',
  },
];

function Notifications() {
  const [open, setOpen] = useState(false);

  // const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      <button
        className="h-10 w-10 rounded-full bg-[#F7F7F8] flex items-center justify-center relative"
        onClick={() => setOpen(!open)}
      >
        <span className="absolute animate-ping h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <NotificationIcon />
      </button>

      <DrawerSide open={open} close={closeDrawer} title="Notifications">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="px-6 pt-4">
              <div className="border-b flex items-center gap-4 pb-4">
                <div className="bg-gray2 h-12 w-14 rounded-full flex justify-center items-center">
                  <PaymentIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h3
                      className={cn(
                        'text-sm text-gray1 mb-1.5',
                        Inter_500.className
                      )}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <TimeIcon />
                      <span
                        className={cn(
                          'text-xs text-gray6',
                          poppins_400.className
                        )}
                      >
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  <Link href={notification.link || '#'}>
                    <ArrowRightIcon2 />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full h-screen">
            <div className="flex flex-col justify-center items-center text-center mx-auto">
              <NotificationBigIcon />
              <h1
                className={cn(
                  'mt-8 mb-3 text-xl text-gray1',
                  Inter_600.className
                )}
              >
                No notification
              </h1>
              <p className={cn('text-sm text-gray', Inter_500.className)}>
                You will be notified here about all your activities on the app
              </p>
            </div>
          </div>
        )}
      </DrawerSide>
    </div>
  );
}

export default Notifications;
