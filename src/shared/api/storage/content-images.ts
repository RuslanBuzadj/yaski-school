import "server-only";
import { deleteImage } from "./image-storage";

const IMG_SRC_REGEX = /<img[^>]+src=["']([^"']+)["']/gi;

function extractImageUrls(html: string | null | undefined): string[] {
  if (!html) return [];

  const urls = new Set<string>();
  for (const match of html.matchAll(IMG_SRC_REGEX)) {
    urls.add(match[1]);
  }
  return [...urls];
}

/**
 * Deletes storage images no longer referenced by the saved content. Checks
 * two sources of orphans: images present in `previousHtml` but dropped from
 * `nextHtml` (removed across saves), and `sessionUploadedUrls` — images
 * uploaded through the `TextEditor` during this edit session that never
 * made it into any saved version at all (uploaded, then deleted again,
 * all before the form was ever submitted). A plain before/after diff of
 * saved content can't see that second case, since the image never existed
 * in `previousHtml` either.
 */
export async function cleanupRemovedContentImages(
  previousHtml: string | null | undefined,
  nextHtml: string | null | undefined,
  sessionUploadedUrls: string[] = []
): Promise<void> {
  const next = new Set(extractImageUrls(nextHtml));
  const candidates = new Set([...extractImageUrls(previousHtml), ...sessionUploadedUrls]);
  const removed = [...candidates].filter((url) => !next.has(url));

  await Promise.all(removed.map((url) => deleteImage(url)));
}

/** Deletes every storage image referenced by rich-text content (e.g. on record delete). */
export async function cleanupContentImages(html: string | null | undefined): Promise<void> {
  await Promise.all(extractImageUrls(html).map((url) => deleteImage(url)));
}
