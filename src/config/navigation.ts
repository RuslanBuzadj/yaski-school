export const routes = {
  home: "/",
  about: "/about",
  aboutSection: (slug: string) => `/about/${slug}`,
  news: "/news",
  events: "/events",
  activities: "/activities",
  staff: "/staff",
  gallery: "/gallery",
  contacts: "/contacts",
  admin: {
    root: "/admin",
    about: "/admin/about",
    aboutNew: "/admin/about/new",
    aboutEdit: (slug: string) => `/admin/about/${slug}/edit`,
    news: "/admin/news",
    newsNew: "/admin/news/new",
    newsEdit: (id: number | string) => `/admin/news/${id}/edit`,
    events: "/admin/events",
    eventsNew: "/admin/events/new",
    eventsEdit: (id: number | string) => `/admin/events/${id}/edit`,
    activities: "/admin/activities",
    staff: "/admin/staff",
    staffNew: "/admin/staff/new",
    staffEdit: (id: number | string) => `/admin/staff/${id}/edit`,
    gallery: "/admin/gallery",
    galleryNew: "/admin/gallery/new",
    galleryEdit: (id: number | string) => `/admin/gallery/${id}/edit`,
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
  { href: routes.admin.about, label: "Про заклад" },
  { href: routes.admin.news, label: "Новини" },
  { href: routes.admin.events, label: "Події" },
  { href: routes.admin.activities, label: "Діяльність" },
  { href: routes.admin.staff, label: "Колектив" },
  { href: routes.admin.gallery, label: "Галерея" },
];
