"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteStaffMember } from "@/entities/staff/api/actions";
import type { StaffMember } from "@/entities/staff";
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

type StaffRowActionsProps = {
  member: StaffMember;
};

export function StaffRowActions({ member }: StaffRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteStaffMember(member.id);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Співробітника видалено");
    });
  }

  return (
    <>
      <RowActions
        actions={[
          {
            label: "Редагувати",
            icon: <Pencil />,
            href: routes.admin.staffEdit(member.id),
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
            <AlertDialogTitle>Видалити співробітника?</AlertDialogTitle>
            <AlertDialogDescription>
              Дію неможливо скасувати. Дані та фото «{member.name}» буде видалено остаточно.
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
