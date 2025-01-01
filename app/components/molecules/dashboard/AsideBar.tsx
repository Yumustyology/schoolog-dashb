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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import ModeSwitch from '../../organisms/ModeSwitch';
import Result from '../../atoms/icons/dashboard/SideBar/Result';

const items = [
  {
    title: 'Dashboard',
    url: '/student/',
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
    icon: <Result/>,
    activeIcon: <Result color="#FFFFFF" size="17" />,
  },
  {
    title: 'Payments',
    url: '/student/payments',
    icon: <Result/>,
    activeIcon: <Result color="#FFFFFF" size="17" />,
  },
];
export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="h-screen w-64 border-none bg-white">
      <SidebarHeader className="py-4 px-6 bg-white">
        <h1 className="text-sm font-bold text-center text-black">Edu Share</h1>
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
                    {pathname === item.url ? (
                      <div>{item.activeIcon}</div>
                    ) : (
                      <div>{item.icon}</div>
                    )}
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

      {/* <SidebarFooter className="bg-white">
        <div className=" border border-[#E5E5EA] rounded-full text-center px-4 mx-4 h-[48px] flex justify-between items-center">
          <p className={cn('text-sm flex-shrink-0',Inter_500.className)}>Dark mode</p>
          <ModeSwitch className='scale-[.3] w-min float-left text-gray-6'/>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}

// export function SwitchDemo() {
//   return (
//     <div className="flex items-center justify-center space-x-2">
//       <Label
//         htmlFor="darkMode"
//         className={cn('text-sm text-[#4f4f4f]', Inter_500.className)}
//       >
//         Dark mode{' '}
//       </Label>

//       <Switch id="airplane-mode" className="bg-primary" />
//     </div>
//   );
// }
