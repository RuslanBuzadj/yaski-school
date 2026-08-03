import { Clock, Mail, MapPin, Phone, User } from "lucide-react";
import { schoolContacts } from "@/entities/school";
import { PageBreadcrumb } from "@/widgets/breadcrumb";
import { Card, CardContent } from "@/shared/ui/card";

const contactCards = [
  {
    icon: MapPin,
    label: "Адреса",
    value: schoolContacts.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolContacts.address)}`,
  },
  {
    icon: Phone,
    label: "Телефон",
    value: schoolContacts.phone,
    href: `tel:${schoolContacts.phone.replace(/[\s()]/g, "")}`,
  },
  {
    icon: Mail,
    label: "Електронна пошта",
    value: schoolContacts.email,
    href: `mailto:${schoolContacts.email}`,
  },
  {
    icon: User,
    label: "Директор",
    value: schoolContacts.director,
  },
] as const;

const workingHours = [
  { day: "Понеділок — П'ятниця", hours: "08:00 — 17:00" },
  { day: "Субота, Неділя", hours: "вихідний" },
] as const;

export function ContactsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <PageBreadcrumb items={[{ label: "Контакти" }]} />

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-16 rounded-full bg-yellow-300 dark:bg-yellow-400 blur-sm opacity-70 pointer-events-none" />
          <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Контакти</h1>
          <p className="relative mt-4 text-muted-foreground max-w-2xl mx-auto">
            Адреса, телефони та інші контактні дані нашого закладу освіти.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {contactCards.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <CardContent className="flex flex-col items-center text-center gap-3 py-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground break-words">{value}</p>
                </div>
              </CardContent>
            );

            return (
              <Card key={label} className="py-6">
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contents">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8">
          <Card className="overflow-hidden p-0">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1696.82152054742!2d30.075009316279814!3d46.510079478944476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c8639ffd433967%3A0x2fc81f539e007956!2z0J7QkdCp0JXQntCR0KDQkNCX0J7QktCQ0KLQldCb0KzQndCQ0K8g0KjQmtCe0JvQkA!5e0!3m2!1sru!2sua!4v1785774196664!5m2!1sru!2sua" className="h-80 w-full border-0 sm:h-full sm:min-h-96" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Графік роботи</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {workingHours.map(({ day, hours }) => (
                  <li
                    key={day}
                    className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm text-muted-foreground">{day}</span>
                    <span className="text-sm font-medium text-foreground">{hours}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
