import { useState, useEffect } from 'react'
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAddPeriodMutation } from "../../../app/api/periodApiSlice";
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';

const PeriodAdd = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();

	const periodOptions = [
		{ value: "0", label: "Odaberite sami [vanredni]" },
		{ value: "1", label: "Januarsko-februarski rok" },
		{ value: "2", label: "Aprilski rok" },
		{ value: "3", label: "Junski rok" },
		{ value: "4", label: "Julski rok" },
		{ value: "5", label: "Avgustovsko-septembarski rok" },
		{ value: "6", label: "Oktobar I" },
		{ value: "7", label: "Oktobar II" },
	];

	const [periodName, setPeriodName] = useState("");
	const [irregularPeriodName, setIrregularPeriodName] = useState("");
	const [periodStart, setPeriodStart] = useState("");
	const [periodEnd, setPeriodEnd] = useState("");
	// const [exams, setExams] = useState("");

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
	};


	useEffect(() => {
		document.title = "Dodavanje ispitnih rokova | Stud";
	}, []);

	let content: any;

	if (false) {
		content = <Loader />
	} else if (true) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Novi Ispitni rok</div>
							<div className="form-desc" >Kreiranje novog ispitnog roka</div>
							<MutationState
								isLoading={isaddPeriodAddLoading}
								isSuccess={isaddPeriodAddSuccess}
								successMessage='Uspesno dodat profesor!'
								isError={isaddPeriodAddError}
								errorMessage='Greska prilikom registracije profesora!'
							/>
						</div>
						<form onSubmit={handleAddPeriod}>
							<div className='form-control'>
								<Select onChange={(e: any) => setPeriodName(e?.value)} placeholder="Izaberite rok" className='w-full outline-none' required isClearable isSearchable options={periodOptions} />
							</div>
							{
								periodName === "0" &&
								<>
									<InputField id='periodNameVandredni' type='text' name='Unesite vandredni rok' inputVal={irregularPeriodName} setVal={(e) => setIrregularPeriodName(e.target.value)} />
								</>
							}
							<InputField id='periodStart' type='date' name='Pocetak ispitnog roka' inputVal={periodStart} setVal={(e) => setPeriodStart(e.target.value)} />
							<InputField id='periodEnd' type='date' name='Zavrsetak ispitnog roka' inputVal={periodEnd} setVal={(e) => setPeriodEnd(e.target.value)} />
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