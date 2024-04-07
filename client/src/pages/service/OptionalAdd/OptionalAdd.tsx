import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { useGetUniDepartmentsQuery } from '../../../app/api/departmentApiSlice';
import Loader from '../../../components/Loader/Loader';
import { useAddOptionalMutation } from '../../../app/api/optionalApiSlice';
import { useGetAvailableOptionalSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

type SelectProps = {
	value?: string;
	label?: string
}

const degreeOptions = [
	{ value: "OAS", label: "Osnovne akademske studije" },
	{ value: "MAS", label: "Master akademske studije" },
	{ value: "DAS", label: "Doktorske akademske studije" }
]

const OptionalAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	const [ name, setName ] = useState('');
	const [ semester, setSemester ] = useState('');
	const [ subjects, setSubjects ] = useState<SelectProps[]>([]);
	const [ degree, setDegree ] = useState('');
	const [ department, setDepartment ] = useState('');
	const [ espb, setEspb ] = useState('');
	
	const {
		data: departmentData,
		isLoading: isDepartmentLoading,
		isSuccess: isDepartmentSuccess,
		isError: isDepartmentError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uni
	});

	const {
		data: subjectData,
		isLoading: isSubjectLoading,
		isSuccess: isSubjectSuccess,
		isError: isSubjectError
	} = useGetAvailableOptionalSubjectsQuery({ university: uni!, department, sem: semester, degree }, {
		skip: !uni || !department || !semester || !degree
	})

	const [
		addOptional,
		{
			isLoading: isAddOptionalLoading,
			isSuccess: isAddOptionalSuccess,
			isError: isAddOptionalError
		}
	] = useAddOptionalMutation();

	const handleAddOptional = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			let selectedSub = subjects?.map((e: SelectProps) => e.value);
			let body = { 
				name, semester, degree, department, espb,
				subjects: selectedSub
			}

			// @ts-ignore
			await addOptional({ university: uni!, body }).unwrap();
		} catch (e: any) {
			console.error(e);
		}
	};

	let content: any;

	if (isDepartmentLoading) {
		content = <Loader />
	} else if (isDepartmentSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Izborni Blok</div>
							<div className="form-desc" >Kreiranje novog izbornog bloka</div>
							<MutationState
								// @ts-ignore
								isLoading={isSubjectLoading || isAddOptionalLoading}
								isSuccess={isAddOptionalSuccess}
								isError={isAddOptionalError}
								errorMessage={'Greška prilikom dodavanja izbornog bloka!'}
								successMessage='Uspešno dodat izborni blok!'
							/>
						</div>
						<form onSubmit={handleAddOptional} >
							<InputField id="name" name="Naziv izbornog bloka" type="text" inputVal={name} setVal={(e) => setName(e.target.value)} />
							<InputField id="semester" name="Semestar" type="number" inputVal={semester} setVal={(e) => setSemester(e.target.value)} />
							<InputField id="espb" name="ESPB" type="number" inputVal={espb} setVal={(e) => setEspb(e.target.value)} />
							<div className='form-control'>
								<Select maxMenuHeight={200} onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' required isClearable isSearchable options={degreeOptions} />
							</div>
							<div className="form-control">
								<Select maxMenuHeight={200} onChange={(e: any) => setDepartment(e?.value)} required isClearable isSearchable placeholder="Izaberite odsek" className='w-full outline-none' options={departmentData!.map((item) => {
									return { value: item._id, label: item.name };
								})} />
							</div>

							{
								department &&  semester && degree && isSubjectSuccess ?
								<div className="form-control">
									<Select maxMenuHeight={200} onChange={(e: any) => setSubjects(e)} isClearable isMulti isSearchable placeholder="Izaberite izborne predmete" className='w-full outline-none' options={subjectData!.map((item: any) => ({
										value: item._id, label: item.name
									}))} />
								</div> : null
							}

							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' >Kreiraj Izborni Blok</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}
	
	return (
		<>
			<Helmet>
				<title>Dodavanje izbornog bloka | Stud</title>
			</Helmet>
			{ content }
		</>
	)

}

export default OptionalAdd;