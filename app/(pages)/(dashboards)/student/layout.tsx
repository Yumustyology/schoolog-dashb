import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/molecules/dashboard/AsideBar"
import Search from "@/app/components/atoms/Search"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-screen h-screen pl-2 bg-[#F8F8F8] ">
                <div className=" w-full bg-white py-3">
                    <div className="flex  items-center">

                        <SidebarTrigger />
                        <Search placeholderName="Search projects, users and resources" />

                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}

