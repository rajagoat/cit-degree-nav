import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const sidebarStateCookie = cookieStore.get("sidebar_state");
    const defaultOpen = sidebarStateCookie ? sidebarStateCookie.value === "true" : true;

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}