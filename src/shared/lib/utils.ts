import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isActiveRoute(pathname: string | null | undefined, href: string, rootHref: string) {
  if (pathname == null) return false
  return href === rootHref ? pathname === href : pathname.startsWith(href)
}

export function findById<T extends { id: number }>(list: T[], id: string): T | undefined {
  return list.find((item) => String(item.id) === id)
}

export function toIdParams<T extends { id: number }>(list: T[]): { id: string }[] {
  return list.map((item) => ({ id: String(item.id) }))
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh",
  з: "z", и: "y", і: "i", ї: "i", й: "i", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ю: "iu", я: "ia", ь: "", "'": "",
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function findBySlug<T extends { slug: string }>(list: T[], slug: string): T | undefined {
  return list.find((item) => item.slug === slug)
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}
