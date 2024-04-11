import Table, {IExam} from "../../../components/Table/Table";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useGetAvailableExamsQuery} from "../../../app/api/examApiSlice";
import {useAddStudentExamsMutation} from "../../../app/api/studentApiSlice";
import {Session} from "../../../app/api/types/types";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import TD from "../../../components/Table/TableColumn";
import { useGetActivePeriodQuery } from "../../../app/api/periodApiSlice";

export interface IExamPeriod {
	session: Session,
	uni?: string;
}

function ExamPeriod({session, uni} : IExamPeriod) {
	const [exams, setExams] = useState<IExam[]>([]);

	const [examsToAdd, setExamsToAdd] = useState<string[]>([]);
	const cols = ["Kod", "Semestar", "Predmet", "Profesor", "Datum", "Prijava"]

	const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			console.log(e.target.name);
			setExamsToAdd((prevState : string[]) => [...prevState, e.target.name]);
		} else {
			setExamsToAdd((prevState : string[]) => prevState.filter(name => name !== e.target.name))
		}
	}


	const {
		data: examData,
		isLoading: isExamLoading,
		isSuccess: isExamSuccess,
		isError: isExamError,
	} = useGetAvailableExamsQuery({ university: uni, id: session.user._id });

	const {
		data: activeExamData,
		isLoading: isAcExamLoading,
		isSuccess: isAcExamSuccess,
		isError: isAcExamError
	} = useGetActivePeriodQuery(uni!);

	const [
		addExams,
		examsState
	] = useAddStudentExamsMutation();

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

	const handleSend = async () => {

		try {
			let body = {
				university: uni!,
				student: session.user._id,
				body: {exams: examsToAdd}
			} // add exam ID's here;
			await addExams(body);
		} catch (e: any) {
			console.error(e);
		}
		// TODO add mutation

	}


	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
			<div className="list-header flex justify-between p-5 ">
				{ isAcExamLoading && <Loader /> }
				{ 
					<StudTitle text={isAcExamSuccess && activeExamData?.name ? activeExamData.name : 'Nema ispitnog roka...'} />
				}
				
				<div className="search-container">
					<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
				</div>
			</div>
			<div className="w-full flex justify-center">
				{isExamLoading && (<Loader />)}
				{isExamSuccess && (
					<Table cols={cols}>
						{exams.length !== 0 ? exams.map(row => (
							<tr key={row._id} className={`${examsToAdd.includes(row._id!) ? 'bg-slate-100' : ''} `}>
								<TD>{row.code}</TD>
								<TD>{row.semester}</TD>
								<TD>{row.subject}</TD>
								<TD>{row.professor}</TD>
								<TD>{row.date}</TD>
								<TD>
									<input
										type="checkbox"
										className="rounded-2xl checked:bg-black size-4 checked:border-0"
										name={row._id}
										onChange={handleCheck}
									/>
								</TD>
							</tr>
						)) : (<div className="p-5 font-black">Nema Ispita</div> )}
					</Table>
				)}
			</div>
			<div className="flex justify-center p-5">
				<div className="bg-green-600
					shadow-xl
					text-white
					rounded-full
					px-3 py-2
					font-black
					cursor-pointer
					transition-all

					hover:bg-green-800


					disabled:bg-gray-500
					disabled:cursor-not-allowed
					disabled:shadow-none
					disabled:text-white" onClick={() => { handleSend() }}>Prijavi izabrane ispite</div>
			</div>
		</div>
	);
}

export default ExamPeriod
