"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { staffGroupLabels, type StaffMember } from "@/entities/staff";
import { getInitials } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { StaffRowActions } from "../ui/StaffRowActions";

export function useStaffColumns(): ColumnDef<StaffMember>[] {
  return [
    {
      accessorKey: "name",
      header: "Ім'я",
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-3 ">
            <Avatar size="sm">
              {member.image && <AvatarImage src={member.image} alt={member.name} />}
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{member.name}</span>
              <span className="text-xs text-muted-foreground line-clamp-1 whitespace-normal">{member.role}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "group",
      header: "Група",
      cell: ({ row }) => (
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
          {staffGroupLabels[row.original.group]}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "Категорія",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground line-clamp-1">
          {row.original.category || "—"}
        </span>
      ),
    },
    {
      accessorKey: "experience",
      header: "Стаж",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.experience || "—"}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <StaffRowActions member={row.original} />,
    },
  ];
}
