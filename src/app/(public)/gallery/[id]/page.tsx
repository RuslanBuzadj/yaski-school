import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockGalleryAlbums } from "@/entities/gallery";
import { GalleryAlbumPage } from "@/features/gallery-album-page";
import { findById, toIdParams } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return toIdParams(mockGalleryAlbums);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const album = findById(mockGalleryAlbums, id);

  return { title: album ? album.title : "Галерея" };
}

export default async function GalleryAlbumItemPage({ params }: Props) {
  const { id } = await params;
  const album = findById(mockGalleryAlbums, id);

  if (!album) {
    notFound();
  }

  return <GalleryAlbumPage album={album} />;
}
