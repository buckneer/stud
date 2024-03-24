import { useState, useEffect } from 'react'

const PeriodAdd = () => {

	const [periodStart, setPeriodStart] = useState("");
	const [periodEnd, setPeriodEnd] = useState("");
	// const [exams, setExams] = useState("");
	const [department, setDepartment] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - dodavanje ispitnog roka

		// TODO: Za odabir odseka: izaberi ili input ili select => option dole

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/65fcbc3cd45f1d327ffc4aee/period/add
	};

	useEffect(() => {
		document.title = "Dodavanje ispitnih rokova | Stud";
	}, []);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
			<label htmlFor="pocetakRoka">Pocetak roka: </label>
			<input id='pocetakRoka' type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} required />
			<label htmlFor="pocetakRoka">Kraj roka: </label>
			<input id='krajRoka' type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} required />
			{/* Odsek: */}
			{/* <input type="text" placeholder='Ime odseka' value={department} onChange={(e) => setDepartment(e.target.value)} required /> */}
			<select name='department' value={department} onChange={(e) => setDepartment(e.target.value)} required >
				<option value="0" className='font-semibold text-black'>Izaberite Odsek</option>
				<option value={"department 1"}>Informatika</option>
				<option value={"department 3"}>Matematika</option>
				<option value={"department 4"}>Fizika</option>
			</select>
			<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold'>Dodaj rok</button>
		</form>
	)
}

export default PeriodAdd