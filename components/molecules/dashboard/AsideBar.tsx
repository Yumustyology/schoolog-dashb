'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import Logout from '../../atoms/icons/SideBar/Logout';
import { schoolState } from '@/app/lib/entities/school.entity';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Settings from '../../atoms/icons/SideBar/Settings';
import { ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { studentSidebarItems, shoolSidebarItems, teacherSidebarItems } from '@/app/lib/sidebarData';

export function AppSidebar({
  type,
}: {
  type: 'school' | 'student' | 'teacher' | 'parent';
}) {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();
  const cleanedPath = pathname.replace(/\/$/, '');

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const submenuRefs = useRef<Record<string, HTMLUListElement | null>>({});

  // get persisted school entity synchronously to avoid flash
  const currentSchool = schoolState.use();

  const resolveImage = React.useCallback((s?: typeof currentSchool) => {
    try {
      // prefer tenant cache in cookie or localStorage for fastest startup
      if (typeof window !== 'undefined') {
        const match = document.cookie.match(/(?:^|; )schoolog_logo=([^;]*)/);
        if (match && match[1]) {
          const cookieVal = decodeURIComponent(match[1]);
          if (cookieVal) return cookieVal;
        }

        const raw = window.localStorage.getItem('schoolog:tenantSchool');
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as Record<string, unknown> | null;
            const img = (parsed?.['schoolImage'] || parsed?.['image'] || parsed?.['logo']) as string | undefined | null;
            if (img) return typeof img === 'string' && img.startsWith('http') ? img : `${window.location.origin}${img}`;
          } catch {
            // ignore
          }
        }
      }

      const fallbackKeys = ['schoolImage', 'image', 'logo'];
      for (const k of fallbackKeys) {
        const v = (s as Record<string, unknown> | undefined)?.[k];
        if (typeof v === 'string' && v.length > 0) {
          return v.startsWith('http') ? v : `${typeof window !== 'undefined' ? window.location.origin : ''}${v}`;
        }
      }
    } catch {
      // ignore
    }
    return null;
  }, []);

  const [logoUrl, setLogoUrl] = useState<string | null>(() =>
    resolveImage(currentSchool as unknown as typeof currentSchool)
  );

  // update logo when persisted entity changes
  React.useEffect(() => {
    const url = resolveImage(currentSchool as unknown as typeof currentSchool);
    if (url) setLogoUrl(url);
  }, [currentSchool, resolveImage]);

  const toggleMenu = (title: string, arg?: boolean) => {
    setOpenMenus((prev) => {
      const newState = { ...prev, [title]: arg ?? !prev[title] };

      if (newState[title]) {
        setTimeout(() => {
          submenuRefs.current[title]?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 100);
      }

      return newState;
    });
  };

  return (
    <Sidebar collapsible="icon" className="h-screen w-64 border-none bg-white">
      <SidebarHeader className={cn("py-5 px-6 bg-white")}>
        {state === 'expanded' ? (
          logoUrl ? (
            <Image alt="school-logo" className="object-contain mx-auto" src={logoUrl} width={150} height={37} priority />
          ) : (
            <Image alt="full-logo" src={'/schoolog-full-logo.svg'} width={200} height={37} priority />
          )
        ) : (
          logoUrl ? (
            <Image alt="school-icon" src={logoUrl} height={80} width={80} className="object-contain" priority />
          ) : (
            <Image alt="icon-logo" src={'/schoolog-logo.svg'} height={80} width={80} priority />
          )
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full bg-white">
        <div
          className={cn(
            'flex-grow mt-5 overflow-y-scroll lg:overflow-y-auto lg:scrollbar-hidden sidebar-scroll',
            state == 'expanded' ? 'px-5' : 'px-3'
          )}
        >
          <SidebarGroup>
            <SidebarMenu className="flex flex-col gap-3">
              {(type == 'student'
                ? studentSidebarItems
                : type == 'school'
                  ? shoolSidebarItems
                  : type == 'teacher'
                    ? teacherSidebarItems
                    : []
              ).map((item) => {
                const isRootDashboard =
                  item.url === `/${type}` ||
                  item.url === '/school' ||
                  item.url === '/student' ||
                  item.url === '/teacher';

                const isActive =
                  cleanedPath === item.url ||
                  (!isRootDashboard &&
                    Boolean(item.url) &&
                    cleanedPath.startsWith(`${item.url}/`)) ||
                  item.subItems?.some(
                    (sub) =>
                      cleanedPath === sub.url ||
                      cleanedPath.startsWith(`${sub.url}/`)
                  );
                return (
                  <SidebarMenuItem className="w-full" key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        'py-5 rounded-full text-gray3',
                        isActive
                          ? 'hover:bg-primary bg-primary text-white hover:text-white'
                          : 'hover:bg-gray2 hover:text-gray3 '
                      )}
                      asChild
                    >
                      <Link
                        href={item?.url || '#'}
                        onClick={() => {
                          if (item?.subItems?.length) {
                            setOpen(true);
                            if (state == 'expanded') {
                              toggleMenu(item.title);
                            } else {
                              toggleMenu(item.title, true);
                            }
                          }
                        }}
                        className={cn(
                          `flex items-center justify-between px-4 py-2 text-sm transition-colors duration-200`,
                          Inter_500.className
                        )}
                      >
                        <div
                          className={cn(
                            `flex items-center gap-3`,
                            Inter_500.className
                          )}
                        >
                          {isActive ? (
                            <div>{item.activeIcon}</div>
                          ) : (
                            <div>{item.icon}</div>
                          )}
                          <span className="text-sm">{item.title}</span>
                        </div>
                        {item?.subItems && (
                          <button className="transition-transform">
                            <ChevronUp
                              className={cn(
                                'w-4 h-4 transition-transform duration-200',
                                openMenus[item.title] ? 'rotate-180' : ''
                              )}
                            />
                          </button>
                        )}
                      </Link>
                    </SidebarMenuButton>

                    {item.subItems && openMenus[item.title] && (
                      <SidebarMenuSub
                        ref={(el) => {
                          submenuRefs.current[item.title] = el;
                        }}
                        className="ml-6 mt-2 "
                      >
                        {item.subItems.map((subItem) => {
                          const isSubActive = cleanedPath == subItem?.url;
                          console.log(isSubActive);
                          console.log('cleanedPath ', cleanedPath);
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    'flex items-center gap-2 px-4 py-2 text-sm rounded-lg',
                                    isSubActive
                                      ? '!text-primary'
                                      : 'hover:bg-gray-200'
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
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
                  cleanedPath === `/${type}/settings`
                    ? 'hover:bg-primary bg-primary text-white hover:text-white'
                    : 'hover:bg-gray2 hover:text-gray3 '
                )}
                asChild
              >
                <Link href={`/${type}/settings`}>
                  {cleanedPath === `/${type}/settings` ? (
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
