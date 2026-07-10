import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/navigation";
import { updateSession } from "@/shared/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { response, claims } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith(routes.admin.root);
  const isLoginRoute = pathname === routes.admin.login;

  if (isAdminRoute && !isLoginRoute && !claims) {
    return NextResponse.redirect(new URL(routes.admin.login, request.url));
  }

  if (isLoginRoute && claims) {
    return NextResponse.redirect(new URL(routes.admin.root, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
