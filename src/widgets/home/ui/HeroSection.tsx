import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { ImagePlaceholder } from "@/shared/ui/image-placeholder";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-[520px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 py-16 lg:py-0">
        <div className="flex flex-col justify-center gap-6 z-10">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">
              Загальноосвітня школа села Яські
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Вітаємо!
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            Ви зайшли на сайт Загальноосвітньої школи села Яські! Тут ви можете дізнатися
            про історію нашого закладу, ознайомитись із правилами прийому, а також побачити, які
            заходи проходять в нашій школі протягом року.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="default" size="lg">
              <Link href={routes.about}>
                Про наш заклад
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full font-semibold">
              <Link href={routes.contacts}>Контакти</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <ImagePlaceholder src={null} alt="Будівля школи" fill />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-300/20 blur-3xl" />
    </section>
  );
}
