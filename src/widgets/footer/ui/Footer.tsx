import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, User } from "lucide-react";
import { routes, publicNavItems } from "@/config/navigation";
import { schoolContacts, antiCorruptionNotice } from "@/entities/school";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-300">
      {/* Wave divider */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[56px] fill-background"
          preserveAspectRatio="none"
        >
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-slate-700/60">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <Link href={routes.home} className="flex items-center gap-3 w-fit group">
              <div className="rounded-full ring-2 ring-yellow-400/40 group-hover:ring-yellow-400/80 transition-all shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Герб ліцею"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              </div>
              <span className="font-bold text-xs uppercase leading-tight text-white max-w-[180px] tracking-wide group-hover:text-yellow-400 transition-colors">
                {schoolContacts.name}
              </span>
            </Link>

            <div className="h-0.5 w-10 bg-yellow-400 rounded-full" />

            <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-400">
              {antiCorruptionNotice.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Навігація
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {publicNavItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="h-px w-3 bg-slate-600 group-hover:bg-yellow-400 group-hover:w-4 transition-all" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contacts */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Контакти
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <a
                  href={`tel:${schoolContacts.phone.replace(/[\s()]/g, "")}`}
                  className="text-sm hover:text-yellow-400 transition-colors"
                >
                  {schoolContacts.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${schoolContacts.email}`}
                  className="text-sm hover:text-yellow-400 transition-colors break-all"
                >
                  {schoolContacts.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-sm">{schoolContacts.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <User className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-sm">{schoolContacts.director}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {year} {schoolContacts.copyright}</span>
          <span className="hidden sm:block h-px flex-1 mx-6 bg-slate-700/60" />
          <Link
            href={routes.contacts}
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            Зв&apos;язатися з нами →
          </Link>
        </div>
      </div>
    </footer>
  );
}
