import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutSection, getAboutSections } from "@/entities/school/api/queries";
import { AboutSectionPage } from "@/features/about-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = await getAboutSection(slug);

  return { title: section ? section.title : "Про заклад" };
}

export default async function AboutSlugPage({ params }: Props) {
  const { slug } = await params;
  const [section, sections] = await Promise.all([getAboutSection(slug), getAboutSections()]);

  if (!section) {
    notFound();
  }

  return <AboutSectionPage section={section} sections={sections} />;
}
