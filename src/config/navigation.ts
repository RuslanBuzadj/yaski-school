export const routes = {
  home: "/",
  about: "/about",
  news: "/news",
  events: "/events",
  activities: "/activities",
  staff: "/staff",
  gallery: "/gallery",
  contacts: "/contacts",
  admin: {
    root: "/admin",
    news: "/admin/news",
    events: "/admin/events",
    activities: "/admin/activities",
    staff: "/admin/staff",
    staffNew: "/admin/staff/new",
    staffEdit: (id: number | string) => `/admin/staff/${id}/edit`,
    gallery: "/admin/gallery",
    login: "/admin/login"
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const publicNavItems: NavItem[] = [
  { href: routes.about, label: "Про нас" },
  { href: routes.news, label: "Новини" },
  { href: routes.events, label: "Події" },
  { href: routes.activities, label: "Діяльність" },
  { href: routes.staff, label: "Колектив" },
  { href: routes.gallery, label: "Галерея" },
  { href: routes.contacts, label: "Контакти" },
];

export const adminNavItems: NavItem[] = [
  { href: routes.admin.root, label: "Панель керування" },
  { href: routes.admin.news, label: "Новини" },
  { href: routes.admin.events, label: "Події" },
  { href: routes.admin.activities, label: "Діяльність" },
  { href: routes.admin.staff, label: "Колектив" },
  { href: routes.admin.gallery, label: "Галерея" },
];
