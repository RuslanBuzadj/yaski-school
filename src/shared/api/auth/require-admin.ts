import "server-only";
import { createClient } from "@/shared/lib/supabase/server";

export class UnauthorizedError extends Error {
  constructor() {
    super("Потрібна авторизація");
    this.name = "UnauthorizedError";
  }
}

/**
 * Guards a Server Action's mutation. Server Functions are reachable via
 * direct POST requests, not just through the app's UI, so every mutating
 * action must verify the caller's session itself.
 */
export async function requireAdmin(): Promise<void> {
  const supabase = await createClient();
  
  // getClaims() verifies the JWT signature, unlike getSession() which trusts
  // the (spoofable) cookie contents — same reasoning as supabase/proxy.ts.
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    throw new UnauthorizedError();
  }
}
