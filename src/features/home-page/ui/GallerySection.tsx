import Link from "next/link";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";

const previewImages = [
  { id: 1, src: null, alt: "Фото галереї 1" },
  { id: 2, src: null, alt: "Фото галереї 2" },
  { id: 3, src: null, alt: "Фото галереї 3" },
];

export function GallerySection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="absolute -top-6 -left-4 w-14 h-14 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-80" />
            <h2 className="relative text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Фотогалерея
              <br />
              нашого закладу освіти
            </h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
            Пропонуємо ознайомитися з фотогалереєю нашого закладу освіти
          </p>
          <div>
            <Button asChild variant="default" size="xl">
              <Link href={routes.gallery}>Подивитися</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 h-72 sm:h-80">
          <div className="relative rounded-2xl overflow-hidden bg-muted row-span-2">
            <ImagePlaceholder src={previewImages[0].src} alt={previewImages[0].alt} fill />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <ImagePlaceholder src={previewImages[1].src} alt={previewImages[1].alt} fill />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <ImagePlaceholder src={previewImages[2].src} alt={previewImages[2].alt} fill />
          </div>
        </div>
      </div>
    </section>
  );
}
