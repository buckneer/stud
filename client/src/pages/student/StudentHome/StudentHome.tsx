import {Helmet} from "react-helmet";
import React, {useState} from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SidebarItem from "../../../components/SidebarItem/SidebarItem";
import {Book, CalendarCheck, FolderArchive, GraduationCap, LayoutList, User} from "lucide-react";
import Table from "../../../components/Table/Table";

function StudentHome() {

	const [selectedData, setSelectedData] = useState(0);
	const [exams, setExams] = useState<string[]>([]);

	const handleDataChange = (changeTo: number) => {
		setSelectedData(changeTo);
	}

	const handleSend = () => {

		// TODO add mutation
		console.log(exams);
	}

	return (
		<div className="bg-white">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>
			<div className="flex h-full">
				<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
					<div className="list-header flex justify-between p-5 ">
						<StudTitle text={"Januarsko-Februarski ispitni rok"} />
						<div className="search-container">
							<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
						</div>
					</div>
					<div className="w-full">
						<Table setExams={setExams} />
					</div>
					<div className="flex justify-end p-5">
						<div className="bg-slate-100 rounded-2xl px-3 py-2 font-bold cursor-pointer transition-all hover:bg-white hover:border-black border-[1px] border-slate-100" onClick={() => {handleSend()}}>Prijavi izabrane ispite</div>
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

export default StudentHome
