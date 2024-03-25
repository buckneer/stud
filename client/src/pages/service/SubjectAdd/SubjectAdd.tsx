import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useGetProfessorsQuery } from './../../../app/api/professorApiSlice';
import { useAddSubjectMutation } from '../../../app/api/subjectApiSlice';


const SubjectAdd = () => {
	const { uni } = useParams();

	const [ name, setName ] = useState("");
	const [ code, setCode ] = useState("");
	const [ department, setDepartment ] = useState('');
	const [ professor, setProfessor ] = useState('');
	const [ professors, setProfessors ] = useState([]);

	const [
		fetchAddSubject,
		{
			isLoading: isFetchAddSubjectLoading,
			isSuccess: isFetchAddSubjectSuccess,
			isError: isFetchAddSubjectError
		}
	] = useAddSubjectMutation();

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

	const {
		data: professorsData,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess
	} = useGetProfessorsQuery(uni, {
		skip: !uni // || !session.accessToken
	})

	const handleSubjectAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		
		try {
			const body = {
				name, code, department, professors, university: uni
			}

			const result = await fetchAddSubject(body).unwrap();
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	if(isUniLoading || isDepLoading || isProfessorsLoading) {
		content = <>Loading...</>
	} else if(isDepSuccess && isProfessorsSuccess) {
		content =
		<div className='flex-grow flex justify-center items-center'>
			<div className='card'>
				<div className='form-header'>
					<div className="form-title">Novi Predmet</div>
					<div className="form-desc" >Kreiranje novog predmeta</div>

					{ 
						isFetchAddSubjectLoading ? <div className="">Loader ide ovde...</div>: null
					}
					{ 
						isFetchAddSubjectSuccess ?
							<div className="w-full flex justify-center">
								<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspešan login!</div> 
							</div>
						: null
					}
					{ 
						isFetchAddSubjectError ? 
							<div className="w-full flex justify-center">
								<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom prijavljivanja!</div> 
							</div>
						: null
					}
				</div>
				<form className='flex flex-col' onSubmit={handleSubjectAdd}>
					<input type="text" placeholder="Ime Predmeta" value={name} onChange={(e) => setName(e.target.value)} required />
					<input type="text" placeholder="Kod" value={code} onChange={(e) => setCode(e.target.value)} required />
					<select id="departments" name="departments" onChange={(e) => setDepartment(e.target.value)}>
						<option value="0">Izaberite odsek</option>
						{ departments.map((department) => {
								return (
									<option value={ department._id }>{ department.name }</option>
								);
						})}
					</select>
					<select id="professors" onChange={(e) => setProfessor(e.target.value)}>
						<option value="0">Izaberite profesora kasnije...</option>
						{
							professorsData.map((professor: any) => {
								return (
									<option value={ professor._id }>
										{ professor.name }
									</option>
								)
							})
						}
					</select>
					{/* Ovde dodaj Uslovne predmete */}
					<input type="number" min={0} placeholder='Broj espb' required />
					<input type="number" min={1} placeholder="Semestar" required />
					<button className='bg-white py-2 px-4' type="submit">Potvrdi</button>
				</form>
			</div>
			
		</div>
	}

	return (
		<>
			{ content }
		</>
	);
}

export default SubjectAdd;