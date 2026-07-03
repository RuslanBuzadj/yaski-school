import Link from "next/link";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/ui/button";
import { StaffCard, mockStaff } from "@/entities/staff";

export function StaffSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h2 className="relative text-3xl sm:text-4xl font-bold text-foreground">
            Співробітники нашого закладу
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {mockStaff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="default" size="xl">
            <Link href={routes.staff}>Весь колектив</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
