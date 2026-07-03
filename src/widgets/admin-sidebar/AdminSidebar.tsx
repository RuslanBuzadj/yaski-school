"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Activity,
  CalendarDays,
  Image as ImageIcon,
  LayoutDashboard,
  Newspaper,
  Users,
  type LucideIcon,
} from "lucide-react";
import { adminNavItems, routes } from "@/config/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/ui/sidebar";

const icons: Record<string, LucideIcon> = {
  [routes.admin.root]: LayoutDashboard,
  [routes.admin.news]: Newspaper,
  [routes.admin.events]: CalendarDays,
  [routes.admin.activities]: Activity,
  [routes.admin.staff]: Users,
  [routes.admin.gallery]: ImageIcon,
};

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={routes.admin.root}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Адмін панель</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    ЗОШ с. Яські
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map(({ href, label }) => {
                const Icon = icons[href] ?? LayoutDashboard;
                const isActive =
                  href === routes.admin.root
                    ? pathname === href
                    : pathname?.startsWith(href);

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
                      <Link href={href}>
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="На сайт">
              <Link href={routes.home}>
                <ArrowLeft />
                <span>На сайт</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
