import { useState, useEffect } from 'react'

const DepartmentAdd = () => {

	const [name, setName] = useState("");
	const [university, setUniversity] = useState("");
	// const [students, setStudents] = useState([]);
	// const [professors, setProfessors] = useState([]);


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Dodavanje odseka

		// TODO: Jovance - Mora da se preuzmu svi univerziteti ako hocemo ovo select => option u formi
		// TODO: Jovance - Ako ne onda samo brisi select i odkomentiraj drugi input

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/add
	};

	useEffect(() => {
		document.title = "Dodavanje odseka | Stud";
	}, []);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
			<input type="text" placeholder='Ime odseka' value={name} onChange={(e) => setName(e.target.value)} required />
			{/* Univerzitet: */}
			{/* <input type="text" placeholder='Ime Univerziteta' value={university} onChange={(e) => setUniversity(e.target.value)} required /> */}
			<select name='university' value={university} onChange={(e) => setUniversity(e.target.value)} required>
				<option value="0" className='font-semibold text-black'>Izaberite Univerzitet</option>
				<option value={"university 1"}>PMF</option>
				<option value={"university 2"}>FTN</option>
				<option value={"university 3"}>ETF</option>
				<option value={"university 4"}>FON</option>
			</select>
			<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold' >Dodaj odsek</button>
		</form>
	)
}

export default DepartmentAdd