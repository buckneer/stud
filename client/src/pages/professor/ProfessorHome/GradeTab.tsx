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
import {RefreshCcw, X} from "lucide-react";

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
			handleDropdown(student);
			console.log(gradeNum, student, gradeId);
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
				console.log("Updated grades: ", grades);
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
											{!isGradeUpdateLoading &&
												!updateGrade.includes(item._id!) && (
																<TD>
																	<p className="font-black text-2xl transition-all hover:scale-125 cursor-pointer active:scale-75" onClick={() => handleDropdown(item._id!)}>{getStudentGrade(item._id!)?.professorGrade}</p>
																</TD>
															)}
														{updateGrade.includes(item._id!) && (
															<>
																<GradeColumn handleSetGrade={handleUpdateGrade} item={item._id!} gradeId={getStudentGrade(item._id!)!._id} close={handleDropdown} />
															</>
												)
											}

											{isGradeUpdateLoading && (
												<TD>
													<svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
														<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
													</svg>
												</TD>
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
