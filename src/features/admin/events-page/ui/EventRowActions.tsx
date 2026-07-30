"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteEvent } from "@/entities/events/api/actions";
import type { Event } from "@/entities/events";
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

type EventRowActionsProps = {
  event: Event;
};

export function EventRowActions({ event }: EventRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteEvent(event.id);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Подію видалено");
    });
  }

  return (
    <>
      <RowActions
        actions={[
          {
            label: "Редагувати",
            icon: <Pencil />,
            href: routes.admin.eventsEdit(event.id),
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
            <AlertDialogTitle>Видалити подію?</AlertDialogTitle>
            <AlertDialogDescription>
              Дію неможливо скасувати. Подію «{event.title}» буде видалено остаточно.
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
