import React, { useState, useEffect } from 'react'

const ServiceAdd = () => {

	const [user, setUser] = useState("");
	const [university, setUniversity] = useState("");


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Studentska sluzba

		// TODO: Za odabir studentske sluzbe: izaberi ili input ili select => option dole

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/service/add
	}

	useEffect(() => {
		document.title = "Studentska sluzba | Stud";
	},[]);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
			<input type="text" placeholder='Ime sluzbe' value={user} onChange={(e) => setUser(e.target.value)} required />
			{/* Studentska sluzba: */}
			{/* <input type="text" placeholder='Ime univerziteta' value={university} onChange={(e) => setUniversity(e.target.value)} required /> */}
			<select value={university} onChange={(e) => setUniversity(e.target.value)} required>
			<option value="0" className='font-semibold text-black'>Izaberite Univerzitet</option>
				<option value={"university 1"}>PMF</option>
				<option value={"university 2"}>FTN</option>
				<option value={"university 3"}>ETF</option>
				<option value={"university 4"}>FON</option>
			</select>
			<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold' >Dodaj studentsku sluzbu</button>
		</form>
	)
}

export default ServiceAdd