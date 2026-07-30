"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AboutSection } from "@/entities/school";
import { AboutSectionRowActions } from "../ui/AboutSectionRowActions";

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
      cell: ({ row }) => <AboutSectionRowActions section={row.original} />,
    },
  ];
}
