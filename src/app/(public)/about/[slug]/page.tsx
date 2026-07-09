import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aboutSections } from "@/entities/school";
import { AboutSectionPage } from "@/features/about-page";
import { findBySlug } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return aboutSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = findBySlug(aboutSections, slug);

  return { title: section ? section.title : "Про заклад" };
}

export default async function AboutSlugPage({ params }: Props) {
  const { slug } = await params;
  const section = findBySlug(aboutSections, slug);

  if (!section) {
    notFound();
  }

  return <AboutSectionPage section={section} />;
}
