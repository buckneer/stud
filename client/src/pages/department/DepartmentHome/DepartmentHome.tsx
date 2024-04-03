import {Helmet} from "react-helmet";
import React, {ReactNode, useState} from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import {Book, CalendarCheck, CirclePlus, Delete, LayoutList, Pencil, Settings, Trash2, University} from "lucide-react";
import { useGetUniDepartmentsQuery } from "../../../app/api/departmentApiSlice";
import { useParams } from "react-router";
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useGetUniQuery } from "../../../app/api/uniApiSlice";

function DepartmentHome() {

	const session = useSelector((state: RootState) => state.session);
    const {uni} = useParams();

    const {
        data: departmentsData,
        isLoading: isDepartmentDataLoading,
        isSuccess: isDepartmentDataSuccess,
        isError: isDepartmentDataError,
    } = useGetUniDepartmentsQuery(uni! , {
        skip: !uni || !session.accessToken
    })

    const{
        data: uniData,
        isLoading: isUniDataLoading,
        isSuccess: isUniDataSuccess,
        isError: isUniDataError
    } = useGetUniQuery(uni!, {
        skip: !uni || !session.accessToken
    });

    const tableContent: any = departmentsData?.map(department => {
        const {_id, name} = department;
        const studentNumber = department.students?.length;
        return (
                <tr className="border-b-2">
                    <td className="py-2">{name}</td>
                    <td className="py-2">{studentNumber ? studentNumber : "Nema studenata"}</td>
                    <td className="py-2 flex gap-3 justify-center">
                        <Link to={`http://localhost:3000/uni/${uni}/department/${_id}/edit`} className="hover:rotate-12 transition" ><Pencil /></Link>
                        <Link to={`http://localhost:3000/uni/${uni}/department/${_id}/delete`} className="hover:rotate-12 transition    "><Trash2 /></Link>
                    </td>
                </tr>
        )
    });
            
	return (
		<div className="bg-white">
			<Helmet>
				<title>Odseci | Stud</title>
			</Helmet>
			<div className="flex h-full">
				<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
					<div className="list-header flex justify-end p-5 ">
						<div className="search-container flex items-center gap-2">
                            <Link to={`http://localhost:3000/uni/${uni}/department/add`} className="flex gap-2 items-center">
                                <div className="font-semibold">
                                    Dodaj odsek
                                </div>
                                <CirclePlus size={26} />
                            </Link>
							<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
						</div>
					</div>
					<div className="w-full flex justify-center">
                        <table className="w-4/5 text-center mt-5">
                            <thead>
                                <tr className="border-b-2 bg-slate-100 h-12">
                                    <th className="text-lg">Odsek</th>
                                    <th className="text-lg">Broj Studenata</th>
                                    <th className="text-lg">Akcije</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </table>
					</div>
				</div>
				<Sidebar>
					<div className="pt-1">
						<SidebarItem name="Ispitni Rokovi" Icon={CalendarCheck} />
						<SidebarItem name="Ispiti" Icon={LayoutList} />
						<SidebarItem name="Predmeti" Icon={Book} />
					</div>
				</Sidebar>
			</div>
		</div>
	);
}

export default DepartmentHome
