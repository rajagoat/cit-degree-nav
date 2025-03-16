import { Home, FlagTriangleLeft, ListChecks, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Remaining Courses",
    url: "/remaining-courses",
    icon: FlagTriangleLeft,
  },
  {
    title: "Completed Courses",
    url: "/completed-courses",
    icon: ListChecks,
  },
]

export function AppSidebar() {

  return (
    <Sidebar variant="floating" >
      <h1 className="text-white text-3xl font-semibold text-center py-2">
        Navigation
      </h1>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="bg-white text-[#3A6072]">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild className="bg-white text-[#A31621] font-bold mb-3 px-3">
          <Link href={`/login`}>
            <LogOut />
            <span>{`Sign Out`}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
