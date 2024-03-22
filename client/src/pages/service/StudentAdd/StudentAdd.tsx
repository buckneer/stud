import { current } from '@reduxjs/toolkit';
import { useState } from 'react'

const StudentAdd = () => {
	const [studentId, setStudentId] = useState("");
	const [subject, setSubject] = useState("");
	const [currentSemester, setCurrentSemester] = useState("");
	const [degree, setDegree] = useState("");

	
	const handleStudentAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		console.log(studentId, subject, currentSemester, degree);
		// TODO: Preuzmi kormilo odavde Jovane 
	}

	return (
		<form onSubmit={handleStudentAdd}>
			<input type="text" placeholder='Broj indexa' value={studentId} onChange={(e) => setStudentId(e.target.value)} />
			<input type="text" placeholder='Odsek' value={subject} onChange={(e) => setSubject(e.target.value)} />
			<input type="number" placeholder='Semestar' value={currentSemester} onChange={(e) => setCurrentSemester(e.target.value)} />
			<select id="tipStudija" name="tipStudija" onChange={(e) => setDegree(e.target.value)}>
				<option value="0">Izaberite tip studija</option>
				<option value={"Osnovne"} > Osnovne</option>
				<option value={"Master"} > Master</option>
				<option value={"Doktorske"} > Doktorske</option>
			</select>
			<button className='bg-white py-2 px-4' type="submit">Potvrdi</button>
		</form>
	)
}

export default StudentAdd