import React, {ElementType} from 'react';
import { NavLink } from 'react-router-dom';


interface NavItemProps {
    to?: string;
    Icon: ElementType,
    title: string;
    isDropdown?: boolean;
    handleDropdown?: (itemName: string) => void;
}

const NavItem = ({to, Icon, title, isDropdown, handleDropdown}: NavItemProps) => {
    return (
        !isDropdown ?
            <NavLink to={to!} className='nav-item flex gap-2 rounded-2xl p-2 align-center group transition-all'>
                <Icon />
                <div className='hidden group-[.active]:block'>{title}</div>
            </NavLink>
            :
            <div className="dropdown-menu nav-item flex gap-2 rounded-2xl p-2 align-center group transition-all" onClick={() => handleDropdown!(title)}>
                <Icon />
                <div className='hidden group-[.active]:block'>{title}</div>
            </div>
    )
}


export default NavItem;
