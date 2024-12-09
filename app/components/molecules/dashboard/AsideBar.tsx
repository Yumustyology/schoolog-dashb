'use client';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

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

const items = [
  {
    title: 'Dashboard',
    url: '/student',
    icon: <Dashboard />, // Ensure the icon is rendered as a component
  },
  {
    title: 'Subjects',
    url: '/student/subjects',
    icon: <Subjects />,
  },
  {
    title: 'Materials',
    url: '/student/materials',
    icon: <Material />,
  },
  {
    title: 'Timetable',
    url: '/student/timetable',
    icon: <Timetable />,
  },
  {
    title: 'Attendance',
    url: '/student/attendance',
    icon: <Attendance />,
  },
  {
    title: 'Library',
    url: '/student/library',
    icon: <Library />,
  },
  {
    title: 'Message',
    url: '/student/message',
    icon: <Message />,
  },
  {
    title: 'Announcement',
    url: '/student/announcement',
    icon: <Annoucement />,
  },
  {
    title: 'Activities',
    url: '/student/activities',
    icon: <Activities />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="w-64 h-screen border-none bg-white">
      <SidebarHeader className="py-4 px-6 bg-white">
        <h1 className="text-2xl font-bold text-center text-black">Edu Share</h1>
      </SidebarHeader>

      <SidebarContent className="py-2 px-4  h-full overflow-y-scroll scrollbar-hidden bg-white ">
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="py-5 rounded-full" asChild>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-4 px-4 py-2 text-sm  ${
                      pathname === item.url
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray2  '
                    } transition-colors duration-200`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>{' '}
                    {/* Hide title on small screens */}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <div className="border-b border-gray2 border h-0 my-2"> </div>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <Logout />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className=" bg-white ">
        <div className="bg-[#E5E5EA] rounded-full  py-2 text-center px-4 mx-4 my-2">
          <SwitchDemo />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export function SwitchDemo() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Label
        htmlFor="darkMode"
        className={cn('text-sm text-[#4f4f4f]', Inter_500.className)}
      >
        Dark mode{' '}
      </Label>

      <Switch id="airplane-mode" className="bg-primary" />
    </div>
  );
}
