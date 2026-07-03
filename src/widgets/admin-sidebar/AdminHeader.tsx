"use client";

import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { adminNavItems } from "@/config/navigation";
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

const currentUser = {
  name: "Олена Ковальчук",
  email: "admin@yaski-school.ua",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const current = adminNavItems.find(({ href }) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href)
  );

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
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
          <span className="hidden font-medium sm:inline">{currentUser.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{currentUser.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {currentUser.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut />
            <span>Вийти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
