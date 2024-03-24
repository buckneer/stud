import { useState, useEffect } from 'react'

const GradeAdd = () => {

	const [subject, setSubject] = useState("");
	const [professor, setProfessor] = useState("");
	const [professorGrade, setProfessorGrade] = useState("");
	const [service, setService] = useState("");
	const [serviceGrage, setServiceGrage] = useState("");
	// const [confirmed, setConfirmed] = useState(Boolean);
	const [student, setStudent] = useState("");
	const [period, setPeriod] = useState("");


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// TODO: Jovance - dodavanje ocena

		// Link: http://localhost:3000/uni/65fafc2da919db458f7ed90d/department/65fcbc3cd45f1d327ffc4aee/Grade/add
	};

	useEffect(() => {
		document.title = "Dodavanje ocena | Stud";
	},[]);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col space-y-5 mx-5 justify-center items-center'>
			<input type="text" placeholder='Ime predmeta' value={subject} onChange={(e) => setSubject(e.target.value)} required  />
			<input type="text" placeholder='Ime profesora' value={professor} onChange={(e) => setProfessor(e.target.value)} required  />
			<input type="number" placeholder='Ocena profesora' value={professorGrade} onChange={(e) => setProfessorGrade(e.target.value)} required  />
			<input type="text" placeholder='Ime sluzbe' value={service} onChange={(e) => setService(e.target.value)} required  />
			<input type="number" placeholder='Ocena sluzbe' value={serviceGrage} onChange={(e) => setServiceGrage(e.target.value)} required  />
			<input type="text" placeholder='Ime studenta' value={student} onChange={(e) => setStudent(e.target.value)} required  />
			<label htmlFor="timeOfExam">Vreme polaganja ispita:</label>
			<input id="timeOfExam" type="time" value={period} onChange={(e) => setPeriod(e.target.value)} required  />
			<button type="submit" className='bg-black py-2 px-4 w-fit text-white rounded-sm font-semibold' >Dodaj ocenu</button>
		</form>
	)
}

export default GradeAdd