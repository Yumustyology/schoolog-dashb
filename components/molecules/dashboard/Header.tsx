'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React, { useState } from 'react';
import SearchInput from '../../atoms/form/SearchInput';
import NotificationIcon from '../../atoms/icons/dashboard/NotificationIcon';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import TextAvatar from '@/components/atoms/TextAvatar';
import { cn } from '@/app/lib/utils';
import {
  Inter_500,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import DownArrow from '../../atoms/icons/dashboard/DownArrow';
import ProfileIcon from '../../atoms/icons/ProfileIcon';
import LogoutIcon from '../../atoms/icons/LogoutIcon';
import Ripples from 'react-ripples';
import { DrawerSide } from './DrawerSide';
import NotificationItem, { NotificationItemProps } from './NotificationItem';
import Link from 'next/link';
import LogoutModal from '../LogoutModal';
import NotificationBigIcon from '../../atoms/icons/ModalIcons/NotificationBigIcon';
import { truncateText } from '@/app/lib/utils/truncate';
import { profileState } from '@/app/lib/entities/profile.entity';

const notifications: NotificationItemProps[] = [
  // {
  //   type: 'message',
  //   image: teacherImg2,
  //   title: 'Muhammad Jamiu just messaged you',
  //   time: 'Today at 9:20 AM',
  // },
  // {
  //   type: 'class',
  //   image: biology1,
  //   title: "Biology class is happening in 10 minutes' time",
  //   time: 'Today at 8:20 AM',
  // },
  // {
  //   type: 'result',
  //   title: 'Your 2024 result is available',
  //   time: 'Today at 9:20 AM',
  // },
  // {
  //   type: 'announcement',
  //   title: 'Midterm break announcement',
  //   time: 'Today at 8:20 AM',
  // },
  // {
  //   type: 'payment',
  //   title: '2024 School fees paid! 🎉',
  //   time: 'Today at 9:20 AM',
  // },
  // {
  //   type: 'result',
  //   title: 'Your 2024 result is available',
  //   time: 'Today at 9:20 AM',
  // },
  // {
  //   type: 'announcement',
  //   title: 'Midterm break announcement',
  //   time: 'Today at 8:20 AM',
  // },
  // {
  //   type: 'class',
  //   image: biology1,
  //   title: "Biology class is happening in 10 minutes' time",
  //   time: 'Today at 8:20 AM',
  // },
];

function Header() {
  const [notificationDrawer, setNotificationDrawer] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex  items-center w-2/4">
          <SidebarTrigger />
          <SearchInput
            className="border h-[38px] bg-[#F9FAFB] ml-8 border-gray4 max-w-96"
            placeholder="Search projects, users and resources"
          />
        </div>
        <div className="flex items-center gap-6 mr-4">
          <div className="cursor-pointer h-10 w-10 rounded-full bg-[#F7F7F8] flex items-center justify-center relative">
            <span className="absolute top-1 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EB5757]  opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EB5757] "></span>
            </span>
            <div className="overflow-hidden h-10 w-10 rounded-full">
              <Ripples
                onClick={() => setNotificationDrawer(true)}
                className="h-10 w-10 flex items-center justify-center"
              >
                <NotificationIcon />
              </Ripples>
            </div>
          </div>
          <div>
            <ProfileMenu />
          </div>
        </div>
      </div>

      <DrawerSide
        open={notificationDrawer}
        close={() => setNotificationDrawer(false)}
        title="Notifications"
        className="w-[472px]"
      >
        <div className="p-6 overflow-y-auto sidebar-scroll max-h-[calc(100vh-140px)]">
          {notifications.length > 0 ? (
            <div className="">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  type={notification.type}
                  title={notification.title}
                  time={notification.time}
                  image={notification.image}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full h-[25rem]">
              <div className="flex flex-col justify-center items-center text-center mx-auto h-full my-auto">
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
        </div>
      </DrawerSide>
    </>
  );
}

export default Header;

const HeaderInfo = ({ truncateLength = 0 }: { truncateLength?: number }) => {
   const profile = profileState.use();
  return (
  <>
    <div>
      <TextAvatar
        firstName={profile.firstName}
        lastName={profile.lastName}
        size={32}
        className="cursor-pointer"
      />
    </div>

    <div className="flex flex-col gap-1">
      <h3 className={cn('text-gray1 text-sm truncate', poppins_500.className)}>
        {truncateLength
          ? truncateText(profile.firstName + ' ' + profile.lastName, truncateLength)
          : profile.firstName + ' ' + profile.lastName}
      </h3>
      <p className={cn('text-gray text-xs', poppins_500.className)}>{profile.audience}</p>
    </div>
  </>
);
}

export function ProfileMenu() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex h-[48px] items-center gap-3 rounded-[90px] bg-[#F7F7F8] p-2">
            <HeaderInfo truncateLength={8} />
            <div className="flex h-[48px] items-center">
              <DownArrow />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={6} className="bg-white p-0 pb-2">
          <div className="rounded-none flex items-center gap-2 px-3 pt-2">
            <HeaderInfo truncateLength={0} />
          </div>
          <hr className="border border-gray4 w-full" />
          <div className="px-2 border-none outline-none">
            <Link
              href="/student/settings"
              className="mt-1.5 flex items-center gap-2 px-1.5 py-2 rounded-md hover:bg-gray4 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ProfileIcon />
              <h2
                className={cn(
                  'font-medium text-gray1 text-sm',
                  poppins_400.className
                )}
              >
                View Profile
              </h2>
            </Link>
          </div>

          <div className="px-2 border-none outline-none">
            <button
              type="button"
              className="flex items-center gap-2 px-1.5 py-2 w-full text-left rounded-md hover:bg-gray4 transition-colors"
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
            >
              <LogoutIcon />
              <h2
                className={cn(
                  'font-medium text-[#EB5757] text-sm',
                  poppins_400.className
                )}
              >
                Logout
              </h2>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <LogoutModal
        open={isLogoutModalOpen}
        close={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
