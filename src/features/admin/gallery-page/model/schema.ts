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
  images: z.array(galleryImageFormSchema),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageFormSchema>;
export type GalleryFormValues = z.infer<typeof galleryFormSchema>;

export const galleryFormDefaultValues: GalleryFormValues = {
  title: "",
  description: "",
  images: [],
};

export function galleryAlbumToFormValues(album: GalleryAlbum): GalleryFormValues {
  return {
    title: album.title,
    description: album.description,
    images: album.images.map((image) => ({
      id: image.id,
      caption: image.caption ?? "",
      src: image.src ?? null,
    })),
  };
}
