import React from 'react';
import './Loader.css';


function Loader() {
	return (
		<div className='Loader'>
			<div className="loader book">
				<figure className="page"></figure>
				<figure className="page"></figure>
				<figure className="page"></figure>
			</div>

			<h1 className='heading'>STUD</h1>
		</div>
	);
}

export default Loader
