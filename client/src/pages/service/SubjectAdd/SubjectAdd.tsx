import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useGetProfessorsQuery } from './../../../app/api/professorApiSlice';
import { useAddSubjectMutation, useAddSubjectProfessorsMutation, useGetRequiredSubjectsQuery } from '../../../app/api/subjectApiSlice';
import InputField from '../../../components/InputField/InputField';
import MutationState from '../../../components/MutationState/MutationState';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useAddSubjectsToOptionalMutation, useGetOptionalQuery } from '../../../app/api/optionalApiSlice';
import Loader from '../../../components/Loader/Loader';
import { AddSubjOpt } from '../../../app/api/types/types';
import { Helmet } from 'react-helmet';

interface SelectProps {
	value: string;
	label: string;
}

const SubjectAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [department, setDepartment] = useState("");
	const [professors, setProfessors] = useState<SelectProps[]>([]);
	const [espb, setEspb] = useState<number>();
	const [semester, setSemester] = useState("");
	const [degree, setDegree] = useState("");
	const [type, setType] = useState('');
	const [optional, setOptional] = useState('');
	const [requiredSub, setRequiredSub] = useState<SelectProps[]>([]);

	const degreeOptions = [
		{ value: "OAS", label: "Osnovne akademske studije" },
		{ value: "MAS", label: "Master akademske studije" },
		{ value: "DAS", label: "Doktorske akademske studije" }
	]

	const subjectOptions = [
		{ value: 'R', label: 'Obavezni'  },
		{ value: 'O', label: 'Izborni' },
	];

	const {
		data: uniData,
		isLoading: isUniLoading,
		isSuccess: isUniSuccess,
		isError: isUniError
	} = useGetUniQuery(uni!, {
		skip: !uni || !session.accessToken
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
	});

	const {
		data: reqSubjectData,
		isLoading: isReqSubjectsLoading,
		isSuccess: isReqSubjectsSuccess
		// @ts-ignore
	} = useGetRequiredSubjectsQuery({ university: uni, department, semester }, {
		skip: !uni || !department || !semester || semester === '1'
	})

	const [
		addSubject,
		{
			isLoading: isAddSubjectLoading,
			isSuccess: isAddSubjectSuccess,
			isError: isAddSubjectError
		}
	] = useAddSubjectMutation();

	const [
		addProfessors,
		{
			isLoading: isAddProfessorsLoading,
			isSuccess: isAddProfessorsSuccess,
			isError: isAddProfessorsError
		}
	] = useAddSubjectProfessorsMutation();

	const [
		addSubjToOpt,
		{
			isLoading: isAddSubjToOptLoading,
			isSuccess: isAddSubjToOptSuccess,
			isError: isAddUbjToOptError
		}
	] = useAddSubjectsToOptionalMutation();

	const 
		{
			data: optionalData,
			isLoading: isOptionalLoading,
			isSuccess: isOptionalSuccess,
			isError: isOptionalError
		}= useGetOptionalQuery({ university: uni, body: { semester, department }}, {
			skip: !semester || !department || type !== 'O' || !uni || !session.accessToken
		});

	const handleSubjectAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		
		try {
			let prof = professors?.map((elem: SelectProps) => elem.value);
			let reqSub = requiredSub?.map((elem: SelectProps) => elem.value);
			const body = {
				name, code, department, 
				professors: prof,
				university: uni, 
				requiredSub: reqSub,
				semester, espb, degree,
				type, 
			}

			const result: any = await addSubject(body).unwrap();
			
			const addProfBody = {
				professors: prof
			}

			// @ts-ignore
			await addProfessors({ subject: result.id, body: addProfBody });
			
			if(optional) {
				const subjToOpt: AddSubjOpt = {
					university: uni!,
					optional,
					body: {
						subjects: [ result.id ]
					}
				}
	
				await addSubjToOpt(subjToOpt);
			}
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	let reqContent: any;

	let optionalContent: any;

	if(isReqSubjectsLoading) {
		reqContent = <Loader />
	} else if(isReqSubjectsSuccess) {
		reqContent = 
			<>
				<div className="form-control">
					<Select maxMenuHeight={150} onChange={(e: any) => setRequiredSub(e)} isClearable isMulti isSearchable placeholder="Izaberite uslovne predmete" className='w-full outline-none' options={reqSubjectData!.map((item: any) => ({
						value: item._id, label: item.name
					}))} />
				</div>
			</>
	}

	if(isOptionalLoading) {
		optionalContent = <Loader />
	} else if (isOptionalSuccess) {
		optionalContent = 
			<>
				<div className="form-control">
					<Select maxMenuHeight={150} onChange={(e: any) => setOptional(e?.value)} placeholder="Izaberite blok" className="w-full outline-none" required isClearable isSearchable options={optionalData!.map((item: any) => ({
						value: item._id, label: item.name
					}))}/> 
				</div>
			</>
	}

	if (isUniLoading || isDepLoading || isProfessorsLoading) {
		content = <Loader />
	} else if (isDepSuccess && isProfessorsSuccess) {
		content =
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Novi Predmet</div>
						<div className="form-desc" >Kreiranje novog predmeta</div>
						<MutationState
							isLoading={isAddSubjectLoading || isAddProfessorsLoading}
							isSuccess={isAddSubjectSuccess && isAddProfessorsSuccess}
							successMessage='Uspešno dodavanje predmeta!'
							isError={isAddSubjectError || isAddProfessorsError}
							errorMessage='Greška prilikom dodavanja predmeta'
						/>
					</div>
					<form className='flex flex-col' onSubmit={handleSubjectAdd}>
						<InputField id='subjectName' type='text' name='Ime Predmeta' inputVal={name} setVal={(e) => setName(e.target.value)} />
						<InputField id='code' type='text' name='Kod Predmeta' inputVal={code} setVal={(e) => setCode(e.target.value)} />
						<InputField id='espb' type='number' min={0} name='Broj Espb' inputVal={espb?.toString()} setVal={(e) => setEspb(parseInt(e.target.value))}/>
						<InputField id='semestar' type='number' name='Semestar' inputVal={semester} setVal={(e) => setSemester(e.target.value)} />
						<div className='form-control'>
							<Select maxMenuHeight={200} onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' required isClearable isSearchable options={degreeOptions} />
						</div>
						<div className='form-control'>
							<Select maxMenuHeight={200} onChange={(e: any) => setDepartment(e?.value)} required isClearable isSearchable placeholder="Izaberite odsek" className='w-full outline-none' options={departmentsData!.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<div className='form-control'>
							<Select maxMenuHeight={200} onChange={(e: any) => setProfessors(e)} required isClearable isMulti isSearchable placeholder="Izaberite profesore" className='w-full outline-none' options={professorsData!.map((item: any) => {
								return { value: item._id, label: item.user.name };
							})} />
						</div>
						{
							department && semester && professors?.length ?
							<>
								<div className="form-control">
									<Select maxMenuHeight={200} onChange={(e: any) => setType(e?.value)} placeholder="Izaberite tip predmeta" className="w-full outline-none" required isClearable isSearchable options={subjectOptions} />
								</div>
							</> : null
						}
						{ optionalContent}
						{ reqContent }
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isAddSubjectLoading || isAddProfessorsLoading}>Kreiraj Predmet!</button>
						</div>
					</form>
				</div>
			</div>
	}

	return (
		<>
			<Helmet>
				<title>Dodavanje predmeta | Stud</title>
			</Helmet>
			{content}
		</>
	);
}

export default SubjectAdd;