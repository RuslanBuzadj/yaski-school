import { GalleryCard, mockGalleryAlbums } from "@/entities/gallery";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

export function GalleryPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Галерея" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Фотогалерея</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          {mockGalleryAlbums.map((album) => (
            <GalleryCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </section>
  );
}
