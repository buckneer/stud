import {Session, Subject} from "../../../app/api/types/types";
import StudTitle from "../../../components/StudTitle/StudTitle";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useGetAvailableSubjectsQuery} from "../../../app/api/subjectApiSlice";
import Table from "../../../components/Table/Table";
import Loader from "../../../components/Loader/Loader";
import {useGetAvailableOptionalsQuery} from "../../../app/api/optionalApiSlice";
import {ChevronRight} from "lucide-react";
import './animations.css';
import TD from "../../../components/Table/TableColumn";
import {useAddSubjectsToStudentMutation} from "../../../app/api/studentApiSlice";


export interface ISubjectSelect {
	session: Session,
	uni?: string;
}


// TODO add dynamic dep
const DEPARTMENT = "6605f8297f00428286bf2836";

function SubjectSelect({session, uni} : ISubjectSelect) {

	const cols = ["Kod", "Naziv", "Profesor", "Tip", "ESPB", "Izaberi"];
	const [subjectsToAdd, setSubjectsToAdd] = useState<string[]>([]);
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [optionalSubjects, setOptionalSubjects] = useState<Subject[]>([]);
	const [totalEspb, setTotalEspb] = useState(0);
	const [displayedTotal, setDisplayedTotal] = useState(0);
	const [activeDropdown, setActiveDropdown] = useState<string[]>([]);

	const {
		data: availableSub,
		isLoading: isSubjLoading,
		isSuccess: isSubjSuccess,
		isError: isSubjError
		// @ts-ignore
	} = useGetAvailableSubjectsQuery({university: uni!, department: DEPARTMENT});

	const {
		data: optionalBlocks,
		isLoading: isOptionalBlockLoading,
		isSuccess: isOptionalBlockSuccess,
		isError: isOptionalBlockError
	} = useGetAvailableOptionalsQuery({university: uni!, department: DEPARTMENT});

	const [
		addSubjects,
		{
			isLoading: isAddSubjectsLoading,
			isError: isAddSubjectsError,
			isSuccess: isAddSubjectsSuccess
		}
	] = useAddSubjectsToStudentMutation();

	useEffect(() => {
		const interval = setInterval(() => {
			if (displayedTotal < totalEspb) {
				setDisplayedTotal(prevTotal => prevTotal + 1);
			} else if (displayedTotal > totalEspb) {
				setDisplayedTotal(prevTotal => prevTotal - 1);
			}
		}, 10);

		return () => clearInterval(interval);
	}, [totalEspb, displayedTotal]);


	const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
		const espbValue = parseInt(e.target.value);
		if (e.target.checked) {
			setSubjectsToAdd(prevState => [...prevState, e.target.name]);
			setTotalEspb(prevState => prevState + espbValue);
		} else {
			setSubjectsToAdd(prevState => prevState.filter(name => name !== e.target.name));
			setTotalEspb(prevState => prevState - espbValue);
		}
	};



	useEffect(() => {
		if(availableSub) {
			let reqSubjects: Subject[] = [];
			let optSubjects: Subject[] = [];
			availableSub.map(subj => {
				if(subj.type === "R") reqSubjects.push(subj);
				if(subj.type === "O") optSubjects.push(subj);
			});

			setSubjects(reqSubjects);
			setOptionalSubjects(optSubjects);
		}
	}, [isSubjLoading]);


	const handleDropdown = (_id: string) => {
		if(activeDropdown.includes(_id)) {
			setActiveDropdown(prevState => prevState.filter(name => name !== _id));
		} else {
			setActiveDropdown(prevState => [...prevState, _id]);
		}
	}

	const handleSendSubjects = async () => {
		const body = {
			university: uni!,
			body: {
				subjects: subjectsToAdd
			}
		}
		try {
			await addSubjects(body);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
			<div className="list-header flex justify-between p-5 ">
				<StudTitle text={"Odabir Predmeta"} />
				<div className="search-container flex items-center justify-center gap-10 mr-10">
					<div className="flex flex-col items-end">
						<h1>Ukupno <b>ESPB</b>: </h1>
						<h1 className="font-black"><span className={`text-2xl transition-all  ${totalEspb > 60 ? "text-red-600 text-3xl" : ''} ${totalEspb === 60 ? 'text-green-600': ''}`}>{displayedTotal}</span>/60</h1>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-center">
				<Table cols={cols}>
					{isSubjLoading && <Loader />}
					{!isSubjLoading && availableSub!.length !== 0 && subjects!.map(subj => (
						<tr key={subj._id} className={`${subjectsToAdd.includes(subj._id!) ? 'bg-slate-100' : ''} `}>
							<TD>{subj.code}</TD>
							<TD>{subj.name}</TD>
							<TD>
								{/*@ts-ignore*/}
								{subj.professors!.map(prof => prof.user.name)}
							</TD>
							<TD>{subj.type === "R" ? 'O' : 'I'}</TD>
							<TD>{subj.espb}</TD>
							<TD>
								<input
									type="checkbox"
									className="rounded-2xl checked:bg-black size-4 checked:border-0"
									name={subj._id}
									checked={subjectsToAdd.includes(subj._id!)}
									value={subj.espb}
									onChange={handleCheck}
								/>
							</TD>
						</tr>
					))}
					{isOptionalBlockLoading && <Loader />}
					{!isOptionalBlockLoading &&
					isOptionalBlockSuccess &&
					optionalBlocks.length !== 0 &&
					optionalBlocks.map(optional => (
						<>
							<tr key={optional._id} className="bg-slate-100 cursor-pointer" onClick={() => handleDropdown(optional._id!)}>
								<td className="flex justify-center py-2">
									<ChevronRight className={`transition-transform transform ${activeDropdown.includes(optional._id!) ? 'rotate-90' : ''}`} />
								</td>
								<TD>{optional.name}</TD>
								<td></td>
								<td></td>
								<TD>{optional.espb}</TD>
								<td></td>
							</tr>
							{activeDropdown.includes(optional._id!) &&
								optional.subjects &&
								optional.subjects.length !== 0 &&
								optional.subjects.map((subj: any, index) => (
									<tr key={subj._id!} className={`subject-row overflow-hidden ${index === 0 ? 'delay-100' : ''} ${subjectsToAdd.includes(subj._id!) ? 'bg-slate-100' : ''}`}>
										<TD >{subj.code}</TD>
										<TD >{subj.name}</TD>
										<TD >
											{/*@ts-ignore*/}
											{subj.professors!.map(prof => prof.user.name)}
										</TD>
										<TD>{subj.type === "R" ? 'O' : 'I'}</TD>
										<TD>{subj.espb}</TD>
										<TD>
											<input
												type="checkbox"
												className="rounded-2xl checked:bg-black size-4 checked:border-0"
												name={subj._id}
												value={subj.espb}
												checked={subjectsToAdd.includes(subj._id)}
												onChange={handleCheck}
											/>
										</TD>
									</tr>
								))
							}

						</>
					))}
				</Table>
			</div>
			<div className="flex justify-end p-5 w-3/5">
				<button
					className="bg-green-600
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
					disabled:text-white"
					onClick={handleSendSubjects}
					disabled={totalEspb > 60}>

					Sačuvaj Izabrane Predmete
				</button>
			</div>
		</div>
	);
}

export default SubjectSelect
