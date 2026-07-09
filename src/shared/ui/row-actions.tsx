"use client";

import { useState, type ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export interface RowActionItem {
  label: string;
  icon: ReactNode;
  href?: string;
  onSelect?: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

interface RowActionsProps {
  actions: RowActionItem[];
}

export function RowActions({ actions }: RowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-end">
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal />
            <span className="sr-only">Дії</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              asChild={Boolean(action.href)}
              variant={action.variant}
              disabled={action.disabled}
              onSelect={action.href ? undefined : action.onSelect}
            >
              {action.href ? (
                <Link href={action.href}>
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ) : (
                <>
                  {action.icon}
                  <span>{action.label}</span>
                </>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
