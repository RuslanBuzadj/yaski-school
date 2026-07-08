import { notFound } from "next/navigation";
import { EditNewsPage } from "@/features/admin/news-page";
import { mockNews } from "@/entities/news";
import { findById } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const news = findById(mockNews, id);

  if (!news) {
    notFound();
  }

  return <EditNewsPage news={news} />;
}
