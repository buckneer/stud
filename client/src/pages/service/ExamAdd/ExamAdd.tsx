import React, { useState, useEffect } from 'react'

const ExamAdd = () => {

	const [date, setDate] = useState("");
	// const [students, setStudents] = useState("");
	const [subject, setSubject] = useState("");
	const [proffesor, setProffesor] = useState("");
	// const [grades, setGrades] = useState("");
	const [period, setPeriod] = useState("");
	// const [ended, setEnded] = useState(Boolean);


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - Dodavanje ispita

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/65fcbc3cd45f1d327ffc4aee/exam/add
	}

	useEffect(() => {
		document.title = "Dodavanje ispita | Stud";
	},[]);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
			<label htmlFor="dateOfExam">Datum ispita: </label>
			<input id='dateOfExam' type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
			<input type="text" placeholder='Ime predmeta' value={subject} onChange={(e) => setSubject(e.target.value) } required/>
			<input type="text" placeholder='Ime profesora' value={proffesor} onChange={(e) => setProffesor(e.target.value) } required/>
			<label htmlFor="timeOfExam">Vreme ispita: </label>
			<input id='timeOfExam' type="time" value={period} onChange={(e) => setPeriod(e.target.value)} required />
			<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold' >Dodaj ispit</button>
		</form>
	)
}

export default ExamAdd