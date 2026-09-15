'use client';

import { useEffect, useState } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/molecules/dashboard/AsideBar';
import Header from '@/components/molecules/dashboard/Header';
import { ThemeProvider } from '@/components/organisms/ThemeProvider';
import NextLoader from '@/components/atoms/NextLoader';
import useEnforcePortalAccess from '@/app/lib/hooks/useEnforcePortalAccess';

export default function LayoutClient({
  children,
  sidebarType,
}: {
  children: React.ReactNode;
  sidebarType: 'school' | 'student' | 'teacher' | 'parent';
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEnforcePortalAccess(sidebarType);

  useEffect(() => {
    // Read cookie from `document.cookie`
    const cookies = document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const sidebarState = cookies['sidebar:state'] === 'true';
    setIsSidebarOpen(sidebarState);
  }, []);

  return (
    <>
      <ThemeProvider>
        <NextLoader />
        <SidebarProvider defaultOpen={isSidebarOpen}>
          <AppSidebar type={sidebarType} />
          <SidebarInset>
          <main className="w-full pl-1">
            <div className="w-full bg-white py-3">
              <Header />
            </div>
            <div className="p-4 sm:p-6 md:p-8 h-full bg-[#F8F8F8]">{children}</div>
          </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
