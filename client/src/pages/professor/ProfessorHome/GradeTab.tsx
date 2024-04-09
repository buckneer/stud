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
import {useAddGradeMutation, useUpdateGradeMutation} from "../../../app/api/gradeApiSlice";
import GradeColumn from "../../../components/Table/GradeColumn";

function GradeTab() {
	const { uni } = useParams();
	const [ subject, setSubject ] = useState<SelectProps>();
	const [updateGrade, setUpdateGrade] = useState<string[]>([]);
	const [grade, setGrade] = useState(0);
	const [grades, setGrades] = useState<Grade[]>([]);
	const [activePeriodId, setActivePeriodId] = useState("")
	const [cols, setCols] = useState(['Broj indeksa', 'Ime i prezime', 'Ocena'])

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

	const [
		updateGradeTrig,
		{
			isLoading: isGradeUpdateLoading,
			isSuccess: isGradeUpdateSuccess,
			isError: isGradeUpdateError
		}
	] = useUpdateGradeMutation();


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

	const handleUpdateGrade = async (gradeNum: number, student: string, gradeId?: string) => {

		try {
			await updateGradeTrig({
				university: uni!,
				id: gradeId!,
				body: {
					professorGrade: gradeNum
				}
			})


		} catch (e: any) {
			console.error(e);
		}

		handleDropdown(student);
	}

	const handleDropdown = (_id: string) => {
		if(updateGrade.includes(_id)) {
			setUpdateGrade(prevState => prevState.filter(name => name !== _id));
		} else {
			setUpdateGrade(prevState => [...prevState, _id]);
		}
	}

	useEffect(() => {
		if(examData) {
			if(examData.grades && examData.grades.length > 0) {
				setGrades((examData.grades as Grade[]));
			}
		}
	}, [isExamLoading]);

	function isIdIncluded(idToCheck: string) {
		let grades = examData?.grades as Grade[];
		return grades.some(grade => grade.student === idToCheck);
	}

	const getStudentGrade = (student: string) => {
		let studGrade = grades.find(grade => grade.student === student);
		return studGrade;
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
									{isIdIncluded(item._id!) ? (
										<>
											{!updateGrade.includes(item._id!) && (
												<TD>
													<p className="font-black text-2xl transition-all hover:scale-125 cursor-pointer active:scale-75" onClick={() => handleDropdown(item._id!)}>{getStudentGrade(item._id!)?.professorGrade}</p>
												</TD>
											)}
											{updateGrade.includes(item._id!) && (
												<GradeColumn handleSetGrade={handleUpdateGrade} item={item._id!} gradeId={getStudentGrade(item._id!)!._id} />
											)}
										</>

									) : (
										<GradeColumn handleSetGrade={handleSetGrade} item={item._id!} />
									)}

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