"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { deleteImage, uploadImage } from "@/shared/api/storage";
import type { GalleryAlbumInput } from "../model/types";

type ActionResult = { error: string } | { success: true };

/**
 * `undefined` = keep the existing cover, `null` = remove it, `File` = replace
 * it with a newly picked one. Server Functions can take a `File` argument
 * directly (no separate upload endpoint/FormData plumbing needed).
 */
type PhotoChange = File | null | undefined;

type ExistingImageInput = {
  id: number;
  caption?: string;
};

function toErrorMessage(error: unknown): string {
  if (error instanceof UnauthorizedError) return error.message;
  console.error(error);
  return "Сталася помилка. Спробуйте ще раз.";
}

export async function createGalleryAlbum(
  input: GalleryAlbumInput,
  cover: File | null,
  images: File[]
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const coverUrl = cover ? await uploadImage(cover, "gallery") : null;
    let uploadedImageUrls: string[] = [];

    try {
      uploadedImageUrls = await Promise.all(images.map((file) => uploadImage(file, "gallery")));

      await prisma.galleryAlbum.create({
        data: {
          title: input.title,
          description: input.description,
          cover: coverUrl,
          images: { create: uploadedImageUrls.map((src, index) => ({ src, order: index })) },
        },
      });
    } catch (error) {
      if (coverUrl) await deleteImage(coverUrl);
      await Promise.all(uploadedImageUrls.map((url) => deleteImage(url)));
      throw error;
    }

    revalidatePath(routes.admin.gallery);
    revalidatePath(routes.gallery);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateGalleryAlbum(
  id: number,
  input: GalleryAlbumInput,
  cover: PhotoChange,
  existingImages: ExistingImageInput[],
  newImages: File[]
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.galleryAlbum.findUnique({ where: { id }, include: { images: true } });
    if (!existing) {
      return { error: "Альбом не знайдено" };
    }

    let coverUrl = existing.cover;
    let uploadedCoverUrl: string | null = null;

    if (cover instanceof File) {
      uploadedCoverUrl = await uploadImage(cover, "gallery");
      coverUrl = uploadedCoverUrl;
    } else if (cover === null) {
      coverUrl = null;
    }

    const keptIds = new Set(existingImages.map((image) => image.id));
    const removedImages = existing.images.filter((image) => !keptIds.has(image.id));
    const maxOrder = existing.images.reduce((max, image) => Math.max(max, image.order), -1);

    let newImageUrls: string[] = [];

    try {
      newImageUrls = await Promise.all(newImages.map((file) => uploadImage(file, "gallery")));

      await prisma.$transaction([
        prisma.galleryAlbum.update({
          where: { id },
          data: { title: input.title, description: input.description, cover: coverUrl },
        }),
        ...existingImages.map((image) =>
          prisma.galleryImage.update({ where: { id: image.id }, data: { caption: image.caption || null } })
        ),
        ...(removedImages.length
          ? [prisma.galleryImage.deleteMany({ where: { id: { in: removedImages.map((image) => image.id) } } })]
          : []),
        ...(newImageUrls.length
          ? [
              prisma.galleryImage.createMany({
                data: newImageUrls.map((src, index) => ({ src, albumId: id, order: maxOrder + 1 + index })),
              }),
            ]
          : []),
      ]);
    } catch (error) {
      if (uploadedCoverUrl) await deleteImage(uploadedCoverUrl);
      await Promise.all(newImageUrls.map((url) => deleteImage(url)));
      throw error;
    }

    if (existing.cover && existing.cover !== coverUrl) {
      await deleteImage(existing.cover);
    }
    await Promise.all(removedImages.map((image) => deleteImage(image.src)));

    revalidatePath(routes.admin.gallery);
    revalidatePath(routes.gallery);
    revalidatePath(`${routes.gallery}/${id}`);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function deleteGalleryAlbum(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.galleryAlbum.delete({ where: { id }, include: { images: true } });
    if (deleted.cover) await deleteImage(deleted.cover);
    await Promise.all(deleted.images.map((image) => deleteImage(image.src)));

    revalidatePath(routes.admin.gallery);
    revalidatePath(routes.gallery);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
