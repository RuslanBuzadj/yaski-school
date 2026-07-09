"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { galleryFormDefaultValues } from "../model/schema";
import { GalleryForm } from "./GalleryForm";

export function CreateGalleryPage() {
  const router = useRouter();

  return (
    <GalleryForm
      mode="create"
      defaultValues={galleryFormDefaultValues}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.gallery);
      }}
    />
  );
}
