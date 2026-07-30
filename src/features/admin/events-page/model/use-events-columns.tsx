"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Event } from "@/entities/events";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { EventRowActions } from "../ui/EventRowActions";

export function useEventsColumns(): ColumnDef<Event>[] {
  return [
    {
      accessorKey: "title",
      header: "Подія",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
              <ImagePlaceholder src={event.image} alt={event.title} fill />
            </div>
            <div className="flex flex-col max-w-[200px] whitespace-normal">
              <span className="font-medium text-foreground line-clamp-1">{event.title}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">{event.excerpt}</span>
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
      accessorKey: "time",
      header: "Час",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.time || "—"}</span>
      ),
    },
    {
      accessorKey: "location",
      header: "Місце",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground line-clamp-1">{row.original.location || "—"}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <EventRowActions event={row.original} />,
    },
  ];
}
