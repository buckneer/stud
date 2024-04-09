
import { Home, ListChecks, Table } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { loggedOut } from '../../app/slices/sessionSlice';
import { useLogoutMutation } from '../../app/api/sessionApiSlice';
import { CircleUserRound } from "lucide-react"
import Loader from "../Loader/Loader";
import NavItem from "./NavItem";
import RegularMenu from "./RegularMenu";
import HamburgerMenu from "./HamburgerMenu";



const Navbar = () => {

	const [regular, setRegular] = React.useState(true);


	const [ hide, setHide ]= useState(false)
	let path = useLocation();
	const hiddenRoutes = ['/login'];

	useEffect(() => {
		if(hiddenRoutes.includes(path.pathname)) {
			setHide(true);
		} else {
			setHide(false);
		}
	}, [path.pathname]);


	React.useEffect(() => {
		const handleNavBar = () => {
			if (window.innerWidth < 1280 && regular) {
				setRegular(false);
			}

			if (window.innerWidth >= 1280) {
				setRegular(true);
			}
		};

		handleNavBar();
		window.addEventListener('resize', handleNavBar);

		return () => window.removeEventListener('resize', handleNavBar);
	}, [regular, setRegular]);


	if(hide) return null;

	return  regular ? <RegularMenu /> : <HamburgerMenu />
}



export default Navbar;
