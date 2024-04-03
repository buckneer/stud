import { Helmet } from "react-helmet";
import React, {ChangeEvent, HTMLProps, useEffect, useMemo, useState} from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import { Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, User } from "lucide-react";

import { Exam } from "../../../app/api/types/types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useGetAvailableExamsQuery } from "../../../app/api/examApiSlice";
import {useAddStudentExamsMutation} from "../../../app/api/studentApiSlice";
import Table, {IExam} from "../../../components/Table/Table";



function StudentHome() {
	const { uni } = useParams();
	const session = useSelector((state: RootState) => state.session);
	const [selectedData, setSelectedData] = useState(0);
	const [examsToAdd, setExamsToAdd] = useState<string[]>([]);
	const [exams, setExams] = useState<IExam[]>([]);

	const handleDataChange = (changeTo: number) => {
		setSelectedData(changeTo);
	}
	const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			console.log(e.target.name);
			setExamsToAdd((prevState : string[]) => [...prevState, e.target.name]);
		} else {
			setExamsToAdd((prevState : string[]) => prevState.filter(name => name !== e.target.name))
		}
	}


	const cols = ["Kod", "Semestar", "Predmet", "Profesor", "Datum", "Prijava"]

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



		try {
			let body = {
				student: session.user._id,
				body: {exams: examsToAdd}
			} // add exam ID's here;
			await addExams(body)
		} catch (e: any) {
			console.error(e);
		}
		// TODO add mutation

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
					<Table data={exams} setExams={setExamsToAdd} cols={cols}>
						{exams.length !== 0 ? exams.map(row => (
								<tr>
									<td className="py-2">{row.code}</td>
									<td>{row.semester}</td>
									<td>{row.subject}</td>
									<td>{row.professor}</td>
									<td>{row.date}</td>
									<td>
										<input
											type="checkbox"
											className="rounded-2xl checked:bg-black size-4 checked:border-0"
											name={row._id}
											onChange={handleCheck}
										/>
									</td>
								</tr>
						)) : (<div className="p-5 font-black">Nema Ispita</div> )}
					</Table>
				</div>
				<div className="flex justify-end p-5">
					<div className="bg-slate-100 rounded-2xl px-3 py-2 font-bold cursor-pointer transition-all hover:bg-white hover:border-black border-[1px] border-slate-100" onClick={() => { handleSend() }}>Prijavi izabrane ispite</div>
				</div>
			</>
	}

	useEffect(() => {
		if(examData) {
			let tempExam: IExam[] = [];

			examData.map((item: any) => {
				let newExam: IExam = {
					_id: item._id,
					code: item.subject.code,
					professor: item.professor._id,
					subject: item.subject?.name,
					date: item.date,
					semester: item.subject?.semester!,
				}

				tempExam.push(newExam);
			});

			setExams(tempExam);

		}

		console.log(examData);
	}, [ isExamSuccess, isExamLoading ]);

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
						<SidebarItem name="Ispitni Rokovi" active={selectedData == 0} to={0} changeData={handleDataChange} Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" active={selectedData == 1} to={1} changeData={handleDataChange} Icon={LayoutList} />
						<SidebarItem name="Predmeti" active={selectedData == 2} to={2} changeData={handleDataChange} Icon={Book} />
					</div>
				</Sidebar>
			</div>
		</div>
	);
}


export default StudentHome
