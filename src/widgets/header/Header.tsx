"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { useTransition } from "react";
import { logout } from "@/features/admin/login-page";
import { publicNavItems } from "@/config/navigation";
import { routes } from "@/config/navigation";
import { cn, isActiveRoute } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/shared/ui/sheet";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useState } from "react";

const mainLinks = publicNavItems.slice(0, -1);
const contactLink = publicNavItems[publicNavItems.length - 1];

function NavLink({
  href,
  label,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active = isActiveRoute(pathname, href, routes.home);

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-yellow-400/20 text-foreground font-semibold"
            : "text-foreground/70 hover:bg-muted hover:text-foreground"
        )}
      >
        {active && <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0" />}
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors hover:text-foreground/80",
        "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-current after:transition-all hover:after:w-full",
        active ? "text-foreground after:w-full" : "text-foreground/60"
      )}
    >
      {label}
    </Link>
  );
}

function AdminProfileMenu({ email }: { email: string }) {
  const [isLoggingOut, startLogoutTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-hidden">
        <Avatar size="sm">
          <AvatarFallback>
            <User className="size-3.5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={routes.admin.root}>
            <LayoutDashboard />
            <span>Адмін панель</span>
          </Link>
        </DropdownMenuItem>
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
  );
}

export default function Header({ adminEmail }: { adminEmail?: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={routes.home} className="flex items-center gap-3 shrink-0 group flex-1">
          <div className="rounded-full ring-2 ring-yellow-400/60 group-hover:ring-yellow-400 transition-all">
            <Image
              src="/images/logo.png"
              alt="Герб школи"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="hidden sm:block font-bold text-xs uppercase leading-tight max-w-[220px] tracking-wide">
            Загальноосвітня школа села Яські
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {mainLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {adminEmail && <AdminProfileMenu email={adminEmail} />}
          <ThemeToggle />
          <Button variant={'yellow'} className=" hidden md:inline-flex px-5 py-2" asChild>
              <Link
                href={contactLink.href}
              >
                {contactLink.label}
              </Link>
          </Button>
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 flex flex-col pt-10">
              <SheetTitle className="sr-only">Навігація</SheetTitle>
              <nav className="flex flex-col gap-1 overflow-y-auto flex-1">
                {publicNavItems.map(({ href, label }) => (
                  <NavLink key={href} href={href} label={label} onClick={() => setOpen(false)} mobile />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
