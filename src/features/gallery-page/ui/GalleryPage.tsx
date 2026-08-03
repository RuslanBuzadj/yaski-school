import { Images } from "lucide-react";
import { GalleryCard, type GalleryAlbum } from "@/entities/gallery";
import { PageBreadcrumb } from "@/widgets/breadcrumb";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/shared/ui/empty";

type GalleryPageProps = {
  albums: GalleryAlbum[];
};

export function GalleryPage({ albums }: GalleryPageProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Галерея" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Фотогалерея</h1>
          <p className="relative mt-4 text-muted-foreground max-w-2xl mx-auto">
            Світлини з життя нашого закладу освіти: свята, заходи та навчальні будні.
          </p>
        </div>

        {albums.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {albums.map((album) => (
              <GalleryCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Images />
              </EmptyMedia>
              <EmptyTitle>Фотоальбомів поки немає</EmptyTitle>
              <EmptyDescription>
                Незабаром тут з&apos;являться фотографії з життя школи.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </section>
  );
}
