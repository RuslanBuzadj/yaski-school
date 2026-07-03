import AdminHeader from "@/widgets/admin-sidebar/AdminHeader";
import AdminSidebar from "@/widgets/admin-sidebar/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
