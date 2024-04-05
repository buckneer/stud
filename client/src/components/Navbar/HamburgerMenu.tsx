import React, {useState} from "react";
import {CircleUser, CircleX, GraduationCap, LogOutIcon, Menu} from "lucide-react";
import NavItem from "./NavItem";
import { useLogoutMutation } from "../../app/api/sessionApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetUserUnisRoleQuery } from "../../app/api/userApiSlice";

function HamburgerMenu() {
	const session = useSelector((state: RootState) => state.session);

	const [open, setOpen] = useState(false);

	const [ logout ] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logout({ refreshToken: session.refreshToken });
		} catch (e: any) {
			console.error(e);
		}
	}

	const {
		data: uniData
	} = useGetUserUnisRoleQuery({ user: session.user._id!, role: session.metadata.role! });

	return (
		<div className="navbar bg-black pb-5 text-white mx-7 mt-3 flex align-center justify-between z-[999]">
			<div className='branding flex items-center flex-1 text-white'>
				<h1 className='font-black text-2xl'>STUD</h1>
			</div>
			<div className="menu">
				<Menu size={32} onClick={()=> setOpen(prevState => !prevState)} />
			</div>
			{open && (
				<div className={`absolute left-0 w-full bg-black z-[999] transition-all ${open ? 'h-full' : 'h-0'}`}>
					<div className="navbar bg-black text-white mx-7 mt-3 flex align-center justify-between z-[999]">
						<div className='branding flex items-center flex-1 text-white'>
							<h1 className='font-black text-2xl'>STUD</h1>
						</div>
						<div className="menu">
							<CircleX size={32} onClick={()=> setOpen(prevState => !prevState)} />
						</div>
					</div>
					<div className="w-full flex flex-col justify-between h-[90%] overflow-y-hidden">
						<div className="divide-y-2">
							<div className="">	
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<CircleUser />
									<div className="font-black">Profil</div>
								</div>
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<GraduationCap />
									<div className="font-black">Studenti</div>
								</div>
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<GraduationCap />
									<div className="font-black">Studenti</div>
								</div>
							</div>
							<div className="">
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<GraduationCap />
									<div className="font-black">Studenti</div>
								</div>
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<GraduationCap />
									<div className="font-black">Studenti</div>
								</div>
								<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
									<GraduationCap />
									<div className="font-black">Studenti</div>
								</div>
							</div>
						</div>
						<div className="">
							<div onClick={handleLogout} className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
								<LogOutIcon />
								<div className="font-black">Odjavi se</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default HamburgerMenu
