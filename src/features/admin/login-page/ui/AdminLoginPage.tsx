import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { routes } from "@/config/navigation";
import type { GalleryAlbum } from "@/entities/gallery";
import { GalleryGrid } from "@/entities/gallery";
import { PageBreadcrumb } from "@/widgets/breadcrumb";



export function AdminLogin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <LoginForm /> */}
      </div>
    </div>
  );
}
