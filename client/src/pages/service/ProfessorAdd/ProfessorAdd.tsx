import React, { useState } from 'react';
import { useAddProfessorMutation } from '../../../app/api/professorApiSlice';
import { useParams } from 'react-router-dom';
const ProfessorAdd = () => {
	const { uni } = useParams();
	// title, user, subjects, grades, univerisites
	
	const [ title, setTitle ] = useState('');
	const [ subjects, setSubjects ] = useState([]);

	const [
		fetchAddProfessor,
		{
			isLoading: isFetchAddProfessorLoading,
			isSuccess: isFetchAddProfessorSuccess
		}
	] = useAddProfessorMutation();

	const handleAddProfessor = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				title, subjects
			};

			const result = await fetchAddProfessor({ university: uni!, body }).unwrap();
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	content = 
	<>
		<form onSubmit={handleAddProfessor}>
			<input id="title" placeholder="Titula" value={title} onChange={(e) => setTitle(e.target.value)} />
			<select id="subjects">
				<option value="0">Izaberi predmet kasnije...</option>
			</select>
			<button type="submit">Unesi profesora!</button>
		</form>
	</>

	return (
		<>
			{ content }
		</>
	)
}

export default ProfessorAdd;