import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { useLazyGetPendingQuery, useGetUserQuery } from '../../../app/api/userApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { useAddServiceMutation } from '../../../app/api/serviceApiSlice';
import { useAddUniServiceMutation } from '../../../app/api/uniApiSlice';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';

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
		fetchGetUsers,
		{
			data: usersData,
			isLoading: isUsersLoading,
			isSuccess: isUsersSuccess,
			isError: isUsersError
		}
	] = useLazyGetPendingQuery();

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
						<MutationState
							isLoading={isAddServiceLoading || isAddUniServiceLoading }
							isSuccess={isAddServiceSuccess && isAddUniServiceSuccess }
							successMessage='Uspešno kreiran novi nalog STUD službe!'
							isError={isAddServiceError || isAddUniServiceError }
							errorMessage='Greška prilikom kreiranja STUD službe!'
						/>
					</div>
					<form onSubmit={handleAddService}>
						<div className='form-control'>
							{ 
								!user && usersData ?
									<div className="form-control">
										<Select onChange={(e: any) => setUser(e?.value)} required isClearable isSearchable  placeholder="Izaberite korisnika za Sluzbu" className='w-full outline-none' options={usersData!.map((item) => {
											return { value: item._id, label: item.name };
										})} />
									</div> :
									<>
										<InputField id="serviceName" name="Ime STUD službe" type="text" inputVal={userData?.name} disabled button buttonAction={handleRemoveUser} />
										<InputField id="serviceEmail" name="E-adresa STUD službe" type="text" inputVal={userData?.email} disabled />
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