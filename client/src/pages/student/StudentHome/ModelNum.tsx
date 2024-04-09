import React from 'react';

interface IModelNum {
	data: string;
}

const ModelNum = ({ data }: IModelNum) => {
	return (
		<>
			<div className="rounded-xl bg-white border-2 border-slate-50 overflow-hidden shadow-sm w-4/5 md:w-2/3">
				<div className="text-xl font-semibold border-b-2 bg-slate-100 p-3">
					Poziv na broj
				</div>
				<div className="p-2">
					<div className="flex justify-around items-center mb-2">
						<p className="w-1/3">Prijava ispita</p>
						<p className="border-2 p-2 rounded-md">{ data + 'A' }</p>
					</div>
					<div className="flex justify-around items-center mb-2">
						<p className="w-1/3">Školarina</p>
						<p className="border-2 p-2 rounded-md">{ data + 'B' }</p>
					</div>
					<div className="flex justify-around items-center mb-2">
						<p className="w-1/3">Ostalo</p>
						<p className="border-2 p-2 rounded-md">{ data + 'C' }</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModelNum;