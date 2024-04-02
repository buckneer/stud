import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from './../../../app/api/departmentApiSlice';
import { useGetUniQuery } from './../../../app/api/uniApiSlice';
import { useGetProfessorsQuery } from './../../../app/api/professorApiSlice';
import { useGetSubjectQuery, useUpdateSubjectMutation } from '../../../app/api/subjectApiSlice';
import InputField from '../../../components/InputField/InputField';
import MutationState from '../../../components/MutationState/MutationState';
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import getLabel from '../../../utils/getLabel';

interface SelectProps {
	value: string;
	label: string;
}

const SubjectAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni, id } = useParams();

	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [department, setDepartment] = useState("");
	const [professors, setProfessors] = useState<SelectProps[]>();
	const [espb, setEspb] = useState<number>();
	const [semester, setSemester] = useState("");
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
	} = useGetUniQuery(uni!, {
		skip: !uni || !session.accessToken
	});

  const {
    data: subjectData,
    isLoading: isSubjectLoading,
    isSuccess: isSubjectSuccess,
    isError: isSubjectError
  } = useGetSubjectQuery(id!, {
    skip: !uni || !session.accessToken
  });

	const {
		data: departmentsData,
		isLoading: isDepLoading,
		isSuccess: isDepSuccess,
		isError: isDepError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uniData || !subjectData
	});

	const {
		data: professorsData,
		isLoading: isProfessorsLoading,
		isSuccess: isProfessorsSuccess
	} = useGetProfessorsQuery(uni, {
		skip: !uniData || !subjectData // || !session.accessToken
	})

	const [
		updateSubject,
		{
			isLoading: isUpdateSubjectLoading,
			isSuccess: isUpdateSubjectSuccess,
			isError: isUpdateSubjectError
		}
	] = useUpdateSubjectMutation();

	const handleSubjectEdit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// add check here if anything changed at all...
		
		
		try {
			const body = {
				name, 
				code, 
				department, 
				professors: professors?.map((elem: SelectProps) => elem.value), 
				university: uni, 
				semester, 
				espb, 
				degree
		}


    // @ts-ignore
		const result = await updateSubject({ id, body }).unwrap();
		
		} catch (e: any) {
			console.error(e);
		}
	}

	let content: any;

	if (isUniLoading || isDepLoading || isProfessorsLoading || isSubjectLoading) {
		content = <>Loading...</>
	} else if (isDepSuccess && isProfessorsSuccess && isSubjectSuccess) { 
    content =
			<div className='flex-grow flex justify-center items-center'>
				<div className='card'>
					<div className='form-header'>
						<div className="form-title">Novi Predmet</div>
						<div className="form-desc" >Kreiranje novog predmeta</div>
						<MutationState
							isLoading={isUpdateSubjectLoading}
							isSuccess={isUpdateSubjectSuccess}
							successMessage='Uspešno menjanje predmeta!'
							isError={isUpdateSubjectError}
							errorMessage='Greška prilikom menjanja predmeta'
						/>
					</div>
					<form className='flex flex-col' onSubmit={handleSubjectEdit}>
						<InputField id='subjectName' type='text' name='Ime Predmeta' inputVal={name} setVal={(e) => setName(e.target.value)} />
						<InputField id='code' type='text' name='Kod Predmeta' inputVal={code} setVal={(e) => setCode(e.target.value)} />
						<div className='form-control'>
              {/* @ts-ignore */}
							<Select value={getLabel(department, departmentsData, '_id', 'name')} onChange={(e: any) => setDepartment(e?.value)} required isClearable isSearchable placeholder="Izaberite odsek" className='w-full outline-none' options={departmentsData!.map((item) => {
								return { value: item._id, label: item.name };
							})} />
						</div>
						<div className='form-control'>
              {/* @ts-ignore */}
							<Select value={professors} onChange={(e: any) => setProfessors(e)} required isClearable isMulti isSearchable placeholder="Izaberite profesore" className='w-full outline-none' options={professorsData!.map((item: any) => {
								return { value: item._id, label: item.user.name };
							})} />
						</div>
						<div className='form-control'>
							<Select defaultValue={degreeOptions.find((i: any) => i.value === degree)} onChange={(e: any) => setDegree(e?.value)} placeholder="Izaberite tip studija" className='w-full outline-none' required isClearable isSearchable options={degreeOptions} />
						</div>
						<InputField id='espb' type='number' min={0} name='Broj Espb' inputVal={espb?.toString()} setVal={(e) => setEspb(parseInt(e.target.value))} />
						<InputField id='semestar' type='number' name='Semestar' inputVal={semester} setVal={(e) => setSemester(e.target.value)} />
						<div className='footer flex items-center justify-center flex-col'>
							<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isUpdateSubjectLoading}>Ažuriraj predmet!</button>
						</div>
					</form>
				</div>

			</div>
	}

  useEffect(() => {
    if(subjectData) {
      setName(subjectData.name!);
      setCode(subjectData.code!);
      setDepartment(subjectData.department!);
      setEspb(subjectData.espb!);
      setDegree(subjectData.degree!);
      setSemester(subjectData.semester!);
			if(professorsData) {
				// @ts-ignore
				setProfessors(getLabel(subjectData.professors, professorsData, 'user.name'));
			}
    }      
  }, [ isSubjectSuccess, isProfessorsSuccess ])

	return (
		<>
			{ content }
		</>
	);
}

export default SubjectAdd;