import React, { useState } from 'react'
import { useAddUniMutation } from '../../../app/api/uniApiSlice';

const UniAdd = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ parentUni, setParentUni ] = useState('');

	const [
		fetchAddUni,
		{
			isLoading: isFetchAddUniLoading,
			isSuccess: isFetchAddUniSuccess,
			isError: isFetchAddUniError,
		}
	] = useAddUniMutation();
	
	const handleAddUni = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const body = { // add type Uni maybe?
				name, email, parentUni
			}
			
			const result = await fetchAddUni(body);
		} catch (e: any) {
			console.error(e);
		}
	}

	return (
		<div>
			<form onSubmit={handleAddUni}>
				<label htmlFor="uni">Univerzitet</label>
				<input id="uni" type="text" value={parentUni} onChange={(e) => setParentUni(e.target.value)} />
				<label htmlFor="name">Naziv fakulteta</label>
				<input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
				<label htmlFor="email">E-adresa fakulteta</label>
				<input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<button>Unesi!</button>
			</form>
		</div>
	)
}

export default UniAdd;