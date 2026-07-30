import "server-only";
import { format } from "date-fns";
import type { News as PrismaNews } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { News } from "../model/types";

const DATE_FORMAT = "dd.MM.yyyy";

function toNews(row: PrismaNews): News {
  return {
    id: row.id,
    date: format(row.publishedAt, DATE_FORMAT),
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? undefined,
    image: row.image,
  };
}

export async function getNewsList(): Promise<News[]> {
  const rows = await prisma.news.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map(toNews);
}

export async function getNewsItem(id: number): Promise<News | null> {
  const row = await prisma.news.findUnique({ where: { id } });
  return row ? toNews(row) : null;
}
