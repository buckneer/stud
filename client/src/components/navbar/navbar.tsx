
import { Home, ListChecks, Table } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { loggedOut } from '../../app/slices/sessionSlice';
import { useLogoutMutation } from '../../app/api/sessionApiSlice';
import { CircleUserRound } from "lucide-react"


const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const session = useSelector((state: RootState) => state.session);	
	const dispatch: any = useDispatch();
	const navigate = useNavigate();

	const [
		fetchLogout,
		{
			isLoading: isLogoutLoading,
			isSuccess: isLogoutSuccess
		}
	] = useLogoutMutation();
	
	const hiddenRoutes = ['/login'];


	const [ hide, setHide ]= useState(false)
	let path = useLocation();

	const handleLogout = async () => {
		try {
			const result = await fetchLogout({ refreshToken: session.refreshToken }).unwrap();
		} catch (e: any) { // program mi ne da ovde da pogresim
			console.error(e);
			dispatch(loggedOut());
		} finally { // :O
			navigate('/login');
		}
	}


	
	useEffect(() => {
		if(hiddenRoutes.includes(path.pathname)) {
			setHide(true);
		} else {
			setHide(false);
		}
	}, [path.pathname]);
	
	return !hide ? 
		<div className='navbar text-white mx-7 mt-3 flex align-center justify-between'>
			<div className='branding flex items-center flex-1'>
				<h1 className='font-black'>STUD</h1>
			</div>
			<div className='menu flex-1 text-center flex gap-2 justify-center align-center'>
				<NavLink to="/" className='nav-item flex gap-2 rounded-2xl p-2 align-center group transition-all'>
					<Home />
					<div className='hidden group-[.active]:block'>Početna</div>       
				</NavLink>
				<NavLink to="/login" state={{ from: path.pathname  }} className='nav-item flex gap-2 rounded-2xl p-2 align-center group'>
					<Table />
					<div className='hidden group-[.active]:block' >Raspored Ispita</div>
				</NavLink>
				<NavLink to="/register" className='nav-item flex gap-2 rounded-2xl p-2 align-center group'>
					<ListChecks />
					<div className='hidden group-[.active]:block'>Ispitni rokovi</div>
				</NavLink>
			</div>
			
			<div className='user flex flex-1  text-end justify-end items-center'>
				{
					session.refreshToken ? 
					// <div onClick={handleLogout}>
						<div className='flex gap-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
							<CircleUserRound />
							{session.user.name}
							{
								isOpen ? 
									<>
									  <div className="absolute right-5 top-10 text-center z-10 mt-2 w-fit px-5 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1" role="none">
											<a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Profile</a>
											<a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">{session.user.name	}</a>
										</div>
										<div className="py-1" role="none">
											<div onClick={handleLogout} className="text-gray-700 cursor-pointer block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">
												<div className='block mx-2'>
													<div>
														{		
															isLogoutLoading ? <>Loading...</> : "Logout"
														}
													</div>
												</div>
											</div>
										</div>
									</div>
									</>
									: null
							}
						</div>
						: null
				}
			</div>
		</div> 
		: null
}



export default Navbar;