# AGENTS.md

## Development Environment

* The local development server is assumed to be running at **http://127.0.0.1:3000**.
* **Never** start, restart, or stop the development server unless the user explicitly asks you to do so.
* Before interacting with the frontend, use the existing server on port **3000**.
* If the server does not respond within **5 seconds**, report that it is unavailable and continue the task without attempting to launch it.

---

## Project Documentation

Before starting work:

1. Read `CLAUDE.md`.
2. Follow all project conventions described there.
3. If you find inconsistencies, outdated information, or architectural issues:

   * point them out;
   * explain why they are problematic;
   * propose concrete improvements.
4. If everything is clear and no changes are required, append any newly relevant project knowledge to `CLAUDE.md` at the end of your work so the documentation stays up to date.

---

## Architecture Principles

Build solutions that are intended for long-term use.

* Do **not** use or suggest the term **MVP**.
* Design components and features to be:

  * scalable;
  * reusable;
  * secure;
  * maintainable;
  * architecturally consistent.
* Think beyond the current task and avoid introducing decisions that make future extension difficult.
* The user will explicitly define implementation boundaries when necessary.

---

## Code Quality

Follow the **DRY** principle.

Before implementing new functionality:

* search the existing codebase for similar implementations;
* reuse existing utilities, hooks, components, helpers, and styles whenever possible;
* avoid duplicating business logic.

If an existing abstraction can be reasonably extended instead of creating a new one, prefer extending it.

---

## UI Components

Before creating custom UI:

1. Check whether the project already contains an appropriate component.
2. If the project uses **shadcn/ui**:

   * verify whether the required component already exists in shadcn;
   * if it exists but is not installed, install it using either:

     * the project's MCP integration; or
     * `pnpm dlx shadcn@latest add <component>` (or the project's package manager equivalent).
3. If an existing component is missing required variants, sizes, or other capabilities, extend the existing component instead of creating a duplicate.

---

## Code Comments

Write comments where they improve maintainability.

Comments should explain:

* architectural decisions;
* non-obvious implementation details;
* important constraints;
* reasoning behind complex logic.

Avoid comments that merely restate what the code already makes obvious.


<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

