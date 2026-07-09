import { notFound } from "next/navigation";
import { EditGalleryPage } from "@/features/admin/gallery-page";
import { mockGalleryAlbums } from "@/entities/gallery";
import { findById } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const album = findById(mockGalleryAlbums, id);

  if (!album) {
    notFound();
  }

  return <EditGalleryPage album={album} />;
}
