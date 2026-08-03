export { GalleryCard } from "./ui/GalleryCard";
export { GalleryGrid } from "./ui/GalleryGrid";
export { mockGalleryAlbums } from "./model/mock";
export type { GalleryAlbum, GalleryAlbumInput, GalleryImage } from "./model/types";

// `api/queries.ts` and `api/actions.ts` are intentionally NOT re-exported
// here: they pull in Prisma (Node-only), and this barrel is also imported
// by client components. Import server-only code directly:
// `@/entities/gallery/api/queries` / `@/entities/gallery/api/actions`.
