import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import UserHeader from "@/components/user-header"

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()

    const userStateCookie = cookieStore.get("user");
    if (!userStateCookie) {
        redirect("/login")
    }

    const sidebarStateCookie = cookieStore.get("sidebar_state");
    const defaultOpen = sidebarStateCookie ? sidebarStateCookie.value === "true" : true;

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="flex flex-col flex-1 ml-3 mr-5">
                <div className="flex justify-between items-center pt-5">
                    <SidebarTrigger />
                    <UserHeader />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}