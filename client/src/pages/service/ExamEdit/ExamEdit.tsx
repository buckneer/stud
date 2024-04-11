import React, { useState, useEffect } from 'react'
import Loader from '../../../components/Loader/Loader';
import { useGetExamQuery, useUpdateExamMutation } from '../../../app/api/examApiSlice';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import MutationState from '../../../components/MutationState/MutationState';
import getLabel from '../../../utils/getLabel';
import { useGetSubjectsProfessorsQuery } from '../../../app/api/subjectApiSlice';
import { formatDate } from '../../../utils/formatDate';

const ExamEdit = () => {
	const navigate = useNavigate();
	const session = useSelector((state: RootState) => state.session);
	const { uni, id }: any = useParams();
	
	const [date, setDate] = useState("");
	const [department, setDepartment] = useState('');
	const [subject, setSubject] = useState('');
	const [professor, setProfessor] = useState<any>('');

	const {
		data: examData,
		isLoading: isExamLoading,
		isSuccess: isExamSuccess,
		isError: isExamError
	} = useGetExamQuery({ university: uni!, id });

	const {
		data: professorsData,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess,
		isError: isProfessorError
		// @ts-ignore
	} = useGetSubjectsProfessorsQuery({ university: uni!, subject: examData?.subject } , {
		skip: !uni || !examData?.subject
	});


	const [
		updateExam,
		{
			isLoading: isupdateExamLoading,
			isSuccess: isupdateExamSuccess,
			isError: isupdateExamError
		}
	] = useUpdateExamMutation();

	const handleupdateExam = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = { 
				date, 
				subject: subject, 
				department: department, 
				professor: professor
			}
		
			// @ts-ignore
			const result = await updateExam({ university: uni!, id, body }).unwrap();
		} catch (e: any) {
			console.error(e);
		}
	}
	
	useEffect(() => {
		document.title = "Dodavanje ispita | Stud";
	}, []);

	let content : any = null;

	if (isProfessorsLoading || isExamLoading) {
		content = <Loader />
	} else if (isExamSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Ažuriranje Ispita</div>
							<div className="form-desc" >Ažuriranje ispita u roku</div>
							<MutationState 
								isLoading={isupdateExamLoading}
								isSuccess={isupdateExamSuccess}
								isError={isupdateExamError}
								successMessage='Uspešno ažuriranje ispita!'
								errorMessage='Greška prilikom ažuriranja ispita...'
							/>
						</div>
						<form onSubmit={handleupdateExam}>
							{/* @ts-ignore */}
							<InputField id='periodNameVanredni' type='text' name='Rok' inputVal={examData.period?.name} disabled={true}  />
							<div className='form-control mb-5'>
								<p className="px-3 pt-3 text-sm">Trajanje ispitnog roka</p>
								<div className="flex font-bold">
									{/* @ts-ignore */}
									<p className="px-3 text-sm">{formatDate(examData.period?.start)} - { formatDate(examData.period?.end) }.</p>
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
								{/* @ts-ignore */}
								<InputField id='dep' name='Odsek' disabled={true} type='text' inputVal={examData.department.name} />
							</div>
							{	
								isProfessorsSuccess &&
								<>
									<div className='form-control mb-5'>
										<label htmlFor='prof' className="relative block overflow-hidden rounded-md bg-white px-3 shadow-sm w-full text-sm">Profesor</label>
										{/* @ts-ignore */}
										<Select maxMenuHeight={200} id='prof' value={getLabel(professor, professorsData, '_id', 'user.name')} onChange={(e: any) => setProfessor(e)} placeholder="Izaberite profesora" className='w-full outline-none' isClearable isSearchable options={professorsData.map((item: any) => {
											return { value: item._id, label: item.user.name };
										})} />
									</div>
								</>
							}
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Ažuriraj Ispit!</button>
							</div>
						</form>
					</div>
				</div>
			</>
	} else if (isExamError) {
		navigate('/404_error');
	}

	useEffect(() => {
		document.title = 'Ažuriraj ispit | Stud';

		if(examData) {
			setDate(examData?.date as string);
			setProfessor(examData?.professor);
			// @ts-ignore
			setDepartment(examData?.department?.name! as string);
			setSubject(examData?.subject as string);
		}

	}, [ isExamSuccess ]);

	return (
		<>
			{ content }
		</>
	)
}

export default ExamEdit;