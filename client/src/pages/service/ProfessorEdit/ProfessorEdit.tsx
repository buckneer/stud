import React, { useState, useEffect } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { useAddProfessorToSubjectMutation, useAddProfessorToUniMutation, useAddProfessorUnisMutation, useGetProfessorQuery, useGetSubjectProfessorsQuery, useUpdateProfessorMutation } from '../../../app/api/professorApiSlice';
import { useGetUserQuery } from "../../../app/api/userApiSlice";
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

const ProfessorEdit = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	const { uni: university, id: profId } = useParams();
	const location = useLocation();

	const [userId, setUserId] = useState("");
	const [professorName, setProfessorName] = useState("");
	const [professorEmail, setProfessorEmail] = useState("");
	const [title, setTitle] = useState('');
	const [subjects, setSubjects] = useState<string[]>([]);


	const {
		data: professorData,
		isLoading: isProfessorDataLoading,
		isSuccess: isProfessorDataSuccess,
		isError: isProfessorDataError
	} = useGetProfessorQuery({university: uni!, professor: profId!}!, {
		skip: !profId || !session.accessToken
	});

	const {
		data: profSubjectsData,
		isLoading: isProfSubjectsLoading,
		isSuccess: isProfSubjectsSuccess,
		isError: isProfSubjectstError
	} = useGetSubjectProfessorsQuery(uni!);

	const {
		data: userData,
		isLoading: isUserDataLoading,
		isSuccess: isUserDataSuccess,
		isError: isUserDataError
	} = useGetUserQuery(userId!, {
		skip: !userId || !session.accessToken || !professorData
	});

	const {
		data: subjectsData,
		isLoading: isSubjectsDataLoading,
		isSuccess: isSubjectsDataSuccess,
		isError: isSubjectsDataError
	} = useGetUniSubjectsQuery(uni!, {
		skip: !university || !session.accessToken
	});

	// ----------------FUNCTIONS---------------- //
	
	const [
		editProfessor,
		{
			isLoading: isProfessorEditLoading,
			isSuccess: isProfessorEditSuccess,
			isError: isProfessorEditError
		}
	] = useUpdateProfessorMutation();


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

	const handleEditProfessor = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			// const body = {

			// 	title, subjects: subjects!, university: uni!, user
			// };
			// const result = await EditProfessor({professorId, body}).unwrap();

			// FIXME: 🔼 FIX THIS ABOVE FOR EDIT PROFESSOR 🔼
			// TODO: 🔻Check if we need something to change down for proftouni | proftosub | unitoprof 🔻

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

	const handleChangeSubjects = (newSelections: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
		let vals = newSelections.map(item => item.value!);

		setSubjects([...vals]);
	}
	
	let content: any;

	if (isProfessorDataLoading || isSubjectsDataLoading || isAddUniToProfLoading || (isProfessorDataSuccess && isUserDataLoading)) {
		content = <Loader />;
	} else if (isSubjectsDataSuccess && isUserDataSuccess && isProfessorDataSuccess) {

		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Azuriranje Profesora</div>
							<div className="form-desc" >Azuriraj profesora</div>
							<MutationState
								isLoading={isProfessorEditLoading || isAddProfToUniLoading || isAddProfToSubLoading}
								isSuccess={isProfessorEditSuccess && isAddProfToUniSuccess && isProfToSubSuccess && isAddUniToProfSuccess}
								successMessage='Uspešno azuriran profesor!'
								isError={isProfessorEditError || isAddProfToUniError || isProfToSubError || isAddUniToProfError}
								errorMessage='Greška prilikom azuriranja profesora!'
							/>
						</div>
						<form onSubmit={handleEditProfessor}>
							{/* @ts-ignore */}
							<InputField id="profesorEditName" name="Ime Profesora" type="text" inputVal={professorName}  setVal={(e) => setProfessorName(e.target.value)}   />
							{/* @ts-ignore */}
							<InputField id="profesorEditEmail" name="Email Profesora" type="text" inputVal={professorEmail} setVal={(e) => setProfessorEmail(e.target.value)}  />
							
							<InputField id="profesorEditTitle" name="Zvanje profesora" type="text" inputVal={title} setVal={(e) => setTitle(e.target.value)} />
							<div className='form-control'>
								{/* @ts-ignore */}
								<Select maxMenuHeight={200} defaultValue={[{value: "id", label: "DajPredmet"},{value: "id2", label: "DajPredmet2"}]} onChange={handleChangeSubjects} placeholder="Izaberite predmete" className='w-full outline-none' required isMulti options={subjectsData?.map((item) => {
									return { value: item._id, label: item.name };
								})} />
							</div>
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Azuriraj Profesora</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}

	useEffect(() => {
		document.title = 'Azuriraj profesora | Stud';

		if(isProfessorDataSuccess){
			// @ts-ignore
			setUserId(professorData?.user!);
			setProfessorName(userData?.name!);
			setProfessorEmail(userData?.email!);
			setTitle(professorData?.title!);
		}

	}, [isProfessorDataSuccess, isUserDataSuccess]);

	useEffect(() => {
		// @ts-ignore
		setSubjects(profSubjectsData);
		console.log(subjectsData)
	},[isProfSubjectsSuccess])

	return (
		<>
			{content}
		</>
	)
}

export default ProfessorEdit;