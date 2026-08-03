import { getSiteSettings } from "@/entities/school/api/queries";
import { AdminSettingsPage } from "@/features/admin/settings-page";

export default async function AdminDashboardPage() {
  const settings = await getSiteSettings();
  return <AdminSettingsPage settings={settings} />;
}
