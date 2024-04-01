import {Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, LogOut, User, UserCircle} from "lucide-react";
import SidebarItem from "../SidebarItem/SidebarItem";
import React from "react";



export interface SidebarProps {
	selectedData: number,
	handleDataChange: (data: number) => void;
	children: string | JSX.Element | JSX.Element[],
}

function Sidebar({selectedData, handleDataChange, children} : SidebarProps) {



	return (
		<div className='sidebar flex flex-col items-center divide-y-2 bg-slate-100 px-5 py-10'>
			<div className="flex flex-col items-center gap-5 px-5 py-2">
				<UserCircle size={100} />
				<h1 className="font-black">Logged in</h1>
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="pt-5 w-full flex flex-col gap-2 divide-y-2">
					{children}
				</div>
				<SidebarItem name="Odjavi se" Icon={LogOut} />
			</div>

		</div>
	);
}

export default Sidebar
