# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test runner is configured yet.

## Stack

- **Next.js 16** (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code; this version has breaking changes from training data
- **React 19** with React Compiler (`babel-plugin-react-compiler`) — manual memoization (`useMemo`, `useCallback`, `memo`) is unnecessary
- **Tailwind CSS v4** — config-free, no `tailwind.config.*` file
- **shadcn** (v4) + **Radix UI** — component primitives
- **TypeScript** strict mode

## Architecture

This project follows **Feature-Sliced Design (FSD)**. Code is organized into layers, each with its own path alias:

```
src/
├── app/        # @/app/*      — Next.js routes, layouts (composition root)
├── widgets/    # @/widgets/*  — composed page sections (Header, Footer, Breadcrumb, HomePage sections, AdminSidebar, ThemeProvider, DataTable)
├── features/   # @/features/* — user-facing feature slices (e.g. home-page, staff-page, news-page, gallery-page, admin/login-page)
├── entities/   # @/entities/* — domain models + their UI (news, staff, gallery, school)
└── shared/     # @/shared/*   — generic UI primitives, lib/utils, no domain knowledge
```

Layer rule: a slice may only import from layers below it (`app` → `widgets` → `features` → `entities` → `shared`), never sideways or up. There's no lint rule enforcing this yet — hold the line manually.

Each slice exposes its public API through `index.ts` (e.g. `src/entities/staff/index.ts` re-exports `StaffCard`, `mockStaff`, `StaffMember`) — import from the slice root (`@/entities/staff`), not deep paths, except where a slice has no barrel yet (e.g. `widgets/header`, `widgets/admin-sidebar` are currently imported by direct file path). Admin-only features live under a `features/admin/` sub-namespace (e.g. `features/admin/login-page`, `features/admin/staff-page`).

Within a slice, conventional subfolders are `ui/` (components) and `model/` (types, mock data, business logic, form schemas, column defs).

### Admin CRUD feature pattern

`features/admin/staff-page` is the reference implementation for an admin CRUD slice — copy its shape when building out `news`, `events`, `activities`, or `gallery` admin management (those routes currently render placeholder pages):

- `model/schema.ts` — zod object schema (`staffFormSchema`), inferred `*FormValues` type, `*DefaultValues`, and a `memberToFormValues` mapper from the entity type to form values.
- `model/use-staff-columns.tsx` — a `useXColumns()` hook returning `ColumnDef[]` for `@/widgets/data-table`, including a row-actions cell (dropdown with edit link + destructive delete, delete currently a `TODO` pending backend).
- `ui/StaffForm.tsx` — the shared form used by both create and edit, built on `react-hook-form` + `zodResolver`, `Field`/`FieldGroup`/`FieldLabel`/`FieldError` from shadcn, and driven by a `mode: "create" | "edit"` prop rather than duplicating the form.
- `ui/AdminStaffPage.tsx`, `ui/CreateStaffPage.tsx`, `ui/EditStaffPage.tsx` — thin page-level wrappers rendered by the matching `app/admin/(sidebar-layout)/staff/**/page.tsx` route.

Known gotcha: `@hookform/resolvers@5.4.0`'s zod v4 typings pin an internal core-version marker older than `zod@4.4.x`, so `zodResolver(schema)` mismatches structurally at the type level only (`resolver: zodResolver(schema as never) as unknown as Resolver<FormValues>`) — runtime behavior is unaffected. Don't try to "fix" this by downgrading zod.

### Route groups

```
src/app/
├── (public)/               # user-facing site — has Header, yellow nav
│   ├── layout.tsx
│   ├── about/
│   ├── news/
│   ├── events/
│   ├── activities/
│   ├── staff/
│   ├── gallery/
│   └── contacts/
├── admin/                   # admin panel — no wrapping route group, all routes under /admin/*
│   ├── login/                # /admin/login — outside the sidebar layout (no sidebar/header chrome)
│   └── (sidebar-layout)/     # everything else — has sidebar, dark theme
│       ├── layout.tsx
│       ├── page.tsx          # /admin
│       ├── news/
│       ├── events/
│       ├── activities/
│       ├── staff/            # /admin/staff — full CRUD (list, new, [id]/edit); reference for the rest
│       │   ├── new/
│       │   └── [id]/edit/
│       └── gallery/
├── layout.tsx               # root layout only (html/body/fonts)
└── page.tsx                 # home page (no group)
```

`(public)` and `(sidebar-layout)` are route groups (invisible in URLs); `admin/` is a plain segment (visible as `/admin`). The public and admin sections have completely separate layouts — do not add shared UI to the root `layout.tsx`. `/admin/login` intentionally sits outside `(sidebar-layout)` so the login screen renders without the sidebar/header chrome.

### Navigation config

`src/config/navigation.ts` is the single source of truth for all routes and nav links:

- `routes` — typed `as const` object with all URL paths. **Always import from here** — never hardcode path strings like `"/about"` in components.
- `publicNavItems` / `adminNavItems` — nav arrays built from `routes`, consumed by `Header` and `AdminSidebar`.

When adding a route: add the path to `routes` first, then reference it in the appropriate nav array.

### Shared utilities

`src/shared/lib/utils.ts` exports `cn()` (clsx + tailwind-merge). Always use it for conditional class names.

### Shared UI components

shadcn/Radix components live in `src/shared/ui/` (not `src/components/`), installed with `style: "radix-nova"` (`components.json`). Primitives available: `Button`, `Card`, `Input`, `InputGroup`, `PasswordInput`, `Textarea`, `Checkbox`, `Label`, `Field`, `Table`, `Pagination`, `Sidebar`, `Sheet`, `Skeleton`, `Tooltip`, `Popover`, `DropdownMenu`, `Breadcrumb`, `Separator`, `Avatar`, `ImagePlaceholder`, `Sonner` (toast), `Attachment`, `FileUpload`, and `Empty` (empty-state compound component).

`components.json` registers an extra component registry, `@diceui`, alongside the default shadcn one — `TagsInput` was installed from there (`pnpm dlx shadcn@latest add @diceui/tags-input`). Check both registries before hand-rolling a primitive.

Two higher-level, domain-flavored primitives compose the above rather than duplicating them:

- `UploadPhoto` (`@/shared/ui/upload-photo`) — a single-file circular avatar-style uploader built on `FileUpload`; used for staff/entity photos.
- `TextEditor` (`@/shared/ui/text-editor`, default export) — a CKEditor 5 Classic Editor wrapper (`@ckeditor/ckeditor5-react`). It's client-only: always import it with `next/dynamic(..., { ssr: false })`, never directly. Its upload adapter (`@/shared/lib/plugins/fileUploader.ts`) is currently a stub that throws — wire it to a real upload endpoint before shipping image uploads through the editor. License key is set to `"GPL"`.

`DataTable` (`@/widgets/data-table`) composes `Table` + `Pagination` into a stateful, paginated table widget (TanStack Table's `getPaginationRowModel`) — it lives in `widgets`, not `shared/ui`, because it owns pagination state rather than being a plain primitive.

### Shared hooks

`src/shared/lib/hooks/` holds framework-level hooks installed alongside shadcn components (`use-mobile`, `use-as-ref`, `use-lazy-ref`, `use-isomorphic-layout-effect`) — these back other shared UI components (e.g. `TagsInput`/`FileUpload` internals); treat them as vendored primitives, not app code to refactor freely.

### Forms

Admin forms use `react-hook-form` + `zod` + `@hookform/resolvers/zod`, with validation errors surfaced via the shadcn `Field`/`FieldError` components. See [Admin CRUD feature pattern](#admin-crud-feature-pattern) above for the full shape and a known resolver typing gotcha.

### Providers

Root `layout.tsx` wraps everything in `ThemeProvider` (next-themes, `attribute="class"`) and `TooltipProvider`. No other global providers needed.

### Path aliases

`@/*` maps to `src/*`, plus one alias per FSD layer (`@/app/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`) — see `tsconfig.json`. shadcn is configured (`components.json`) to install new components under `@/shared/ui`, `@/shared/lib`, `@/shared/lib/hooks`.
