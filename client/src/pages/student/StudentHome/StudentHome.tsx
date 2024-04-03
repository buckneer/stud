import { Helmet } from "react-helmet";
import React, { HTMLProps, useEffect, useState } from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import { Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, User } from "lucide-react";

import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
	useReactTable,
	Table,
	Column
} from '@tanstack/react-table'
import { Exam } from "../../../app/api/types/types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useGetAvailableExamsQuery } from "../../../app/api/examApiSlice";
import {useAddStudentExamsMutation} from "../../../app/api/studentApiSlice";



type TExam = {
	_id: string;
	code: string;
	subject: string;
	professor: string;
	semester?: string;
	date?: string;
}

function StudentHome() {
	const { uni } = useParams();
	const session = useSelector((state: RootState) => state.session);
	const [selectedData, setSelectedData] = useState(0);
	const [exams, setExams] = useState<string[]>([]);

	const [rowSelection, setRowSelection] = React.useState({});


	const [data, setData] = useState<TExam[]>([]);


	const columns = React.useMemo<ColumnDef<TExam>[]>(
		() => [
			{
				accessorFn: row => row.code,
				id: 'code',
				cell: info => info.getValue(),
				header: () => <span>Kod</span>,
			},
			{
				accessorFn: row => row.subject,
				id: 'subject',
				cell: info => info.getValue(),
				header: () => <span>Predmet</span>,
			},
			{
				accessorFn: row => row.professor,
				id: 'professor',
				cell: info => info.getValue(),
				header: () => <span>Profesor</span>,
			},
			{
				id: 'select',
				header: ({ table }) => (
					<>Izaberi?</>
				),
				cell: ({ row }) => (
					<div className="px-">
						<IndeterminateCheckbox className="rounded-full"
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
		],
		[]
	)

	const table = useReactTable({
		data: data || [],
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


	// FIXME:
	const {
		data: examData,
		isLoading: isExamLoading,
		isSuccess: isExamSuccess,
		isError: isExamError,
	} = useGetAvailableExamsQuery({ university: uni, id: session.user._id });

	const [
		addExams,
		examsState
	] = useAddStudentExamsMutation();

	const handleSend = async () => {

		let exams = Object.keys(rowSelection).map(item => data[parseInt(item)]._id);

		try {
			let body = {
				student: session.user._id,
				body: {exams}
			} // add exam ID's here;
			await addExams(body)
		} catch (e: any) {
			console.error(e);
		}
		// TODO add mutation
		console.log(exams);
	}

	let content: any;

	if (isExamLoading) {
		content = <Loader />
	} else if (isExamSuccess) {
		content =
			<>
				<div className="list-header flex justify-between p-5 ">
					<StudTitle text={"Januarsko-Februarski ispitni rok"} />
					<div className="search-container">
						<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
					</div>
				</div>
				<div className="w-full flex justify-center">
					{/*<Table setExams={setExams} />*/}
					<div className="table-container w-full m-5 border-2 border-slate-200 rounded-2xl overflow-hidden">
						<table className="w-full">
							<thead className="bg-slate-200 py-2">
							{table.getHeaderGroups().map(headerGroup => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map(header => {
										return (
											<th className="py-2 font-black"  key={header.id} colSpan={header.colSpan}>
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
									<tr className="text-center border-b-[1px] border-slate-200" key={row.id}>
										{row.getVisibleCells().map(cell => {
											return (
												<td className="py-2" key={cell.id}>
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
				</div>
				<div className="flex justify-end p-5">
					<div className="bg-slate-100 rounded-2xl px-3 py-2 font-bold cursor-pointer transition-all hover:bg-white hover:border-black border-[1px] border-slate-100" onClick={() => { handleSend() }}>Prijavi izabrane ispite</div>
				</div>
			</>
	}

	useEffect(() => {
		if(examData) {
			let tempExam: TExam[] = [];

			examData.map((item: any) => {
				let newExam: TExam = {
					_id: item._id,
					code: item.subject.code,
					professor: item.professor._id,
					subject: item.subject?.name,
					date: item.date,
					semester: item.subject?.semester!,
				}

				tempExam.push(newExam);
			});

			setData(tempExam);

		}
	}, [ isExamSuccess ]);

	return (
		<div className="bg-white">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>
			<div className="flex h-full">
				<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
					{content}
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
