import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useLogoutMutation} from "../../app/api/sessionApiSlice";
import {loggedOut} from "../../app/slices/sessionSlice";
import Loader from "../Loader/Loader";
import NavItem from "./NavItem";
import {CircleUserRound, Home, ListChecks, Table} from "lucide-react";

function RegularMenu() {


	const [isOpen, setIsOpen] = useState(false);
	const [dropdown, setDropdown] = useState(false);
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



	return (
		<div className='navbar bg-black text-white mx-7 mt-3 flex align-center justify-between z-[999]'>
			{isLogoutLoading && (<Loader />)}
			<div className='branding flex items-center flex-1'>
				<h1 className='font-black'>STUD</h1>
			</div>
			<div className='menu flex-1 text-center flex gap-2 justify-center align-center'>
				<NavItem to='/' title="Početna" Icon={Home} />
				<NavItem to='/login' title='Raspored Ispita' Icon={Table} />
				<NavItem to={`/uni/${session.metadata.university}/register`} title='Registracija' Icon={ListChecks} />
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
												{/*TODO Change university links*/}
												<Link to={`uni/${session.metadata.university}/${session.metadata.role}`} className="text-gray-700 block px-4 py-2 text-sm hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">
													Profil
												</Link>
												{session.user.roles!.includes('service') && (
													<>
														<Link to={`/uni/${session.metadata.university}/department/add`} className="text-gray-700 block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">Novi Odsek</Link>
														<Link to={`/uni/${session.metadata.university}/register`} className="text-gray-700 block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">Novi Korisnik</Link>
														<Link to={`/uni/${session.metadata.university}/period/add`} className="text-gray-700 block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">Novi Rok</Link>
														<Link to={`/uni/${session.metadata.university}/subject/add`} className="text-gray-700 block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">Novi Predmet</Link>
														<Link to={`/uni/${session.metadata.university}/optional/add`} className="text-gray-700 block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-1">Novi Izborni Blok</Link>
													</>
												)}

											</div>
											<div className="py-1" role="none">
												<div onClick={handleLogout} className="text-gray-700 cursor-pointer block px-4 py-2 text-sm  hover:text-black hover:font-black transition-all" role="menuitem" id="menu-item-2">
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
	)
}

export default RegularMenu
