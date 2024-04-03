import {ChangeEvent, ReactNode, SetStateAction, useEffect, useState} from "react";


export interface IExam {
	_id?: string;
	subject?: string;
	code?: string;
	professor?: string;
	date?: string;
	semester?: string
}

export interface ITable {
	setExams?: SetStateAction<any>
	data: IExam[],
	cols?: string[],
	children?: ReactNode
}


function Table({setExams, data, cols, children} : ITable) {

	return (
		<table className="w-4/5 rounded-2xl overflow-hidden border-2 border-slate-500">
			<thead className="bg-slate-100">
				<tr className="text-sm">
					{cols && cols.map(item => (
						<th className="p-5">{item}</th>
					))}
				</tr>
			</thead>
			<tbody className="text-center">
				{children}
			</tbody>
		</table>
	);
}

export default Table
