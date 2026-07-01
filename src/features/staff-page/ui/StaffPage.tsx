import { StaffCard, mockStaff } from "@/entities/staff";
import { PageBreadcrumb } from "@/widgets/breadcrumb";

export function StaffPage() {
  const administration = mockStaff.filter((member) => member.group === "administration");
  const staff = mockStaff.filter((member) => member.group === "staff");

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Колектив" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">
            Колектив нашого закладу
          </h1>
        </div>

        {administration.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Адміністрація
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {administration.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {staff.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Співробітники
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {staff.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
