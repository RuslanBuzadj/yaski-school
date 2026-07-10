import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrate/db push need a session-capable connection for schema locks;
    // the transaction pooler (DATABASE_URL, port 6543) hangs on these, so
    // the CLI uses the session pooler (port 5432) here instead. The app's
    // PrismaClient (src/shared/lib/prisma.ts) still uses DATABASE_URL.
    url: env("DIRECT_URL"),
  },
});
