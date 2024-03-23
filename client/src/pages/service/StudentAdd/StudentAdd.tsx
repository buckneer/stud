import { useState, useEffect } from 'react'
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useAddStudentMutation } from './../../../app/api/studentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useParams } from 'react-router-dom';

const StudentAdd = ({ userId }: any) => {
	const { uni } = useParams(); // PMF ID 65fafc2da919db458f7ed90d

	const [ studentId, setStudentId ] = useState("");
	const [ department, setDepartment ] = useState("");
	const [ currentSemester, setCurrentSemester ] = useState("");
	const [ degree, setDegree ] = useState("");

	const [
		studentAdd, 
		{
			isLoading: isStudentAddLoading,
			isSuccess: isStudentAddSuccess,
			isError: isStudentAddError
		}
	] = useAddStudentMutation();

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

	const handleStudentAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		console.log(studentId, department, currentSemester, degree);
		
		try {
			const body = {
				studentId, department, currentSemester, degree, userId
			}
			// needs userId from params...
			// const result = await studentAdd({ university: uni!, body });
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
		<>
			<form onSubmit={handleStudentAdd}>
				<input type="text" placeholder='Broj indeksa' value={studentId} onChange={(e) => setStudentId(e.target.value)} />
				<select onChange={(e) => setDepartment(e.target.value)}>
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
				<input type="number" placeholder='Semestar' value={currentSemester} onChange={(e) => setCurrentSemester(e.target.value)} />
				<select id="degree" onChange={(e) => setDegree(e.target.value)}>
					<option value="0">Izaberite tip studija</option>
					<option value="Osnovne" > Osnovne</option>
					<option value="Master" > Master</option>
					<option value="Doktorske" > Doktorske</option>
				</select>
				<button className='bg-white py-2 px-4' type="submit">Potvrdi</button>
			</form>
		</>
	}

	useEffect(() => {
		document.title = 'Dodaj studenta | Stud';
	}, []);

	return (
		<>
			{ content }
		</>
	);
}

export default StudentAdd;