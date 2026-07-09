import { routes } from "@/config/navigation";
import { aboutSections, type AboutSection } from "@/entities/school";
import { PageBreadcrumb } from "@/widgets/breadcrumb";
import { AboutBanner } from "./AboutBanner";
import { AboutSidebar } from "./AboutSidebar";

type Props = {
  section: AboutSection;
};

export function AboutSectionPage({ section }: Props) {
  return (
    <>
      <AboutBanner />

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <PageBreadcrumb items={[{ label: "Про заклад", href: routes.about }, { label: section.title }]} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-8">
            <AboutSidebar sections={aboutSections} className="lg:sticky lg:top-24" />

            <article className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10 sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{section.title}</h2>
              <div
                className="ck-content mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
