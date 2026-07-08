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

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}
