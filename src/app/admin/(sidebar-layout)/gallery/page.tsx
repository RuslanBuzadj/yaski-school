import { getGalleryAlbums } from "@/entities/gallery/api/queries";
import { AdminGalleryPage } from "@/features/admin/gallery-page";

export default async function Page() {
  const albums = await getGalleryAlbums();
  return <AdminGalleryPage albums={albums} />;
}
