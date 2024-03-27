import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { useGetPendingQuery } from '../../../app/api/userApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';

const ServiceAdd = () => {

	const session = useSelector((state: RootState) => state.session);
	const location = useLocation();
	

	const [user, setUser] = useState("");
	const { uni: university } = useParams();
	
	const {
		data: usersData,
		isLoading: isUsersLoading,
		isSuccess: isUsersSuccess,
		isError: isUsersError
		// @ts-ignore
	} = useGetPendingQuery({university, role: "service"},{
		skip: !university || !session.accessToken
	});

	const handleAddService = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Studentska sluzba

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/service/add
	}

	const options = [
		{value: "id1", label: {}}
	]

	useEffect(() => {
		document.title = "Studentska sluzba | Stud";
	}, []);

	let content: any;

	if(isUsersLoading){
		content = <Loader />
	} else if(isUsersSuccess) {
		content = 
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
							<Select onChange={(e: any) => setUser(e?.value)} isClearable isSearchable  placeholder="Izaberite korisnika za Sluzbu" className='w-full outline-none' options={usersData!.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>

						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Sluzbu</button>
						</div>
					</form>
				</div>
			</div>
			</>
	}

	return (
		<>
			{content}
		</>
	)
}

export default ServiceAdd