import React, {ElementType} from 'react';
import { NavLink } from 'react-router-dom';


interface NavItemProps {
    to: string;
    Icon: ElementType,
    title: string;
    isDropdown?: boolean;
    handleDropdown?: () => void;
}

const NavItem = ({to, Icon, title, isDropdown, handleDropdown}: NavItemProps) => {

    //@ts-ignore


    return (
        <div className="">
            <NavLink to={to} className='nav-item flex gap-2 rounded-2xl p-2 align-center group transition-all'>
                <Icon />
                <div className='hidden group-[.active]:block'>{title}</div>
            </NavLink>
        </div>
    )
}


export default NavItem;
