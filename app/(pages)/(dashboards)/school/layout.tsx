import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/molecules/dashboard/AsideBar';
import Header from '@/app/components/molecules/dashboard/Header';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

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
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar type="school" />
        <main className="w-screen pl-1">
          <div className=" w-full bg-white py-3">
            <Header />
          </div>
          <div className="p-8 h-full bg-[#F8F8F8]">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
