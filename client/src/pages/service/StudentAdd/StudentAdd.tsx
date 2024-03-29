import { useState, useEffect } from 'react'
import { useAddDepStudentsMutation, useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useAddStudentMutation, useAddStudentToUniMutation } from './../../../app/api/studentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from "../../../app/api/userApiSlice";
import { useLazyGetPendingQuery } from '../../../app/api/userApiSlice';
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';

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
		if (location?.state?.user) {
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
									<Select onChange={(e: any) => setUserId(e?.value)} required isClearable isSearchable placeholder="Izaberite korisnika" className='w-full outline-none' options={usersData!.map((item) => {
										return { value: item._id, label: item.name };
									})} />
								</div> :
								<>
									<InputField id="professorName" name="Ime STUDenta" type="text" inputVal={userData?.name} disabled button buttonAction={handleRemoveUser} />
									<InputField id="professorEmail" name="E-adresa STUDenta" type="email" inputVal={userData?.email} disabled />
								</>
						}
						<InputField id="studentId" name="Broj Indeksa" type="text" inputVal={studentId} setVal={(e) => setStudentId(e.target.value)} />
						<div className='form-control'>
							<Select onChange={(e: any) => setDepartment(e?.value)} placeholder="Izaberite odsek" className='w-full outline-none' required isClearable isSearchable options={departmentsData.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<InputField id="semester" name="Semestar" type="number" inputVal={currentSemester} setVal={(e) => setCurrentSemester(e.target.value)} min={0} max={12} />
						<div className='form-control'>
							<Select onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' required isClearable isSearchable options={degreeOptions} />
						</div>
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isStudentAddSuccess}>Kreiraj Studenta</button>
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
			fetchGetUsers({ university, role: 'student' });
		}

	}, []);

	return (
		<>
			{content}
		</>
	);
}

export default StudentAdd;