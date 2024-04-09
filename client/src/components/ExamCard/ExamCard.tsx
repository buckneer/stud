import React, { ElementType } from 'react'

export interface IExamCard {
	text: string;
	Icon: ElementType,
	value?: number | string;
  color?: string;
}

const ExamCard = ({ text, Icon, value, color = 'text-green-700' }: IExamCard) => {
  return (
    <div className="rounded-xl bg-white overflow-hidden shadow-sm w-full col-span-2 md:col-span-1 border-2 border-slate-100">
      <div className="text-xl font-semibold border-b-2 bg-slate-100 p-2">
        { text }
      </div>
      <div className="p-2 flex justify-between mx-5">
        <p><Icon /></p>
        <p className={`font-bold text-4xl ${color}`}>{ value }</p>
      </div>
    </div>
  )
}

export default ExamCard