'use client';

import { useEffect, useState } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/molecules/dashboard/AsideBar';
import Header from '@/components/molecules/dashboard/Header';

export default function LayoutClient({
  children,
  sidebarType,
}: {
  children: React.ReactNode;
  sidebarType: 'school' | 'student' | 'teacher' | 'parent';
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <NextTopLoader
        color="#34AD5D"
        initialPosition={0.09}
        crawlSpeed={100}
        height={3}
        crawl={false}
        showSpinner={false}
        easing="ease"
        speed={100}
        shadow="0 0 10px #34AD5D,0 0 5px #34AD5D"
      />
      <SidebarProvider defaultOpen={isSidebarOpen}>
        <AppSidebar type={sidebarType} />
        <main className="w-screen pl-1">
          <div className="w-full bg-white py-3">
            <Header />
          </div>
          <div className="p-8 h-full bg-[#F8F8F8]">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
