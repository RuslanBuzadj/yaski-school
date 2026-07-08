"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { mockNews } from "@/entities/news";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/widgets/data-table";
import { useNewsColumns } from "../model/use-news-columns";

export function AdminNewsPage() {
  const columns = useNewsColumns();

  return (
    <div className="flex min-h-[500px] flex-1 flex-col gap-4 max-h-[calc(100dvh-56px-64px)] overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Новини</h1>
          <p className="text-sm text-muted-foreground">
            Керуйте новинами школи: додавайте, редагуйте та видаляйте записи.
          </p>
        </div>
        <Button asChild>
          <Link href={routes.admin.newsNew}>
            <Plus />
            Додати новину
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={mockNews} />
    </div>
  );
}
