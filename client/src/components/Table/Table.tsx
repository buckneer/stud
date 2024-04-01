import {ChangeEvent, SetStateAction, useEffect, useState} from "react";


export interface ITable {
	setExams: SetStateAction<any>
}

function Table({setExams} : ITable) {





	const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			console.log(e.target.name);
			setExams((prevState : string[]) => [...prevState, e.target.name]);
		} else {
			setExams((prevState : string[]) => prevState.filter(name => name !== e.target.name))
		}
	}

	return (
		<table className="w-full">
			<thead className="bg-slate-100">
				<tr className="text-sm">
					<th className="p-5">Ime</th>
					<th >Potpis</th>
					<th>Profesor</th>
					<th>Tags</th>
					<th>Prijava</th>

				</tr>
			</thead>
			<tbody className="text-center">
				<tr>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>
						<input
							type="checkbox"
							className="form-check-input rounded-2xl checked:bg-black size-5 checked:border-0"
							name="someId"
							onChange={handleCheck}
						/>
					</td>
				</tr>
				<tr>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>
						<input
							type="checkbox"
							className="form-check-input rounded-2xl checked:bg-black size-5 checked:border-0"
							name="someId2"
							onChange={handleCheck}
						/>
					</td>
				</tr>
				<tr>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>Ime</td>
					<td>
						<input
							type="checkbox"
							className="form-check-input rounded-2xl checked:bg-black size-5 checked:border-0"
							name="someId3"
							onChange={handleCheck}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default Table
