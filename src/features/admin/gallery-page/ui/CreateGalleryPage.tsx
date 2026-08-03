"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createGalleryAlbum } from "@/entities/gallery/api/actions";
import { routes } from "@/config/navigation";
import { galleryFormDefaultValues } from "../model/schema";
import { GalleryForm } from "./GalleryForm";

export function CreateGalleryPage() {
  const router = useRouter();

  return (
    <GalleryForm
      mode="create"
      defaultValues={galleryFormDefaultValues}
      onSubmit={async (values, cover, newImages) => {
        const result = await createGalleryAlbum(
          { title: values.title, description: values.description },
          cover ?? null,
          newImages
        );

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Альбом додано");
        router.push(routes.admin.gallery);
      }}
    />
  );
}
