export type GalleryImage = {
  id: number;
  src: string | null;
  caption?: string;
};

export type GalleryAlbum = {
  id: number;
  date: string;
  title: string;
  description: string;
  cover: string | null;
  images: GalleryImage[];
};
