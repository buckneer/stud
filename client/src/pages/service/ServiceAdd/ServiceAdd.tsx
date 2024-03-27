import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { useLazyGetPendingQuery, useGetUserQuery } from '../../../app/api/userApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { CircleX } from 'lucide-react';
import Loader from '../../../components/Loader/Loader';
import { useAddServiceMutation } from '../../../app/api/serviceApiSlice';
import { useAddUniServiceMutation } from '../../../app/api/uniApiSlice';

const ServiceAdd = () => {

	const session = useSelector((state: RootState) => state.session);
	const location = useLocation();
	const { uni: university } = useParams();
	
	const [user, setUser] = useState("");
	
	const {
		data: userData,
		isLoading: isUserLoading,
		isSuccess: isUserSuccess,
		isError: isUserError
	} = useGetUserQuery(user, {
		skip: !university || !session.accessToken || !user
	});

	const [
		addService,
		{
			isLoading: isAddServiceLoading,
			isSuccess: isAddServiceSuccess,
			isError: isAddServiceError
		}
	] = useAddServiceMutation();

	const [ 
		addUniService,
		{
			isLoading: isAddUniServiceLoading,
			isSuccess: isAddUniServiceSuccess,
			isError: isAddUniServiceError
		}
	] = useAddUniServiceMutation();

	// const [
	// 	addUserService,
	// 	{
	// 		isLoading: isAddUserServiceLoading,
	// 		isSuccess: isAddUserServiceSucces,
	// 		isError: isAddUserServiceError
	// 	}
	// ] = ...();

	const [
		fetchGetUsers,
		{
			data: usersData,
			isLoading: isUsersLoading,
			isSuccess: isUsersSuccess,
			isError: isUsersError
		}
	] = useLazyGetPendingQuery();

	const handleAddService = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				user, university
			};

			const result = await addService(body).unwrap();

			const resultBody = {
				// @ts-ignore
				services: [ result._id ]
			};

			// @ts-ignore
			await addUniService({ university, body: resultBody }).unwrap();

		} catch (e: any) {
			console.error(e);
		}
	}

	const handleRemoveUser = () => {
		if(location?.state?.user) {
			// @ts-ignore
			fetchGetUsers({ university, role: 'service' })
			window.history.replaceState({}, '')
		}
		setUser('');
	}

	const options = [
		{ value: "id1", label: {} }
	]

	let content: any;

	if(isUsersLoading || isUserLoading){
		content = <Loader />
	} else if(isUsersSuccess || location?.state?.for === 'service') {
		content = 
			<>
				<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Nova stud sluzba</div>
						<div className="form-desc" >Kreiranje nove sluzbe</div>

						{
							isAddServiceLoading || isAddUniServiceLoading ? <Loader/> : null
						}
						{
							isAddServiceSuccess && isAddUniServiceSuccess ? 
								<div className="w-full flex justify-center">
									<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspešno kreiran novi nalog STUD službe!</div>
								</div>
								: null
						}
						{ 
							isAddServiceError || isAddUniServiceError ?
								<div className="w-full flex justify-center">
									<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greška prilikom kreiranja STUD službe!</div>
								</div>
								: null
						}
					</div>
					<form onSubmit={handleAddService}>
						<div className='form-control'>
							{ 
								!user && usersData ?
									<div className="form-control">
										<Select onChange={(e: any) => setUser(e?.value)} isClearable isSearchable  placeholder="Izaberite korisnika za Sluzbu" className='w-full outline-none' options={usersData!.map((item) => {
											return { value: item._id, label: item.name };
										})} />
									</div> :
									<>
										<div className='form-control relative'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="serviceName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="serviceName" placeholder="Ime STUDenta" value={userData?.name} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													Ime STUD službe
												</span>
												<button type="button" className='absolute right-5' onClick={handleRemoveUser}>
													<CircleX />
												</button>
											</label>
										</div>
										<div className='form-control'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="serviceEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="serviceEmail" placeholder="E-adresa STUDenta" value={userData?.email} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													E-adresa STUD službe
												</span>
											</label>
										</div>
									</>
							}
							
						</div>

						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Sluzbu</button>
						</div>
					</form>
				</div>
			</div>
			</>
	}

	useEffect(() => {
		document.title = 'Dodaj službu | Stud';

		if (location?.state?.user && location?.state?.for === 'service') {
			setUser(location.state.user._id);
		} else {
			// @ts-ignore
			fetchGetUsers({ university, role: 'service'});
		}
	}, []);

	return (
		<>
			{ content }
		</>
	)
}

export default ServiceAdd