import {BadgeCheck, BadgePlus, Home, ListChecks, Table} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {RootState} from '../../app/store';
import {loggedOut} from '../../app/slices/sessionSlice';
import {useLogoutMutation} from '../../app/api/sessionApiSlice';
import {CircleUserRound} from "lucide-react"
//@ts-ignore
import NavItem from "./NavItem";

export interface NavbarProps {
	handleShrink: () => void
}

const Navbar = ({handleShrink}: NavbarProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [openItems, setOpenItems] = useState<{name: string, to: string}[]>([]);
	const session = useSelector((state: RootState) => state.session);
	const dispatch: any = useDispatch();
	const navigate = useNavigate();
	const dropdownItems = [
		{
			name: "Ispit",
			links: [
				{
					name: 'link 1',
					to: '#'
				},
				{
					name: 'link 2',
					to: '#'
				},
				{
					name: 'link 3',
					to: '#'
				},
			]
		}
	]


	const [
		fetchLogout,
		{
			isLoading: isLogoutLoading,
			isSuccess: isLogoutSuccess
		}
	] = useLogoutMutation();

	const hiddenRoutes = ['/login'];


	const [hide, setHide] = useState(false)
	let path = useLocation();

	const handleLogout = async () => {
		try {
			const result = await fetchLogout({refreshToken: session.refreshToken}).unwrap();
		} catch (e: any) { // program mi ne da ovde da pogresim // !! Svaka cast!
			console.error(e);
			dispatch(loggedOut());
		} finally { // :O
			navigate('/login');
		}
	}


	useEffect(() => {
		if (hiddenRoutes.includes(path.pathname)) {
			setHide(true);
		} else {
			setHide(false);
		}
	}, [path.pathname]);

	const handleDropdown = (itemName: string) => {
		setDropdown(!dropdown);
		let items = dropdownItems.find(item => item.name === itemName);
		setOpenItems(items!.links);

		handleShrink();
	}

	return !hide ?
		<div className={dropdown ? 'h-screen' : ''}>
			<div className='navbar bg-black text-white mx-7 mt-3 flex align-center justify-between '>
				<div className='branding flex items-center flex-1'>
					<h1 className='font-black'>STUD</h1>
				</div>
				<div className='menu flex-1 text-center flex gap-2 justify-center align-center'>
					<NavItem to='/' title="Početna" Icon={Home}/>
					<NavItem title='Ispit' Icon={Table} isDropdown={true} handleDropdown={handleDropdown}/>
					<NavItem to='/register' title='Ispitni rokovi' Icon={ListChecks}/>
				</div>

				<div className='user flex flex-1  text-end justify-end items-center'>
					{
						session.refreshToken ?
							<div className='flex gap-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
								<CircleUserRound/>
								{session.user.name}
								{
									isOpen ?
										<>
											<div
												className="absolute right-5 top-10 text-center z-10 mt-2 w-fit px-5 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="py-1" role="none">
													<a href="#" className="text-gray-700 block px-4 py-2 text-sm"
													   role="menuitem" id="menu-item-0">Profile</a>
													<a href="#" className="text-gray-700 block px-4 py-2 text-sm"
													   role="menuitem" id="menu-item-1">{session.user.name}</a>
												</div>
												<div className="py-1" role="none">
													<div onClick={handleLogout}
													     className="text-gray-700 cursor-pointer block px-4 py-2 text-sm"
													     role="menuitem" id="menu-item-2">
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
			{dropdown && (
				<div className="dropdown flex text-white justify-center w-full pt-2">
					<div className="menu flex text-center gap-2 justify-center align-center">
						<NavItem to='#' title={"Prijava ispita"} Icon={BadgePlus} />
						<NavItem to='#' title={"Polozeni ispiti"} Icon={BadgeCheck} />
					</div>
				</div>
			)}
		</div>
		: null
}


export default Navbar;
