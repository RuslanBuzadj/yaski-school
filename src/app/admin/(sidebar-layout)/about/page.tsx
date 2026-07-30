import { getAboutSections } from "@/entities/school/api/queries";
import { AdminAboutPage } from "@/features/admin/about-page";

export default async function Page() {
  const sections = await getAboutSections();
  return <AdminAboutPage sections={sections} />;
}
