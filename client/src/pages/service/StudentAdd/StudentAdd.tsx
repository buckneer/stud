import { useState, useEffect } from 'react'
import { useAddDepStudentsMutation, useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useAddStudentMutation, useAddStudentToUniMutation } from './../../../app/api/studentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useLocation, useParams } from 'react-router-dom';

const StudentAdd = () => {
	const { uni } = useParams(); // PMF ID 65fafc2da919db458f7ed90d //!! VOLIM OVO, HVALA TI!

	const [userId, setUserId] = useState('');
	const [ studentId, setStudentId ] = useState("");
	const [ department, setDepartment ] = useState("");
	const [ currentSemester, setCurrentSemester ] = useState("");
	const [ degree, setDegree ] = useState("");
	const location = useLocation();

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
	} = useGetUniQuery(uni!, {
		skip: !uni // || !session.accessToken
	});
	
	const {
		data: departments,
		isLoading: isDepLoading,
		isSuccess: isDepSuccess,
		isError: isDepError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uniData
	});

	console.log(departments);
	
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
				university: uni!
			}

			const result = await studentAdd(body).unwrap();

			const resultBody: any = {
				university: uni,
				body: {
					// @ts-ignore
					students: [ result.id ]
				}
			}

			await studentAddUni(resultBody);

			// @ts-ignore
			await addDepStudents({ department, body: { students: [ result.id ] } });
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	if(isUniLoading || isDepLoading) { 
		content =
		<>
			Loading...
		</>
	}
	else if(isDepSuccess) {
		content = 
		<div className='flex-grow flex justify-center items-center'>
			<div className='card'>
				<div className='form-header'>
					<div className="form-title">Novi Student</div>
					<div className="form-desc" >Kreiranje novog studenta</div>

					{ 
						isStudentAddLoading ? <div className="">Loader ide ovde...</div>: null
					}
					{ 
						isStudentAddSuccess ?
							<div className="w-full flex justify-center">
								<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspešan login!</div> 
							</div>
						: null
					}
					{ 
						isStudentAddError ? 
							<div className="w-full flex justify-center">
								<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom prijavljivanja!</div> 
							</div>
						: null
					}
				</div>
				<form  onSubmit={handleStudentAdd}>
					{!userId && (
						<div className='form-control'>
							<label htmlFor="userId" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
								<input
									type="text" id="userId" placeholder="Broj Indeksa" value={userId!} onChange={(e) => setUserId(e.target.value)} autoComplete='off'
									className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
								/>
								<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
									UserId
								</span>
							</label>
						</div>
					)}
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
						<select className='shadow-sm border-0 w-full text-sm' onChange={(e) => setDepartment(e.target.value)}>
							<option value='0'>Izaberite odsek</option>
							{
								departments.map((dep: any) => {
									return (
										<option value={ dep._id }>
											{ dep.name }
										</option>
									);
								})
							}
						</select>
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
						<select className='shadow-sm border-0 rounded w-full text-sm' id="degree" onChange={(e) => setDegree(e.target.value)}>
							<option value="0">Izaberite tip studija</option>
							<option value="OAS" > Osnovne</option>
							<option value="MAS" > Master</option>
							<option value="DAS" > Doktorske</option>
						</select>
						


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
		if(location.state) {
			if(location.state.userId) {
				setUserId(location.state.userId);
			} else {
				// TODO Show a dropdown to select
			}
		}
		
	}, []);

	return (
		<>
			{ content }
		</>
	);
}

export default StudentAdd;