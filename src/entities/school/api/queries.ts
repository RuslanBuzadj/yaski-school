import "server-only";
import type { AboutSection as PrismaAboutSection } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { AboutSection } from "../model/about-sections";

function toAboutSection(row: PrismaAboutSection): AboutSection {
  return {
    slug: row.slug,
    title: row.title,
    content: row.content ?? "",
  };
}

export async function getAboutSections(): Promise<AboutSection[]> {
  const rows = await prisma.aboutSection.findMany({ orderBy: { order: "asc" } });
  return rows.map(toAboutSection);
}

export async function getAboutSection(slug: string): Promise<AboutSection | null> {
  const row = await prisma.aboutSection.findUnique({ where: { slug } });
  return row ? toAboutSection(row) : null;
}
