import React, { useState, useEffect } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { useAddProfessorMutation, useAddProfessorToSubjectMutation, useAddProfessorToUniMutation, useAddProfessorUnisMutation } from '../../../app/api/professorApiSlice';
import { useGetUserQuery } from "../../../app/api/userApiSlice";
import { useLazyGetPendingQuery } from '../../../app/api/userApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { CircleX } from "lucide-react";
import MutationState from '../../../components/MutationState/MutationState';

type Option = {
	value?: string;
	label?: string
}

const ProfessorAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	const { uni: university } = useParams();
	const location = useLocation();

	const [user, setUser] = useState('');
	// title, user, subjects, grades, univerisites

	const [title, setTitle] = useState('');
	const [professor, setProfessor] = useState("");
	const [subjects, setSubjects] = useState<string[]>([]);

	const handleChange2 = (newSelections: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
		let vals = newSelections.map(item => item.value!);

		setSubjects([...vals]);
	}

	const {
		data: subjectsData,
		isLoading: isSubjectsLoading,
		isSuccess: isSubjectsSuccess,
		isError: isSubjectsError
	} = useGetUniSubjectsQuery(uni!, {
		skip: !university || !session.accessToken
	});

	const {
		data: userData,
		isLoading: isUserLoading,
		isSuccess: isUserSuccess,
		isError: isUserError
	} = useGetUserQuery(user!, {
		skip: !university || !session.accessToken || !user
	});

	const [
		fetchGetUsers,
		{
			data: usersData,
			isLoading: isUsersLoading,
			isSuccess: isUsersSuccess,
			isError: isUsersError

		}] = useLazyGetPendingQuery();

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

	const [
		addUniToProf,
		{
			isLoading: isAddUniToProfLoading,
			isSuccess: isAddUniToProfSuccess,
			isError: isAddUniToProfError
		}
	] = useAddProfessorUnisMutation();

	const handleAddProfessor = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const body = {

				title, subjects: subjects!, university: uni!, user
			};
			const result = await fetchAddProfessor(body).unwrap();
			// @ts-ignore
			const resultBody: any = { professors: [result.id] };

			// @ts-ignore
			await addProfToUni({ university, body: resultBody });

			const subjectBody: any = { subjects: subjects! };

			// @ts-ignore
			await addProfToSub({ professor: result.id, body: subjectBody });

			const uniBody: any = { universities: [ university ] }
			// @ts-ignore
			await addUniToProf({ professor: result.id, body: uniBody });
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleRemoveUser = () => {
		if(location?.state?.user) {
			// @ts-ignore
			fetchGetUsers({ university, role: 'professor' })
			window.history.replaceState({}, '')
		}
		setUser('');
	}

	let content: any;

	if (isSubjectsLoading || isUsersLoading || isUserLoading) {
		content = <Loader />;
	} else if (isSubjectsSuccess && (isUsersSuccess || location?.state?.for === 'professor')) {

		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Profesor</div>
							<div className="form-desc" >Kreiranje novog profesora</div>
								<MutationState 
									isLoading={isProfessorAddLoading || isAddProfToUniLoading || isAddProfToSubLoading}
									isSuccess={isProfessorAddSuccess && isAddProfToUniSuccess && isProfToSubSuccess}
									successMessage='Uspešno dodat profesor!'
									isError={isProfessorAddError || isAddProfToUniError || isProfToSubError}
									errorMessage='Greška prilikom registracije profesora!'
								/>
						</div>
						<form onSubmit={handleAddProfessor}>
							{
								!user ? 
									<div className='form-control'>
										<Select onChange={(e: any) => setUser(e?.value)} isClearable isSearchable  placeholder="Izaberite korisnika" className='w-full outline-none' options={usersData!.map((item) => {
											return { value: item._id, label: item.name };
										})} />
									</div> :
									<>
										<div className='form-control relative'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="professorName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="professorName" placeholder="Ime profesora" value={userData?.name} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													Ime Profesora
												</span>
												<button className='absolute right-5' onClick={handleRemoveUser}>
													<CircleX />
												</button>
											</label>
										</div>
										<div className='form-control'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="professorEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="professorEmail" placeholder="E-adresa profesora" value={userData?.email} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													E-adresa Profesora
												</span>
											</label>
										</div>
									</>
							}
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
								<Select onChange={handleChange2} placeholder="Izaberite predmete" className='w-full outline-none' isMulti options={subjectsData.map((item) => {
									return { value: item._id, label: item.name };
								})} />
							</div>
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Profesora</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}
	
	useEffect(() => {
		document.title = 'Dodaj profesora | Stud'
		if (location?.state?.user && location?.state?.for === 'professor') {
			setUser(location.state.user._id);
		} else {
			// @ts-ignore
			fetchGetUsers({ university, role: 'professor' })
		}
	}, []);

	return (
		<>
			{ content }
		</>
	)
}

export default ProfessorAdd;