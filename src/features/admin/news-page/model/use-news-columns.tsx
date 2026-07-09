"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type { News } from "@/entities/news";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { RowActions } from "@/shared/ui/row-actions";

function handleDeleteNews() {
  // TODO: implement once backend is ready
}

export function useNewsColumns(): ColumnDef<News>[] {
  return [
    {
      accessorKey: "title",
      header: "Новина",
      cell: ({ row }) => {
        const news = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
              <ImagePlaceholder src={news.image} alt={news.title} fill />
            </div>
            <div className="flex flex-col max-w-[200px] whitespace-normal">
              <span className="font-medium text-foreground line-clamp-1">{news.title}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">{news.excerpt}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Дата",
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.date}</span>,
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
              href: routes.admin.newsEdit(row.original.id),
            },
            {
              label: "Видалити",
              icon: <Trash2 />,
              variant: "destructive",
              onSelect: handleDeleteNews,
            },
          ]}
        />
      ),
    },
  ];
}
