import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar'
import AdminHeader from '@/widgets/admin-sidebar/AdminHeader'
import AdminSidebar from '@/widgets/admin-sidebar/AdminSidebar'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarInset >
				<AdminHeader />
				<div className='flex min-h-0 flex-1 flex-col'>
					<div className='@container/main flex min-h-0 flex-1 flex-col gap-2'>
						<div className='flex min-h-0 flex-1 flex-col gap-4 p-4 md:p-8'>
							{children}
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
