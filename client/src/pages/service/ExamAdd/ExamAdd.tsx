import React, { useState, useEffect } from 'react'
import Loader from '../../../components/Loader/Loader';
import { useAddExamMutation } from '../../../app/api/examApiSlice';
import { useGetProfessorsQuery } from '../../../app/api/professorApiSlice';
import Select, { GroupBase } from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from '../../../app/api/departmentApiSlice';
import { useGetDepSubjectsQuery } from '../../../app/api/subjectApiSlice';

interface SelectProps {
	value: string;
	label: string;
}

const ExamAdd = () => {
	
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	
	const [date, setDate] = useState("");
	const [department, setDepartment] = useState<SelectProps>();
	const [subject, setSubject] = useState<SelectProps>();
	const [professor, setProfessor] = useState<SelectProps>();
	// const [students, setStudents] = useState<SelectProps>("");
	// const [period, setPeriod] = useState("");
	// const [grades, setGrades] = useState("");
	// const [ended, setEnded] = useState(Boolean);

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

	console.log(subjectsData);
	const {
		data: professorsData,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess,
		isError: isProfessorError
	} = useGetProfessorsQuery(uni!, {
		skip: !uni || !session.accessToken || !subject
	});



	const [
		AddExam,
		{
			isLoading: isExamAddLoading,
			isSuccess: isExamAddSuccess,
			isError: isExamAddError
		}
	] = useAddExamMutation();

	const handleAddExam = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Dodavanje ispita

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/65fcbc3cd45f1d327ffc4aee/exam/add
	}
	
	useEffect(() => {
		document.title = "Dodavanje ispita | Stud";
	}, []);

	let content : any = null;

	if (isDepLoading || isProfessorsLoading || isSubjectsLoading) {
		content = <Loader />
	} else if (isDepSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Dodavanje Ispita</div>
							<div className="form-desc" >Dodavanje predmeta roku</div>
							{
								isExamAddLoading ? <Loader /> : null
							}
							{
								isExamAddSuccess ?
									<div className="w-full flex justify-center">
										<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspesno dodat predmet roku!</div>
									</div>
									: null
							}
							{
								isExamAddError ?
									<div className="w-full flex justify-center">
										<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom dodavanje predmeta roku!</div>
									</div>
									: null
							}
						</div>
						<form onSubmit={handleAddExam}>
							<div className='form-control mb-5'>
								<label htmlFor="periodName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										// value={period} onChange={(e) => setPeriod(e.target.value)}
										type="text" id="periodName" placeholder="Trenutni rok" value={"Januarski-Februarski rok"} disabled autoComplete='off'
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Ispitni rok
									</span>
								</label>
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
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Ispitni Rok</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}

	return (
		// <form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
		// 	<label htmlFor="dateOfExam">Datum ispita: </label>
		// 	<input id='dateOfExam' type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
		// 	<input type="text" placeholder='Ime predmeta' value={subject} onChange={(e) => setSubject(e.target.value)} required />
		// 	<input type="text" placeholder='Ime profesora' value={proffesor} onChange={(e) => setProfessor(e.target.value)} required />
		// 	<label htmlFor="timeOfExam">Vreme ispita: </label>
		// 	<input id='timeOfExam' type="time" value={period} onChange={(e) => setPeriod(e.target.value)} required />
		// 	<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold' >Dodaj ispit</button>
		// </form>
		<>
			{ content }
		</>
	)
}

export default ExamAdd