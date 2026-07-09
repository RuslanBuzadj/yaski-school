"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { routes } from "@/config/navigation";
import { cn } from "@/shared/lib/utils";
import type { AboutSection } from "@/entities/school";

type Props = {
  sections: AboutSection[];
  className?: string;
};

export function AboutSidebar({ sections, className }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <nav className={cn("rounded-2xl bg-card ring-1 ring-foreground/10", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-heading text-base font-semibold text-foreground">Про заклад</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            !open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul className="flex flex-col gap-0.5 px-3 pb-4">
          {sections.map((section, index) => {
            const href = routes.aboutSection(section.slug);
            const isActive =
              pathname === href || (pathname === routes.about && index === 0);

            return (
              <li key={section.slug}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm leading-snug transition-colors",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {section.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
