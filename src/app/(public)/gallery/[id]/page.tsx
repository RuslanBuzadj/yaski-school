import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockGalleryAlbums } from "@/entities/gallery";
import { GalleryAlbumPage } from "@/features/gallery-album-page";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mockGalleryAlbums.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const album = mockGalleryAlbums.find((item) => String(item.id) === id);

  return { title: album ? album.title : "Галерея" };
}

export default async function GalleryAlbumItemPage({ params }: Props) {
  const { id } = await params;
  const album = mockGalleryAlbums.find((item) => String(item.id) === id);

  if (!album) {
    notFound();
  }

  return <GalleryAlbumPage album={album} />;
}
