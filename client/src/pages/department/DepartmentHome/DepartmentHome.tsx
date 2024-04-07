import { Helmet } from "react-helmet";
import React, { ReactNode, useRef, useState } from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import { Book, CalendarCheck, CirclePlus, Delete, LayoutList, Pencil, Settings, Trash2, University } from "lucide-react";
import { useGetUniDepartmentsQuery } from "../../../app/api/departmentApiSlice";
import { useParams } from "react-router";
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useGetUniQuery } from "../../../app/api/uniApiSlice";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";

function DepartmentHome() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [depName, setDepName] = useState("");
	const [depId, setDepId] = useState("");

	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	const handleDeleteDep = (id: string) => {
		console.log("Dep id: ", id);
	}
	const {
		data: departmentsData,
		isLoading: isDepartmentDataLoading,
		isSuccess: isDepartmentDataSuccess,
		isError: isDepartmentDataError,
	} = useGetUniDepartmentsQuery(uni!, {
		skip: !uni || !session.accessToken
	})

	const {
		data: uniData,
		isLoading: isUniDataLoading,
		isSuccess: isUniDataSuccess,
		isError: isUniDataError
	} = useGetUniQuery(uni!, {
		skip: !uni || !session.accessToken
	});

	const tableContent: any = departmentsData?.map((department: any) => {
		const { _id, name } = department;
		const studentNumber = department.students?.length;
		return (
			<tr className="border-b-2">
				{/* @ts-ignore */}
				<td className="py-2">{name}</td>
				<td className="py-2">{studentNumber ? studentNumber : "Nema studenata"}</td>
				<td className="py-2 flex gap-3 justify-center">
					<Link to={`http://localhost:3000/uni/${uni}/department/${_id}/edit`} className="hover:rotate-12 transition"><Pencil /></Link>
					<div className="hover:rotate-12 transition "><Trash2 onClick={() => { setIsOpen(true); setDepName(name); setDepId(_id) }} /></div>
				</td>
			</tr>
		)
	});

	let Modalcontent: any = (
		<>
			<div className="w-full select-none">
				<div className="text-2xl font-semibold flex flex-col items-center justify-center">
					<div className="underline underline-offset-8 text-3xl text-white mb-3">
						Brisanje Odseka
					</div>
					<div
						className="group relative inline-block overflow-hidden rounded py-2 px-4 text-white text-2xl font-bold">
						{/* Odkomentarisi i odluci se da li da ostavljamo ovaj patriotizam ?
                        <span className="ease absolute top-0 left-0 h-0 w-0 border-b-4 border-red-500 transition-all duration-300 group-hover:w-1/3"></span>
                        <span className="ease absolute top-0 left-1/3 h-0 w-0 border-b-4 border-blue-500 transition-all duration-300 group-hover:w-1/3"></span>
                        <span className="ease absolute top-0 left-2/3 h-0 w-0 border-b-4 border-white transition-all duration-300 group-hover:w-1/3"></span>
                        <span className="ease absolute top-0 right-0 h-0 w-0 border-r-4 border-white transition-all duration-300 group-hover:h-full"></span>
                        <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-4 border-red-500 transition-all duration-300 group-hover:h-full"></span> 
                        <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-4 border-red-500 transition-all duration-300 group-hover:w-1/3"></span>
                        <span className="ease absolute bottom-0 left-1/3 h-0 w-0 border-b-4 border-blue-500 transition-all duration-300 group-hover:w-1/3"></span>
                        <span className="ease absolute bottom-0 left-2/3 h-0 w-0 border-b-4 border-white transition-all duration-300 group-hover:w-1/3"></span>
                        */}
						{depName}
					</div>
					<div className="text-gray-400  text-sm p-4 -mt-3 text-center">
						Obrisani odsek će nepovratno nestati iz sistema, stoga budite svesni da nakon potvrde brisanja ova radnja neće biti moguća da se opozove
					</div>
				</div>
			</div>
		</>
	);

	return (
		<>
			<Helmet>
				<title>Odseci | Stud</title>
			</Helmet>
		
			<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} id={depId} content={Modalcontent} message="Da li ste sigurni da zelite da obrisete odsek?" deleteFunc={handleDeleteDep} >
					<div className="lists-container flex-1 h-full py-5 w-full">
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
							<table className="w-4/5 text-center mt-5 rounded-2xl overflow-hidden">
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
				</Modal>
			</div>
		</>
	);
}

export default DepartmentHome
