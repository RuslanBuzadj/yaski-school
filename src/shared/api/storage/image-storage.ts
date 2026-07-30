import "server-only";
import { randomUUID } from "node:crypto";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { toWebp } from "./process-image";

const BUCKET = "media";
const PUBLIC_URL_MARKER = `/object/public/${BUCKET}/`;

let bucketReady = false;

async function ensureBucket() {
  if (bucketReady) return;

  const supabase = createAdminClient();
  const { data } = await supabase.storage.getBucket(BUCKET);

  if (!data) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error && !error.message?.includes("already exists")) {
      throw error;
    }
  }

  bucketReady = true;
}

/**
 * Converts an uploaded image to compressed webp and stores it in the shared
 * `media` bucket under `folder/`. Returns the public URL.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  await ensureBucket();

  const supabase = createAdminClient();
  const bytes = Buffer.from(await file.arrayBuffer());
  const webp = await toWebp(bytes);
  const path = `${folder}/${randomUUID()}.webp`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, webp, {
    contentType: "image/webp",
    upsert: false,
  });

  if (error) {
    throw new Error("Не вдалося завантажити зображення");
  }

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * Removes a previously uploaded image given its public URL. Silently no-ops
 * for URLs that don't belong to the `media` bucket (e.g. legacy/external URLs).
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  const markerIndex = publicUrl.indexOf(PUBLIC_URL_MARKER);
  if (markerIndex === -1) return;

  const path = publicUrl.slice(markerIndex + PUBLIC_URL_MARKER.length);
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  // Best-effort: a failed storage delete shouldn't fail the DB mutation that
  // triggered it, but a silently swallowed error made this exact class of
  // bug ("removed from content, still in storage") impossible to diagnose.
  if (error) {
    console.error(`Failed to delete storage object "${path}":`, error);
  }
}
