import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useGetProfessorsQuery } from './../../../app/api/professorApiSlice';
import { useAddSubjectMutation } from '../../../app/api/subjectApiSlice';
import InputField from '../../../components/InputField/InputField';
import MutationState from '../../../components/MutationState/MutationState';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

const SubjectAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [department, setDepartment] = useState("");
	const [professors, setProfessors] = useState<string[]>([]);
	const [espb, setEspb] = useState("");
	const [currentSemester, setCurrentSemester] = useState("");

	const {
		data: uniData,
		isLoading: isUniLoading,
		isSuccess: isUniSuccess,
		isError: isUniError
	} = useGetUniQuery(uni!, {
		skip: !uni  || !session.accessToken
	});

	const {
		data: departmentsData,
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

	const [
		addSubject,
		{
			isLoading: isAddSubjectLoading,
			isSuccess: isAddSubjectSuccess,
			isError: isAddSubjectError
		}
	] = useAddSubjectMutation();

	const handleSubjectAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		console.log(name);

		// try {
		// 	const body = {
		// 		name, code, department, professors, university: uni
		// 	}

		// 	const result = await addSubject(body).unwrap();
		// } catch (e: any) {
		// 	console.error(e);
		// }
	}

	let content: any;

	if (isUniLoading || isDepLoading || isProfessorsLoading) {
		content = <>Loading...</>
	} else if (isDepSuccess && isProfessorsSuccess) {
		content =
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Novi Predmet</div>
						<div className="form-desc" >Kreiranje novog predmeta</div>
						<MutationState
							isLoading={isAddSubjectLoading}
							isSuccess={isAddSubjectSuccess}
							successMessage='Uspešno dodavanje predmeta!'
							isError={isAddSubjectError}
							errorMessage='Greška prilikom dodavanja predmeta'
						/>
					</div>
					<form className='flex flex-col' onSubmit={handleSubjectAdd}>
						<div className='form-control'>
							<InputField id='subjectName' type='text' name='Ime Predmeta' inputVal={name} setVal={(e) => setName(e.target.value)} />
						</div>
						<div className='form-control'>
							<InputField id='code' type='text' name='Kod Predmeta' inputVal={code} setVal={(e) => setCode(e.target.value)} />
						</div>
						
						<div className='form-control'>
							<Select onChange={(e: any) => setDepartment(e?.value)} isClearable isSearchable placeholder="Izaberite odsek" className='w-full outline-none' options={departmentsData!.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<div className='form-control'>
							<Select onChange={(e: any) => setProfessors(e?.value)} isClearable isMulti isSearchable placeholder="Izaberite profesore" className='w-full outline-none' options={professorsData!.map((item: any) => {
								return { value: item._id, label: item.user.name };
							})} />
						</div>
						<div className='form-control'>
							<InputField id='espb' type='number' name='Broj Espb' inputVal={espb} setVal={(e) => setEspb(e.target.value)} />
						</div>
						<div className='form-control'>
							<InputField id='semestar' type='number' name='Semestar' inputVal={currentSemester} setVal={(e) => setCurrentSemester(e.target.value)} />
						</div>
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isAddSubjectSuccess}>Kreiraj Studenta</button>
						</div>
					</form>
				</div>

			</div>
	}

	return (
		<>
			{content}
		</>
	);
}

export default SubjectAdd;