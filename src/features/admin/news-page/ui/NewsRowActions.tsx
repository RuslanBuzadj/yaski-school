"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteNews } from "@/entities/news/api/actions";
import type { News } from "@/entities/news";
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

type NewsRowActionsProps = {
  news: News;
};

export function NewsRowActions({ news }: NewsRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteNews(news.id);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Новину видалено");
    });
  }

  return (
    <>
      <RowActions
        actions={[
          {
            label: "Редагувати",
            icon: <Pencil />,
            href: routes.admin.newsEdit(news.id),
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
            <AlertDialogTitle>Видалити новину?</AlertDialogTitle>
            <AlertDialogDescription>
              Дію неможливо скасувати. Новину «{news.title}» буде видалено остаточно.
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
