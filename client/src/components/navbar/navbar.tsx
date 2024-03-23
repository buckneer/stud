
import { Home, ListChecks, Table } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';




const Navbar = () => {

	const hiddenRoutes = ['/login', '/register'];

	const [hide, setHide]= useState(false)
	let path = useLocation();
	
	useEffect(() => {
		if(hiddenRoutes.includes(path.pathname)) {
			setHide(true);
		} else {
			setHide(false);
		}
	}, [path.pathname])

	return !hide ? 
		<div className='navbar text-white mx-7 mt-3 flex align-center justify-between'>
		<div className='branding flex-1'>
			<h1 className='font-black'>STUD</h1>
		</div>
		<div className='menu flex-1 text-center flex gap-2 justify-center align-center'>
			<NavLink to="/" className='nav-item flex gap-2 rounded-2xl p-2 align-center group transition-all'>
				<Home />
				<div className='hidden group-[.active]:block'>Početna</div>       
			</NavLink>
			<NavLink to="/login" className='nav-item flex gap-2 rounded-2xl p-2 align-center group'>
				<Table />
				<div className='hidden group-[.active]:block' >Raspored Ispita</div>
			</NavLink>
			<NavLink to="/register" className='nav-item flex gap-2 rounded-2xl p-2 align-center group'>
				<ListChecks />
				<div className='hidden group-[.active]:block'>Ispitni rokovi</div>
			</NavLink>
		</div>
		
		<div className='user flex-1 text-end'>
			<h1>User SCReeeeen</h1>
		</div>
	</div> 
	: null
}



export default Navbar;