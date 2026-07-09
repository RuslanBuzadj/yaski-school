import Link from "next/link";
import { Images } from "lucide-react";
import { routes } from "@/config/navigation";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { GalleryAlbum } from "../model/types";

type Props = {
  album: GalleryAlbum;
};

export function GalleryCard({ album }: Props) {
  return (
    <Link href={`${routes.gallery}/${album.id}`} className="group flex flex-col gap-3">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        <ImagePlaceholder src={album.cover} alt={album.title} fill />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 text-white text-xs px-2 py-1">
          <Images className="h-3.5 w-3.5" />
          {album.images.length}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base leading-snug">
          {album.title}
        </h3>
      </div>
    </Link>
  );
}
