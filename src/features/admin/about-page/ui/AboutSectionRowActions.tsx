"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteAboutSection } from "@/entities/school/api/actions";
import type { AboutSection } from "@/entities/school";
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

type AboutSectionRowActionsProps = {
  section: AboutSection;
};

export function AboutSectionRowActions({ section }: AboutSectionRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAboutSection(section.slug);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Розділ видалено");
    });
  }

  return (
    <>
      <RowActions
        actions={[
          {
            label: "Редагувати",
            icon: <Pencil />,
            href: routes.admin.aboutEdit(section.slug),
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
            <AlertDialogTitle>Видалити розділ?</AlertDialogTitle>
            <AlertDialogDescription>
              Дію неможливо скасувати. Розділ «{section.title}» буде видалено остаточно.
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
