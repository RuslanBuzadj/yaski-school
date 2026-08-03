import "server-only";
import type { AboutSection as PrismaAboutSection } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { AboutSection } from "../model/about-sections";
import { defaultSiteSettings, type SiteSettings } from "../model/site-settings";

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

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!row) return defaultSiteSettings;

  return {
    name: row.name,
    description: row.description,
    phone: row.phone,
    email: row.email,
    director: row.director,
  };
}
