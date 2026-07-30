import { notFound } from "next/navigation";
import { EditNewsPage } from "@/features/admin/news-page";
import { getNewsItem } from "@/entities/news/api/queries";
import { parseId } from "@/shared/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseId(id);
  const news = numericId !== null ? await getNewsItem(numericId) : null;

  if (!news) {
    notFound();
  }

  return <EditNewsPage news={news} />;
}
