import { z } from "zod";
import type { SiteSettings } from "@/entities/school";

export const siteSettingsFormSchema = z.object({
  name: z.string().trim().min(1, "Вкажіть назву закладу"),
  description: z.string().trim().min(1, "Вкажіть опис закладу"),
  phone: z.string().trim().min(1, "Вкажіть телефон"),
  email: z.string().trim().min(1, "Вкажіть e-mail").email("Введіть коректний e-mail"),
  director: z.string().trim().min(1, "Вкажіть ПІБ директора"),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

export function siteSettingsToFormValues(settings: SiteSettings): SiteSettingsFormValues {
  return {
    name: settings.name,
    description: settings.description,
    phone: settings.phone,
    email: settings.email,
    director: settings.director,
  };
}
