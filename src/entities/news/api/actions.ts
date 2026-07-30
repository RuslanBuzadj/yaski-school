"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { cleanupContentImages, cleanupRemovedContentImages, deleteImage, uploadImage } from "@/shared/api/storage";
import type { NewsInput } from "../model/types";

type ActionResult = { error: string } | { success: true };

/**
 * `undefined` = keep the existing photo, `null` = remove it, `File` = replace
 * it with a newly picked one. Server Functions can take a `File` argument
 * directly (no separate upload endpoint/FormData plumbing needed).
 */
type PhotoChange = File | null | undefined;

function toErrorMessage(error: unknown): string {
  if (error instanceof UnauthorizedError) return error.message;
  console.error(error);
  return "Сталася помилка. Спробуйте ще раз.";
}

function toNewsData(input: NewsInput, imageUrl: string | null) {
  return {
    title: input.title,
    excerpt: input.excerpt,
    content: input.content || null,
    image: imageUrl,
  };
}

export async function createNews(
  input: NewsInput,
  photo: File | null,
  sessionUploadedContentUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const imageUrl = photo ? await uploadImage(photo, "news") : null;

    try {
      await prisma.news.create({ data: toNewsData(input, imageUrl) });
    } catch (error) {
      if (imageUrl) await deleteImage(imageUrl);
      throw error;
    }

    await cleanupRemovedContentImages(null, input.content, sessionUploadedContentUrls);

    revalidatePath(routes.admin.news);
    revalidatePath(routes.news);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateNews(
  id: number,
  input: NewsInput,
  photo: PhotoChange,
  sessionUploadedContentUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Новину не знайдено" };
    }

    let imageUrl = existing.image;
    let uploadedUrl: string | null = null;

    if (photo instanceof File) {
      uploadedUrl = await uploadImage(photo, "news");
      imageUrl = uploadedUrl;
    } else if (photo === null) {
      imageUrl = null;
    }

    try {
      await prisma.news.update({ where: { id }, data: toNewsData(input, imageUrl) });
    } catch (error) {
      if (uploadedUrl) await deleteImage(uploadedUrl);
      throw error;
    }

    if (existing.image && existing.image !== imageUrl) {
      await deleteImage(existing.image);
    }

    await cleanupRemovedContentImages(existing.content, input.content, sessionUploadedContentUrls);

    revalidatePath(routes.admin.news);
    revalidatePath(routes.news);
    revalidatePath(`${routes.news}/${id}`);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function deleteNews(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.news.delete({ where: { id } });
    if (deleted.image) {
      await deleteImage(deleted.image);
    }
    await cleanupContentImages(deleted.content);

    revalidatePath(routes.admin.news);
    revalidatePath(routes.news);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
