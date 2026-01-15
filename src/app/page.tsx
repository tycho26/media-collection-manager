"use client"

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"

import Link from "next/link"


export default function Home() {


  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader />
        <SidebarContent>
          <SidebarMenu className="px-2">
            <Button asChild variant="default" className="mx-4">
              <Link href="/media/create">New media</Link>
            </Button>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarTrigger/>
    </SidebarProvider>
  );
}
