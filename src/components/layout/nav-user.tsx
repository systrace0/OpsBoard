"use client"

import { ChevronsUpDown } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: { name: string; email: string }
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* TODO: wrap SidebarMenuButton with a DropdownMenu for logout, profile, settings actions.
            TODO: replace the initials div with shadcn Avatar for real user photos.
            Install: npx shadcn@latest add dropdown-menu avatar
            Pattern: see sidebar-07 nav-user.tsx for the full implementation */}
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
