import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockNews } from "@/entities/news";
import { NewsArticlePage } from "@/features/news-article-page";
import { findById, toIdParams } from "@/shared/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return toIdParams(mockNews);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = findById(mockNews, id);

  return { title: news ? news.title : "Новини" };
}

export default async function NewsItemPage({ params }: Props) {
  const { id } = await params;
  const news = findById(mockNews, id);

  if (!news) {
    notFound();
  }

  return <NewsArticlePage news={news} />;
}
