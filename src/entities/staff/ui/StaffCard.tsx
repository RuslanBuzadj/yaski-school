import { routes } from '@/config/navigation'
import { Button } from '@/shared/ui/button'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import Link from 'next/link'
import type { StaffMember } from '../model/types'

type Props = {
	member: StaffMember
}

export function StaffCard({ member }: Props) {
	return (
		<div className='flex flex-col items-center text-center gap-3'>
			<div className='relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted'>
				<ImagePlaceholder src={member.image} alt={member.name} fill />
			</div>
			<div className='flex flex-col items-center gap-2'>
				<h3 className='font-semibold text-sm text-foreground leading-snug'>
					{member.name}
				</h3>
				<p className='text-xs text-muted-foreground leading-snug line-clamp-3'>
					{member.role}
				</p>
				<Button asChild variant='yellow' size='xs'>
					<Link href={`${routes.staff}/${member.id}`}>докладніше</Link>
				</Button>
			</div>
		</div>
	)
}
