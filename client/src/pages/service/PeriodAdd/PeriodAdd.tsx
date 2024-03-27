import { useState, useEffect } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUniDepartmentsQuery } from "../../../app/api/departmentApiSlice";
import { useAddPeriodMutation } from "../../../app/api/periodApiSlice";
import Loader from '../../../components/Loader/Loader';


const PeriodAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	type Option = {
		value?: string;
		label?: string
	}

	const [periodStart, setPeriodStart] = useState("");
	const [periodEnd, setPeriodEnd] = useState("");
	// const [exams, setExams] = useState("");
	const [departments, setDepartments] = useState<string[]>([]);

	const handleChange = (newSelections: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
		console.log(newSelections);
		let vals = newSelections.map(item => item.value!);

		setDepartments([...vals]);
	}

	const {
		data: departmentsData,
		isLoading: isdepartmentLoading,
		isSuccess: isdepartmentSuccess,
		isError: isdepartmentError
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uni || !session.accessToken
	});

	const [
		addPeriod,
		{
			isLoading: isaddPeriodAddLoading,
			isSuccess: isaddPeriodAddSuccess,
			isError: isaddPeriodAddError,
		}
	] = useAddPeriodMutation();

	const handleAddPeriod = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// try {
		// 	const awiat = addPeriod();
		// } catch (error) {
		// }
		// TODO: mozda treba da se doda department u backend 
		// const body = {
		// 	start: periodStart, end: periodEnd, exams: departments, university: uni! 
		// }

		// await addPeriod({university: uni!, body})

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/65fcbc3cd45f1d327ffc4aee/period/add

	};


	useEffect(() => {
		document.title = "Dodavanje ispitnih rokova | Stud";
	}, []);

	let content: any;

	if (isdepartmentLoading) {
		content = <Loader />
	} else if (isdepartmentSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Ispitni rok</div>
							<div className="form-desc" >Kreiranje novog ispitnog roka</div>
							{
								isaddPeriodAddLoading ? <div className="">Loader ide ovde...</div> : null
							}
							{
								isaddPeriodAddSuccess ?
									<div className="w-full flex justify-center">
										<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspesno dodat profesor!</div>
									</div>
									: null
							}
							{
								isaddPeriodAddError ?
									<div className="w-full flex justify-center">
										<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom registracije profesora!</div>
									</div>
									: null
							}
						</div>
						<form onSubmit={handleAddPeriod}>
							<div className='form-control mb-5'>
								{/* Mora state da se napravi za userId, ako ne postoji, da mora da selektuje userID (nije jos implementiran get req) */}
								<label htmlFor="periodName" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="text" id="periodName" placeholder="Ime profesora" value={"periodName state? FIX ME #askJovan"} autoComplete='off'
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Ime ispitnog roka
									</span>
								</label>
							</div>
							<div className='form-control mb-5'>
								<label htmlFor="periodStart" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="date" id="periodStart" placeholder="Pocetak roka" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} autoComplete='off'
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Pocetak ispitnog roka
									</span>
								</label>
							</div>
							<div className='form-control mb-5'>
								<label htmlFor="periodEnd" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
									<input
										type="date" id="periodEnd" placeholder="Kraj roka" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} autoComplete='off'
										className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
									/>
									<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
										Zavrsetak ispitnog roka
									</span>
								</label>
							</div>
							<div className='form-control'>
								{/* @ts-ignore */}
								<Select onChange={handleChange} placeholder="Izaberite odsek" className='w-full outline-none' isMulti options={departmentsData.map((item) => {
									return { value: item._id, label: item.name };
								})} />
							</div>
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Kreiraj Ispitni Rok</button>
							</div>
						</form>
					</div>
				</div>

			</>
	}

	return (
		<>
			{content}
		</>
	)
}

export default PeriodAdd