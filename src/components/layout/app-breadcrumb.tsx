"use client"

import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/activity": "Activity Feed",
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  const label = routeLabels[pathname] ?? pathname.split("/").filter(Boolean).pop() ?? "Home"

  return (
    <div className="flex items-center gap-2 text-sm">
      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
      <span className="text-muted-foreground hidden md:block">Opsboard</span>
      <ChevronRight className="text-muted-foreground hidden md:block size-4" />
      <span className="font-medium">{label}</span>
    </div>
  )
}
