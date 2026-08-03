import "server-only";
import type { GalleryAlbum as PrismaGalleryAlbum, GalleryImage as PrismaGalleryImage } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { GalleryAlbum } from "../model/types";

function toGalleryAlbum(row: PrismaGalleryAlbum & { images: PrismaGalleryImage[] }): GalleryAlbum {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    cover: row.cover,
    images: row.images.map((image) => ({
      id: image.id,
      src: image.src,
      caption: image.caption ?? undefined,
    })),
  };
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const rows = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return rows.map(toGalleryAlbum);
}

export async function getGalleryAlbum(id: number): Promise<GalleryAlbum | null> {
  const row = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return row ? toGalleryAlbum(row) : null;
}
