import {Helmet} from "react-helmet";
import React, {HTMLProps, useState} from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import {Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, User} from "lucide-react";

import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
	useReactTable,
	Table,
	Column
} from '@tanstack/react-table'
import {Exam} from "../../../app/api/types/types";



type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}

const defaultData: Exam[] = [
	{
		date: '12.07.2024'
	},
	{
		date: '12.07.2024'
	},
	{
		date: '12.07.2024'
	},
	{
		date: '12.07.2024'
	},
]



function StudentHome() {



	const [selectedData, setSelectedData] = useState(0);
	const [exams, setExams] = useState<string[]>([]);

	const [rowSelection, setRowSelection] = React.useState({})
	const [globalFilter, setGlobalFilter] = React.useState('');

	const [data, setData] = React.useState([...defaultData])


	const columns = React.useMemo<ColumnDef<Exam>[]>(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<IndeterminateCheckbox
						{...{
							checked: table.getIsAllRowsSelected(),
							indeterminate: table.getIsSomeRowsSelected(),
							onChange: table.getToggleAllRowsSelectedHandler(),
						}}
					/>
				),
				cell: ({ row }) => (
					<div className="px-1">
						<IndeterminateCheckbox
							{...{
								checked: row.getIsSelected(),
								disabled: !row.getCanSelect(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler(),
							}}
						/>
					</div>
				),
			},
			{
				accessorFn: row => row.date,
				id: 'date',
				cell: info => info.getValue(),
				header: () => <span>Last Name</span>,
			},
		],
		[]
	)

	const table = useReactTable({
		data,
		columns,
		state: {
			rowSelection,
		},
		enableRowSelection: true, //enable row selection for all rows
		// enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
	})

	const handleDataChange = (changeTo: number) => {
		setSelectedData(changeTo);
	}



	const handleSend = () => {

		// TODO add mutation
		console.log(exams);
	}

	return (
		<div className="bg-white">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>
			<div className="flex h-full">
				<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
					<div className="list-header flex justify-between p-5 ">
						<StudTitle text={"Januarsko-Februarski ispitni rok"} />
						<div className="search-container">
							<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
						</div>
					</div>
					<div className="w-full">
						{/*<Table setExams={setExams} />*/}
						<table>
							<thead>
							{table.getHeaderGroups().map(headerGroup => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map(header => {
										return (
											<th key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder ? null : (
													<>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}

													</>
												)}
											</th>
										)
									})}
								</tr>
							))}
							</thead>
							<tbody>
							{table.getRowModel().rows.map(row => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map(cell => {
											return (
												<td key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											)
										})}
									</tr>
								)
							})}
							</tbody>
						</table>
					</div>
					<div className="flex justify-end p-5">
						<div className="bg-slate-100 rounded-2xl px-3 py-2 font-bold cursor-pointer transition-all hover:bg-white hover:border-black border-[1px] border-slate-100" onClick={() => {handleSend()}}>Prijavi izabrane ispite</div>
					</div>
				</div>
				<Sidebar>
					<div className="pt-1">
						<SidebarItem name="Ispitni Rokovi" Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" Icon={LayoutList} />
						<SidebarItem name="Predmeti" Icon={Book} />
					</div>
				</Sidebar>
			</div>
		</div>
	);
}

function IndeterminateCheckbox({
	                               indeterminate,
	                               className = '',
	                               ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
	const ref = React.useRef<HTMLInputElement>(null!)

	React.useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = !rest.checked && indeterminate
		}
	}, [ref, indeterminate])

	return (
		<input
			type="checkbox"
			ref={ref}
			className={className + ' cursor-pointer'}
			{...rest}
		/>
	)
}


export default StudentHome
