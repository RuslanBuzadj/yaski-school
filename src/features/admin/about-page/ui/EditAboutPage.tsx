"use client";

import { useRouter } from "next/navigation";
import type { AboutSection } from "@/entities/school";
import { routes } from "@/config/navigation";
import { aboutSectionToFormValues } from "../model/schema";
import { AboutSectionForm } from "./AboutSectionForm";

type EditAboutPageProps = {
  section: AboutSection;
};

export function EditAboutPage({ section }: EditAboutPageProps) {
  const router = useRouter();

  return (
    <AboutSectionForm
      mode="edit"
      defaultValues={aboutSectionToFormValues(section)}
      onSubmit={() => {
        // TODO: implement once backend is ready
        router.push(routes.admin.about);
      }}
    />
  );
}
