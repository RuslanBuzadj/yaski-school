import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/entities/news/api/queries";
import { NewsArticlePage } from "@/features/news-article-page";
import { parseId } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseId(id);
  const news = numericId !== null ? await getNewsItem(numericId) : null;

  return { title: news ? news.title : "Новини" };
}

export default async function NewsItemPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseId(id);
  const news = numericId !== null ? await getNewsItem(numericId) : null;

  if (!news) {
    notFound();
  }

  return <NewsArticlePage news={news} />;
}
