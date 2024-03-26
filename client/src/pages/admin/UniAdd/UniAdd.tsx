import React, { useState, useEffect } from 'react'
import { useAddUniMutation } from '../../../app/api/uniApiSlice';

const UniAdd = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [parentUni, setParentUni] = useState('');

	const [
		fetchAddUni,
		{
			isLoading: isUniAddLoading,
			isSuccess: isUniAddSuccess,
			isError: isUniAddError,
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

	useEffect(() => {
		document.title = "Univerziteti | Stud";
	}, []);

	// link: http://localhost:3000/admin/uni/add

	return (

		<div className='flex-grow flex justify-center items-center'>
			<div className='card'>
				<div className='form-header'>
					<div className="form-title">Novi Fakultet</div>
					<div className="form-desc" >Kreiranje novog fakulteta</div>

					{
						isUniAddLoading ? <div className="">Loader ide ovde...</div> : null
					}
					{
						isUniAddSuccess ?
							<div className="w-full flex justify-center">
								<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspesno dodat fakultet!</div>
							</div>
							: null
					}
					{
						isUniAddError ?
							<div className="w-full flex justify-center">
								<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom registracije fakultet!</div>
							</div>
							: null
					}
				</div>
				<form onSubmit={handleAddUni}>
					<div className='form-control'>
						<label htmlFor="parentUniId" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="text" id="parentUniId" placeholder="Zvanje profesora" value={parentUni} onChange={(e) => setParentUni(e.target.value)} autoComplete='off' required
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								Naziv univerziteta
							</span>
						</label>
					</div>
					<div className='form-control'>
						<label htmlFor="uniId" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="text" id="uniId" placeholder="Zvanje profesora" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' required
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								Naziv fakulteta
							</span>
						</label>
					</div>
					<div className='form-control'>
						<label htmlFor="email" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="text" id="email" placeholder="Zvanje profesora" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' required
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								E-adresa fakulteta
							</span>
						</label>
					</div>
					<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isUniAddSuccess}>Kreiraj Fakultet</button>
					</div>
				</form>
			</div>
		</div>

	)
}

export default UniAdd;