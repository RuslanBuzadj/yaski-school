"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAboutSection } from "@/entities/school/api/actions";
import { routes } from "@/config/navigation";
import { aboutSectionFormDefaultValues } from "../model/schema";
import { AboutSectionForm } from "./AboutSectionForm";

export function CreateAboutPage() {
  const router = useRouter();

  return (
    <AboutSectionForm
      mode="create"
      defaultValues={aboutSectionFormDefaultValues}
      onSubmit={async (values, sessionUploadedUrls) => {
        const result = await createAboutSection(values, sessionUploadedUrls);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Розділ додано");
        router.push(routes.admin.about);
      }}
    />
  );
}
