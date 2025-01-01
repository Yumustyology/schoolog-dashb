'use client';
import { Calendar, Home, Inbox, Search } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  Inter_400,
  Inter_500,
  Inter_800,
  poppins_600,
} from '@/app/lib/config/font.config';
import Dashboard from '../../atoms/icons/dashboard/SideBar/Dashboard';
import Subjects from '../../atoms/icons/dashboard/SideBar/Subjects';
import Material from '../../atoms/icons/dashboard/SideBar/Material';
import Timetable from '../../atoms/icons/dashboard/SideBar/Timetable';
import Attendance from '../../atoms/icons/dashboard/SideBar/Attendance';
import Message from '../../atoms/icons/dashboard/SideBar/Message';
import Annoucement from '../../atoms/icons/dashboard/SideBar/Annoucement';
import Activities from '../../atoms/icons/dashboard/SideBar/Activities';
import Logout from '../../atoms/icons/dashboard/SideBar/Logout';
import { usePathname } from 'next/navigation';
import Library from '../../atoms/icons/dashboard/SideBar/Library';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Result from '../../atoms/icons/dashboard/SideBar/Result';
import Image from 'next/image';
import Settings from '../../atoms/icons/dashboard/SideBar/Settings';

const items = [
  {
    title: 'Dashboard',
    url: '/student',
    icon: <Dashboard />,
    activeIcon: <Dashboard color="#FFFFFF" size="17" />,
  },
  {
    title: 'Subjects',
    url: '/student/subjects',
    icon: <Subjects />,
    activeIcon: <Subjects color="#FFFFFF" size="17" />,
  },
  {
    title: 'Materials',
    url: '/student/materials',
    icon: <Material />,
    activeIcon: <Material color="#FFFFFF" size="17" />,
  },
  {
    title: 'Timetable',
    url: '/student/timetable',
    icon: <Timetable />,
    activeIcon: <Timetable color="#FFFFFF" size="17" />,
  },
  {
    title: 'Attendance',
    url: '/student/attendance',
    icon: <Attendance />,
    activeIcon: <Attendance color="#FFFFFF" size="17" />,
  },
  {
    title: 'Library',
    url: '/student/library',
    icon: <Library />,
    activeIcon: <Library color="#FFFFFF" size="17" />,
  },
  {
    title: 'Message',
    url: '/student/message',
    icon: <Message />,
    activeIcon: <Message color="#FFFFFF" size="17" />,
  },
  {
    title: 'Announcement',
    url: '/student/announcements',
    icon: <Annoucement />,
    activeIcon: <Annoucement color="#FFFFFF" size="17" />,
  },
  {
    title: 'Activities',
    url: '/student/activities',
    icon: <Activities />,
    activeIcon: <Activities color="#FFFFFF" size="17" />,
  },
  {
    title: 'Results',
    url: '/student/results',
    icon: <Result />,
    activeIcon: <Result color="#FFFFFF" size="17" />,
  },
  {
    title: 'Payments',
    url: '/student/payments',
    icon: <Result />,
    activeIcon: <Result color="#FFFFFF" size="17" />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="h-screen w-64 border-none bg-white">
      <SidebarHeader className="py-5 px-6 bg-white">
        {state === 'expanded' ? (
          <Image
            alt="full-logo"
            src={'/schoolog-full-logo.svg'}
            width={200}
            height={37}
          />
        ) : (
          <Image
            alt="icon-logo"
            src={'/schoolog-logo.svg'}
            height={80}
            width={80}
          />
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full bg-white">
        <div
          className={cn(
            'flex-grow mt-12 overflow-y-scroll lg:overflow-y-auto lg:scrollbar-hidden sidebar-scroll',
            state == 'expanded' ? 'px-5' : 'px-3'
          )}
        >
          <SidebarGroup>
            <SidebarMenu className="flex flex-col gap-3">
              {items.map((item) => (
                <SidebarMenuItem className="w-full" key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      'py-5 rounded-full text-gray3',
                      pathname === item.url
                        ? 'hover:bg-primary bg-primary text-white hover:text-white'
                        : 'hover:bg-gray2 hover:text-gray3 '
                    )}
                    asChild
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        `flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200`,
                        Inter_500.className
                      )}
                    >
                      {pathname === item.url ? (
                        <div>{item.activeIcon}</div>
                      ) : (
                        <div>{item.icon}</div>
                      )}
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </div>

        <div className="px-5 pb-3 mt-auto">
          <div className="bg-[#EAECF0] border h-[1px] mb-3.5"> </div>
          <SidebarMenu className="flex flex-col">
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  'py-5 rounded-full text-gray3 flex items-center px-4 text-gray-300 hover:bg-gray-700',
                  pathname === '/student/settings'
                    ? 'hover:bg-primary bg-primary text-white hover:text-white'
                    : 'hover:bg-gray2 hover:text-gray3 '
                )}
                asChild
              >
                <Link href="/student/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  'py-5 rounded-full text-gray3 flex items-center px-4 text-gray-300 hover:bg-gray-700 hover:bg-gray2 hover:text-gray3'
                )}
                asChild
              >
                <Link href="/">
                  <Logout />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
