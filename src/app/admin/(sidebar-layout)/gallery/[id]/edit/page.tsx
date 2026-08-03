import { notFound } from "next/navigation";
import { EditGalleryPage } from "@/features/admin/gallery-page";
import { getGalleryAlbum } from "@/entities/gallery/api/queries";
import { parseId } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseId(id);
  const album = numericId !== null ? await getGalleryAlbum(numericId) : null;

  if (!album) {
    notFound();
  }

  return <EditGalleryPage album={album} />;
}
