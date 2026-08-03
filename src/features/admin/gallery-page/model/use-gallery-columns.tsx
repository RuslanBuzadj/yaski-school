"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Images } from "lucide-react";
import type { GalleryAlbum } from "@/entities/gallery";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { GalleryRowActions } from "../ui/GalleryRowActions";

export function useGalleryColumns(): ColumnDef<GalleryAlbum>[] {
  return [
    {
      accessorKey: "title",
      header: "Альбом",
      cell: ({ row }) => {
        const album = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
              <ImagePlaceholder src={album.cover} alt={album.title} fill />
            </div>
            <div className="flex flex-col max-w-[200px] whitespace-normal">
              <span className="font-medium text-foreground line-clamp-1">{album.title}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">{album.description}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "imagesCount",
      header: "Фото",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Images className="size-4" />
          {row.original.images.length}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <GalleryRowActions album={row.original} />,
    },
  ];
}
