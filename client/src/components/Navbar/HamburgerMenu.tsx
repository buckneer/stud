import React, {useState} from "react";
import {CircleX, GraduationCap, LogOutIcon, Menu, SidebarCloseIcon} from "lucide-react";
import NavItem from "./NavItem";

function HamburgerMenu() {


	const [open, setOpen] = useState(false);

	return (
		<div className="navbar bg-black text-white mx-7 mt-3 flex align-center justify-between z-[999]">
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
							<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
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
