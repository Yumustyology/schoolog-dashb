import { cookies } from 'next/headers';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/molecules/dashboard/AsideBar';
import Search from '@/app/components/atoms/Search';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    // <SidebarProvider defaultOpen={defaultOpen}>

    //   <AppSidebar />

    //   <main className="w-full pl-2">
    //     <div className="w-full bg-white py-3">
    //       <div className="flex items-center justify-between">
    //         {/* Sidebar Trigger (Hamburger Menu or Button) */}
    //         <SidebarTrigger />
    //         {/* Search Bar */}
    //         <Search placeholderName="Search projects, users and resources" />
    //       </div>
    //     </div>

    //     {/* Main Content Wrapper */}
    //     <div className="p-6 h-full bg-[#F8F8F8]">
    //       {children}
    //     </div>
    //   </main>

    // </SidebarProvider>


    // <SidebarProvider defaultOpen={defaultOpen}>
    //   <main className='max-w-screen-xl mx-auto flex'>
    //     <AppSidebar />
    //     <main className="w-screen pl-2">
    //       <div className=" w-full bg-white py-3">
    //         <div className="flex  items-center">
    //           <SidebarTrigger />
    //           <Search placeholderName="Search projects, users and resources" />
    //         </div>
    //       </div>
    //       <div className="p-6 h-full bg-[#F8F8F8]">{children}</div>
    //     </main>
    //   </main>
    // </SidebarProvider>

    <SidebarProvider defaultOpen={defaultOpen}   >
      <main className='max-w-screen-xl mx-auto flex'>

        <div>
          <AppSidebar />
        </div>



        <main className=" flex-1 w-full pl-2">
          <div className="w-full bg-white py-3">
            <div className="flex items-center justify-between">

              <SidebarTrigger />

              <Search placeholderName="Search projects, users and resources" />
            </div>
          </div>


          <div className="p-6 h-full bg-[#F8F8F8]">
            {children}
          </div>
        </main>
      </main>
    </SidebarProvider>

  );
}
