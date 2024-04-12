import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useGetActivePeriodQuery} from '../../app/api/periodApiSlice';
import StudTitle from '../../components/StudTitle/StudTitle';
import {useGetUniDepartmentsQuery} from '../../app/api/departmentApiSlice';
import {useGetDepSubjectsQuery} from '../../app/api/subjectApiSlice';
import MutationState from '../../components/MutationState/MutationState';
import Select from 'react-select'
import {useConfirmGradeMutation, useGetGradesBySubjectPeriodQuery} from '../../app/api/gradeApiSlice';
import TD from '../../components/Table/TableColumn';
import Table from '../../components/Table/Table';
import {CalendarCheck, Check, Pencil} from 'lucide-react';
import {Grade} from "../../app/api/types/types";

const GradeConfirm = () => {
	const {uni} = useParams();

	const [department, setDepartment] = useState<string>('');
	const [subject, setSubject] = useState<string>('');
	const [updateSubjectMenu, setUpdateSubjectMenu] = useState<any>();
	const [updateGrade, setUpdateGrade] = useState<number>(5);

	const {
		data: activePeriod,
		isLoading: isPeriodLoading,
		isSuccess: isPeriodSuccess,
		isError: isPeriodError
	} = useGetActivePeriodQuery(uni!);

	const {
		data: departments,
		isLoading: isDepartmentsLoading,
		isSuccess: isDepartmentsSuccess,
		isError: isDepartmentsError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uni || !activePeriod?._id
	});

	const {
		data: subjects,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
	} = useGetDepSubjectsQuery({university: uni!, department}, {
		skip: !isDepartmentsSuccess || !department
	});

	const {
		data: grades,
		isLoading: isGradesLoading,
		isSuccess: isGradesSuccess,
		isError: isGradesError
	} = useGetGradesBySubjectPeriodQuery({university: uni!, subject, period: activePeriod?._id}, {
		skip: !isSubjectsSuccess || !subject
	});

	const [confirmGrade, gradeStatus] = useConfirmGradeMutation();

	const handleConfirmGrade = async (id: string) => {

		let gradeToAdd = 0;

		if(id === updateSubjectMenu) {
			gradeToAdd = updateGrade;
		} else {
			let profGrade = grades!.find(grade => grade._id === id);
			if(profGrade) {
				gradeToAdd = parseInt(profGrade._id!);
			}
		}

		const body = {
			serviceGrade:  gradeToAdd
		};
		try {
			await confirmGrade({university: uni!, grade: id, body});
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleOpenField = (id: string) => {
        setUpdateSubjectMenu(id);
	}


	let content: any = <input type="number"
	                          className="rounded-2xl bg-slate-100 border-0 text-center "
	                          min="5"
	                          max="10"
	                          onChange={(e: any) => setUpdateGrade(e.target.value)} value={updateGrade} ></input>;

	return (
		<>
			<MutationState
				isLoading={isPeriodLoading || isSubjectsLoading || isDepartmentsLoading || isGradesLoading}
			/>
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
				<div className="list-header flex justify-between p-5 items-center">
					{
						isPeriodSuccess && !isPeriodLoading && isDepartmentsSuccess ?
							<>
								<StudTitle text={`Ocene za ${activePeriod.name}`}/>
								<div className="flex gap-3">
									<Select maxMenuHeight={200} onChange={(e: any) => setDepartment(e?.value)}
									        name="Odsek" isSearchable placeholder="Izaberite odsek"
									        options={departments!.map((dep: any) => ({
										        value: dep._id, label: dep.name
									        }))}/>
									{
										isSubjectsSuccess &&
                                        <Select className='lg:min-w-[300px]' maxMenuHeight={200}
                                                onChange={(e: any) => setSubject(e?.value)} name="Predmet" isSearchable
                                                placeholder="Izaberite predmet" options={subjects!.map((sub: any) => ({
											value: sub._id, label: sub.name
										}))}/>
									}
								</div>
							</> : <StudTitle text='Nema aktivnog ispitnog roka'/>
					}
				</div>

				{
					isGradesSuccess &&
                    <div className="w-full flex justify-center">
                        <Table cols={['Predmet', 'Profesor', 'Student', 'Ocena Profesora', 'Akcije']}>
							{
								grades!.map((grade: any) => (
									<tr key={grade._id}>
										<TD>{grade.subject.name}</TD>
										<TD>{grade.professor.user.name}</TD>
										<TD>{grade.student.user.name} ({grade.student.studentId})</TD>
										<TD className="font-black text-2xl cursor-pointer" >
											<div onClick={() => handleOpenField(grade._id)}>
												{updateSubjectMenu === grade._id ? content : grade.professorGrade}
											</div>
										</TD>
										<TD>
											<div className="flex w-full justify-center gap-2">
												<Check
													className="cursor-pointer hover:bg-green-700 rounded-md hover:rounded-xl hover:p-1 hover:text-white transition-all hover:scale-125 active:scale-75"
													size={28}
													onClick={() => handleConfirmGrade(grade._id)}
												/>
												{/* ONCLICK -> EDIT GRADE */}
												{/*<Pencil className="cursor-pointer hover:bg-slate-700 rounded-md hover:rounded-xl hover:p-1 hover:text-white transition-all hover:scale-125 active:scale-75" size={28} />*/}
											</div>
										</TD>
									</tr>
								))
							}
                        </Table>
                    </div>
				}
			</div>
		</>
	)
}

export default GradeConfirm;
