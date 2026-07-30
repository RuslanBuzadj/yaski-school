"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateAboutSection } from "@/entities/school/api/actions";
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
      onSubmit={async (values) => {
        const result = await updateAboutSection(section.slug, values);

        if ("error" in result) {
          toast.error(result.error);
          return;
        }

        toast.success("Зміни збережено");
        router.push(routes.admin.about);
      }}
    />
  );
}
