"use client";

import { useRouter } from "next/navigation";
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
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.gallery);
      }}
    />
  );
}
