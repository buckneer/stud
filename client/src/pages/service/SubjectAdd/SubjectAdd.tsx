import React, { useState } from 'react'

const SubjectAdd = () => {

	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const departments: string[] = [""];
	
	const handleSubjectAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		// Preuzmi kormilo odavde Jovane
	}

	return (
		<form onSubmit={handleSubjectAdd}>
			<input type="text" placeholder="Ime Predmeta" value={name} onChange={(e) => setName(e.target.value)} required />
			<input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
			<select id="departments" name="departments">
				<option value="0">Izaberite odsek</option>
				{/* { departments.map((department) => {
						return (
							<option value={department._id}>{department.name}</option>
						);
				})} */}
			</select>
			{/* Ovde dodaj Profesore */}
			{/* Ovde dodaj Uslovne predmete */}
			<input type="number" min={0} placeholder='Broj espb' required />
			<button className='bg-white py-2 px-4' type="submit">Potvrdi</button>
		</form>
	)
}

export default SubjectAdd