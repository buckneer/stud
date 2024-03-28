import { useState, useEffect } from 'react'
import { useAddDepStudentsMutation, useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useAddStudentMutation, useAddStudentToUniMutation } from './../../../app/api/studentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import { CircleX } from "lucide-react";
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from "../../../app/api/userApiSlice";
import { useLazyGetPendingQuery } from '../../../app/api/userApiSlice';
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';



const StudentAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const location = useLocation();
	const { uni: university } = useParams();

	const [userId, setUserId] = useState('');
	const [studentId, setStudentId] = useState("");
	const [department, setDepartment] = useState("");
	const [currentSemester, setCurrentSemester] = useState("");
	const [degree, setDegree] = useState("");

	const degreeOptions = [
		{ value: "OAS", label: "Osnovne akademske studije" },
		{ value: "MAS", label: "Master akademske studije" },
		{ value: "DAS", label: "Doktorske akademske studije" }
	]

	const [
		studentAdd,
		{
			isLoading: isStudentAddLoading,
			isSuccess: isStudentAddSuccess,
			isError: isStudentAddError
		}
	] = useAddStudentMutation();

	const [
		studentAddUni,
		{
			isLoading: isStudentAddUniLoading,
			isSuccess: isStudentAddUniSuccess,
			isError: isStudentAddUniError
		}
	] = useAddStudentToUniMutation();

	const [
		addDepStudents,
		{
			isLoading: isAddDepStudentsLoading,
			isSuccess: isAddDepStudentSuccess,
			isError: isAddDepStudentError
		}
	] = useAddDepStudentsMutation();

	const {
		data: uniData,
		isLoading: isUniLoading,
		isSuccess: isUniSuccess,
		isError: isUniError
	} = useGetUniQuery(university!, {
		skip: !university // || !session.accessToken
	});

	const {
		data: departmentsData,
		isLoading: isDepLoading,
		isSuccess: isDepSuccess,
		isError: isDepError
	} = useGetUniDepartmentsQuery(university!, {
		skip: !uniData
	});

	const {
		data: userData,
		isLoading: isUserLoading,
		isSuccess: isUserSuccess,
		isError: isUserError
	} = useGetUserQuery(userId!, {
		skip: !university || !session.accessToken || !userId
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

	const handleStudentAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				user: userId,
				studentId,
				department,
				currentSemester,
				degree,
				university: university!
			}

			const result = await studentAdd(body).unwrap();

			const resultBody: any = {
				university: university,
				body: {
					// @ts-ignore
					students: [result.id]
				}
			}

			await studentAddUni(resultBody);

			// @ts-ignore
			await addDepStudents({ department, body: { students: [result.id] } });
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleRemoveUser = () => {
		if(location?.state?.user) {
			// @ts-ignore
			fetchGetUsers({ university, role: 'student' })
			window.history.replaceState({}, '')
		}
		setUserId('');
	}

	let content: any;

	if (isUniLoading || isDepLoading || isUsersLoading || isUserLoading) {
		content =
			<>
				<Loader />
			</>
	}
	else if (isDepSuccess && (isUsersSuccess || location?.state?.for === 'student')) {
		content =
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Novi Student</div>
						<div className="form-desc" >Kreiranje novog STUDenta</div>
							<MutationState 
								isLoading={isStudentAddLoading || isStudentAddUniLoading || isAddDepStudentsLoading}
								isSuccess={isStudentAddSuccess && isAddDepStudentSuccess && isStudentAddUniSuccess}
								successMessage='Uspešno kreiran novi student!'
								isError={isStudentAddError || isStudentAddUniError || isAddDepStudentError}
								errorMessage='Greška prilikom kreiranja studenta!'
							/>
					</div>
					<form onSubmit={handleStudentAdd}>
						{
							!userId && usersData ?
									<div className='form-control'>
										<Select onChange={(e: any) => setUserId(e?.value)} isClearable isSearchable placeholder="Izaberite korisnika" className='w-full outline-none' options={usersData!.map((item) => {
											return { value: item._id, label: item.name };
										})} />
									</div> :
									<>
										<div className='form-control relative'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="professorName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="professorName" placeholder="Ime STUDenta" value={userData?.name} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													Ime STUDenta
												</span>
												<button type="button" className='absolute right-5' onClick={handleRemoveUser}>
													<CircleX />
												</button>
											</label>
										</div>
										<div className='form-control'>
											{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
											<label htmlFor="professorEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
												<input
													type="text" id="professorEmail" placeholder="E-adresa STUDenta" value={userData?.email} disabled autoComplete='off'
													className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
												/>
												<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
													E-adresa STUDenta
												</span>
											</label>
										</div>
									</>
					}
						<div className='form-control'>
							<label htmlFor="studentId" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
								<input
									type="text" id="studentId" placeholder="Broj Indeksa" value={studentId} onChange={(e) => setStudentId(e.target.value)} autoComplete='off'
									className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								/>
								<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
									Broj Indeksa
								</span>
							</label>
						</div>
						<div className='form-control'>
							<Select onChange={(e: any) => setDepartment(e?.value)} placeholder="Izaberite odsek" className='w-full outline-none' isClearable isSearchable options={departmentsData.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<div className='form-control'>
							<label htmlFor="semester" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
								<input
									type="number" min={1} max={12} id="studentId" placeholder="Broj Indeksa" value={currentSemester} onChange={(e) => setCurrentSemester(e.target.value)} autoComplete='off'
									className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								/>
								<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
									Semestar
								</span>
							</label>
						</div>
						<div className='form-control'>
							<Select onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' isClearable isSearchable options={degreeOptions} />
						</div>
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-blue-800 px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isStudentAddSuccess}>Kreiraj Studenta</button>
						</div>
					</form>
				</div>

			</div>
	}

	useEffect(() => {
		document.title = 'Dodaj studenta | Stud';
		
		if (location?.state?.user && location?.state?.for === 'student') {
			setUserId(location.state.user._id);
		} else {
			// @ts-ignore
			fetchGetUsers({ university, role: 'student'});
		}

	}, []);

	return (
		<>
			{content}
		</>
	);
}

export default StudentAdd;