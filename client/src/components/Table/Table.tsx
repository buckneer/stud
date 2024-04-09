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
	cols?: string[],
	children?: ReactNode,
	width?: string;
}


function Table({cols, children, width='w-4/5'} : ITable) {

	return (
		<table className={`${width} rounded-2xl overflow-hidden`}>
			<thead className="bg-slate-100">
				<tr className="text-sm">
					{cols && cols.map(item => (
						<th className="px-6 py-4 text-center font-medium text-black uppercase">{item}</th>
					))}
				</tr>
			</thead>
			<tbody className="text-center divide-y divide-slate-200 dark:divide-gray-700">
				{children}
			</tbody>
		</table>
	);
}

export default Table
