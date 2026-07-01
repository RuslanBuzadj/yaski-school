import { routes } from '@/config/navigation'
import type { StaffMember } from '@/entities/staff'
import { StaffProfile } from '@/entities/staff'
import { PageBreadcrumb } from '@/widgets/breadcrumb'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
	member: StaffMember
}

export function StaffProfilePage({ member }: Props) {
	return (
		<section className='py-16 sm:py-20'>
			<div className='max-w-5xl mx-auto px-4 sm:px-6'>
				<PageBreadcrumb
					items={[
						{ label: 'Колектив', href: routes.staff },
						{ label: member.name },
					]}
				/>
				<Link
					href={routes.staff}
					className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8'
				>
					<ArrowLeft className='h-4 w-4' />
					Весь колектив
				</Link>
				<StaffProfile member={member} />
			</div>
		</section>
	)
}
