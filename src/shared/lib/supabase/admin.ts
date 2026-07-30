import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS/storage policies entirely.
 * Only for trusted server code (Server Actions, queries). Never import
 * this from a "use client" file: it would leak SUPABASE_SERVICE_ROLE_KEY.
 */
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
