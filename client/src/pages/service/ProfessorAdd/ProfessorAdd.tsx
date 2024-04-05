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
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';

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

			const uniBody: any = { universities: [university] }
			// @ts-ignore
			await addUniToProf({ professor: result.id, body: uniBody });
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleRemoveUser = () => {
		if (location?.state?.user) {
			// @ts-ignore
			fetchGetUsers({ university, role: 'professor' })
			window.history.replaceState({}, '')
		}
		setUser('');
	}

	let content: any;

	if (isSubjectsLoading || isUsersLoading || isUserLoading || isAddUniToProfLoading) {
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
								isSuccess={isProfessorAddSuccess && isAddProfToUniSuccess && isProfToSubSuccess && isAddUniToProfSuccess}
								successMessage='Uspešno dodat profesor!'
								isError={isProfessorAddError || isAddProfToUniError || isProfToSubError || isAddUniToProfError}
								errorMessage='Greška prilikom registracije profesora!'
							/>
						</div>
						<form onSubmit={handleAddProfessor}>
							{
								!user ?
									<div className='form-control'>
										<Select maxMenuHeight={200} onChange={(e: any) => setUser(e?.value)} required isClearable isSearchable placeholder="Izaberite korisnika" className='w-full outline-none' options={usersData!.map((item) => {
											return { value: item._id, label: item.name };
										})} />
									</div> :
									<>
										<InputField id="professorName" name="Ime Profesora" type="text" inputVal={userData?.name} disabled button buttonAction={handleRemoveUser} />
										<InputField id="professorEmail" name="E-adresa Profesora" type="text" inputVal={userData?.email} disabled />
									</>
							}
							<InputField id="profesorId" name="Zvanje profesora" type="text" inputVal={title} setVal={(e) => setTitle(e.target.value)} />
							<div className='form-control'>
								<Select maxMenuHeight={200} onChange={handleChange2} placeholder="Izaberite predmete" className='w-full outline-none' required isMulti options={subjectsData.map((item) => {
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
			{content}
		</>
	)
}

export default ProfessorAdd;