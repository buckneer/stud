import {
	Book,
	CalendarCheck,
	FolderArchive,
	GraduationCap,
	LayoutList,
	LogOut,
	University,
	User,
	UserCircle
} from "lucide-react";
import SidebarItem from "../SidebarItem/SidebarItem";
import React from "react";



export interface SidebarProps {
	selectedData: number,
	handleDataChange: (data: number) => void;
}

function Sidebar({selectedData, handleDataChange} : SidebarProps) {



	return (
		<div className='sidebar flex flex-col items-center divide-y-2 bg-slate-100 px-5 py-5'>
			<div className="flex flex-col items-center gap-5 px-5 pb-4">
				<University className="text-gray-700" size={100} />
				<select className="border-0 rounded-xl w-full">
					<option>Hello World</option>
					<option>Hello World 2</option>
					<option>Hello World 3</option>
				</select>
				{/*<h1 className="font-black">Logged in</h1>*/}
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="pt-5 w-full flex flex-col gap-2 divide-y-2">
					<div className="">
						<SidebarItem name="Studenti" Icon={GraduationCap} active={selectedData == 0} to={0} changeData={handleDataChange} />
						<SidebarItem name="Profesori" Icon={User} active={selectedData == 1}  to={1} changeData={handleDataChange} />
						<SidebarItem name="STUD Služba" Icon={FolderArchive} active={selectedData == 2}  to={2} changeData={handleDataChange}/>
					</div>
					<div className="pt-1">
						<SidebarItem name="Ispitni Rokovi" Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" Icon={LayoutList} />
						<SidebarItem name="Predmeti" Icon={Book} />
					</div>
				</div>
				<SidebarItem name="Odjavi se" Icon={LogOut} />
			</div>
		</div>
	);
}

export default Sidebar
