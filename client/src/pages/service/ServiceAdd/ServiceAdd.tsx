import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const ServiceAdd = () => {

	const [user, setUser] = useState("");
	const { uni: university } = useParams();

	const handleAddService = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Studentska sluzba

		// TODO: Za odabir studentske sluzbe: izaberi ili input ili select => option dole

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/service/add
	}

	useEffect(() => {
		document.title = "Studentska sluzba | Stud";
	}, []);

	return (
		<>
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Nova stud sluzba</div>
						<div className="form-desc" >Kreiranje nove sluzbe</div>

						{/* {
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
							} */}
					</div>
					<form onSubmit={handleAddService}>
						<div className='form-control'>
							{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
							<label htmlFor="serviceName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
								<input
									type="text" id="serviceName" placeholder="Ime sluzbe" value={user} onChange={(e) => setUser(e.target.value)} autoComplete='off'
									className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								/>
								<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
									Ime Studentske Sluzbe
								</span>
							</label>
						</div>
						<div className='form-control'>
							{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
							<label htmlFor="users" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
								<input
									type="text" id="users" placeholder="Korisnici" value={user} onChange={(e) => setUser(e.target.value)} autoComplete='off'
									className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								/>
								<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
									Korisnici [Primeni reactSelector]
								</span>
							</label>
						</div>
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Profesora</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default ServiceAdd