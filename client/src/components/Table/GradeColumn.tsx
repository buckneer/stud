import TD from "./TableColumn";
import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import {X} from "lucide-react";

export interface IGradeColumnProps {
	handleSetGrade: (gradeNum: number, student: string, gradeId?: string) => void;
	item: string;
	gradeId?: string;
	close?: (_id : string) => void;
}

function GradeColumn({handleSetGrade, item, gradeId, className, close} : IGradeColumnProps & HTMLAttributes<any>) {


	const ref = useRef<HTMLParagraphElement>(null);
	const [animate, setAnimate] = useState(false);

	const getDurationClass = (index: number) => {
		switch (index) {
			case 0:
				return 'duration-500';
			case 1:
				return 'duration-1000';
			case 2:
				return 'duration-1500';
			default:
				return 'duration-500';
		}
	};

	const colors : any = {
		5: 'text-red-700',
		6: 'text-yellow-700',
		7: 'text-yellow-700',
		8: 'text-yellow-900',
		9: 'text-green-700',
		10: 'text-green-800'
	}

	const [grades, setGrades] = useState<number[]>([5, 6, 7, 8, 9, 10])

	useEffect(() => {
		setAnimate(!animate);
	}, []);


	return (
		<TD>
			<div className={`flex gap-10 justify-center items-center transition-width duration-500 ease-in-out w-auto ${className}`}>
				{grades.map((grade:number, index: number) => (
					<p className={` ${colors[grade]} ${getDurationClass(index)} ${animate ? 'scale-100' : 'scale-0'} font-black text-2xl transition-all hover:scale-125 cursor-pointer active:scale-75 `} onClick={() =>
						gradeId ? handleSetGrade(grade, item, gradeId) : handleSetGrade(grade, item)
					}>
						{grade}
					</p>
				))}

				{gradeId && close && (
					<p className=" transition-all hover:scale-125 cursor-pointer active:scale-75" onClick={() => close(item)}><X /></p>
				)}
			</div>
		</TD>
	);
}

export default GradeColumn
