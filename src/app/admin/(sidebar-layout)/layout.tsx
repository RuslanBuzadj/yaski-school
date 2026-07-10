import { redirect } from 'next/navigation'
import { routes } from '@/config/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar'
import AdminHeader from '@/widgets/admin-sidebar/AdminHeader'
import AdminSidebar from '@/widgets/admin-sidebar/AdminSidebar'

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = await createClient()
	const { data } = await supabase.auth.getClaims()

	if (!data?.claims) {
		redirect(routes.admin.login)
	}

	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarInset >
				<AdminHeader email={data.claims.email as string} />
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
