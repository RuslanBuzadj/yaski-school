export type GalleryImage = {
  id: number;
  src: string | null;
  caption?: string;
};

export type GalleryAlbum = {
  id: number;
  title: string;
  description: string;
  cover: string | null;
  images: GalleryImage[];
};

/**
 * Plain structural contract accepted by the create/update Server Actions.
 * Lives here (not re-exported from `features/admin/gallery-page`) so the
 * `entities` layer never imports from `features`, per the FSD layer rule —
 * the feature's zod-inferred `GalleryFormValues` already satisfies this shape.
 */
export type GalleryAlbumInput = {
  title: string;
  description: string;
};
