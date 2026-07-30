"use server";

import { isValid, parse } from "date-fns";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { cleanupContentImages, cleanupRemovedContentImages, deleteImage, uploadImage } from "@/shared/api/storage";
import type { EventInput } from "../model/types";

const DATE_FORMAT = "dd.MM.yyyy";

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

function toEventData(input: EventInput, date: Date, imageUrl: string | null) {
  return {
    title: input.title,
    date,
    time: input.time || null,
    location: input.location || null,
    excerpt: input.excerpt,
    content: input.content || null,
    image: imageUrl,
  };
}

export async function createEvent(
  input: EventInput,
  photo: File | null,
  sessionUploadedContentUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const date = parse(input.date, DATE_FORMAT, new Date());
    if (!isValid(date)) {
      return { error: "Вкажіть коректну дату" };
    }

    const imageUrl = photo ? await uploadImage(photo, "events") : null;

    try {
      await prisma.event.create({ data: toEventData(input, date, imageUrl) });
    } catch (error) {
      if (imageUrl) await deleteImage(imageUrl);
      throw error;
    }

    await cleanupRemovedContentImages(null, input.content, sessionUploadedContentUrls);

    revalidatePath(routes.admin.events);
    revalidatePath(routes.events);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateEvent(
  id: number,
  input: EventInput,
  photo: PhotoChange,
  sessionUploadedContentUrls: string[] = []
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Подію не знайдено" };
    }

    const date = parse(input.date, DATE_FORMAT, new Date());
    if (!isValid(date)) {
      return { error: "Вкажіть коректну дату" };
    }

    let imageUrl = existing.image;
    let uploadedUrl: string | null = null;

    if (photo instanceof File) {
      uploadedUrl = await uploadImage(photo, "events");
      imageUrl = uploadedUrl;
    } else if (photo === null) {
      imageUrl = null;
    }

    try {
      await prisma.event.update({ where: { id }, data: toEventData(input, date, imageUrl) });
    } catch (error) {
      if (uploadedUrl) await deleteImage(uploadedUrl);
      throw error;
    }

    if (existing.image && existing.image !== imageUrl) {
      await deleteImage(existing.image);
    }

    await cleanupRemovedContentImages(existing.content, input.content, sessionUploadedContentUrls);

    revalidatePath(routes.admin.events);
    revalidatePath(routes.events);
    revalidatePath(`${routes.events}/${id}`);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function deleteEvent(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.event.delete({ where: { id } });
    if (deleted.image) {
      await deleteImage(deleted.image);
    }
    await cleanupContentImages(deleted.content);

    revalidatePath(routes.admin.events);
    revalidatePath(routes.events);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
