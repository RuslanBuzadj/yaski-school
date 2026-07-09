"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Images, Pencil, Trash2 } from "lucide-react";
import type { GalleryAlbum } from "@/entities/gallery";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { RowActions } from "@/shared/ui/row-actions";

function handleDeleteGalleryAlbum() {
  // TODO: implement once backend is ready
}

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
      cell: ({ row }) => (
        <RowActions
          actions={[
            {
              label: "Редагувати",
              icon: <Pencil />,
              href: routes.admin.galleryEdit(row.original.id),
            },
            {
              label: "Видалити",
              icon: <Trash2 />,
              variant: "destructive",
              onSelect: handleDeleteGalleryAlbum,
            },
          ]}
        />
      ),
    },
  ];
}
