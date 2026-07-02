"use client";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import { cn } from "@/shared/lib/utils";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import type { GalleryImage } from "../model/types";

type Props = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: Props) {
  return (
    <LightGallery
      selector=".lg-item"
      plugins={[lgThumbnail, lgZoom]}
      speed={400}
      elementClassNames="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
    >
      {images.map((image) =>
        image.src ? (
          <a
            key={image.id}
            href={image.src}
            data-sub-html={image.caption ? `<h4>${image.caption}</h4>` : undefined}
            className="lg-item group relative block aspect-square rounded-xl overflow-hidden bg-muted"
          >
            <ImagePlaceholder src={image.src} alt={image.caption ?? "Фото"} fill />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </a>
        ) : (
          <div
            key={image.id}
            className={cn("relative aspect-square rounded-xl overflow-hidden bg-muted")}
          >
            <ImagePlaceholder src={null} alt={image.caption ?? "Фото"} fill />
          </div>
        )
      )}
    </LightGallery>
  );
}
