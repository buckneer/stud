import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAddDepartmentMutation, useGetDepartmentQuery, useUpdateDeparmentMutation } from '../../../app/api/departmentApiSlice';
import { useGetUniSubjectsQuery } from '../../../app/api/subjectApiSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useAddUniDepartmentMutation } from '../../../app/api/uniApiSlice';
import MutationState from '../../../components/MutationState/MutationState';

const DepartmentEdit = () => {

	const session = useSelector((state: RootState) => state.session);
	console.log(session)
	const { uni, id } = useParams();

	const [name, setName] = useState("");
	// const [university, setUniversity] = useState("");
	// const [students, setStudents] = useState([]);
	// const [professors, setProfessors] = useState([]);

	const {
		data: uniDepData,
		isLoading: isUniDepLoading,
		isSuccess: isUniDepSuccess,
		isError: isUniDepError
	} = useGetDepartmentQuery(id!, {
		skip: !id || !session.accessToken
	});

	console.log(uniDepData);

	// const {
	// 	isLoading: isDepartmentLoading,
	// 	isSuccess: isDepartmentSuccess,
	// 	isError: isDepartmentError
	// } = useGetUniSubjectsQuery(uni!, {
	// 	skip: !uni || !session.accessToken
	// });

	const [
		updateDepartment,
		{
			isLoading: isDepartmentUpdateLoading,
			isSuccess: isDepartmentUpdateSuccess,
			isError: isDepartmentUpdateError
		}
	] = useUpdateDeparmentMutation();

	const handleAddDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				name
			};
			const result = await updateDepartment({ id: id!, body }).unwrap();

			// @ts-ignore 
			const resultBody: any = { departments: [result._id] };

			// @ts-ignore
			await AddUniDepartment({ university: uni!, body: resultBody });

		} catch (e: any) {
			console.log(e);
		}
	};

	let content: any;

	if (isUniDepLoading) {
		content = <>Loading...</>
	} else if (isUniDepSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Azuriranje Odseka</div>
							<div className="form-desc" >Azuriranje Odseka</div>
							<MutationState
								isLoading={isDepartmentUpdateLoading }
								isSuccess={isDepartmentUpdateSuccess}
								isError={isDepartmentUpdateError}
								// @ts-ignore
								errorMessage={isDepartmentUpdateError?.data?.message || 'Greska prilikom azuriranja odseka!'}
								successMessage='Uspesno azuriran odsek!'
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
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isDepartmentUpdateSuccess}>Azuriraj Odsek</button>
							</div>
						</form>
					</div>
				</div>
			</>
	}

	useEffect(() => {
		document.title = "Dodavanje odseka | Stud";
		setName(uniDepData?.name!);
	}, [isUniDepSuccess]);

	return (
		<>
			{content}
		</>
	)
};

export default DepartmentEdit;