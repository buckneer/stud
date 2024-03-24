import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useGetProfessorsQuery } from './../../../app/api/professorApiSlice';


const SubjectAdd = () => {
	const { uni } = useParams();

	const [ name, setName ] = useState("");
	const [ code, setCode ] = useState("");
	const [ department, setDepartment ] = useState('');

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
		data: professors,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess
	} = useGetProfessorsQuery(uni, {
		skip: !uni // || !session.accessToken
	})

	const handleSubjectAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		// Preuzmi kormilo odavde Jovane
	}

	let content: any;

	if(isUniLoading || isDepLoading || isProfessorsLoading) {
		content = <>Loading...</>
	} else if(isDepSuccess && isProfessorsSuccess) {
		content =
		<>
			<form onSubmit={handleSubjectAdd}>
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
				<select id="professors">
					<option value="0">Izaberite profesora</option>
					{
						professors.map((professor: any) => {
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
				<button className='bg-white py-2 px-4' type="submit">Potvrdi</button>
			</form>
		</>
	}

	return (
		<>
			{ content }
		</>
	);
}

export default SubjectAdd;