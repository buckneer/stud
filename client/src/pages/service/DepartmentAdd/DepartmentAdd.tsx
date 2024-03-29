import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAddDepartmentMutation } from '../../../app/api/departmentApiSlice';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useAddUniDepartmentMutation } from '../../../app/api/uniApiSlice';
import MutationState from '../../../components/MutationState/MutationState';

const DepartmentAdd = () => {

	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	const [name, setName] = useState("");
	// const [university, setUniversity] = useState("");
	// const [students, setStudents] = useState([]);
	// const [professors, setProfessors] = useState([]);

	const {
		isLoading: isDepartmentLoading,
		isSuccess: isDepartmentSuccess,
		isError: isDepartmentError
	} = useGetUniSubjectsQuery(uni!, {
		skip: !uni || !session.accessToken
	});

	const [
		AddDepartment,
		{
			isLoading: isDepartmentAddLoading,
			isSuccess: isDepartmentAddSuccess,
			isError: isDepartmentAddError
		}
	] = useAddDepartmentMutation();

	const [
		AddUniDepartment,
		{
			isLoading: isUniDepartmentAddLoading,
			isSuccess: isUniDepartmentAddSuccess,
			isError: isUniDepartmentAddError
		}
	] = useAddUniDepartmentMutation();

	const handleAddDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				name
			};
			const result = await AddDepartment({ university: uni!, body }).unwrap();

			// @ts-ignore 
			const resultBody: any = { departments: [result._id] };

			// @ts-ignore
			await AddUniDepartment({ university: uni!, body: resultBody });

		} catch (e: any) {
			console.log(e);
		}
	};

	let content: any;

	if (isDepartmentLoading) {
		content = <>Loading...</>
	} else if (isDepartmentSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Odsek</div>
							<div className="form-desc" >Kreiranje novog Odseka</div>
							<MutationState
								isLoading={isDepartmentAddLoading || isUniDepartmentAddLoading}
								isSuccess={isDepartmentAddSuccess && isUniDepartmentAddSuccess}
								isError={isDepartmentAddError || isUniDepartmentAddError}
								// @ts-ignore
								errorMessage={isDepartmentAddError?.data?.message || isUniDepartmentAddError?.data?.message || 'Greska prilikom registracije odseka!'}
								successMessage='Uspesno dodat odsek!'
							/>
						</div>
						<form onSubmit={handleAddDepartment} >
							<div className='form-control'>
								<label htmlFor="nameOfDep" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="text" id="nameOfDep" placeholder="Zvanje profesora" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' required
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Naziv odseka
									</span>
								</label>
							</div>
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isDepartmentAddSuccess}>Kreiraj Odsek</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}

	useEffect(() => {
		document.title = "Dodavanje odseka | Stud";
	}, []);

	return (
		<>
			{content}
		</>
	)
};

export default DepartmentAdd