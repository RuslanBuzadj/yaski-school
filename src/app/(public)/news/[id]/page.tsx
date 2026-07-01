import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockNews } from "@/entities/news";
import { NewsArticlePage } from "@/features/news-article-page";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mockNews.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = mockNews.find((item) => String(item.id) === id);

  return { title: news ? news.title : "Новини" };
}

export default async function NewsItemPage({ params }: Props) {
  const { id } = await params;
  const news = mockNews.find((item) => String(item.id) === id);

  if (!news) {
    notFound();
  }

  return <NewsArticlePage news={news} />;
}
