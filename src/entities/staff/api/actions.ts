"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { deleteImage, uploadImage } from "@/shared/api/storage";
import type { StaffInput } from "../model/types";

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

function toStaffData(input: StaffInput, imageUrl: string | null) {
  return {
    name: input.name,
    role: input.role,
    group: input.group,
    image: imageUrl,
    category: input.category || null,
    education: input.education || null,
    experience: input.experience || null,
    subjects: input.subjects,
    bio: input.bio || null,
  };
}

export async function createStaffMember(input: StaffInput, photo: File | null): Promise<ActionResult> {
  try {
    await requireAdmin();

    const imageUrl = photo ? await uploadImage(photo, "staff") : null;

    try {
      await prisma.staffMember.create({ data: toStaffData(input, imageUrl) });
    } catch (error) {
      if (imageUrl) await deleteImage(imageUrl);
      throw error;
    }

    revalidatePath(routes.admin.staff);
    revalidatePath(routes.staff);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function updateStaffMember(id: number, input: StaffInput, photo: PhotoChange): Promise<ActionResult> {
  try {
    await requireAdmin();

    const existing = await prisma.staffMember.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Співробітника не знайдено" };
    }

    let imageUrl = existing.image;
    let uploadedUrl: string | null = null;

    if (photo instanceof File) {
      uploadedUrl = await uploadImage(photo, "staff");
      imageUrl = uploadedUrl;
    } else if (photo === null) {
      imageUrl = null;
    }

    try {
      await prisma.staffMember.update({ where: { id }, data: toStaffData(input, imageUrl) });
    } catch (error) {
      if (uploadedUrl) await deleteImage(uploadedUrl);
      throw error;
    }

    if (existing.image && existing.image !== imageUrl) {
      await deleteImage(existing.image);
    }

    revalidatePath(routes.admin.staff);
    revalidatePath(routes.staff);
    revalidatePath(`${routes.staff}/${id}`);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}

export async function deleteStaffMember(id: number): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.staffMember.delete({ where: { id } });
    if (deleted.image) {
      await deleteImage(deleted.image);
    }

    revalidatePath(routes.admin.staff);
    revalidatePath(routes.staff);
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
