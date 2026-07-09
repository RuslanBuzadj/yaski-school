"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { mockEvents } from "@/entities/events";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/widgets/data-table";
import { useEventsColumns } from "../model/use-events-columns";

export function AdminEventsPage() {
  const columns = useEventsColumns();

  return (
    <div className="flex min-h-[500px] flex-1 flex-col gap-4 max-h-[calc(100dvh-56px-64px)] overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Події</h1>
          <p className="text-sm text-muted-foreground">
            Керуйте списком подій школи: додавайте, редагуйте та видаляйте записи.
          </p>
        </div>
        <Button asChild>
          <Link href={routes.admin.eventsNew}>
            <Plus />
            Додати подію
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={mockEvents} />
    </div>
  );
}
