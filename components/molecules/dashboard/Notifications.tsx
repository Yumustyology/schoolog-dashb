'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import { DrawerSide } from './DrawerSide';
import NotificationIcon from '../../atoms/icons/dashboard/NotificationIcon';
import TimeIcon from '../../atoms/icons/TimeIcon';
import { cn } from '@/app/lib/utils';
import { Inter_500, Inter_600, poppins_400 } from '@/app/lib/config/font.config';
import NotificationBigIcon from '../../atoms/icons/ModalIcons/NotificationBigIcon';
import PaymentIcon from '../../atoms/icons/SideBar/PaymentIcon';
import notificationsActions, {
  NotificationStatus,
} from '@/app/lib/actions/notifications.action';
import { formatRelativeTime } from '@/app/lib/utils/dateUtils';

function Notifications() {
  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  const { data: resp, isLoading } = useSWR(
    open ? ['notifications', NotificationStatus.SENT] : null,
    () => notificationsActions.fetchNotifications(NotificationStatus.SENT)
  );

  const notifications = (resp?.data || []).map((n) => ({
    id: n._id,
    title: n.title,
    time: formatRelativeTime(n.sentAt || n.createdAt),
  }));

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
        {isLoading ? (
          <div className="px-6 pt-4 flex flex-col gap-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 rounded-md bg-gray4" />
            ))}
          </div>
        ) : notifications.length > 0 ? (
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
