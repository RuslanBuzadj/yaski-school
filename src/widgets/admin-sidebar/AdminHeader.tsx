"use client";

import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { LogOut, User } from "lucide-react";
import { logout } from "@/features/admin/login-page";
import { adminNavItems, routes } from "@/config/navigation";
import { isActiveRoute } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export default function AdminHeader({ email }: { email: string }) {
  const pathname = usePathname();
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const current = adminNavItems.find(({ href }) => isActiveRoute(pathname, href, routes.admin.root));

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-auto" />
      <h1 className="flex-1 text-sm font-medium">{current?.label ?? "Адмін панель"}</h1>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 text-sm outline-hidden hover:bg-accent">
          <Avatar size="sm">
            <AvatarFallback>
              <User className="size-3.5" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden font-medium sm:inline">{email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={isLoggingOut}
            onSelect={() => startLogoutTransition(() => logout())}
          >
            <LogOut />
            <span>Вийти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
