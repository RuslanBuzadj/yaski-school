# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
# npm run dev      # dev server (localhost:3000)
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

### Route groups

```
src/app/
├── (public)/          # user-facing site — has Header, yellow nav
│   ├── layout.tsx
│   ├── about/
│   ├── news/
│   ├── events/
│   ├── activities/
│   ├── staff/
│   ├── gallery/
│   └── contacts/
├── (admin)/           # admin panel — has sidebar, dark theme
│   ├── layout.tsx
│   └── admin/         # all admin routes live under /admin/*
├── layout.tsx         # root layout only (html/body/fonts)
└── page.tsx           # home page (no group)
```

Route groups `(public)` and `(admin)` are invisible in URLs. The two groups have completely separate layouts — do not add shared UI to the root `layout.tsx`.

### Navigation config

`src/config/navigation.ts` is the single source of truth for all routes and nav links:

- `routes` — typed `as const` object with all URL paths. **Always import from here** — never hardcode path strings like `"/about"` in components.
- `publicNavItems` / `adminNavItems` — nav arrays built from `routes`, consumed by `Header` and `AdminSidebar`.

When adding a route: add the path to `routes` first, then reference it in the appropriate nav array.

### Shared utilities

`src/shared/lib/utils.ts` exports `cn()` (clsx + tailwind-merge). Always use it for conditional class names.

### Shared UI components

shadcn/Radix components live in `src/shared/ui/` (not `src/components/`). Primitives available: `Button`, `Card`, `Input`, `Table`, `Sidebar`, `Sheet`, `Skeleton`, `Tooltip`, `Popover`, `DropdownMenu`, `Breadcrumb`, `Separator`, `Avatar`, and `Empty` (empty-state compound component).

### Providers

Root `layout.tsx` wraps everything in `ThemeProvider` (next-themes, `attribute="class"`) and `TooltipProvider`. No other global providers needed.

### Path alias

`@/` maps to `src/`. Use it for all imports.
