import {GraduationCap} from "lucide-react";
import React, {ElementType} from "react";



export interface SidebarItemProps {
	name: string;
	Icon: ElementType,
	to?: number;
	active?: boolean;
	changeData?: (change: number) => void;
}

function SidebarItem({name, Icon, active, changeData, to}: SidebarItemProps) {



	return (
		<div className={`w-full mt-1 rounded-2xl py-2 px-5 hover:bg-white transition-all cursor-pointer flex gap-2
		${active ? 'bg-white' : ''}`} onClick={() => changeData ? changeData(to || 0) : ''}>
			<Icon />
			<h1>{name}</h1>
		</div>
	);
}

export default SidebarItem
