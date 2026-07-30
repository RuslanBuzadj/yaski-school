import { notFound } from "next/navigation";
import { getAboutSections } from "@/entities/school/api/queries";
import { AboutSectionPage } from "@/features/about-page";

export default async function AboutPage() {
  const sections = await getAboutSections();
  const section = sections[0];

  if (!section) {
    notFound();
  }

  return <AboutSectionPage section={section} sections={sections} />;
}
