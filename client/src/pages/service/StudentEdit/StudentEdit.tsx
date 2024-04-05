import { useState, useEffect } from 'react'
import { useAddDepStudentsMutation, useGetUniDepartmentsQuery } from '../../../app/api/departmentApiSlice';
import { useGetStudentQuery, useUpdateStudentMutation } from '../../../app/api/studentApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';
import getLabel from '../../../utils/getLabel';

const StudentEdit = () => {
	const session = useSelector((state: RootState) => state.session); 
	const location = useLocation();
	const { uni: university, id: studentIdParam } = useParams();

	const [studentId, setStudentId] = useState("");
	const [studentName, setStudentName] = useState("");
	const [studentEmail, setStudentEmail] = useState("");
	const [department, setDepartment] = useState("");
	const [currentSemester, setCurrentSemester] = useState("");
	const [degree, setDegree] = useState("");

	const degreeOptions = [
		{ value: "OAS", label: "Osnovne akademske studije" },
		{ value: "MAS", label: "Master akademske studije" },
		{ value: "DAS", label: "Doktorske akademske studije" }
	]

	const {
		data: departmentsData,
		isLoading: isDepsDataLoading,
		isSuccess: isDepsDataSuccess,
		isError: isDepsDataError
	} = useGetUniDepartmentsQuery(university!, {
		skip: !university 
	});

	const {
		data: studentData,
		isLoading: isStudentDataLoading,
		isSuccess: isStudentDataSuccess,
		isError: isStudentDataError,
		error: isStudentError
	} = useGetStudentQuery(studentIdParam!, {
		skip: !studentIdParam 
	});

	const [
		updateStudent,
		{
			isLoading: isUpdateStudentLoading,
			isSuccess: isUpdateStudentSuccess,
			isError: isUpdateStudentError,
			error: UpdateSturentError
		}
	] = useUpdateStudentMutation();

	const [
		addDepStudents,
		{
			isLoading: isAddDepStudentsLoading,
			isSuccess: isAddDepStudentSuccess,
			isError: isAddDepStudentError
		}
	] = useAddDepStudentsMutation();

	const handleStudentUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				studentId,
				department,
				currentSemester,
				degree,
				university: university!
			}

			const result = await updateStudent({id: studentIdParam!, body}).unwrap();

			// @ts-ignore
			await addDepStudents({ department, body: { students: [result.id] } });
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	if (isDepsDataLoading || isStudentDataLoading) {
		content =
			<>
				<Loader />
			</>
	}
	else if (isDepsDataSuccess && isStudentDataSuccess) {
		content =
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Azurirajte Studenta</div>
						<div className="form-desc" >Azurirajte postojeceg STUDenta</div>
						<MutationState
							isLoading={isUpdateStudentLoading && isAddDepStudentsLoading}
							isSuccess={isUpdateStudentSuccess && isAddDepStudentSuccess}
							successMessage='Uspešno azuriran student!'
							isError={isUpdateStudentError || isAddDepStudentError}
							errorMessage='Greška prilikom azuriranja studenta!'
						/>
					</div>
					<form onSubmit={handleStudentUpdate}>
						{/* TODO: Ako hocemo da menjamo ime i email moramo da da povezemo sa user! */}
						<InputField id="professorName" name="Ime STUDenta" type="text" inputVal={studentName} setVal={(e) => setStudentName(e.target.value)} disabled />
						<InputField id="professorEmail" name="E-adresa STUDenta" type="email" inputVal={studentEmail} setVal={(e) => setStudentEmail(e.target.value)} disabled />
						<InputField id="studentId" name="Broj Indeksa" type="text" inputVal={studentId} setVal={(e) => setStudentId(e.target.value)} />
						<div className='form-control'>
							{/* @ts-ignore */}
							<Select maxMenuHeight={200} value={getLabel(department, departmentsData, '_id', 'name')} onChange={(e: any) => setDepartment(e?.value)} required isClearable isSearchable placeholder="Izaberite odsek" className='w-full outline-none' options={departmentsData!.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<InputField id="semester" name="Semestar" type="number" inputVal={currentSemester} setVal={(e) => setCurrentSemester(e.target.value)} min={0} max={12} />
						<div className='form-control'>
							<Select maxMenuHeight={200} value={degreeOptions.find((i: any) => i.value === degree)} onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' required isClearable isSearchable options={degreeOptions} />
						</div>
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isUpdateStudentLoading}>Azuriraj Studenta</button>
						</div>
					</form>
				</div>
			</div>
	}

	useEffect(() => {
		document.title = 'Dodaj studenta | Stud';	
		setStudentId(studentData?.studentId!);
		// @ts-ignore
		setStudentName(studentData?.user.name!);
		// @ts-ignore
		setStudentEmail(studentData?.user.email!);
		setCurrentSemester(studentData?.currentSemester!);
		setDegree(studentData?.degree!);
		// @ts-ignore
		setDepartment(studentData?.department);
		
	}, [isStudentDataSuccess, isDepsDataSuccess]);
	
	return (
		<>
			{content}
		</>
	);
}

export default StudentEdit;