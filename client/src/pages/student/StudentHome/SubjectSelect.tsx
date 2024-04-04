import {Session, Subject} from "../../../app/api/types/types";
import StudTitle from "../../../components/StudTitle/StudTitle";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useGetAvailableSubjectsQuery} from "../../../app/api/subjectApiSlice";
import {useGetStudentQuery} from "../../../app/api/studentApiSlice";
import Table from "../../../components/Table/Table";
import Loader from "../../../components/Loader/Loader";


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
	const [totalEspb, setTotalEspb] = useState(50);
	const [displayedTotal, setDisplayedTotal] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (displayedTotal < totalEspb) {
				setDisplayedTotal(prevTotal => prevTotal + 1);
			} else if (displayedTotal > totalEspb) {
				setDisplayedTotal(prevTotal => prevTotal - 1);
			}
		}, 10); // Adjust the interval speed as needed

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
	const {
		data: availableSub,
		isLoading: isSubjLoading,
		isSuccess: isSubjSuccess,
		isError: isSubjError
		// @ts-ignore
	} = useGetAvailableSubjectsQuery({university: uni!, department: DEPARTMENT});

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

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
			<div className="list-header flex justify-between p-5 ">
				<StudTitle text={"Odabir Predmeta"} />
				<div className="search-container flex items-center justify-center gap-10">
					<div className="flex flex-col items-end">
						<h1>Ukupno <b>ESPB</b>: </h1>
						<h1 className="font-black"><span className={`text-2xl transition-all  ${totalEspb > 60 ? "text-red-600 text-3xl" : ''} ${totalEspb === 60 ? 'text-green-600': ''}`}>{displayedTotal}</span>/60</h1>
					</div>
					<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
				</div>
			</div>
			<div className="w-full flex justify-center">
				<Table cols={cols}>
					{isSubjLoading && <Loader />}
					{!isSubjLoading && availableSub!.length !== 0 && subjects!.map(subj => (
						<tr>
							<td className="py-2">{subj.code}</td>
							<td className="py-2">{subj.name}</td>
							<td className="py-2">
								{/*@ts-ignore*/}
								{subj.professors!.map(prof => prof.user.name)}
							</td>
							<td>{subj.type === "R" ? 'O' : 'I'}</td>
							<td>{subj.espb}</td>
							<td>
								<input
									type="checkbox"
									className="rounded-2xl checked:bg-black size-4 checked:border-0"
									name={subj._id}
									value={subj.espb}
									onChange={handleCheck}
								/>
							</td>
						</tr>
					))}
				</Table>
			</div>
			<div className="flex justify-center items-center my-5">
				<h1 className="font-black">Izborni Predmeti</h1>
			</div>
			<div className="w-full flex justify-center">
				<Table cols={cols}>
					{isSubjLoading && <Loader />}
					{!isSubjLoading && availableSub!.length !== 0 && optionalSubjects!.map(subj => (
						<tr>
							<td className="py-2">{subj.code}</td>
							<td className="py-2">{subj.name}</td>
							<td className="py-2">
								{/*@ts-ignore*/}
								{subj.professors!.map(prof => prof.user.name)}
							</td>
							<td>{subj.type === "R" ? 'O' : 'I'}</td>
							<td>{subj.espb}</td>
							<td>
								<input
									type="checkbox"
									className="rounded-2xl checked:bg-black size-4 checked:border-0"
									name={subj._id}
									value={subj.espb}
									onChange={handleCheck}
								/>
							</td>
						</tr>
					))}
				</Table>
			</div>
			<div className="flex justify-end p-5">
				<button
					className="bg-slate-100 rounded-2xl px-3 py-2 font-bold cursor-pointer transition-all hover:bg-white hover:border-black border-[1px] border-slate-100 disabled:bg-slate-600 disabled:text-white" disabled={totalEspb !== 60}>

					Sačuvaj Izabrane Predmete
				</button>
			</div>
		</div>
	);
}

export default SubjectSelect
