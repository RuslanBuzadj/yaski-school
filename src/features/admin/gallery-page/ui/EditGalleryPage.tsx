"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateGalleryAlbum } from "@/entities/gallery/api/actions";
import type { GalleryAlbum } from "@/entities/gallery";
import { routes } from "@/config/navigation";
import { galleryAlbumToFormValues } from "../model/schema";
import { GalleryForm } from "./GalleryForm";

type EditGalleryPageProps = {
  album: GalleryAlbum;
};

export function EditGalleryPage({ album }: EditGalleryPageProps) {
  const router = useRouter();

  return (
    <GalleryForm
      mode="edit"
      defaultValues={galleryAlbumToFormValues(album)}
      defaultCoverUrl={album.cover}
      onSubmit={async (values, cover, newImages) => {
        const result = await updateGalleryAlbum(
          album.id,
          { title: values.title, description: values.description },
          cover,
          values.images.map((image) => ({ id: image.id, caption: image.caption })),
          newImages
        );

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Зміни збережено");
        router.push(routes.admin.gallery);
      }}
    />
  );
}
