"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type { AboutSection } from "@/entities/school";
import { routes } from "@/config/navigation";
import { RowActions } from "@/shared/ui/row-actions";

function handleDeleteAboutSection() {
  // TODO: implement once backend is ready
}

export function useAboutColumns(): ColumnDef<AboutSection>[] {
  return [
    {
      accessorKey: "title",
      header: "Розділ",
      cell: ({ row }) => (
        <span className="font-medium text-foreground line-clamp-1">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "slug",
      header: "Слаг",
      cell: ({ row }) => (
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          {row.original.slug}
        </code>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <RowActions
          actions={[
            {
              label: "Редагувати",
              icon: <Pencil />,
              href: routes.admin.aboutEdit(row.original.slug),
            },
            {
              label: "Видалити",
              icon: <Trash2 />,
              variant: "destructive",
              onSelect: handleDeleteAboutSection,
            },
          ]}
        />
      ),
    },
  ];
}
