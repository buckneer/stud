import StudTitle from "../../../components/StudTitle/StudTitle";
import React from "react";
import Loader from "../../../components/Loader/Loader";
import Table from "../../../components/Table/Table";
import TD from "../../../components/Table/TableColumn";

function StudentsTab() {

	const cols = ['Broj indeksa', 'Ime i prezime', 'Naziv predmeta', 'Potpis']

	// TODO get subjects professor is on ENDPOINT: '/uni/:uni/subject/professor (subject.router)
	// TODO get students on subject selected ENDPOINT: '/uni/:uni/student/subject/:sub/' (student.router)

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
			<div className="list-header flex justify-between items-center p-5 border-b-2 border-slate-100">
				<StudTitle text={"Studenti"} />
				<div className="search-container flex justify-center items-center gap-5">
					<h1 className="font-bold">Studenti na predmetu: </h1>
					<select className="border-0 rounded-xl bg-slate-100">
						<option>Hello</option>
						<option>Hello</option>
						<option>Hello</option>
					</select>
				</div>
			</div>

			<div className="w-full flex justify-center mt-5">
				<Table cols={cols}>
					<div className="p-5 font-black">Nema Ispita</div>
				</Table>
			</div>
		</div>
	);
}

export default StudentsTab
