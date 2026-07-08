"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import type { News } from "@/entities/news";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

function NewsRowActions({ news }: { news: News }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleDelete() {
    // TODO: implement once backend is ready
  }

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
          <DropdownMenuItem asChild>
            <Link href={routes.admin.newsEdit(news.id)}>
              <Pencil />
              <span>Редагувати</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
            <Trash2 />
            <span>Видалити</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
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
      cell: ({ row }) => <NewsRowActions news={row.original} />,
    },
  ];
}
