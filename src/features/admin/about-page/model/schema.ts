import { z } from "zod";
import type { AboutSection } from "@/entities/school";

export const aboutSectionFormSchema = z.object({
  title: z.string().trim().min(1, "Вкажіть назву розділу"),
  slug: z
    .string()
    .trim()
    .min(1, "Вкажіть слаг")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Лише латинські літери, цифри та дефіси"),
  content: z.string().optional(),
});

export type AboutSectionFormValues = z.infer<typeof aboutSectionFormSchema>;

export const aboutSectionFormDefaultValues: AboutSectionFormValues = {
  title: "",
  slug: "",
  content: "",
};

export function aboutSectionToFormValues(section: AboutSection): AboutSectionFormValues {
  return {
    title: section.title,
    slug: section.slug,
    content: section.content,
  };
}
