'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/shared/ui/pagination'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pageSize?: number
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageSize = 8,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize },
		},
	})

	const pageCount = table.getPageCount()
	const pageIndex = table.getState().pagination.pageIndex

	return (
		<div className='flex min-h-0 flex-1 flex-col gap-4'>
			<div className='min-h-0 flex-1 overflow-auto rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{pageCount > 1 && (
				<div className='shrink-0 border-t bg-background py-3'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									className={
										!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : undefined
									}
									onClick={event => {
										event.preventDefault()
										table.previousPage()
									}}
								/>
							</PaginationItem>
							{Array.from({ length: pageCount }, (_, index) => index).map(index => (
								<PaginationItem key={index}>
									<PaginationLink
										href='#'
										isActive={index === pageIndex}
										onClick={event => {
											event.preventDefault()
											table.setPageIndex(index)
										}}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									href='#'
									className={
										!table.getCanNextPage() ? 'pointer-events-none opacity-50' : undefined
									}
									onClick={event => {
										event.preventDefault()
										table.nextPage()
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	)
}
