"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { aboutSectionFormDefaultValues } from "../model/schema";
import { AboutSectionForm } from "./AboutSectionForm";

export function CreateAboutPage() {
  const router = useRouter();

  return (
    <AboutSectionForm
      mode="create"
      defaultValues={aboutSectionFormDefaultValues}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.about);
      }}
    />
  );
}
