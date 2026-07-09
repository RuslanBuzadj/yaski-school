"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { mockGalleryAlbums } from "@/entities/gallery";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/widgets/data-table";
import { useGalleryColumns } from "../model/use-gallery-columns";

export function AdminGalleryPage() {
  const columns = useGalleryColumns();

  return (
    <div className="flex min-h-[500px] flex-1 flex-col gap-4 max-h-[calc(100dvh-56px-64px)] overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Галерея</h1>
          <p className="text-sm text-muted-foreground">
            Керуйте фотоальбомами школи: додавайте, редагуйте та видаляйте записи.
          </p>
        </div>
        <Button asChild>
          <Link href={routes.admin.galleryNew}>
            <Plus />
            Додати альбом
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={mockGalleryAlbums} />
    </div>
  );
}
