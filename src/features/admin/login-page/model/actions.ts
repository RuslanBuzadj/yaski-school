"use server";

import { redirect } from "next/navigation";
import { routes } from "@/config/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { type LoginFormValues, loginFormSchema } from "./schema";

export async function login(values: LoginFormValues): Promise<{ error: string } | undefined> {
  const parsed = loginFormSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Перевірте правильність введених даних" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "Невірна електронна пошта або пароль" };
  }

  redirect(routes.admin.root);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routes.admin.login);
}
