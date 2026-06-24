import Link from "next/link";
import { adminNavItems } from "@/config/navigation";

export default function AdminSidebar() {
  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 font-bold text-lg border-b border-gray-700">
        Адмін панель
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {adminNavItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
