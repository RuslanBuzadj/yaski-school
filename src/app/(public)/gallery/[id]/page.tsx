import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGalleryAlbum } from "@/entities/gallery/api/queries";
import { GalleryAlbumPage } from "@/features/gallery-album-page";
import { parseId } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseId(id);
  const album = numericId !== null ? await getGalleryAlbum(numericId) : null;

  return { title: album ? album.title : "Галерея" };
}

export default async function GalleryAlbumItemPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseId(id);
  const album = numericId !== null ? await getGalleryAlbum(numericId) : null;

  if (!album) {
    notFound();
  }

  return <GalleryAlbumPage album={album} />;
}
