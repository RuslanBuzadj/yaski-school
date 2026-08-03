import { getGalleryAlbums } from "@/entities/gallery/api/queries";
import { GalleryPage } from "@/features/gallery-page";

export default async function Page() {
  const albums = await getGalleryAlbums();
  return <GalleryPage albums={albums} />;
}
