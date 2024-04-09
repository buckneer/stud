import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SelectProps} from "@radix-ui/react-select";
import {useGetSubjectProfessorsQuery} from "../../../app/api/professorApiSlice";
import MutationState from "../../../components/MutationState/MutationState";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Select from "react-select";
import {useGetExamBySubjectQuery} from "../../../app/api/examApiSlice";
import {useGetActivePeriodQuery} from "../../../app/api/periodApiSlice";
import Table from "../../../components/Table/Table";
import TD from "../../../components/Table/TableColumn";
import {Grade, Student, User} from "../../../app/api/types/types";
import InputField from "../../../components/InputField/InputField";
import {useAddGradeMutation} from "../../../app/api/gradeApiSlice";

function GradeTab() {
	const { uni } = useParams();
	const [ subject, setSubject ] = useState<SelectProps>();
	const [grade, setGrade] = useState(0);
	const [activePeriodId, setActivePeriodId] = useState("")
	const cols = ['Broj indeksa', 'Ime i prezime', 'Ocena'];

	const {
		data: activePeriod,
		isLoading: isPeriodLoading,
		isSuccess: isPeriodSuccess,
		isError: isPeriodError
	} = useGetActivePeriodQuery(uni!);



	const {
		data: subjectData,
		isLoading: isSubjectLoading,
		isSuccess: isSubjectSuccess,
		isError: isSubjectError
	} = useGetSubjectProfessorsQuery(uni!);



	const {
		data: examData,
		isLoading: isExamLoading,
		isSuccess: isExamSuccess,
		isError: isExamError
	} = useGetExamBySubjectQuery({university: uni!, period: activePeriod?._id, subject: subject?.value!}, {
		skip: !subject || !activePeriod
	})


	const [
		addGrade,
		{
			isLoading: isGradeLoading,
			isSuccess: isGradeSuccess,
			isError: isGradeError
		}
	] = useAddGradeMutation();

	const handleSetGrade = async (gradeNum: number, student: string) => {
		let grade : Grade = {
			subject: examData!.subject,
			professorGrade: gradeNum,
			student,
			period: activePeriod._id,
			exam: examData!._id,

		}

		try {
			await addGrade({university: uni!, body: grade});
		} catch (e: any) {
			console.log(e);
		}
	}

	return (
		<>
			<MutationState
				isLoading={isSubjectLoading || isExamLoading || isPeriodLoading}
			/>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
				<div className="list-header flex justify-between items-center p-5 border-b-2 border-slate-100">
					<StudTitle text={"Studenti"} />
					<div className="search-container flex justify-center items-center gap-5">
						<h1 className="font-bold">Ispiti na predmetu: </h1>
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
						{!examData ? (<div className="font-bold">Izaberite Predmet</div> ) : (
							// @ts-ignore
							examData.students && examData.students.map((item: Student) => (
								<tr>
									<TD>{item.studentId}</TD>
									<TD>{(item.user! as User).name}</TD>
									<TD className="w-1/2">
										<div className="flex gap-10 justify-center">
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(5, item._id!)}>5</p>
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(6, item._id!)}>6</p>
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(7, item._id!)}>7</p>
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(8, item._id!)}>8</p>
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(9, item._id!)}>9</p>
											<p className="font-black text-2xl cursor-pointer" onClick={() => handleSetGrade(10, item._id!)}>10</p>

										</div>
									</TD>
								</tr>
							))
						)}
					</Table>
				</div>
			</div>
		</>
	);
}

export default GradeTab
