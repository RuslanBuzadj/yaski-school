"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteGalleryAlbum } from "@/entities/gallery/api/actions";
import type { GalleryAlbum } from "@/entities/gallery";
import { routes } from "@/config/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { RowActions } from "@/shared/ui/row-actions";

type GalleryRowActionsProps = {
  album: GalleryAlbum;
};

export function GalleryRowActions({ album }: GalleryRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteGalleryAlbum(album.id);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Альбом видалено");
    });
  }

  return (
    <>
      <RowActions
        actions={[
          {
            label: "Редагувати",
            icon: <Pencil />,
            href: routes.admin.galleryEdit(album.id),
          },
          {
            label: "Видалити",
            icon: <Trash2 />,
            variant: "destructive",
            onSelect: () => setOpen(true),
          },
        ]}
      />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити альбом?</AlertDialogTitle>
            <AlertDialogDescription>
              Дію неможливо скасувати. Альбом «{album.title}» буде видалено остаточно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Скасувати</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={handleDelete}>
              Видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
