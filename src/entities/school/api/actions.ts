"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { cleanupContentImages, cleanupRemovedContentImages } from "@/shared/api/storage";
import type { AboutSectionInput } from "../model/about-sections";
import type { SiteSettingsInput } from "../model/site-settings";

type ActionResult = { error: string } | { success: true };

function toErrorMessage(error: unknown): string {
  if (error instanceof UnauthorizedError) return error.message;
  console.error(error);
  return "Сталася помилка. Спробуйте ще раз.";
}

export async function createAboutSection(
  input: AboutSectionInput,
  sessionUploadedUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.aboutSection.findUnique({ where: { slug: input.slug } });
    if (existing) {
      return { error: "Розділ з таким слагом вже існує" };
    }

    const count = await prisma.aboutSection.count();
    await prisma.aboutSection.create({
      data: { slug: input.slug, title: input.title, content: input.content || null, order: count },
    });

    await cleanupRemovedContentImages(null, input.content, sessionUploadedUrls);

    revalidatePath(routes.admin.about);
    revalidatePath(routes.about);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateAboutSection(
  currentSlug: string,
  input: AboutSectionInput,
  sessionUploadedUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.aboutSection.findUnique({ where: { slug: currentSlug } });
    if (!existing) {
      return { error: "Розділ не знайдено" };
    }

    if (input.slug !== currentSlug) {
      const conflicting = await prisma.aboutSection.findUnique({ where: { slug: input.slug } });
      if (conflicting) {
        return { error: "Розділ з таким слагом вже існує" };
      }
    }

    await prisma.aboutSection.update({
      where: { slug: currentSlug },
      data: { slug: input.slug, title: input.title, content: input.content || null },
    });

    await cleanupRemovedContentImages(existing.content, input.content, sessionUploadedUrls);

    revalidatePath(routes.admin.about);
    revalidatePath(routes.about);
    revalidatePath(routes.aboutSection(currentSlug));
    if (input.slug !== currentSlug) revalidatePath(routes.aboutSection(input.slug));
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function deleteAboutSection(slug: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.aboutSection.delete({ where: { slug } });
    await cleanupContentImages(deleted.content);

    revalidatePath(routes.admin.about);
    revalidatePath(routes.about);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateSiteSettings(input: SiteSettingsInput): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...input },
      update: { ...input },
    });

    // Site name/description/contacts show up in the header, footer and home
    // hero on every public page, so invalidate the whole layout rather than
    // a single route.
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
