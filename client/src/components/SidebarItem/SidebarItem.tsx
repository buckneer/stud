import {GraduationCap} from "lucide-react";
import React, {ElementType} from "react";



export interface SidebarItemProps {
	name: string;
	Icon: ElementType,
	to?: string;
}

function SidebarItem({name, Icon, to}: SidebarItemProps) {
	return (
		<div className="w-full rounded-2xl py-2 px-5 hover:bg-white transition-all cursor-pointer flex gap-2">
			<Icon />
			<h1>{name}</h1>
		</div>
	);
}

export default SidebarItem
