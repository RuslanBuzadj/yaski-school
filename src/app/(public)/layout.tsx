import Header from "@/widgets/header/Header";
import { Footer } from "@/widgets/footer";
import { createClient } from "@/shared/lib/supabase/server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <>
      <Header adminEmail={(data?.claims.email as string) ?? null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
