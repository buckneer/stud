import React, { useState, useEffect } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { useAddProfessorMutation, useAddProfessorToSubjectMutation, useAddProfessorToUniMutation } from '../../../app/api/professorApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

type Option = {
	value?: string;
	label?: string
}

const ProfessorAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	const location = useLocation();

	const [ user, setUser ] = useState('');
	// title, user, subjects, grades, univerisites

	const [ title, setTitle ] = useState('');
	const [ subjects, setSubjects ] = useState<string[]>([]);

	const handleChange = (newSelections: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
		console.log(newSelections);
		let vals = newSelections.map(item => item.value!);
		
		setSubjects([...vals]);
	}

	const {
		data: subjectsData,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
	} = useGetUniSubjectsQuery(uni!, {
		skip: !uni || !session.accessToken
	});

	const [
		fetchAddProfessor,
		{
			isLoading: isProfessorAddLoading,
			isSuccess: isProfessorAddSuccess,
			isError: isProfessorAddError
		}
	] = useAddProfessorMutation();

	const [
		addProfToUni,
		{
			isLoading: isAddProfToUniLoading,
			isSuccess: isAddProfToUniSuccess,
			isError: isAddProfToUniError,
		}
	] = useAddProfessorToUniMutation();

	const [
		addProfToSub,
		{
			isLoading: isAddProfToSubLoading,
			isSuccess: isProfToSubSuccess,
			isError: isProfToSubError
		}
	] = useAddProfessorToSubjectMutation();

	const handleAddProfessor = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const body = {

				title, subjects: subjects!, university: uni!, user
			};
			const result = await fetchAddProfessor(body).unwrap();
			// @ts-ignore
			const resultBody: any = { professors: [ result.id ] };

			await addProfToUni({ university: uni!, body: resultBody });

			const subjectBody: any = { subjects: subjects };
			// FIXME: THIS!
			// @ts-ignore
			await addProfToSub({ professor: result.id, body: subjects });

		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	if (isSubjectsLoading) {
		content = <>Loading...</>
	} else if (isSubjectsSuccess) {
		content =
			<>
				{/* <h1>Dodajvanje profesora</h1>
				<form onSubmit={handleAddProfessor}>
					<input id="title" placeholder="Titula" value={title} onChange={(e) => setTitle(e.target.value)} />
					<select id="subjects">
						<option value="0">Izaberi predmet kasnije...</option>
					</select>
					<button type="submit">Unesi profesora!</button>
				</form> 
				*/}
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Profesor</div>
							<div className="form-desc" >Kreiranje novog profesora</div>

							{
								isProfessorAddLoading ? <div className="">Loader ide ovde...</div> : null
							}
							{
								isProfessorAddSuccess ?
									<div className="w-full flex justify-center">
										<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspesno dodat profesor!</div>
									</div>
									: null
							}
							{
								isProfessorAddError ?
									<div className="w-full flex justify-center">
										<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom registracije profesora!</div>
									</div>
									: null
							}
						</div>
						{/* <form onSubmit={handleAddProfessor}> */}
						<form onSubmit={handleAddProfessor}>
							<div className='form-control'>
								{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
								<label htmlFor="profesorId" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="text" id="profesorId" placeholder="Zvanje profesora" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete='off' required
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Zvanje profesora
									</span>
								</label>
							</div>
							<div className='form-control'>
								{/* {subjectsData.map((subject) => {
									return (
										<Select className='w-full mt-4' options={subject} />
									)
								})} */}
								<Select onChange={handleChange} className='w-full outline-none' isMulti options={subjectsData.map((item) => {
									return {value: item._id, label: item.name};
								})} />
							</div>
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-blue-800 px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Profesora</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}

	useEffect(() => {
		document.title = 'Dodaj profesora | Stud'
		if(location.state?.userId) {
			setUser(location.state.userId);
		}			
	}, []);

	return (
		<>
			{content}
		</>
	)
}

export default ProfessorAdd;