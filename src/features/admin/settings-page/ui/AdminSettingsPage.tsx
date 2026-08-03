import type { SiteSettings } from "@/entities/school";
import { siteSettingsToFormValues } from "../model/schema";
import { SiteSettingsForm } from "./SiteSettingsForm";

type AdminSettingsPageProps = {
  settings: SiteSettings;
};

export function AdminSettingsPage({ settings }: AdminSettingsPageProps) {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Панель керування</h1>
      <SiteSettingsForm defaultValues={siteSettingsToFormValues(settings)} />
    </main>
  );
}
