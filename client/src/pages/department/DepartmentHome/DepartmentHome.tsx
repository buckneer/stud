import { Helmet } from "react-helmet";
import React, { ReactNode, useRef, useState } from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import { Book, CalendarCheck, CirclePlus, Delete, LayoutList, Pencil, Settings, Trash2, University, X } from 'lucide-react';
import { useGetUniDepartmentsQuery } from "../../../app/api/departmentApiSlice";
import { useParams } from "react-router";
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useGetUniQuery } from "../../../app/api/uniApiSlice";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import Table from "../../../components/Table/Table";
import TD from "../../../components/Table/TableColumn";

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
			<tr key={_id}>
				<TD>{ name }</TD>
				<TD>{studentNumber ? studentNumber : "Nema studenata"}</TD>
				<TD>
					<div className="flex w-full justify-center gap-2">
						<Link to={`http://localhost:3000/uni/${uni}/department/${_id}/edit`} className="hover:rotate-12 transition"><Pencil /></Link>
						<div className="hover:rotate-12 transition cursor-pointer hover:text-red-500 "><Trash2 onClick={() => { setIsOpen(true); setDepName(name); setDepId(_id) }} /></div>
					</div>
				</TD>
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
		
			<div className="lists-container flex-1 h-full overflow-y-scroll w-full bg-white">
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} id={depId} content={Modalcontent} message="Da li ste sigurni da zelite da obrisete odsek?" deleteFunc={handleDeleteDep} >
					<div className="lists-container flex-1 h-full py-5 w-full">
						<div className="list-header flex justify-between p-5 items-center">
								<StudTitle text='Odseci'/>
								<div className="search-container flex items-center gap-2">
									<Link to={`http://localhost:3000/uni/${uni}/department/add`} className="add-field flex gap-3 rounded-2xl bg-slate-100 p-2 border-[1px] border-slate-200 cursor-pointer hover:bg-slate-200">
										<div className="font-semibold">
											Novi odsek
										</div>
										<CirclePlus size={26} />
									</Link>
									<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
							</div>
						</div>
						<div className="w-full flex justify-center">
							<Table cols={['Odsek', 'Broj studenata', 'Akcije']}>								
								{ tableContent }
							</Table>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
}

export default DepartmentHome
