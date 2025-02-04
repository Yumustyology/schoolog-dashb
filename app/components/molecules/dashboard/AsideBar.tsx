'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import Logout from '../../atoms/icons/SideBar/Logout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Settings from '../../atoms/icons/SideBar/Settings';
import { shoolSidebarItems, studentSidebarItems } from '@/app/lib/sidebarData';

export function AppSidebar({
  type,
}: {
  type: 'school' | 'student' | 'parent';
}) {
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
              {(type == 'student'
                ? studentSidebarItems
                : type == 'school'
                  ? shoolSidebarItems
                  : []
              ).map((item) => (
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
                  {pathname === '/student/settings' ? (
                    <div>
                      <Settings color="#FFFFFF" />
                    </div>
                  ) : (
                    <div>
                      <Settings />
                    </div>
                  )}

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
