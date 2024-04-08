import React from 'react';

interface IModelNum {
	data: string;
}

const ModelNum = ({ data }: IModelNum) => {
	return (
		<>
			<div className="card rounded-xl ">
				<div className="text-xl font-bold border-b-2 p-2 ">
					Poziv na broj
				</div>
				<div className="">
					<div className="flex justify-between">
						<p>Prijava ispita</p>
						<p>{ data + 'A' }</p>
					</div>
					<div className="flex justify-between">
						<p>Školarina</p>
						<p>{ data + 'B' }</p>
					</div>
					<div className="flex justify-between">
						<p>Ostalo</p>
						<p>{ data + 'C' }</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModelNum;