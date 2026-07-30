"use server";

import { requireAdmin, UnauthorizedError } from "@/shared/api/auth";
import { uploadImage } from "./image-storage";

type UploadResult = { url: string } | { error: string };

/**
 * Upload adapter target for the CKEditor `TextEditor` — called directly from
 * the client plugin (`shared/lib/plugins/fileUploader.ts`), so it re-checks
 * admin auth itself rather than trusting the editor UI being admin-only.
 */
export async function uploadEditorImage(file: File): Promise<UploadResult> {
  try {
    await requireAdmin();
    const url = await uploadImage(file, "editor-content");
    return { url };
  } catch (error) {
    if (error instanceof UnauthorizedError) return { error: error.message };
    console.error(error);
    return { error: "Не вдалося завантажити зображення" };
  }
}
