import { z } from "zod";
import type { GalleryAlbum } from "@/entities/gallery";

export const galleryImageFormSchema = z.object({
  id: z.number(),
  caption: z.string().trim().optional(),
  src: z.string().nullable().optional(),
});

export const galleryFormSchema = z.object({
  title: z.string().trim().min(1, "Вкажіть назву"),
  description: z.string().trim().min(1, "Вкажіть опис"),
  cover: z.string().nullable().optional(),
  images: z.array(galleryImageFormSchema),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageFormSchema>;
export type GalleryFormValues = z.infer<typeof galleryFormSchema>;

export const galleryFormDefaultValues: GalleryFormValues = {
  title: "",
  description: "",
  cover: null,
  images: [],
};

export function galleryAlbumToFormValues(album: GalleryAlbum): GalleryFormValues {
  return {
    title: album.title,
    description: album.description,
    cover: album.cover ?? null,
    images: album.images.map((image) => ({
      id: image.id,
      caption: image.caption ?? "",
      src: image.src ?? null,
    })),
  };
}
