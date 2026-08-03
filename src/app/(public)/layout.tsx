import Header from "@/widgets/header/Header";
import { Footer } from "@/widgets/footer";
import { createClient } from "@/shared/lib/supabase/server";
import { getSiteSettings } from "@/entities/school/api/queries";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const [{ data }, settings] = await Promise.all([supabase.auth.getClaims(), getSiteSettings()]);

  return (
    <>
      <Header adminEmail={(data?.claims.email as string) ?? null} siteName={settings.name} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
