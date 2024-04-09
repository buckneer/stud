import TD from "./TableColumn";
import React, {HTMLAttributes, useState} from "react";

export interface IGradeColumnProps {
	handleSetGrade: (gradeNum: number, student: string, gradeId?: string) => void;
	item: string;
	gradeId?: string;
}

function GradeColumn({handleSetGrade, item, gradeId, className} : IGradeColumnProps & HTMLAttributes<any>) {

	const [grades, setGrades] = useState<number[]>([5, 6, 7, 8, 9, 10])

	return (
		<TD>
			<div className={`flex gap-10 justify-center ${className}`}>
				{grades.map(grade => (
					<p className="font-black text-2xl transition-all hover:scale-125 cursor-pointer active:scale-75" onClick={() =>
						gradeId ? handleSetGrade(grade, item, gradeId) : handleSetGrade(grade, item)
					}>
						{grade}
					</p>
				))}
			</div>
		</TD>
	);
}

export default GradeColumn
