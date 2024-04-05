import { useState, useEffect } from 'react'
import Select from 'react-select';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetPeriodQuery, useUpdatePeriodMutation } from "../../../app/api/periodApiSlice";
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';
import InputField from '../../../components/InputField/InputField';

const PeriodEdit = () => {
	const session = useSelector((state: RootState) => state.session);
	const { uni: university, id: periodId } = useParams();

	const periodOptions = [
		{ value: "0", label: "Odaberite sami [vanredni]" },
		{ value: "Januarsko-februarski rok", label: "Januarsko-februarski rok" },
		{ value: "Aprilski rok", label: "Aprilski rok" },
		{ value: "Junski rok", label: "Junski rok" },
		{ value: "Julski rok", label: "Julski rok" },
		{ value: "Avgustovsko-septembarski rok", label: "Avgustovsko-septembarski rok" },
		{ value: "Oktobar I", label: "Oktobar I" },
		{ value: "Oktobar II", label: "Oktobar II" },
	];

	const {
		data: periodData,
		isLoading: isPeriodDataLoading,
		isSuccess: isPeriodDataSuccess,
		isError: isPeriodDataError,
		error: periodError
	} = useGetPeriodQuery({ university: university!, id: periodId! }, {
		skip: !periodId || !session.accessToken
	})

	const [periodName, setPeriodName] = useState("");
	const [irregularPeriodName, setIrregularPeriodName] = useState("");
	const [periodStart, setPeriodStart] = useState("");
	const [acceptDate, setAcceptDate] = useState('');
	const [periodEnd, setPeriodEnd] = useState("");
	// const [exams, setExams] = useState("");
	
	const [
		updatePeriod,
		{
			isLoading: isUpdatePeriodLoading,
			isSuccess: isUpdatePeriodSuccess,
			isError: isUpdatePeriodError,
		}
	] = useUpdatePeriodMutation();

	const handleAddPeriod = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				university, 
				start: periodStart,
				end: periodEnd, 
				acceptDate,
				semester: 1, 
				name: (periodName === '0' && irregularPeriodName) ? irregularPeriodName : periodName,
				type: (periodName === '0' && irregularPeriodName) ? 0 : 1
			}

			const result = await updatePeriod({id: periodId!, university: university!, body}).unwrap();
		} catch (e: any) {
			console.error(e)
		}
		// TODO: mozda treba da se doda department u backend 
		// const body = {
		// 	start: periodStart, end: periodEnd, exams: departments, university: uni! 
		// }

		// await addPeriod({university: uni!, body})
	};

	let content: any;

	if (isPeriodDataLoading) {
		content = <Loader />
	} else if (isPeriodDataSuccess) {
		content =
			<>
				<div className='flex-grow flex justify-center items-center'>
					<div className='card'>
						<div className='form-header'>
							<div className="form-title">Azuriranje ispitnog roka</div>
							<div className="form-desc" >Azurirajte ispitni rok</div>
							<MutationState
								isLoading={isUpdatePeriodLoading}
								isSuccess={isUpdatePeriodSuccess}
								successMessage='Uspešno azuriran ispitni rok!'
								isError={isUpdatePeriodError}
								errorMessage='Greška prilikom azuriranja ispitnog roka!'
							/>
						</div>
						<form onSubmit={handleAddPeriod}>
							<div className='form-control'>
								<Select maxMenuHeight={200} value={periodOptions.find((i: any) => i.value === periodName)} onChange={(e: any) => setPeriodName(e?.value)} placeholder="Izaberite rok" className='w-full outline-none' required isClearable isSearchable options={periodOptions} />
							</div>
							{
								periodName === "0" &&
								<>
									<InputField id='periodNameVandredni' type='text' name='Unesite vandredni rok' inputVal={irregularPeriodName} setVal={(e) => setIrregularPeriodName(e.target.value)} />
								</>
							}
							<InputField id='periodStart' type='date' name='Pocetak ispitnog roka' inputVal={periodStart} setVal={(e) => setPeriodStart(e.target.value)} />
							<InputField id='periodEnd' type='date' name='Zavrsetak ispitnog roka' inputVal={periodEnd} setVal={(e) => setPeriodEnd(e.target.value)} />
							<InputField id='periodAcceptDate' type='date' name='Rok za prijavu' inputVal={acceptDate} setVal={(e) => setAcceptDate(e.target.value)} />
							<div className='footer flex items-center justify-center flex-col'>
								<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isUpdatePeriodLoading}>Azuriraj Ispitni Rok</button>
							</div>
						</form>
					</div>
				</div>

			</>
	}

	useEffect(() => {
		document.title = "Dodavanje ispitnih rokova | Stud";
		if (periodData) {
			setPeriodName(periodData!.name!);
			setPeriodStart(periodData!.start!);
			setPeriodEnd(periodData!.end!);
			setAcceptDate(periodData!.acceptDate!)
			if(periodData.type === 1){
				setPeriodName(periodData.name!);
				setIrregularPeriodName(null!);
			}else if(periodData.type === 0) {
				setPeriodName("0");
				setIrregularPeriodName(periodData.name!);
			}
		}
	}, [isPeriodDataSuccess]);

	return (
		<>
			{content}
		</>
	)
}

export default PeriodEdit