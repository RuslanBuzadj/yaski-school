import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/navigation";
import type { GalleryAlbum } from "@/entities/gallery";
import { GalleryGrid } from "@/entities/gallery";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

type Props = {
  album: GalleryAlbum;
};

export function GalleryAlbumPage({ album }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Галерея", href: routes.gallery }, { label: album.title }]} />
        <Link
          href={routes.gallery}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Вся галерея
        </Link>

        <div className="flex flex-col gap-3 mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{album.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {album.description}
          </p>
        </div>

        <GalleryGrid images={album.images} />
      </div>
    </section>
  );
}
