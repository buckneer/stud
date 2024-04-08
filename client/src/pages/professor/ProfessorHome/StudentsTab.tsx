import StudTitle from "../../../components/StudTitle/StudTitle";
import React, {ChangeEvent, useState} from "react";
import Loader from "../../../components/Loader/Loader";
import Table from "../../../components/Table/Table";
import TD from "../../../components/Table/TableColumn";
import { useGetSubjectProfessorsQuery, useGiveSignMutation } from "../../../app/api/professorApiSlice";
import { useParams } from "react-router-dom";
import { useGetStudentOnSubjectQuery } from "../../../app/api/studentApiSlice";
import Select from "react-select";
import MutationState from "../../../components/MutationState/MutationState";

type SelectProps = {
	value?: string;
	label?: string
}


function StudentsTab() {
	const { uni } = useParams();
	const [ subject, setSubject ] = useState<SelectProps>(); // this one is temp
	const [studentsSelected, setStudentsSelected] = useState<string[]>([]);

	const cols = ['Broj indeksa', 'Ime i prezime', 'Naziv predmeta', 'Potpis']
	const {
		data: subjectData,
		isLoading: isSubjectLoading,
		isSuccess: isSubjectSuccess,
		isError: isSubjectError
	} = useGetSubjectProfessorsQuery(uni!);

	const {
		data: studentData,
		isLoading: isStudentDataLoading,
		isSuccess: isStudentDataSuccess,
		isError: isErrorDataSuccess
	} = useGetStudentOnSubjectQuery({ university: uni!, subject: subject?.value! }, {
		skip: !subjectData?.length || !isSubjectSuccess || !subject?.value
	});

	const [
		addSign,
		{
			isLoading: isAddSignLoading,
			isSuccess: isAddSignSuccess,
			isError: isAddSignError
		}
	] = useGiveSignMutation();

	const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			setStudentsSelected((prevState : string[]) => [...prevState, e.target.name]);
		} else {
			setStudentsSelected((prevState : string[]) => prevState.filter(name => name !== e.target.name))
		}
	}

	const handleAddSign = async () => {
		const body = {
			university: uni!,
			subject: subject!.value!,
			body: {
				students: studentsSelected
			}
		}
		try {
			await addSign(body);
		} catch (e: any) {
			console.error(e);
		}
	}

	return (
		<>
			<MutationState
				isLoading={isSubjectLoading || isStudentDataLoading}
			/>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
				<div className="list-header flex justify-between items-center p-5 border-b-2 border-slate-100">
					<StudTitle text={"Studenti"} />
					<div className="search-container flex justify-center items-center gap-5">
						<h1 className="font-bold">Studenti na predmetu: </h1>
						{
							isSubjectSuccess && subjectData?.length ?
								<Select maxMenuHeight={200} className="border-0 rounded-xl bg-slate-100" isClearable isSearchable placeholder="Predmeti" onChange={(e: any) => setSubject(e)} options={subjectData.map((item: any) => {
									return { value: item._id, label: item.name  }
								})} />
								: <div className="p-5">Nema ispita...</div>

						}
					</div>
				</div>

				<div className="w-full flex justify-center mt-5">
					<Table cols={cols}>
						{
							isSubjectSuccess && isStudentDataSuccess && studentData?.length ?
								<>
									{
										studentData.map((student: any) => (
											<>
												<TD>{ student.studentId }</TD>
												{/* @ts-ignore */}
												<TD>{ student?.user?.name! }</TD>
												<TD>{ subject?.label! }</TD>
												<TD>
												<input
													type="checkbox"
													className="rounded-2xl checked:bg-black size-4 checked:border-0 cursor-pointer"
													name={student._id}
													checked={studentsSelected.includes(student._id!)}
													onChange={handleSelected}
												/>
												</TD>
											</>
										))
									}
								</>
								: !subject?.value ? <div className="p-5 font-black">Izaberite predmet...</div> : <div className="p-5 font-black">Nema STUDenta...</div>
						}
					</Table>
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
					disabled:text-white" onClick={() => { handleAddSign() }}>Dodeli potpise</div>
				</div>
			</div>
		</>
	);
}

export default StudentsTab
