import { notFound } from "next/navigation";
import { EditAboutPage } from "@/features/admin/about-page";
import { getAboutSection } from "@/entities/school/api/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const section = await getAboutSection(slug);

  if (!section) {
    notFound();
  }

  return <EditAboutPage section={section} />;
}
