import { notFound } from "next/navigation";
import { EditAboutPage } from "@/features/admin/about-page";
import { aboutSections } from "@/entities/school";
import { findBySlug } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const section = findBySlug(aboutSections, slug);

  if (!section) {
    notFound();
  }

  return <EditAboutPage section={section} />;
}
