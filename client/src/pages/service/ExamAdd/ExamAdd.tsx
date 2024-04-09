import React, { useState, useEffect } from 'react'
import Loader from '../../../components/Loader/Loader';
import { useAddExamMutation } from '../../../app/api/examApiSlice';
import { useGetProfessorsQuery } from '../../../app/api/professorApiSlice';
import Select, { GroupBase } from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from '../../../app/api/departmentApiSlice';
import { useGetDepSubjectsQuery } from '../../../app/api/subjectApiSlice';
import InputField from '../../../components/InputField/InputField';
import MutationState from '../../../components/MutationState/MutationState';
import { useGetPeriodQuery } from '../../../app/api/periodApiSlice';

interface SelectProps {
	value: string;
	label: string;
}

const ExamAdd = () => {
	const navigate = useNavigate();
	const session = useSelector((state: RootState) => state.session);
	const { uni, period }: any = useParams();

	const [date, setDate] = useState("");
	const [department, setDepartment] = useState<SelectProps>();
	const [subject, setSubject] = useState<SelectProps>();
	const [professor, setProfessor] = useState<SelectProps>();

	const {
		data: departmentsData,
		isLoading: isDepLoading,
		isSuccess: isDepSuccess,
		isError: isDepError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uni
	});

	const {
		data: subjectsData,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
		// @ts-ignore
	} = useGetDepSubjectsQuery(department?.value, {
		skip: !uni || !session.accessToken || !department?.value
	});

	const {
		data: professorsData,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess,
		isError: isProfessorError
	} = useGetProfessorsQuery(uni!, {
		skip: !uni || !session.accessToken || !subject
	});

	const {
		data: periodData,
		isLoading: isPeriodLoading,
		isSuccess: isPeriodSuccess,
		isError: isPeriodError
	} = useGetPeriodQuery({university: uni, id: period}, {
		skip: !session.accessToken || !period
	});

	const [
		addExam,
		{
			isLoading: isAddExamLoading,
			isSuccess: isAddExamSuccess,
			isError: isAddExamError
		}
	] = useAddExamMutation();

	const handleAddExam = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				date,
				subject: subject?.value,
				department: department?.value,
				professor: professor?.value,
				university: uni,
				period
			}

			// @ts-ignore
			const result = await addExam({ university: uni!, body }).unwrap();
		} catch (e: any) {
			console.error(e);
		}
	}

	useEffect(() => {
		document.title = "Dodavanje ispita | Stud";
	}, []);

	let content : any = null;

	if (isDepLoading || isProfessorsLoading || isSubjectsLoading || isPeriodLoading) {
		content = <Loader />
	} else if (isDepSuccess && isPeriodSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Dodavanje Ispita</div>
							<div className="form-desc" >Dodavanje predmeta roku</div>
							<MutationState
								isLoading={isAddExamLoading}
								isSuccess={isAddExamSuccess}
								isError={isAddExamError}
								successMessage='Uspešno dodavanje ispita!'
								errorMessage='Greška prilikom dodavanja ispita...'
							/>
						</div>
						<form onSubmit={handleAddExam}>
							<InputField id='periodNameVanredni' type='text' name='Rok' inputVal={periodData?.name} disabled={true}  />
							<div className='form-control mb-5'>
								<p className="px-3 pt-3 text-sm">Trajanje ispitnog roka</p>
								<div className="flex font-bold">
									{/* @ts-ignore */}
									<p className="px-3 text-sm">{periodData?.start.split('-').reverse().join('.') }. - { periodData.end.split('-').reverse().join('.') }.</p>
								</div>
							</div>
							<div className='form-control mb-5'>
								<label htmlFor="periodDate" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="datetime-local" id="periodDate" placeholder="Vreme roka" value={date} onChange={(e) => setDate(e.target.value)} autoComplete='off'
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Datum ispitnog predmeta
									</span>
								</label>
							</div>
							<div className='form-control mb-5'>
								<Select value={department} onChange={(e: any) => setDepartment({value: e?.value, label: e?.label})} placeholder="Izaberite odsek" className='w-full outline-none' isClearable isSearchable options={departmentsData.map((item:any) => {
									return { value: item._id, label: item.name};
								})} />
							</div>
							{
								(department?.value) && isSubjectsSuccess &&
								<>
									<div className='form-control mb-5'>
										<Select	value={subject} onChange={(e: any) => setSubject({value: e?.value, label: e?.label})} placeholder="Izaberite predmet" className='w-full outline-none' isClearable isSearchable options={subjectsData.map((item: any) => {
											return { value: item._id, label: item.name};
										})} />
									</div>
								</>
							}
							{
								department?.value && isProfessorsSuccess && subject?.value &&
								<>
									<div className='form-control mb-5'>
										<Select value={professor} onChange={(e: any) => setProfessor({value: e?.value, label: e?.label})} placeholder="Izaberite profesora" className='w-full outline-none' isClearable isSearchable options={professorsData.map((item: any) => {
											return { value: item._id, label: item.user.name};
										})} />
									</div>
								</>
							}


							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Dodaj Ispit!</button>
							</div>
						</form>
					</div>
				</div>
			</>
	} else if (isPeriodError) {
		navigate('/404_error');
	}

	return (
		<>
			{ content }
		</>
	)
}

export default ExamAdd
